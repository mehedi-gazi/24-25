"use client"

import { motion } from "framer-motion"

interface SkillBadgeProps {
  name: string
  delay?: number
}

export function SkillBadge({ name, delay = 0 }: SkillBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="rounded-full border border-purple-500/30 bg-gray-900/50 backdrop-blur-sm px-4 py-2 text-sm">
        {name}
      </div>
    </motion.div>
  )
}
