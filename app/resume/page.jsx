'use client'

import { FaHtml5, FaCss3, FaJs, FaReact, FaNodeJs } from 'react-icons/fa'
import { SiTailwindcss, SiNextdotjs } from 'react-icons/si'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ScrollArea } from '@/components/ui/scroll-area'
import { motion } from 'framer-motion'


//about me part
const about = {
  title: 'My Profile',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, at?',
  info: [
    {
      fieldName: 'Name',
      fieldValue: 'Samakcha Mishra'
    },
    {
      fieldName: 'Phone',
      fieldValue: '+91 82710-84776'
    },
    {
      fieldName: 'Work Experience',
      fieldValue: 'None'
    },
    {
      fieldName: 'Freelance',
      fieldValue: 'Available'
    },
    {
      fieldName: 'Languages',
      fieldValue: 'English, Hindi'
    },
    {
      fieldName: 'Email',
      fieldValue: 'samakchakrmishra03@gmail.com'
    },
  ]
}

//education data
const education = {
  icon: '/assets/resume/icons/cap.svg',
  title: 'My Education',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, repellat.',
  items: [
    {
      institution: 'Rajendra Vidyalaya',
      degree: 'ISC',
      duration: '2007-2023'
    },
    {
      institution: 'JSSATE-B',
      degree: 'BE in Electronics and Communication Electronics',
      duration: '2023-Current'
    }
  ]
}

//skills
const skills = {
  title: 'My skills',
  description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis, eius!',
  skillList: [
    {
      icon: <FaHtml5 />,
      name: 'HTML'
    },
    {
      icon: <FaCss3 />,
      name: 'CSS'
    },
    {
      icon: <FaJs />,
      name: 'Javascript'
    },
    {
      icon: <FaReact />,
      name: 'ReactJs'
    },
    {
      icon: <SiNextdotjs />,
      name: 'NextJs'
    },
    { 
      icon: <SiTailwindcss />,
      name: 'TailwindCss'
    },
    {
      icon: <FaNodeJs />,
      name: 'NodeJs'
    }
  ]
}



const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: 1,
        transition: { delay: 1, duration: 0.4, ease: 'easeInOut' }
      }}
      className='min-h-[80vh] flex items-center justify-center py-12 xl:py-0'
    >
      <div className="container mx-auto">
        <Tabs defaultValue = 'about' className=' flex flex-col xl:flex-row gap-[60px]'>

          <TabsList className='flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6'>
            <TabsTrigger value='about'>About Me</TabsTrigger>
            <TabsTrigger value='education'>Education</TabsTrigger>
            <TabsTrigger value='skills'>Skills</TabsTrigger>
          </TabsList>

          {/* content */}
          <div className='min-h-[70vh] w-full'>
            <TabsContent value='about' className='w-full text-center xl:text-left'>
              <div className='flex flex-col gap-[30px]'>
                <h3 className='text-4xl font-bold'>
                  {about.title}
                </h3>
                <p className='max-w-[600px] text-white/60 mx-auto xl:mx-0'>
                  {about.description}
                </p>
                <ul className='grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0'>
                  {about.info.map((item, index) => {
                    return (
                      <li
                        className='flex items-center justify-center xl:justify-start gap-4'
                        key={index}
                      >
                        <span className='text-white/60'>{item.fieldName}</span>
                        <span className='text-xl'>{item.fieldValue}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value='education' className='w-full'>
              <div className='flex flex-col gap-[30px] text-center xl:text-left'>
                <h3 className='text-4xl font-bold'>{ education.title }</h3>
                <p className='max-w-[600px] text-white/60 mx-auto xl:mx-0'>
                  {education.description}
                </p>
                <ScrollArea className='h-[400px]'>
                  <ul className='grid grid-cols-1 lg:grid-cols-2 gap-[30px] p-3'>
                    {education.items.map((item, index) => { 
                      return (
                        <li
                          className='bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1'
                          key={index}>
                          <span>{item.institution}</span>
                          <h3>{item.degree}</h3>
                          <div className='flex items-center gap-3'>
                            <span className='w-1.5 h-1.5 rounded-full bg-green-300'></span>
                            <p className='text-white/60'>{item.duration}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value='skills' className='w-full h-full'>
              <div className='flex flex-col gap-[30px]'>
                <div className='flex flex-col gap-[30px] text-center xl:text-left'>
                  <h3 className='text-4xl font-bold'>{skills.title}</h3>
                  <h3 className='max-w-[600px] text-white/60 mx-auto xl:mx-0'>
                    {skills.description}
                  </h3>
                </div>
                <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-5 gap-4 p-2'>
                  {skills.skillList.map((skill, index) => {
                    return (
                      <li key={index}>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className='w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group'>
                              <div className='text-6xl hover:text-green-300 transition-all duration-300'>
                                {skill.icon}
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{skill.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </li>
                   )
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  )
}

export default Resume