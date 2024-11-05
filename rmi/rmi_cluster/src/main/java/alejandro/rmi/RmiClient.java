package alejandro.rmi;

import alejandro.interfaces.Courier;
import alejandro.utils.Environment;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.MalformedURLException;
import java.rmi.Naming;
import java.rmi.NotBoundException;
import java.rmi.RemoteException;

public class RmiClient {
    private static final Logger logger = LoggerFactory.getLogger(RmiClient.class);
    private Courier courierInterface;

    public RmiClient() {
        try {
            String ip = Environment.getInstance().getVariables().get("COURIER_IP");
            String port = Environment.getInstance().getVariables().get("COURIER_PORT");
            String serviceName = Environment.getInstance().getVariables().get("COURIER_SERVICE");
            String url = "rmi://" + ip + ":" + port + "/" + serviceName;
            logger.info("url client: {}", url);
            courierInterface = (Courier) Naming.lookup(url);
        } catch (MalformedURLException | NotBoundException | RemoteException exception) {
            logger.error("Error creating RmiClient class", exception);
        }
    }

    // this method will be called once all the slaves are done
    public void saveFileInNFS(byte[] fileData, String fileName, String uid) {
        try {
            courierInterface.saveFileInNFS(fileData, fileName, uid);
        } catch (Exception exception) {
            logger.error("Error in saveFileInNFS", exception);
        }
    }
}
