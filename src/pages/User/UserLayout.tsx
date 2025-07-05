import cx from 'classix'
import { Link, NavLink, Outlet } from 'react-router-dom'
import Avatar from '~/components/Avatar'
import path from '~/constant/path'

const navLinks: { link: string; name: string }[] = [
    { link: path.PROFILE, name: 'Hồ sơ' },
    { link: path.HISTORY_PURCHASES, name: 'Đơn mua' },
    { link: path.CHANGE_PASSWORD, name: 'Đổi mật khẩu' }
]

const UserLayout = () => {
    return (
        <div className='bg-neutral-100 py-10 h-full'>
            <div className='mx-auto px-10 h-full container'>
                <div className='gap-x-8 grid grid-cols-12 h-full'>
                    <div className='flex flex-col gap-y-4 col-span-2'>
                        <div className='flex items-center gap-x-4 py-4 border-gray-200 border-b-[1px]'>
                            <Avatar sizeClass='size-12' />
                            <div>
                                <p className='font-bold'>khangktn</p>
                                <Link to={path.PROFILE} className='font-medium text-gray-500'>
                                    Sửa hồ sơ
                                </Link>
                            </div>
                        </div>
                        {navLinks.map((navLink) => (
                            <NavLink
                                key={navLink.link}
                                className={({ isActive }) =>
                                    cx(
                                        'px-3 border-l-2 font-medium text-base capitalize',
                                        isActive ? 'border-primary text-primary' : 'border-transparent'
                                    )
                                }
                                to={navLink.link}
                            >
                                {navLink.name}
                            </NavLink>
                        ))}
                    </div>
                    <div className='col-span-10'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLayout
