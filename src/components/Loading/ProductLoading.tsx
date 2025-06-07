const ProductLoading = ({ length = 4 }: { length?: number }) => {
    return Array.from({ length }, (_, idx) => (
        <div key={idx} className='bg-white rounded-sm w-full animate-pulse'>
            <div className='bg-gray-300/50 pt-[100%] w-full'></div>
            <div className='px-2 py-3 overflow-hidden'>
                <div className='bg-gray-300/50 rounded-full w-full h-[42px]'></div>
                <div className='bg-gray-300/50 mt-2 rounded-full w-1/2 h-6'></div>
                <div className='bg-gray-300/50 mt-2.5 rounded-full w-2/3 h-4'></div>
                <div className='bg-gray-300/50 mt-2 rounded-full w-full h-4'></div>
            </div>
        </div>
    ))
}

export default ProductLoading
