import { useState } from 'react'
import { useLocation } from 'react-router'
import { cn } from '@/lib/utils'
import { ChevronRightIcon } from 'lucide-react'

import Logo from '@/assets/mainstack-logo.svg?react'
import NotificationIcon from '@/assets/notifications.svg?react'
import ChatIcon from '@/assets/chat.svg?react'
import HamMenu from '@/assets/menu.svg?react'
import AppsIcon from '@/assets/apps.svg?react'
import AnalyticsIcon from '@/assets/analytics.svg?react'
import CRMIcon from '@/assets/crm.svg?react'
import HomeIcon from '@/assets/home.svg?react'
import ServicesIcon from '@/assets/services.svg?react'

import ProductIcon from '@/assets/product.svg?react'
import FilesIcon from '@/assets/files.svg?react'
import VecIcon from '@/assets/vec.svg?react'
import FoldIcon from '@/assets/fold.svg?react'
import ChevroDownIcon from '@/assets/chevro-down.svg?react'
import CogIcon from '@/assets/cog.svg?react'
import ReceiptIcon from '@/assets/receipt-icon.svg?react'
import SignOutIcon from '@/assets/sign-out.svg?react'
import SwitchUserIcon from '@/assets/switch-user.svg?react'
import GiftIcon from '@/assets/gift-icon.svg?react'
import { IUser } from '@/types'

const navItems = [
  {
    name: 'Home',
    path: '/home',
    icon: <HomeIcon />,
  },
  { name: 'Analytics', path: '/about', icon: <AnalyticsIcon /> },
  { name: 'Revenue', path: '/', icon: <ServicesIcon /> },
  { name: 'CRM', path: '/contact', icon: <CRMIcon /> },
]

const menuItems = [
  {
    name: 'Settings',
    path: '/settings',
    icon: <CogIcon className='"h-[14px] w-[14px]' />,
  },
  {
    name: 'Purchase History',
    path: '/purchase-history',
    icon: <ReceiptIcon />,
  },
  { name: 'Refer and Earn', path: '/refer-and-earn', icon: <GiftIcon /> },
  { name: 'Integrations', path: '/integrations', icon: <AppsIcon /> },
  { name: 'Report Bug', path: '/report', icon: <GiftIcon /> },
  { name: 'Switch Account', path: '/switch', icon: <SwitchUserIcon /> },
  { name: 'Sign Out', path: '/signout', icon: <SignOutIcon /> },
]

const appExpanded = [
  {
    name: 'Link in Bio',
    icon: <ProductIcon />,
    desc: 'Manage your link in bio',
  },
  {
    name: 'Store',
    icon: <FilesIcon />,
    desc: 'Manage your store activities',
  },
  {
    name: 'Media Kit',
    icon: <FoldIcon />,
    desc: 'Manage your media kit',
  },
  {
    name: 'Invoicing',
    icon: <VecIcon />,
    desc: 'Manage your invoices',
  },
  {
    name: 'Bookings',
    icon: <ProductIcon />,
    desc: 'Manage your bookings',
  },
]

