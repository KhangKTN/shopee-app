const AlertSuccess = ({ text }: { text: string }) => {
    return (
        <div className='top-1/2 left-1/2 z-50 fixed flex flex-col justify-center items-center gap-y-4 bg-black/70 backdrop-blur px-4 py-8 rounded-sm text-white -translate-x-1/2'>
            <svg xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' width='60' height='60' viewBox='0 0 48 48'>
                <path
                    fill='#4caf50'
                    d='M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z'
                ></path>
                <path
                    fill='#ccff90'
                    d='M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z'
                ></path>
            </svg>
            <h2 className='text-base text-center'>{text}</h2>
        </div>
    )
}

export default AlertSuccess
