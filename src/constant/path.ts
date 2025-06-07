const path = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    LOGOUT: '/logout',
    PRODUCT_DETAIL: '/:productLink',
    CART: '/cart',
    USER: '/user',
    PROFILE: '/user/profile',
    HISTORY_PURCHASES: '/user/purchases',
    CHANGE_PASSWORD: '/user/changePassword'
} as const

export default path
