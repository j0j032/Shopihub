type Role = 'user' | 'admin' | 'superadmin'

interface User {
    _id: string,
    name: string,
    email: string,
    password: string,
    city?: string,
    state?: string,
    country?: string,
    occupation?: string,
    phoneNumber?: string,
    transactions?: string[],
    role?: Role | Role[],
    __v?: number,
    createdAt?: string,
    updatedAt?: string,
}

export default User
