import { useMutation, useQueryClient } from '@tanstack/react-query'
import cx from 'classix'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import authApi from '~/apis/auth.api'
import Avatar from '~/components/Avatar'
import Popover from '~/components/Popover'
import { appHeight } from '~/constant/app'
import path from '~/constant/path'
import { PurchaseStatus } from '~/constant/purchase'
import { AppContext } from '~/contexts/app.context'
import { locales } from '~/i18n'

const popoverItemClass = 'py-2 px-3 hover:text-primary hover:bg-slate-100 w-full text-left'

type Language = keyof typeof locales

const NavHeader = ({ isChildren }: { isChildren?: boolean }) => {
    const location = useLocation()
    const queryClient = useQueryClient()
    const { i18n, t } = useTranslation()
    const { isAuthenticated, profile } = useContext(AppContext)

    const logoutMutation = useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['purchases', PurchaseStatus.CART] })
        }
    })

    const handleLogout = () => {
        logoutMutation.mutate()
    }

    const handleChangeLanguage = (language: Language) => {
        i18n.changeLanguage(language)
    }

    return (
        <div
            style={{ height: appHeight.navHeader }}
            className={cx(
                'flex justify-between items-center text-white',
                isChildren ? '' : 'px-[120px] bg-gradient-to-bl from-[#f53d2d] to-[#f63]'
            )}
        >
            <div className='flex gap-x-3'>
                <div>
                    <Link to=''>{t('header.seller_channel')}</Link>
                </div>
                <div>
                    <Link to=''>{t('header.download_app')}</Link>
                </div>
                <div>
                    <Link to=''>{t('header.connect')}</Link>
                </div>
            </div>
            <div className='flex items-center gap-x-3'>
                <div className='flex items-center gap-x-1'>
                    <i className='text-lg fa-regular fa-bell'></i>
                    <span>{t('header.alert')}</span>
                </div>
                <div className='flex items-center gap-x-1'>
                    <i className='text-lg fa-solid fa-circle-info'></i>
                    <span>{t('header.support')}</span>
                </div>
                {/* Choose language */}
                <Popover
                    position='bottom-start'
                    popover={
                        <div className='w-[200px]'>
                            <button onClick={() => handleChangeLanguage('vi')} className={popoverItemClass}>
                                Tiếng Việt
                            </button>
                            <button onClick={() => handleChangeLanguage('en')} className={popoverItemClass}>
                                English
                            </button>
                        </div>
                    }
                >
                    <i className='text-lg fa-solid fa-globe'></i>
                    <span>{locales[i18n.language as Language]}</span>
                    <i className='fa-solid fa-angle-down'></i>
                </Popover>
                {/* Account option */}
                {isAuthenticated ? (
                    <Popover
                        popover={
                            <div className='flex flex-col w-[150px]'>
                                <Link to={path.PROFILE} className={popoverItemClass}>
                                    {t('header.my_acount')}
                                </Link>
                                <Link to={path.HISTORY_PURCHASES} type='button' className={popoverItemClass}>
                                    {t('header.order')}
                                </Link>
                                {isAuthenticated && (
                                    <button onClick={handleLogout} className={popoverItemClass}>
                                        {t('header.logout')}
                                    </button>
                                )}
                            </div>
                        }
                    >
                        <Avatar />
                        <span>{profile?.email}</span>
                    </Popover>
                ) : (
                    <div className='flex items-center gap-x-3 font-semibold'>
                        <Link className='hover:text-white/80 capitalize' to={path.REGISTER}>
                            {t('header.register')}
                        </Link>
                        <div className='border-white/40 border-r-[1px] h-3'></div>
                        <Link
                            className='hover:text-white/80 capitalize'
                            to={`${path.LOGIN}?return_uri=${location.pathname}`}
                        >
                            {t('header.login')}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NavHeader
