package helper

import (
	"crypto/sha256"
	"encoding/hex"
	"gogrpcserver/src/environment"
	"path"
	"path/filepath"
	"time"
)

var (
	env = environment.NewEnv()
)

func GetSystemPath(relative string) string {
	if relative == "" {
		return ""
	}

	return path.Join(env.GetRootDir(), relative)
}

func GetRelativePath(base string, relative string) string {
	if base == "" || relative == "" {
		return ""
	} else if base == "/" {
		base = env.GetRootDir()
	}

	relativePath, err := filepath.Rel(base, relative)

	if err != nil {
		return ""
	}

	return relativePath
}

func GetFileFingerprint(relative []byte) string {
	weak := sha256.New()
	weak.Write(relative)
	return hex.EncodeToString(weak.Sum(nil))
}

func FormatTime(date time.Time) string {
	return date.Format(time.RFC3339)
}
