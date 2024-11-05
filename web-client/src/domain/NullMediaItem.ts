import { AbstractMediaItem } from "./AbstractMediaItem";

export class NullMediaItem extends AbstractMediaItem {
    constructor(){
        super('no name', "no id", 0, "0000", 'no owner', new Date(0), 'no mimetype', 'no thumbnail', 'no route');
    }

    isNull(): boolean {
        return true;
    }
}