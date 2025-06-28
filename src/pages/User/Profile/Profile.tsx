import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useContext, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import userApi from '~/apis/user.api'
import Button from '~/components/Button'
import DateSelect from '~/components/DateSelect'
import Input from '~/components/Input'
import { AppContext } from '~/contexts/app.context'
import authUtil from '~/utils/authUtil'
import { isAxiosUnprocessaleEntityError } from '~/utils/helper'
import profileUtil from '~/utils/profileUtil'
import { userSchema } from '~/utils/validateField'

const MAX_SIZE_AVATAR = 1 * 1024 * 1024
const DEFAULT_DOB = new Date(1990, 0, 1)

const profileSchema = userSchema.pick(['name', 'address', 'phone', 'date_of_birth', 'avatar'])
type FormData = yup.InferType<typeof profileSchema>
type FormError = {
    [key in keyof FormData]: string
}

const Profile = () => {
    const { register, setValue, setError, handleSubmit, watch, control, formState, clearErrors } = useForm<FormData>({
        defaultValues: {
            name: '',
            address: '',
            avatar: '',
            date_of_birth: DEFAULT_DOB
        },
        resolver: yupResolver(profileSchema)
    })

    const { setProfile } = useContext(AppContext)
    const [avatarFile, setAvatar] = useState<File>()
    const watchAvatar = watch('avatar')

    const previewAvatar = useMemo(() => {
        if (avatarFile) {
            return URL.createObjectURL(avatarFile)
        }
        return profileUtil.getAvatarUrl(watchAvatar)
    }, [avatarFile, watchAvatar])

    const { data } = useQuery({
        queryKey: ['profile'],
        queryFn: userApi.getProfile
    })

    const updateProfileMutation = useMutation({
        mutationFn: userApi.updateProfile,
        onSuccess: (data) => {
            toast.success('Cập nhật thông tin thành công!')
            const profile = data.data.data
            authUtil.persistProfile(profile)
            setProfile(profile)
        }
    })

    const uploadAvatarMutation = useMutation({ mutationFn: userApi.uploadAvatar })

    const profileData = data?.data.data

    useEffect(() => {
        if (!profileData) {
            return
        }
        setValue('name', profileData.name)
        setValue('phone', profileData.phone)
        setValue('address', profileData.address)
        setValue('avatar', profileData.avatar)
        setValue('date_of_birth', profileData.date_of_birth ? new Date(profileData.date_of_birth) : DEFAULT_DOB)
    }, [profileData, setValue])

    console.log(formState.errors.date_of_birth)

    const onSubmit = handleSubmit(async (data) => {
        try {
            if (formState.errors.date_of_birth) {
                return
            }
            let avatarName = profileData?.avatar
            if (avatarFile) {
                const form = new FormData()
                form.append('image', avatarFile)
                const avatarRes = await uploadAvatarMutation.mutateAsync(form)
                avatarName = avatarRes.data.data
                setValue('avatar', avatarName)
            }
            await updateProfileMutation.mutateAsync({
                ...data,
                date_of_birth: data.date_of_birth?.toISOString(),
                address: data.address ? data.address : undefined
            })
        } catch (error) {
            if (isAxiosUnprocessaleEntityError<ErrorResponse<FormError>>(error)) {
                const formError = error.response?.data.data
                if (!formError) {
                    return
                }
                for (const i in formError) {
                    setError(i as keyof FormError, {
                        message: formError[i as keyof FormError]
                    })
                }
            }
        }
    })

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
        setAvatar(avatarImg)
    }

    return (
        <div className='bg-white shadow-sm px-8 rounded min-h-full'>
            <div className='py-[15px] border-gray-200 border-b-[1px] h-[81px]'>
                <h6 className='font-semibold text-lg capitalize'>Hồ sơ của tôi</h6>
                <p>Quản lý thông tin để bảo mật tài khoản</p>
            </div>
            {/* Form input profile data */}
            <form className='grid grid-cols-12 py-8' onSubmit={onSubmit}>
                {/* Common info */}
                <div className='flex flex-col gap-y-8 col-span-8 px-10 border-gray-200 border-r-[1px]'>
                    <div className='items-center gap-x-5 grid grid-cols-12'>
                        <div className='col-span-4 text-gray-600 text-right'>Tên đăng nhập</div>
                        <div className='col-span-8'>
                            <Input name='name' register={register} errorMsg={formState.errors.name?.message} />
                        </div>
                    </div>
                    <div className='items-center gap-x-5 grid grid-cols-12'>
                        <div className='col-span-4 text-gray-600 text-right'>Email</div>
                        <div className='col-span-8'>{profileUtil.hiddenEmail(profileData?.email)}</div>
                    </div>
                    <div className='items-center gap-x-5 grid grid-cols-12'>
                        <div className='col-span-4 text-gray-600 text-right'>Số điện thoại</div>
                        <div className='col-span-8'>
                            <Input name='phone' register={register} errorMsg={formState.errors.phone?.message} />
                        </div>
                    </div>
                    <div className='items-center gap-x-5 grid grid-cols-12'>
                        <div className='col-span-4 text-gray-600 text-right'>Địa chỉ</div>
                        <div className='col-span-8'>
                            <Input name='address' register={register} errorMsg={formState.errors.address?.message} />
                        </div>
                    </div>
                    <Controller
                        name='date_of_birth'
                        control={control}
                        render={({ field }) => (
                            <DateSelect
                                name='date_of_birth'
                                errorMessage={formState.errors.date_of_birth?.message}
                                onChange={field.onChange}
                                setError={setError}
                                clearError={clearErrors}
                                value={field.value ?? DEFAULT_DOB}
                            />
                        )}
                    />
                </div>
                {/* Avatar */}
                <div className='col-span-4'>
                    <div className='mx-auto w-fit'>
                        <div
                            style={{ ...(previewAvatar ? { backgroundImage: `url(${previewAvatar})` } : {}) }}
                            className='relative bg-gray-100 bg-cover bg-no-repeat bg-center mx-auto rounded-full size-[100px]'
                        >
                            {!previewAvatar && (
                                <svg
                                    enableBackground='new 0 0 15 15'
                                    viewBox='0 0 15 15'
                                    x='0'
                                    y='0'
                                    className='inline-block top-1/2 left-1/2 absolute inset-0 stroke-slate-200 size-[50px] -translate-x-1/2 -translate-y-1/2'
                                >
                                    <g>
                                        <circle cx='7.5' cy='4.5' fill='none' r='3.8' strokeMiterlimit='10'></circle>
                                        <path
                                            d='m1.5 14.2c0-3.3 2.7-6 6-6s6 2.7 6 6'
                                            fill='none'
                                            strokeLinecap='round'
                                            strokeMiterlimit='10'
                                        ></path>
                                    </g>
                                </svg>
                            )}
                        </div>
                        <input
                            onChange={onChangeAvatar}
                            id='upload_avatar'
                            className='hidden'
                            type='file'
                            accept='.jpg,.jpeg,.png'
                        />
                        <label
                            htmlFor='upload_avatar'
                            className='block hover:bg-gray-50 mx-auto my-4 px-4 py-2 border-[1px] border-gray-200 rounded w-fit capitalize cursor-pointer'
                        >
                            Chọn ảnh
                        </label>
                        <p className='text-gray-500'>Dụng lượng file tối đa 1 MB</p>
                        <p className='text-gray-500'>Định dạng: .JPEG, .PNG</p>
                    </div>
                </div>
                {/* Button submit */}
                <div className='col-start-5 mt-8 col-auto'>
                    <Button
                        children='Lưu'
                        isLoading={updateProfileMutation.isPending}
                        disabled={updateProfileMutation.isPending}
                        type='submit'
                        className='px-6 py-2.5 rounded'
                    />
                </div>
            </form>
        </div>
    )
}

export default Profile
