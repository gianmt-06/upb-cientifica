import express, { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import transcode from '../Transcoder.js';
import getUrl from '../URIManager.js';
import { Environment } from '../environment/Environment.js';

const app = express();
const env = new Environment();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = Router();

router.get("/ping", (_req, res) => {
    res.status(200).json({ message: "pong"} )
})

router.post("/transcode", (req, res) => {
    const { path, hash } = req.body;
    transcode(path, hash).then(success => {
        if (success) res.status(400).json({ message: "Processed successfully"})
        else res.status(403).json({ message: "Processed Error"})
    })
})

router.get("/uri/:hash", (req, res) => {
    const { hash } = req.params;
    const { ip } = req;

    getUrl(hash, ip).then(value => {
        res.status(200).json({ uri: value })
    }).catch(error => {
        res.status(404).json({ error: `error ${error}` })
    })
})

app.use(router)

app.listen(env.SERVER_PORT, () => {
    console.log("express/start", `Server running on http://${env.SERVER_HOST}:${env.SERVER_PORT}`)
})