export class File {
    private _name: string;
    public _id: string;
    private _route: string;
    private _size: number;
    private _owner: string;
    public _permissions: string;
    private _modified: Date;
    private _mime_type: string;
    public _path: string;

    constructor(
        name: string,
        id: string,
        route: string,
        size: number,
        owner: string,
        permissions: string,
        modified: Date,
        mime_type: string,
        path: string
    ) {
        this._name = name;
        this._id = id;
        this._route = route;
        this._size = size;
        this._owner = owner;
        this._permissions = permissions;
        this._modified = modified;
        this._mime_type = mime_type;
        this._path = path;
    }


    // Getters
    public get name(): string {
        return this._name;
    }

    public get id(): string {
        return this._id;
    }

    public get route(): string {
        return this._route;
    }

    public get size(): number {
        return this._size;
    }

    public get owner(): string {
        return this._owner;
    }

    public get permissions(): string {
        return this._permissions;
    }

    public get modified(): Date {
        return this._modified;
    }

    public get mime_type(): string {
        return this._mime_type;
    }

    // Setters
    public set name(name: string) {
        this._name = name;
    }

    public set id(id: string) {
        this._id = id;
    }

    public set route(route: string) {
        this._route = route;
    }

    public set size(size: number) {
        this._size = size;
    }

    public set owner(owner: string) {
        this._owner = owner;
    }

    public set permissions(permissions: string) {
        this._permissions = permissions;
    }

    public set modified(modified: Date) {
        this._modified = modified;
    }

    public set mime_type(mime_type: string) {
        this._mime_type = mime_type;
    }

    public set path(path: string) {
        this._path = path;
    }

    public get path(){
        return this._path;
    }
}
