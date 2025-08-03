const calcDiscountPercent = (price: number, priceBeforeDiscount: number): number => {
    return 100 - Math.floor((price * 100) / priceBeforeDiscount)
}

const formatQuantity = (quantity: number): string => {
    return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(quantity)
}

const formatVnd = (price: number): string => {
    return price.toLocaleString('vi-VN')
}

const slugifyUrl = ({ id, name }: { id: string; name: string }) => {
    let url = name.trim()
    url = url
        .replace(/[!@#$%^&*()[\].,;:/\\]/g, '-') // remove special chars
        .replace(/\s+/g, '-') // collapse whitespace and replace by -
        .replace(/-+/g, '-') // collapse dashes

    return `/${url}-i.${id}`
}

export default { calcDiscountPercent, formatVnd, formatQuantity, slugifyUrl }
