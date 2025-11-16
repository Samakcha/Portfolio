import Photo from "@/components/Photo"
import Social from "@/components/Social"
import Stats from "@/components/Stats"
import { Button } from "@/components/ui/button"
import {FiDownload} from 'react-icons/fi'
const Home = () => {
  return (
    <section className="h-full">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">

          <div className="text-center xl:text-left order-2 xl:order-0 ">
            <span className="text-xl">Software Developer</span>
            <h1 className="h1 mb-6">
              Hello I'm<br /> <span className="text-green-300">Samakcha Mishra</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              I know to craft elegant neat looking sites and I am proficient in more than one programming language
            </p>
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <Button
                variant='outline'
                size='lg'
                className='uppercase flex items-center gap-2'
              >
                <span className="text-green-300">Download CV</span>
                <FiDownload className="text-xl text-green-300" />
              </Button>
              <div className="mb-8 xl:mb-8">
                <Social
                  containerStyles='flex gap-6'
                  iconStyles='w-9 h-9 border border-green-300 rounded-full flex justify-center items-center text-green-300 text-base hover:bg-green-300 hover:text-primary hover:transtion-all duration-500'
                />
              </div>
            </div>
          </div>
          <div className="order-1 xl:order-0 mb-8 xl:mb-8">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  )
}

export default Home