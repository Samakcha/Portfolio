'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

import { FaPhoneAlt, FaEnvelope, FaMapMarkedAlt } from "react-icons/fa"

import { motion } from "framer-motion"


const info = [
  {
    icon: <FaPhoneAlt />,
    title: 'Phone',
    description: '+91 82710-84776'
  },
  {
    icon: <FaEnvelope />,
    title: 'Email',
    description: 'youremail@gmail.com'
  },
  {
    icon: <FaMapMarkedAlt />,
    title: 'Address',
    description: '8/B, 1st main, sparkling smilz dental care, 11th block, BSK 6th stage'
  },
]

const Contact = () => {
  return (
    <motion.section
      initial={{ opacity: 1 }}
      animate={{
        opacity: 1, 
      transition: { delay: 1, duration: 0.4, ease: 'easeIn'}
      }}
      className="py-6"
    >
      <div className="container mx-auto p-2">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          <div className="xl:h-[54%] order-2 xl:order-0">
            <form className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl ">
              <h3 className="text-4xl text-green-300">Let's work together</h3>
              <p className="text-white/60">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ratione, dolore.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input className='' type='firstname' placeholder='Firstname'/>
                <Input className='' type='lastname' placeholder='Lastname'/>
                <Input className='' type='email' placeholder='Email'/>
                <Input className='' type='phone' placeholder='Phone'/>
              </div>
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select a service' className=''/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a service</SelectLabel>
                    <SelectItem value='est'>Web Development</SelectItem>
                    <SelectItem value='cst'>BlockChain</SelectItem>
                    <SelectItem value='mst'>Blender 3D</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Textarea className='h-[200px]' placeholder='Type your message here.' />
              <Button className='max-w-40' size='md'>Send Message</Button>
            </form>
          </div>
          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-0 mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => {
                return (
                  <li
                    className="flex items-center gap-6"
                    key={index}>
                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:[72px] bg-[#27272c] text-green-300 rounded-md flex justify-center items-center">
                      <div className="text-[28px]">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60">{item.title}</p>
                      <h3 className="text-xl">{item.description}</h3>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact
