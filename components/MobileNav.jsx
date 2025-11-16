'use client'

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { CiMenuFries } from 'react-icons/ci'

const links = [
  {
    name: 'home',
    path: '/'
  },
  {
    name: 'services',
    path: '/services'
  },
  {
    name: 'resume',
    path: '/resume'
  },
  {
    name: 'work',
    path: '/work'
  },
  {
    name: 'contact',
    path: '/contact'
  }
]

const MobileNav = () => {
  const pathName = usePathname()

  return (
    <Sheet>
      <SheetTrigger className='flex justify-center items-center'>
        <CiMenuFries className='text-[32px] text-green-300 cursor-pointer' />
      </SheetTrigger>

      {/* <SheetContent className='flex flex-col'>
        <div>logo</div>
      </SheetContent> */}


      <SheetContent className='flex flex-col'>
        <SheetHeader>
          <SheetTitle>
            <div className='text-white mt-32 mb-40 text-center text-2xl'>
              <Link href={'/'}>
                <h1 className='text-4xl font-semibold'>
                  Sam
                  <span className='text-green-300'>.</span>
                </h1>
              </Link>
            </div>
            <nav className='text-white flex flex-col justify-center items-center gap-8'>
              {links.map((link, index) => {
                return (
                  <Link href={link.path} key={index}
                    className={`${
                      link.path === pathName && 
                      "text-green-300 border-b-3 border-green-300"
                    }
                      text-xl capitalize hover:text-green-300 transition-all`}>
                    {link.name}
                  </Link>
                )
              })}
            </nav>
          </SheetTitle>
        </SheetHeader>
      </SheetContent>

    </Sheet>
  )
}

export default MobileNav