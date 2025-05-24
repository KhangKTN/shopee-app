import { useMutation } from '@tanstack/react-query'
import cx from 'classix'
import { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import authApi from '~/apis/auth.api'
import Popover from '~/components/Popover'
import { appHeight } from '~/constant/app'
import path from '~/constant/path'
import { PurchaseStatus } from '~/constant/purchase'
import { AppContext } from '~/contexts/app.context'
import { queryClient } from '~/main'

const popoverItemClass = 'py-2 px-3 hover:text-primary hover:bg-slate-100 w-full text-left'

const NavHeader = ({ isChildren }: { isChildren?: boolean }) => {
    const location = useLocation()
    const { isAuthenticated, setAuthenticated, profile, setProfile } = useContext(AppContext)

    const logoutMutation = useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            setAuthenticated(false)
            setProfile(null)
            queryClient.removeQueries({ queryKey: ['purchases', PurchaseStatus.CART] })
        }
    })

    const handleLogout = () => {
        logoutMutation.mutate()
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
                    <Link to=''>Kênh người bán</Link>
                </div>
                <div>
                    <Link to=''>Tải ứng dụng</Link>
                </div>
                <div>
                    <Link to=''>Kết nối</Link>
                </div>
            </div>
            <div className='flex items-center gap-x-3'>
                <div className='flex items-center gap-x-1'>
                    <i className='text-lg fa-regular fa-bell'></i>
                    <span>Thông báo</span>
                </div>
                <div className='flex items-center gap-x-1'>
                    <i className='text-lg fa-solid fa-circle-info'></i>
                    <span>Hỗ trợ</span>
                </div>
                {/* Choose language */}
                <Popover
                    position='bottom-start'
                    popover={
                        <div className='w-[200px]'>
                            <button className={popoverItemClass}>Tiếng Việt</button>
                            <button className={popoverItemClass}>English</button>
                        </div>
                    }
                >
                    <i className='text-lg fa-solid fa-globe'></i>
                    <span>Tiếng Việt</span>
                    <i className='fa-solid fa-angle-down'></i>
                </Popover>
                {/* Account option */}
                {isAuthenticated ? (
                    <Popover
                        popover={
                            <div className='flex flex-col w-[150px]'>
                                <Link to='/profile' className={popoverItemClass}>
                                    Tài khoản của tôi
                                </Link>
                                <Link to='' type='button' className={popoverItemClass}>
                                    Đơn hàng
                                </Link>
                                {isAuthenticated && (
                                    <button onClick={handleLogout} className={popoverItemClass}>
                                        Đăng xuất
                                    </button>
                                )}
                            </div>
                        }
                    >
                        <i className='text-lg fa-solid fa-circle-user'></i>
                        <span>{profile?.email}</span>
                    </Popover>
                ) : (
                    <div className='flex items-center gap-x-3 font-semibold'>
                        <Link className='hover:text-white/80 capitalize' to='/register'>
                            Đăng ký
                        </Link>
                        <div className='border-white/40 border-r-[1px] h-3'></div>
                        <Link
                            className='hover:text-white/80 capitalize'
                            to={`${path.LOGIN}?return_uri=${location.pathname}`}
                        >
                            Đăng nhập
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NavHeader
