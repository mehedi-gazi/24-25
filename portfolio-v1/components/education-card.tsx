"use client"

import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"

interface EducationCardProps {
  degree: string
  institution: string
  location: string
  period: string
  index: number
}

export function EducationCard({ degree, institution, location, period, index }: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-800 hover:border-purple-500/50 transition-colors"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
        <div className="bg-gray-800 p-3 rounded-full">
          <GraduationCap className="h-6 w-6 text-purple-500" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold">{degree}</h3>
          <p className="text-gray-400">{institution}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 sm:mb-4">
        <span className="text-gray-400 text-sm">{location}</span>
        <span className="inline-block bg-gray-800 rounded-full px-2 py-1 text-xs sm:text-sm text-gray-300">
          {period}
        </span>
      </div>
    </motion.div>
  )
}
