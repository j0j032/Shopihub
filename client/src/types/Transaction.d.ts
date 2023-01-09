export interface Transaction {
    userId: string,
    cost: string,
    products: string[],
    createdAt?: string,
    updatedAt?: string,
    _id: string
}

export type Transactions = {
    transactions: Transaction[],
    total: number
}
