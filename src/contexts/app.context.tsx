import React, { createContext, Dispatch, SetStateAction, useState } from 'react'
import authUtil from '~/utils/authUtil'

interface IAppContext {
    isAuthenticated: boolean,
    setAuthenticated: Dispatch<SetStateAction<boolean>>
}

const initValueAppContext: IAppContext = {
    isAuthenticated: Boolean(authUtil.getAccessToken()),
    setAuthenticated: () => {}
}

export const AppContext = createContext<IAppContext>(initValueAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setAuthenticated] = useState<boolean>(initValueAppContext.isAuthenticated)

    return <AppContext.Provider value={{ isAuthenticated, setAuthenticated }}>{children}</AppContext.Provider>
}