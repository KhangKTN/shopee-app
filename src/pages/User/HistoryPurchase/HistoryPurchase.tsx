import cx from 'classix'
import { Link, useSearchParams } from 'react-router-dom'
import { purchaseNavLinks, PurchaseStatus } from '~/constant/purchase'
import PurchaseItem from './PurchaseItem'

interface Shop {
    id: number
    name: string
}

const shopList: Shop[] = [
    { id: 1, name: 'Quang trung Q6 Shop' },
    { id: 2, name: 'Phụ Tùng Máy MV' },
    { id: 3, name: 'Shop Phụ Tùng BRT Việt Nam' },
    { id: 4, name: 'Phụ Tùng Xe Máy ÚT MOTO' },
    { id: 5, name: 'AnLA Parts & Accessories' }
]

export interface ItemPurchase {
    shop: Shop
    product: Pick<Product, '_id' | 'name' | 'image' | 'price' | 'price_before_discount'>
    status: PurchaseStatus
}

const itemPurchaseList: ItemPurchase[] = [
    {
        shop: shopList[0],
        product: {
            _id: '134893517.28511815799',
            name: 'Bộ đầu bò Ex150 FASSTEK chính hãng 19/22-20/23-22/25-23/26',
            image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m7eo3c1sd0cc50.webp',
            price: 1850000,
            price_before_discount: 1850000
        },
        status: PurchaseStatus.SHIPPING
    },
    {
        shop: shopList[0],
        product: {
            _id: '134893517.28760454413',
            name: 'Lòng kiếng fasstek 57 / 62 / 65 phổ thông Ex135 /150 V4',
            image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lzuu5q5tm1cd7b.webp',
            price: 1600000,
            price_before_discount: 1600000
        },
        status: PurchaseStatus.SHIPPING
    },
    {
        shop: shopList[1],
        product: {
            _id: '48243285.19056298345',
            name: 'Cam độ FASSTek chính hãng cho xe Ex135/150. Mẫu RC1/RC1 Plus/RC2/RC3. Yêu Thích',
            image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m8hili7bfs7b2e.webp',
            price: 420000,
            price_before_discount: 420000
        },
        status: PurchaseStatus.SHIPPING
    },
    {
        shop: shopList[1],
        product: {
            _id: '48243285.27275852377',
            name: 'Tay dên FASSTek CNC Racing size Zin dành cho xe Ex135.5s/Ex150',
            image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m645z529nvw6c4.webp',
            price: 580000,
            price_before_discount: 580000
        },
        status: PurchaseStatus.SHIPPING
    },
    {
        shop: shopList[2],
        product: {
            _id: '48069299.7461589701',
            name: 'ECU BRT Juken 5 và 5++ dành cho các dòng xe số Honda Yamaha',
            image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m90fz7373k3mc4.webp',
            price: 2585000,
            price_before_discount: 2585000
        },
        status: PurchaseStatus.SHIPPING
    },
    {
        shop: shopList[1],
        product: {
            _id: '48243285.10496249259',
            name: 'Kim phun FASSTek đủ size dành cho xe Ex150 đời 2015 đến 2018. BH 1 năm đổi mới.',
            image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m8gfy5rnspkea6.webp',
            price: 400000,
            price_before_discount: 400000
        },
        status: PurchaseStatus.SHIPPING
    },
    {
        shop: shopList[1],
        product: {
            _id: '48243285.12110766410',
            name: 'Bộ bạc RIK xịn size 54.57.62.65.68.72.74mm cho EX135.150/WINNER SONIC/RAIDER SATRIA.',
            image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m0hg6ksjy8dp5c.webp',
            price: 19000,
            price_before_discount: 19000
        },
        status: PurchaseStatus.SHIPPING
    },
    {
        shop: shopList[3],
        product: {
            _id: '231601594.27062205812',
            name: 'Họng Xăng TA Dành Cho Ex150 / Winner / Sonic Đủ Size Cho AE Lựa Chọn, Hàng Chính Hãng TA RACING',
            image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m3vtrtiqnaut13.webp',
            price: 800000,
            price_before_discount: 800000
        },
        status: PurchaseStatus.SHIPPING
    },
    {
        shop: shopList[1],
        product: {
            _id: '48243285.18391029819',
            name: 'Lò xo đầu OVal FASSTek cao cấp dành cho Ex150',
            image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m90encmbomma29.webp',
            price: 430000,
            price_before_discount: 430000
        },
        status: PurchaseStatus.SHIPPING
    },
    {
        shop: shopList[4],
        product: {
            _id: '91668890.6494901350',
            name: 'Lò xo nồi BRT Exciter 150 / TFX / R15V2',
            image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-ltz9l7ienv3360.webp',
            price: 305000,
            price_before_discount: 305000
        },
        status: PurchaseStatus.SHIPPING
    },
    {
        shop: shopList[3],
        product: {
            _id: '231601594.5581855664',
            name: 'Cảm Biến TPS Winner/ Exciter/ Satria / Vario / Click Hàng Chính Hãng TARacing',
            image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7qukw-lhrgdp1cti8502.webp',
            price: 313000,
            price_before_discount: 313000
        },
        status: PurchaseStatus.SHIPPING
    },
    {
        shop: shopList[2],
        product: {
            _id: '649308205.24465148937',
            name: 'Mobin sườn BRT dùng cho xe máy ( xe Fi và xe ko Fi)',
            image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lxwr5rvv3t975b.webp',
            price: 35000,
            price_before_discount: 35000
        },
        status: PurchaseStatus.SHIPPING
    },
    {
        shop: shopList[2],
        product: {
            _id: '48069299.15928172697',
            name: 'BUGI BRT SUPER IRIDIUM RACING CHÂN DÀI CPR9EAIX DÀNH CHO Exciter,Winner,Vario,Airblade,Satria,GSX-',
            image: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ra0g-m8yyetsipy823a.webp',
            price: 215000,
            price_before_discount: 215000
        },
        status: PurchaseStatus.SHIPPING
    }
]

const TYPE = 'type'

const countStatus = (status: number) => itemPurchaseList.filter((i) => i.status === status).length ?? 0

const HistoryPurchase = () => {
    const [searchParams] = useSearchParams()
    const purchaseTypeQuery = searchParams.get(TYPE) ?? PurchaseStatus.ALL

    const purchaseRenderList: ItemPurchase[] = itemPurchaseList.filter(
        (i) => +purchaseTypeQuery === PurchaseStatus.ALL || i.status === Number(purchaseTypeQuery)
    )

    return (
        <>
            {/* Navbav */}
            <section className='grid grid-cols-6 bg-white rounded text-base'>
                {purchaseNavLinks.map((link) => (
                    <Link
                        key={link.name + link.type}
                        className={cx(
                            'grid-cols-1 py-4 border-b-[2px] text-center capitalize',
                            Number(purchaseTypeQuery) === link.type
                                ? 'border-primary text-primary'
                                : 'border-gray-200 hover:text-primary transition-colors'
                        )}
                        to={`?${TYPE}=${link.type}`}
                    >
                        {link.name}
                        {link.showCount && ` (${countStatus(link.type)})`}
                    </Link>
                ))}
            </section>
            {/* Show purchase items */}
            <section className='flex flex-col gap-y-3 mt-4'>
                {/* Purchase */}
                {purchaseRenderList.length > 0 ? (
                    purchaseRenderList.map((purchase) => (
                        <PurchaseItem key={purchase.product._id} purchase={purchase} />
                    ))
                ) : (
                    <div className='pt-10 text-base text-center'>Chưa có đơn hàng nào</div>
                )}
            </section>
        </>
    )
}

export default HistoryPurchase
