import axiosConfig from '~/utils/axios'

interface ProfileUpdate extends Omit<User, '_id' | 'roles' | 'createdAt' | 'updatedAt'> {
    password?: string
    new_password?: string
}

const getProfile = () => axiosConfig.get<SuccessReponse<User>>('me')

const updateProfile = (data: ProfileUpdate) => axiosConfig.put<SuccessReponse<User>>('user', data)

const uploadAvatar = (data: FormData) =>
    axiosConfig.post<SuccessReponse<string>>('user/upload-avatar', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

export { getProfile, updateProfile, uploadAvatar }
