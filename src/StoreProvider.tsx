import React from 'react'

import { IUser, IWallet, ITransaction } from './types'

const initData = {
  user: null,
  wallet: null,
  transactions: [],
  actions: {
    setUser: () => null,
    setTransactions: () => null,
    setWallet: () => null,
  },
}

export const StoreContext = React.createContext<{
  user: IUser | null
  wallet: IWallet | null
  transactions: ITransaction[]
  actions: {
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
    setWallet: React.Dispatch<React.SetStateAction<IWallet | null>>
    setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>
  }
}>(initData)

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<IUser | null>(null)
  const [wallet, setWallet] = React.useState<IWallet | null>(null)
  const [transactions, setTransactions] = React.useState<ITransaction[]>([])

  const actions = {
    setUser,
    setWallet,
    setTransactions,
  }

  return (
    <StoreContext.Provider value={{ user, wallet, transactions, actions }}>
      {children}
    </StoreContext.Provider>
  )
}
