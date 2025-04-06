import { useContext, useEffect } from 'react'

import Nav from '@/components/Nav'
import { getObject } from '@/lib/utils'
import { StoreContext } from '@/StoreProvider'

import ProductIcon from '@/assets/product.svg?react'
import FilesIcon from '@/assets/files.svg?react'
import VecIcon from '@/assets/vec.svg?react'
import FoldIcon from '@/assets/fold.svg?react'
import { IUser } from '@/types'

interface DashboardLayoutProps {
  children: React.ReactNode
}
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const {
    user,
    actions: { setUser },
  } = useContext(StoreContext)

  useEffect(() => {
    getObject('user', (data) => setUser(data as IUser))
  }, [])

  return (
    <div>
      <Nav user={user} />
      <div className="relative">
        {children}
        <div className="fixed flex flex-col gap-y-7 top-[34%] left-[20px] px-3 py-4 shadow-xl rounded-full">
          <div className="grayscale hover:grayscale-0 cursor-pointer">
            <ProductIcon />
          </div>
          <div className="grayscale hover:grayscale-0 cursor-pointer">
            <VecIcon />
          </div>
          <div className="grayscale hover:grayscale-0 cursor-pointer">
            <FilesIcon />
          </div>
          <div className="grayscale hover:grayscale-0 cursor-pointer">
            <FoldIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
export default DashboardLayout
