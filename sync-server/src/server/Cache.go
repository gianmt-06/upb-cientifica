package server

import (
	"context"
	"log"
	"syncserver/src/util"

	"github.com/redis/go-redis/v9"
)

type Cache struct {
	Client  *redis.Client
}

func NewCacheClient() (*Cache){
	cache := redis.NewClient(&redis.Options{
        Addr:	  env.GetCacheUri(),
        Password: "", 
        DB:		  0,  
    })

	log.Println("[Redis]",cache.Ping(context.Background()))

	return &Cache{
		Client: cache,
	}
}

func (cache *Cache) FlushAll(ctx context.Context) (bool){
	err := cache.Client.FlushAll(ctx).Err()
    if err != nil {
		util.Log("error", err)
        return false
    }
	return true
}