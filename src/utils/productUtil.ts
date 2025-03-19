const calcDiscount = (price: number, priceBeforeDiscount: number): number => {
    return 100 - Math.floor((price * 100) / priceBeforeDiscount)
}

const formatQuantity = (quantity: number): string => {
    return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(quantity)
}

const formatMoney = (price: number): string => {
    return price.toLocaleString('vi-VN')
}

export default { calcDiscount, formatMoney, formatQuantity }
