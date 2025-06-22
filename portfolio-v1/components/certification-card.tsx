"use client"

import { motion } from "framer-motion"
import { Award } from "lucide-react"

interface CertificationCardProps {
  title: string
  issuer: string
  period: string
  description: string
  index: number
}

export function CertificationCard({ title, issuer, period, description, index }: CertificationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-gray-800 hover:border-purple-500/50 transition-colors"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
        <div className="bg-gray-800 p-3 rounded-full">
          <Award className="h-6 w-6 text-purple-500" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold break-words">{title}</h3>
          <p className="text-gray-400 break-words">{issuer}</p>
        </div>
      </div>

      <div className="mb-3 sm:mb-4">
        <span className="inline-block bg-gray-800 rounded-full px-2 py-1 text-xs sm:text-sm text-gray-300">
          {period}
        </span>
      </div>

      <p className="text-gray-300 leading-relaxed break-words">{description}</p>
    </motion.div>
  )
}
