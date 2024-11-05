"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
class File {
    _name;
    _id;
    _route;
    _size;
    _owner;
    _permissions;
    _modified;
    _mime_type;
    _path;
    constructor(name, id, route, size, owner, permissions, modified, mime_type, path) {
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
    get name() {
        return this._name;
    }
    get id() {
        return this._id;
    }
    get route() {
        return this._route;
    }
    get size() {
        return this._size;
    }
    get owner() {
        return this._owner;
    }
    get permissions() {
        return this._permissions;
    }
    get modified() {
        return this._modified;
    }
    get mime_type() {
        return this._mime_type;
    }
    // Setters
    set name(name) {
        this._name = name;
    }
    set id(id) {
        this._id = id;
    }
    set route(route) {
        this._route = route;
    }
    set size(size) {
        this._size = size;
    }
    set owner(owner) {
        this._owner = owner;
    }
    set permissions(permissions) {
        this._permissions = permissions;
    }
    set modified(modified) {
        this._modified = modified;
    }
    set mime_type(mime_type) {
        this._mime_type = mime_type;
    }
    set path(path) {
        this._path = path;
    }
    get path() {
        return this._path;
    }
}
exports.File = File;
//# sourceMappingURL=File.js.map