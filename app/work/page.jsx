'use client'

import { motion } from "framer-motion" 
import React, { useState } from "react"

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import { BsArrowUpRight, BsGithub } from "react-icons/bs"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import Link from "next/link"
import Image from "next/image"
import SliderBtn from "@/components/SliderBtn"

const projects = [
  {
    num: '01',
    category: 'MERN Stack',
    title: 'Project 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, nulla.',
    stack: [
      { name: 'React' },
      { name: 'TailwindCss' },
      { name: 'Javascript' },
      { name: 'Express' },
      { name: 'MongoDB'}
    ],
    image: '/assets/work/thumb1.png',
    live: '',
    github: ''
  },
  {
    num: '02',
    category: 'MERN Stack',
    title: 'Project 2',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, nulla.',
    stack: [
      { name: 'React' },
      { name: 'TailwindCss' },
      { name: 'Javascript' },
      { name: 'Express' },
      { name: 'MongoDB'}
    ],
    image: '/assets/work/thumb2.png',
    live: '',
    github: ''
  },
]



const Work = () => {
  
  const [project, setProject] = useState(projects[0])

  const handleSlideChange = (swiper) => {

    const currentIndex = swiper.activeIndex

    setProject(projects[currentIndex])
  }


  return (
    <motion.section
      initial={{ opacity: 1 }}
      animate={{
        opacity: 1,
        transition: {
          delay: 1,
          duration: 0.4,
          ease: 'easeInOut'
        }
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-0">
            <div className="flex flex-col gap-[30px]">
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>
              <h2 className="text-[42px] font-bold leading-none text-white hover:text-green-300 transition-all duration-500 capitalize">
                {project.category}
              </h2>
              <p className="text-white/60">{project.description}</p>
              <ul className="flex gap-4">
                {project.stack.map((item, index) => {
                  return (
                    <li
                      className="text-md text-green-300 pt-2"
                      key={index}>
                      {item.name}
                      {index !== project.stack.length - 1 && ","}
                    </li>
                  )
                })}
              </ul>
              <div className="border border-white/20"></div>
              <div className="flex items-center gap-4 pt-2">
                <Link href={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className='w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group'>
                        <BsArrowUpRight className="text-white text-2xl group-hover:text-green-300"/>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live Project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>

                <Link href={project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className='w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group'>
                        <BsGithub className="text-white text-2xl group-hover:text-green-300" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github repo</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image}
                          fill
                          alt=""
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
              <SliderBtn containerStyles='flex gap-2 absolute right-0 bottom-[calc(50%_-22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none'
              btnStyles='bg-green-300 hover:bg-green-200 p-4 text-primary text-[22px] w-[44px] flex justify-center items-center transition-all'/>
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Work