import { useState } from 'react'
import { toast } from 'react-toastify'

const MAX_SIZE_AVATAR = 1 * 1024 * 1024

const Profile = () => {
    const [avatar, setAvatar] = useState(
        'https://render.fineartamerica.com/images/rendered/medium/print/8/8/break/images/artworkimages/medium/3/classic-liverpool-fc-logo-grant-rosalia.jpg'
    )

    const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files.length) {
            return
        }
        const avatarImg = e.target.files[0]
        const avatarSize = avatarImg.size

        if (avatarSize > MAX_SIZE_AVATAR) {
            toast.error('Kích thước ảnh quá 1MB. Vui lòng chọn ảnh khác')
            return
        }
        setAvatar(URL.createObjectURL(avatarImg))
    }

    return (
        <div className='bg-white shadow-sm px-8 rounded min-h-full'>
            <div className='py-[15px] border-gray-200 border-b-[1px] h-[81px]'>
                <h6 className='font-semibold text-lg capitalize'>Hồ sơ của tôi</h6>
                <p>Quản lý thông tin để bảo mật tài khoản</p>
            </div>
            <div className='grid grid-cols-12 py-8'>
                <div className='flex flex-col gap-y-8 col-span-8 px-10 border-gray-200 border-r-[1px]'>
                    <div className='items-center gap-x-5 grid grid-cols-12'>
                        <div className='col-span-4 text-gray-600 text-right'>Tên đăng nhập</div>
                        <div className='col-span-8'>
                            <input
                                className='px-3 py-2 border-[1px] border-gray-200 rounded-sm outline-none w-full'
                                type='text'
                            />
                        </div>
                    </div>
                    <div className='items-center gap-x-5 grid grid-cols-12'>
                        <div className='col-span-4 text-gray-600 text-right'>Tên</div>
                        <div className='col-span-8'>
                            <input
                                className='px-3 py-2 border-[1px] border-gray-200 rounded-sm outline-none w-full'
                                type='text'
                            />
                        </div>
                    </div>
                    <div className='items-center gap-x-5 grid grid-cols-12'>
                        <div className='col-span-4 text-gray-600 text-right'>Email</div>
                        <div className='col-span-8'>test@gmail.com</div>
                    </div>
                    <div className='items-center gap-x-5 grid grid-cols-12'>
                        <div className='col-span-4 text-gray-600 text-right'>Số điện thoại</div>
                        <div className='col-span-8'>test@gmail.com</div>
                    </div>
                    <div className='items-center gap-x-5 grid grid-cols-12'>
                        <div className='col-span-4 text-gray-600 text-right'>Giới tính</div>
                        <div className='flex gap-x-3 col-span-8'>
                            <div className='flex items-center gap-x-2'>
                                <input
                                    defaultChecked
                                    name='gender'
                                    className='size-4 accent-primary cursor-pointer'
                                    type='radio'
                                    id='gender_male'
                                />
                                <label className='cursor-pointer' htmlFor='gender_male'>
                                    Nam
                                </label>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <input
                                    name='gender'
                                    className='size-4 accent-primary cursor-pointer'
                                    type='radio'
                                    id='gender_female'
                                />
                                <label className='cursor-pointer' htmlFor='gender_female'>
                                    Nữ
                                </label>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <input
                                    name='gender'
                                    className='size-4 accent-primary cursor-pointer'
                                    type='radio'
                                    id='gender_other'
                                />
                                <label className='cursor-pointer' htmlFor='gender_other'>
                                    Khác
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='items-center gap-x-5 grid grid-cols-12'>
                        <div className='col-span-4 text-gray-600 text-right'>Ngày sinh</div>
                        <div className='col-span-8'>01/01/1999</div>
                    </div>
                </div>
                <div className='col-span-4'>
                    <div className='mx-auto w-fit'>
                        <img className='bg-gray-300 mx-auto my-5 rounded-full size-[100px]' src={avatar} alt='avatar' />
                        <input
                            onChange={onChangeAvatar}
                            id='upload_avatar'
                            className='hidden'
                            type='file'
                            accept='.jpg,.jpeg,.png'
                        />
                        <label
                            htmlFor='upload_avatar'
                            className='block mx-auto my-4 px-4 py-2 border-[1px] border-gray-200 rounded w-fit capitalize'
                        >
                            Chọn ảnh
                        </label>
                        <p className='text-gray-500'>Dụng lượng file tối đa 1 MB</p>
                        <p className='text-gray-500'>Định dạng: .JPEG, .PNG</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
