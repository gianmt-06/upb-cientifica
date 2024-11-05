export abstract class AbstractMediaItem {
    constructor(
        private name: string,
        private id: string,
        private size: number,
        private permissions: string,
        private owner: string,
        private modifiedAt: Date,
        private mimeType: string,
        private path: string,
        private thumbnail?: string,
        private route?: string
    ) { }

    public getName(): string {
        return this.name;
    }

    public getFingerprint(): string {
        return this.id;
    }

    public getSize(): number {
        return this.size;
    }

    public getPermissions(): string {
        return this.permissions;
    }

    public getOwner(): string {
        return this.owner;
    }

    public getModifiedAt(): Date {
        return this.modifiedAt;
    }

    public getMimeType(): string {
        return this.mimeType;
    }

    public getThumbnail(): string | undefined {
        return this.thumbnail;
    }

    // Setters
    public setName(name: string): void {
        this.name = name;
    }

    public setFingerprint(fingerprint: string): void {
        this.id = fingerprint;
    }

    public setSize(size: number): void {
        this.size = size;
    }

    public setPermissions(permissions: string): void {
        this.permissions = permissions;
    }

    public setOwner(owner: string): void {
        this.owner = owner;
    }

    public setModifiedAt(modifiedAt: Date): void {
        this.modifiedAt = modifiedAt;
    }

    public setMimeType(mimeType: string): void {
        this.mimeType = mimeType;
    }

    public setThumbnail(thumbnail: string): void {
        this.thumbnail = thumbnail;
    }

    public getRoute() {
        return this.route;
    }

    public setRoute(route: string): void {
        this.route = route;
    }

    public getPath() {
        return this.path;
    }

    public setPath(path: string): void {
        this.path = path;
    }



    abstract isNull(): boolean;
}