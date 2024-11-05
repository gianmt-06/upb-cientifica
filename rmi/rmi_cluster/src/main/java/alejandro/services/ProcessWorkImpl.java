package alejandro.services;

import alejandro.domain.WorkFile;
import alejandro.interfaces.Cluster;
import alejandro.rmi.RmiClient;
import alejandro.utils.Environment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;
import java.util.LinkedList;
import java.util.Queue;

public class ProcessWorkImpl extends UnicastRemoteObject implements Cluster {
    private static final Logger logger = LoggerFactory.getLogger(ProcessWorkImpl.class);
    private final Queue<WorkFile> workQueue;
    private boolean isWorking;

    public ProcessWorkImpl() throws RemoteException {
        super();
        workQueue = new LinkedList<>();
        isWorking = false;
    }

    @Override
    public void processWork(byte[] fileData, String fileName, String uid) throws RemoteException {
        WorkFile workFile = new WorkFile(fileName, fileData, uid);
        workQueue.offer(workFile);
        continueProcessing();
    }

    private synchronized void continueProcessing() {
        if (isWorking || workQueue.isEmpty()) return;

        isWorking = true;
        WorkFile currentWork = workQueue.poll();

        new Thread(() -> {
           try { doTheWork(currentWork); }
           finally {
               isWorking = false;
               continueProcessing();
           }
        }).start();
    }

    private void doTheWork(WorkFile workFile) {
        String nfsPath = Environment.getInstance().getVariables().get("NFS_PATH");
        String filePath = nfsPath + workFile.fileName();
        String outputFilePath = nfsPath + "output_" + workFile.fileName() + ".txt";

        try (FileOutputStream fos = new FileOutputStream(filePath)) {
            fos.write(workFile.dataFile());
        } catch (IOException e) {
            logger.error("Error writing file ", e);
            return;
        }

        Path outputPath = Paths.get(outputFilePath);
        try {
            compileAndRunMPI(filePath, nfsPath);
            byte[] fileData = Files.readAllBytes(outputPath);

            RmiClient rmiClient = new RmiClient();
            rmiClient.saveFileInNFS(fileData, "output_" + new File(filePath).getName() + ".txt", workFile.uid());
        } catch (Exception e) { logger.error("Error doing the work :c", e); }
        finally {
            try {
                // el archivo original
                Files.deleteIfExists(Paths.get(filePath));
                // el archivo de respuesta
                Files.deleteIfExists(outputPath);
                // el archivo compilado
                Files.deleteIfExists(Paths.get(filePath + ".out"));
            } catch (IOException e) {
                logger.error("Error deleting temporary files", e);
            }
        }
    }

    private void compileAndRunMPI(String filePath, String nfsPath) {
        String k_means_path = Environment.getInstance().getVariables().get("NFS_PATH") + "k-means.c";
        ProcessBuilder compileBuilder;
        if (filePath.equals(k_means_path)) compileBuilder = new ProcessBuilder("mpicc", filePath, "-o", filePath + ".out", "-lm");
        else compileBuilder = new ProcessBuilder("mpicc", filePath, "-o", filePath + ".out");
        compileBuilder.redirectErrorStream(true);
            try {
                Process compileProcess = compileBuilder.start();
                try (BufferedReader compileReader = new BufferedReader(new InputStreamReader(compileProcess.getInputStream()))) {
                    String line;
                    while ((line = compileReader.readLine()) != null) {
                        logger.info(line);
                    }
                }
                compileProcess.waitFor();
            } catch (IOException | InterruptedException exception) {
                logger.error("Error compiling the file ", exception);
                return;
            }

            String hostFile = Environment.getInstance().getVariables().get("NFS_PATH") +
                    Environment.getInstance().getVariables().get("HOSTS_FILE");
            ProcessBuilder runBuilder = new ProcessBuilder("mpirun", "-hostfile", hostFile, filePath + ".out");
            runBuilder.redirectErrorStream(true);

            Process runProcess;
            try {
                runProcess = runBuilder.start();

                try (BufferedReader reader = new BufferedReader(new InputStreamReader(runProcess.getInputStream()));
                     BufferedWriter writer = new BufferedWriter(new FileWriter(nfsPath + "output_" + new File(filePath).getName() + ".txt"))) {
                    String line;
                    while ((line = reader.readLine()) != null) {
                        writer.write(line);
                        writer.newLine();
                    }
                }

                runProcess.waitFor();
            } catch (IOException | InterruptedException exception) {
                logger.error("Error running the file ", exception);
            }
    }
}
