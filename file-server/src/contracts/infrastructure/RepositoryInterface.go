package contracts

type Repository[T any] interface {
	getOne(hash string) (*T, error)
	save()
}