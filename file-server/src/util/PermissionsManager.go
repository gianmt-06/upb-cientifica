package util

import (
	"fmt"
	"gogrpcserver/src/environment"
	"io/fs"
	"os"
	"path"
	"strings"
)

var (
	env = environment.NewEnv()
)

func GetPermissions(path string) (fs.FileMode) {
	fileInfo, err := os.Stat(path)

	if err != nil {
		fmt.Println("Error fileinfo")
	}

	permissions := fileInfo.Mode().Perm();

	return permissions;
}

func HaveReadPerms(user string, usergroups []string, filepath string) bool {
	const (
        ownerRead  = 0400
        groupRead  = 0040
        othersRead = 0004
    )
	return checkPerms(user, filepath, ownerRead, groupRead, othersRead, usergroups);
}

func HaveWritePerms(user string, usergroups []string, filepath string) bool {
	const (
		ownerWrite  = 0200
		groupWrite  = 0020
		othersWrite = 0002
	)
	return checkPerms(user, filepath, ownerWrite, groupWrite, othersWrite, usergroups);
}

func isUserInGroup(filegroup string, usergroups []string) bool {
    for _, group := range usergroups {
		if group == filegroup {
            return true
        }
    }
    return false
}

func checkPerms(user string, filepath string, ownerperms int64, groupperms int64, othersperm int64, usergroups []string) bool {
	parts := strings.Split(filepath, "/")
	filegroup := parts[1];

	fullpath := path.Join(env.GetRootDir(), filepath);

	permissions := GetPermissions(fullpath);

	if (filegroup == user) {
		if permissions&fs.FileMode(ownerperms) != 0 {
			return true
		}
	} else if isUserInGroup(filegroup, usergroups) {
		if permissions&fs.FileMode(groupperms) != 0 {
			return true
		}
	} else {
		if permissions&fs.FileMode(othersperm) != 0 {
			return true
		}
	}
	return false;
}    