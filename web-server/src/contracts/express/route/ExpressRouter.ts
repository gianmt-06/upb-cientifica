import { Router } from "express";

export default interface ExpressRouter {
    router: Router,
    path: string,
    version: string,
    setRoutes: () => void,
}