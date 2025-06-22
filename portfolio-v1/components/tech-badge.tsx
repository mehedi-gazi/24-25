"use client"

import { motion } from "framer-motion"

interface TechBadgeProps {
  name: string
  color: string
  delay?: number
}

export function TechBadge({ name, color, delay = 0 }: TechBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -5 }}
    >
      <div className={`rounded-lg border ${color} bg-gray-900/50 backdrop-blur-sm px-4 py-2 text-sm`}>{name}</div>
    </motion.div>
  )
}
