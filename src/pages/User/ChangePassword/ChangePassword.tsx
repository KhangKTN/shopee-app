import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import userApi from '~/apis/user.api'
import Button from '~/components/Button'
import Input from '~/components/Input'
import { isAxiosUnprocessaleEntityError } from '~/utils/helper'
import { userSchema } from '~/utils/validateField'

const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])
type FormData = yup.InferType<typeof passwordSchema>
type FormError = {
    [key in keyof FormData]: string
}

const initForm: FormData = {
    password: '',
    new_password: '',
    confirm_password: ''
}

const ChangePassword = () => {
    const { register, handleSubmit, formState, setError, reset } = useForm<FormData>({
        defaultValues: initForm,
        resolver: yupResolver(passwordSchema)
    })

    const updatePasswordMutation = useMutation({
        mutationFn: userApi.updateProfile,
        onSuccess: () => {
            toast.success('Cập nhật thông tin thành công!')
            reset(initForm)
        }
    })

    const onSubmit = handleSubmit(async (data) => {
        try {
            await updatePasswordMutation.mutateAsync(omit(data, ['confirm_password']))
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

    return (
        <div className='bg-white shadow-sm px-8 rounded min-h-full'>
            <div className='py-[15px] border-gray-200 border-b-[1px] h-[81px]'>
                <h6 className='font-semibold text-lg capitalize'>Đổi mật khẩu</h6>
                <p>Thay đổi mật khẩu của bạn</p>
            </div>
            {/* Form change password */}
            <form className='grid grid-cols-12 py-8' onSubmit={onSubmit}>
                <div className='col-span-6'>
                    <div>
                        <label>Mật khẩu hiện tại</label>
                        <Input
                            name='password'
                            register={register}
                            errorMsg={formState.errors.password?.message}
                            classNameDiv='mt-1'
                        />
                    </div>
                    <div className='mt-6'>
                        <label>Mật khẩu mới</label>
                        <Input
                            name='new_password'
                            register={register}
                            errorMsg={formState.errors.new_password?.message}
                            classNameDiv='mt-1'
                        />
                    </div>
                    <div className='mt-6'>
                        <label>Nhập lại mật khẩu mới</label>
                        <Input
                            name='confirm_password'
                            register={register}
                            errorMsg={formState.errors.confirm_password?.message}
                            classNameDiv='mt-1'
                        />
                    </div>
                </div>
                {/* Button submit */}
                <div className='col-start-5 mt-8 col-auto'>
                    <Button
                        children='Lưu'
                        // isLoading={updateProfileMutation.isPending}
                        // disabled={updateProfileMutation.isPending}
                        type='submit'
                        className='px-6 py-2.5 rounded'
                    />
                </div>
            </form>
        </div>
    )
}

export default ChangePassword
