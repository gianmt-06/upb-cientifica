package hasher

import (
	"crypto/sha256"
	"encoding/hex"
	"hash/adler32"
)

func WeakChecksum(data []byte) uint32 {
	weak := adler32.New()
	weak.Write(data)
	return weak.Sum32()
}

func StrongChecksum(data []byte) string {
	weak := sha256.New()
	weak.Write(data)
	return hex.EncodeToString(weak.Sum(nil))
}