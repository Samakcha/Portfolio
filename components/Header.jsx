

import Link from "next/link"
import { Button } from "./ui/button"
import Navbar from "./Navbar"
import MobileNav from "./MobileNav"


const Header = () => {
  return (
    <header className="py-8 lg:py-12 text-white pl-12 pr-9">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={'/'}>
          <h1 className="text-3xl font-semibold">
            Sam<span className="text-green-300">.</span>
          </h1>
        </Link>
        {/* desktop nav */}
        <div className="hidden xl:flex items-center gap-8">
          <Navbar />
          <Link href={'/contact'}>
            <Button className='cursor-pointer'>Hire Me</Button>
          </Link>
        </div>

        {/* mobile nav */}
        <div className="xl:hidden">
          <MobileNav />
        </div>


      </div>
    </header>
  )
}

export default Header