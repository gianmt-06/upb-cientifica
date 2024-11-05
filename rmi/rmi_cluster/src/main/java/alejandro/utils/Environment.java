package alejandro.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileInputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class Environment {
    private static Environment instance;
    private static final Logger logger = LoggerFactory.getLogger(Environment.class);
    private final HashMap<String, String> variables;

    private Environment() {
        variables = new HashMap<>();
        loadVariables(getPathProperties());
    }
    private String getPathProperties() {
        //return "src/main/resources/var.env";
        return "./var.env";
    }

    private void loadVariables(String path) {
        Properties properties = new Properties();
        try (FileInputStream fileInputStream = new FileInputStream(path)) {
            properties.load(fileInputStream);
            variables.put("THIS_IP", properties.getProperty("THIS_IP"));

            variables.put("CLUSTER_PORT", properties.getProperty("CLUSTER_PORT"));
            variables.put("CLUSTER_SERVICE", properties.getProperty("CLUSTER_SERVICE"));

            variables.put("COURIER_IP", properties.getProperty("COURIER_IP"));
            variables.put("COURIER_PORT", properties.getProperty("COURIER_PORT"));
            variables.put("COURIER_SERVICE", properties.getProperty("COURIER_SERVICE"));

            variables.put("NFS_PATH", properties.getProperty("NFS_PATH"));
            variables.put("HOSTS_FILE", properties.getProperty("HOSTS_FILE"));
        } catch (Exception exception) {
            logger.error("Singleton failed:c", exception);
        }
    }

    public static Environment getInstance() {
        if (Environment.instance == null) Environment.instance = new Environment();

        return Environment.instance;
    }

    public Map<String, String> getVariables() { return variables; }
}