const Nav = ({ user }: { user: IUser | null }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isExpandApp, setIsExpandApp] = useState<boolean>(false)
  const location = useLocation()

  const handleMenuToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <nav className="bg-white fixed top-[12px] w-full px-4 z-[39]">
        <div className="flex justify-between shadow-md items-center gap-x-2 w-[95%] h-[64px] mx-auto rounded-full bg-white p-2">
          <div className="ml-3">
            <Logo />
          </div>
          <div className="flex gap-x-4">
            {navItems.map((item) => (
              <span
                className={cn(
                  'flex items-center cursor-pointer text-[#56616B] px-4 py-2 hover:bg-[#DBDEE5] duration-700 hover:rounded-full font-semibold text-[16px]',
                  location.pathname === item.path &&
                    'bg-[#131316] text-white rounded-full'
                )}
              >
                <span className="mr-2">{item.icon}</span>
                <span className="">{item.name}</span>
              </span>
            ))}
            <div
              className="inline cursor-pointer relative"
              onClick={() => setIsExpandApp(!isExpandApp)}
            >
              {!isExpandApp && (
                <span
                  className={cn(
                    'flex items-center cursor-pointer text-[#56616B] px-4 py-2 hover:bg-[#DBDEE5] duration-700 hover:rounded-full font-semibold text-[16px]'
                  )}
                >
                  <span className="mr-2">
                    <AppsIcon fill="#56616B" />
                  </span>
                  <span className="">Apps</span>
                </span>
              )}

              {isExpandApp && (
                <div
                  className={cn(
                    'flex relative cursor-pointer text-[#56616B] px-4 h-full bg-[#131316] duration-700 rounded-full font-semibold text-[16px]'
                  )}
                >
                  <div className="flex items-center border-r border-[#393939] pr-5">
                    <span className="mr-2">
                      <AppsIcon fill="white" />
                    </span>
                    <span className="text-white">Apps</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">
                      <AppsIcon />
                    </span>
                    <span className="inline text-white">
                      Link in Bio
                      <ChevroDownIcon className="ml-3 inline" fill={'white'} />
                    </span>
                  </div>
                  <div
                    className={cn(
                      'fixed my-3 top-[70px] h-[455px] rounded-2xl w-[370px] z-[999] bg-white shadow-lg transition-transform duration-300 ease-in-out pt-7 px-2',
                      isExpandApp ? 'block' : 'hidden'
                    )}
                  >
                    <div className="menu--items flex flex-col gap-y-2">
                      {appExpanded.map((item) => (
                        <div className="cursor-pointer group flex items-center text-[#56616B] border-[transparent] border px-2 py-3 hover:shadow-sm  hover:border-[#ced4daa5] hover:rounded-2xl font-medium text-[14px]">
                          <div className="icon h-[50px] flex items-center justify-center mr-5 w-[50px] rounded border border-[#ced4da6c]">
                            {item.icon}
                          </div>
                          <div className="text flex justify-between w-full items-center ">
                            <div>
                              <div className="text-[#131316] text-[14px]">
                                {item.name}
                              </div>
                              <p className="font-normal text-[12px] text-[#56616B]">
                                {item.desc}
                              </p>
                            </div>
                            <div className="group-hover:block hidden">
                              <ChevronRightIcon size={14} />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-x-7 items-center">
            <div className="cursor-pointer">
              <NotificationIcon />
            </div>
            <div className="cursor-pointer">
              <ChatIcon />
            </div>
            <div
              className="cursor-pointer bg-[#EFF1F6] rounded-full py-[5px] px-[5px] gap-x-3 flex items-center justify-center"
              onClick={handleMenuToggle}
            >
              <div className="user rounded-full h-[32px] w-[32px] capitalize bg-linear-[140deg] from-[#5C6670] from-[2.33%] to-[#131316] to-[96.28%] items-center justify-center text-white flex">
                {user?.first_name.charAt(0)}
                {user?.last_name.charAt(0)}
              </div>
              <span className="mr-3">
                <HamMenu />
              </span>
            </div>
          </div>
        </div>

        {/* Menu */}
        {isOpen && (
          <div className="fixed my-3 right-[60px] h-[465px] rounded-2xl w-[330px] z-[999] bg-white shadow-lg transition-transform duration-300 ease-in-out pt-7 px-7">
            <div className="user--card flex gap-x-3 items-center mb-4">
              <div className="user rounded-full h-[32px] w-[32px] capitalize bg-linear-[140deg] from-[#5C6670] from-[2.33%] to-[#131316] to-[96.28%] items-center justify-center text-white flex">
                {user?.first_name.charAt(0)}
                {user?.last_name.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-[16px]">
                  {user?.first_name} {user?.last_name}
                </div>
                <small className="text-[#56616B]">{user?.email}</small>
              </div>
            </div>
            <div className="menu--items flex flex-col gap-y-2">
              {menuItems.map((item) => (
                <div className="cursor-pointer flex items-center text-[#56616B] px-2 py-3 hover:bg-[#DBDEE5] hover:rounded-xl font-medium text-[14px]">
                  <div className="h-[14px] w-[14px]">{item.icon}</div>
                  <span className="ml-4">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
export default Nav
