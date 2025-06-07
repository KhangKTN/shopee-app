export const PurchaseStatus = {
    CART: -1,
    ALL: 0,
    CONFIRMING: 1,
    TAKING: 2,
    SHIPPING: 3,
    DELIVERED: 4,
    CANCELED: 5
} as const

export const purchaseNavLinks: PurchaseNavLink[] = [
    {
        name: 'Tất cả',
        type: PurchaseStatus.ALL
    },
    {
        name: 'Xác nhận',
        type: PurchaseStatus.CONFIRMING
    },
    {
        name: 'Lấy hàng',
        type: PurchaseStatus.TAKING
    },
    {
        name: 'Vận chuyển',
        type: PurchaseStatus.SHIPPING,
        showCount: true
    },
    {
        name: 'Hoàn thành',
        type: PurchaseStatus.DELIVERED
    },
    {
        name: 'Đã huỷ',
        type: PurchaseStatus.CANCELED
    }
] as const
