package alejandro;

import alejandro.rmi.RmiServer;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world:D");

        RmiServer rmiServer = new RmiServer();

        Thread[] threads = { new Thread(rmiServer) };
        for (Thread thread : threads) thread.start();
    }
}