type Role = 'User' | 'Admin'

type User = {
    _id: string
    roles: Role
    email: string
    name?: string
    avatar?: string
    date_of_birth?: string
    address?: string
    phone?: string
    createdAt: string
    updatedAt: string
    __v: 0
}
