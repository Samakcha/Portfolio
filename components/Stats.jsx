'use client'
import CountUp from "react-countup"

const stats = [
  {
    num: 3,
    text: 'Years of College Experience'
  },
  {
    num: 5,
    text: 'Projects Completed'
  },
  {
    num: "3",
    text: 'More than 3 Programming languages'
  },
]

const Stats = () => {
  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-4 max-w-[80vw] mx-auto xl:max-w-none ">
          {stats.map((item, index) => {
          return (
            <div
              className="flex flex-1 gap-4 items-center justify-center xl:justify-start"
              key={index}>
              <CountUp end={item.num} duration={5} delay={2} className="text-4xl xl:text-6xl font-extrabold"
              />
              <p className={`${
                item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
              } leading-snug text-white/80` }>{ item.text }</p>
            </div>
          )
        })}
        </div>
      </div>
    </section>
  )
}

export default Stats