type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5

// Status use to get list purchase
type PurchaseListStatus = -1 | 0 | 1 | 2 | 3 | 4 | 5

interface Purchase {
    _id: string
    buy_count: number
    price: number
    price_before_discount: number
    status: PurchaseStatus
    user: string
    product: Product
    createdAt: string
    updatedAt: string
}
