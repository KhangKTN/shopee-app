type Role = 'User' | 'Admin'

type User = {
    _id: string,
    roles: Role,
    email: string,
    name: string,
    date_of_birth: string | null,
    address: string,
    phone: string,
    createdAt: string,
    updatedAt: string,
    __v: 0
}