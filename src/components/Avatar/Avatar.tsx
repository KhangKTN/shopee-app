import cx from 'classix'
import { useContext, useMemo } from 'react'
import { AppContext } from '~/contexts/app.context'
import profileUtil from '~/utils/profileUtil'

const Avatar = ({ sizeClass = 'size-5' }: { sizeClass?: string }) => {
    const { profile } = useContext(AppContext)

    const avatar = useMemo(() => {
        return profileUtil.getAvatarUrl(profile?.avatar)
    }, [profile])

    return (
        <div
            style={{ ...(avatar ? { backgroundImage: `url(${avatar})` } : {}) }}
            className={cx('flex items-center bg-cover bg-no-repeat bg-center rounded-full', sizeClass)}
        >
            {!avatar && <i className='w-full text-lg fa-solid fa-circle-user'></i>}
        </div>
    )
}

export default Avatar
