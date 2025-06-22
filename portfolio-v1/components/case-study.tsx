"use client"

import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

interface CaseStudyProps {
  title: string
  description: string
  details: string[]
  technologies: string[]
  gradient: string
  direction: "left" | "right"
}

export function CaseStudy({ title, description, details, technologies, gradient, direction }: CaseStudyProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <motion.div
        className={`order-2 ${direction === "left" ? "md:order-1" : "md:order-2"}`}
        initial={{ opacity: 0, x: direction === "left" ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-purple-500"></div>
            <h3 className="font-bold text-2xl">{title}</h3>
          </div>

          <p className="text-lg text-gray-300">{description}</p>

          <ul className="space-y-2 mt-6">
            {details.map((detail, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-2"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
              >
                <Check className="h-5 w-5 text-purple-500 mt-0.5 shrink-0" />
                <span className="text-gray-300">{detail}</span>
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 mt-6">
            {technologies.map((tech) => (
              <span key={tech} className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-300">
                {tech}
              </span>
            ))}
          </div>

          <Button variant="ghost" className="group mt-4 pl-0 text-white">
            <span>View Case Study</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </motion.div>

      <motion.div
        className={`order-1 ${direction === "left" ? "md:order-2" : "md:order-1"}`}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={`bg-gradient-to-br ${gradient} rounded-xl overflow-hidden aspect-[4/3] relative p-6`}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="text-gray-300 max-w-xs mx-auto">{description}</p>
              </div>
            </div>
            <div className="mt-auto">
              <Link
                href="#"
                className="block w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-center py-3 rounded-lg transition-colors"
              >
                View Project
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
