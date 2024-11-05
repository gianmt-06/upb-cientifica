package domain

import "time"

type File struct {
	path        string
	fingerprint        string
	size        int64
	permissions string
	owner       string
	modified   time.Time
	mimetype    string
}

func NewFile(path string, fingerprint string,  size int64, owner string, permissions string, modified time.Time, mimetype string) *File {
	return &File{
		path,
		fingerprint,
		size,
		permissions,
		owner,
		modified,
		mimetype,
	}
}

func (f *File) GetPath() string {
    return f.path
}

func (f *File) GetFingerprint() string {
    return f.fingerprint
}

func (f *File) GetSize() int64 {
    return f.size
}

func (f *File) GetPermissions() string {
    return f.permissions
}

func (f *File) GetOwner() string {
    return f.owner
}

func (f *File) GetModified() time.Time {
    return f.modified
}

func (f *File) GetMimetype() string {
    return f.mimetype
}

func (f *File) SetPath(path string) {
    f.path = path
}

func (f *File) SetFingerprint(fingerprint string) {
    f.fingerprint = fingerprint
}

func (f *File) SetSize(size int64) {
    f.size = size
}

func (f *File) SetPermissions(permissions string) {
    f.permissions = permissions
}

func (f *File) SetOwner(owner string) {
    f.owner = owner
}

func (f *File) SetModified(modified time.Time) {
    f.modified = modified
}

func (f *File) SetMimetype(mimetype string) {
    f.mimetype = mimetype
}

