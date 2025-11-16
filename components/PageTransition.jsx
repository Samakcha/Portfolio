'use client';

import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation";

const PageTransition = ({ children }) => {
  const pathName = usePathname()
  return (
    <AnimatePresence mode="wait">
      <div key={pathName}>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' }
          }}
          className="h-screen w-screen fixed bg-primary top-0 pointer-events-none"
        />
          { children }
      </div>
    </AnimatePresence>
  )
}

export default PageTransition