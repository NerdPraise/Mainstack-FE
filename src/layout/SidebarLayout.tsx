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
        <div className="fixed flex flex-col gap-y-5 top-[34%] left-[20px] px-2 py-4 shadow-xl rounded-full">
          <div className="grayscale hover:grayscale-0 cursor-pointer hover:rounded-full hover:bg-[#e9ecef] px-1 py-1">
            <div className="relative group">
              <ProductIcon />
              <div className="absolute left-[45px] bottom-[-10px] w-[80px] transform  mb-2 hidden group-hover:block bg-[#131316] text-white text-sm rounded py-1 px-2 z-10">
                Link in Bio
              </div>
            </div>
          </div>
          <div className="grayscale hover:grayscale-0 cursor-pointer hover:rounded-full hover:bg-[#e9ecef] px-1 py-1">
            <div className="relative group">
              <VecIcon />
              <div className="absolute left-[45px] bottom-[-10px] w-[80px] transform  mb-2 hidden group-hover:block bg-[#131316] text-white text-sm rounded py-1 px-2 z-10">
                Store
              </div>
            </div>
          </div>
          <div className="grayscale hover:grayscale-0 cursor-pointer hover:rounded-full hover:bg-[#e9ecef] px-1 py-1">
            <div className="relative group">
              <FilesIcon />
              <div className="absolute left-[45px] bottom-[-10px] w-[80px] transform  mb-2 hidden group-hover:block bg-[#131316] text-white text-sm rounded py-1 px-2 z-10">
                Media Kit
              </div>
            </div>
          </div>
          <div className="grayscale hover:grayscale-0 cursor-pointer hover:rounded-full hover:bg-[#e9ecef] px-1 py-1">
            <div className="relative group">
              <FoldIcon />
              <div className="absolute left-[45px] bottom-[-10px] w-[80px] transform  mb-2 hidden group-hover:block bg-[#131316] text-white text-sm rounded py-1 px-2 z-10">
                Invoicing
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DashboardLayout
