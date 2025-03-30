import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import authUtil from '~/utils/authUtil'

interface IAppContext {
    isAuthenticated: boolean
    setAuthenticated: Dispatch<SetStateAction<boolean>>
    profile: User | null
    setProfile: Dispatch<SetStateAction<User | null>>
}

const initValueAppContext: IAppContext = {
    isAuthenticated: Boolean(authUtil.getAccessToken()),
    setAuthenticated: () => {},
    profile: authUtil.getProfile(),
    setProfile: () => {}
}

export const AppContext = createContext<IAppContext>(initValueAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(initValueAppContext.isAuthenticated)
    const [profile, setProfile] = useState<User | null>(initValueAppContext.profile)

    return (
        <AppContext.Provider value={{ isAuthenticated, setAuthenticated, profile, setProfile }}>
            {children}
        </AppContext.Provider>
    )
}
