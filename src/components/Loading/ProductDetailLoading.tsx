const ProductDetailLoading = () => {
    return (
        <main className='bg-gray-200 py-6'>
            <section className='bg-white shadow mx-auto p-4 rounded animate-pulse container'>
                <div className='gap-x-8 grid grid-cols-12'>
                    {/* Product images */}
                    <div className='col-span-5'>
                        <div className='bg-gray-200 pt-[100%] w-full'></div>
                        <div className='gap-1 grid grid-cols-5 grid-rows-1 mt-4'>
                            {Array.from({ length: 5 }, (_, idx) => (
                                <div key={idx} className='bg-gray-200 pt-[100%] w-full'></div>
                            ))}
                        </div>
                    </div>
                    {/* Product info */}
                    <div className='col-span-7'>
                        <div className='bg-gray-200 rounded-full w-full h-8'></div>
                        {/* Rating and sold */}
                        <div className='flex items-center gap-x-2 mt-3'>
                            <div className='bg-gray-200 rounded-full w-1/5 h-4'></div>
                            <div className='bg-gray-200 rounded-full w-1/5 h-4'></div>
                        </div>
                        {/* Price */}
                        <div className='flex bg-gray-200 mt-12 px-5 py-3 rounded h-12'></div>
                        {/* Shipping */}
                        <div className='flex items-start mt-5'>
                            <h2 className='min-w-[100px] text-gray-500 capitalize'>Vận chuyển</h2>
                            <div className='flex'>
                                <img
                                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/f1f65ec969d238ed62ff.svg'
                                    alt='img_car_ship'
                                    className='mt-0 h-fit'
                                />
                                <div className='ml-2'>
                                    <div className='bg-gray-200 rounded-full w-1/2 h-3'></div>
                                    <p className='text-gray-500 text-xs'>
                                        Tặng Voucher ₫15.000 nếu đơn giao sau thời gian trên.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center mt-5'>
                            <span className='min-w-[100px] max-w-[100px] text-gray-500 capitalize'>
                                An tâm mua sắm cùng Shopee
                            </span>
                            <img
                                src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/fd303700dd252abf3771.svg'
                                alt='img_verify'
                                className='mr-2 h-fit'
                            />
                            <p>Trả hàng miễn phí 15 ngày · Chính hãng 100% · Miễn phí vận chuyển</p>
                        </div>
                        {/* Quantity */}
                        <div>
                            <div className='flex items-center mt-12'>
                                <span className='min-w-[100px] text-gray-500 capitalize'>Số lượng</span>
                                <div className='flex bg-gray-200 mr-5 rounded-full w-1/3 h-8'></div>
                            </div>
                        </div>
                        {/* Action */}
                        <div className='flex gap-x-4 mt-10'>
                            <div className='bg-gray-200 rounded w-[200px] h-10'></div>
                            <div className='bg-gray-200 rounded w-[100px] h-10'></div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Description */}
            <section className='bg-white shadow mx-auto mt-5 p-4 rounded animate-pulse container'>
                <h2 className='bg-gray-100 py-2 pl-3 rounded font-medium text-base uppercase'>Mô tả sản phẩm</h2>
                <div className='bg-gray-200 mt-4 h-[400px]'></div>
            </section>
        </main>
    )
}

export default ProductDetailLoading
