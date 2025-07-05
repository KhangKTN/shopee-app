import './Spinner.css'

const SpinnerLoader = () => {
    return (
        <div className='mx-auto py-3 w-fit' role='status'>
            <div className='loader'>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
            </div>
        </div>
    )
}

export default SpinnerLoader
