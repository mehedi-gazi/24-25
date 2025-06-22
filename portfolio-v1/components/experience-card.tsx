"use client"

import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"

interface ExperienceCardProps {
  title: string
  company: string
  period: string
  description: string
  responsibilities: string[]
  index: number
}

export function ExperienceCard({ title, company, period, description, responsibilities, index }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-800 hover:border-purple-500/50 transition-colors"
    >
      <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
        <div className="bg-gray-800 p-2 sm:p-3 rounded-full">
          <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
          <p className="text-gray-400">{company}</p>
        </div>
      </div>

      <div className="mb-2 sm:mb-4">
        <span className="inline-block bg-gray-800 rounded-full px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm text-gray-300">
          {period}
        </span>
      </div>

      <p className="text-gray-300 mb-2 sm:mb-4">{description}</p>

      <h4 className="text-sm font-semibold text-gray-200 mb-2">Key Responsibilities:</h4>

      <ul className="space-y-2">
        {responsibilities.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
            className="flex items-start gap-2"
          >
            <span className="text-purple-500 font-bold">•</span>
            <span className="text-gray-400">{item}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}
