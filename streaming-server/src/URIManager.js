import { Environment } from './environment/Environment.js';
import hashName from './HashName.js'
import { promises as fs } from 'fs';

const env = new Environment();

const CDNS = env.CDNS.split(",");

function getRandomCdn() {
    return CDNS[Math.floor(Math.random() * CDNS.length)]
}

function generateSecurePathHash(expires, client_ip) {
    return hashName(`${expires} ${client_ip}`, true)
}

async function getUrl(
    videoId,
    ip
) {
    const expires = String(Math.round(new Date(Date.now()
        + (1000 * 60 * 60)).getTime() / 1000)
    )

    const token = generateSecurePathHash(expires, ip)

    const files = await fs.readdir(`${env.STREAMING_DIR}/vod/${videoId}`, { withFileTypes: true });

    const qualities = files.map(quality => quality.name.match(/\d+/)[0]).join(',')

    return `http://${getRandomCdn()}/hls/vod/${videoId}/${token}/${expires}/_,${qualities},0p.mp4.play/master.m3u8`
}

export default getUrl;