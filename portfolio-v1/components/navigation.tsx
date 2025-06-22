"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Code, Menu, X, Github, Linkedin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false)
    }
  }, [isMobile, isOpen])

  const navItems = [
    { name: "Home", href: "#top" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Skills", href: "#skills" },
    { name: "Awards", href: "#awards" },
  ]

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/80 border-b border-gray-800">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        {/* Logo on left */}
        <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
          <Code className="w-6 h-6" />
          <span className="font-bold">Mehedi Gazi</span>
        </Link>

        {isMobile ? (
          <>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-x-0 top-16 bg-black/90 backdrop-blur-md border-b border-gray-800 p-4"
                >
                  <nav className="flex flex-col items-center space-y-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-lg py-2 hover:text-purple-400 transition-colors block w-full text-center"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Button className="rounded-full mt-2 w-full">
                      <Link href="#contact">Contact Me</Link>
                    </Button>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <>
            {/* Center navigation */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2">
              <nav className="flex items-center px-6 py-1.5 rounded-full bg-gray-900/70 backdrop-blur-md">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3 py-1 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <Button className="ml-3 rounded-full" size="sm">
                  <Link href="#contact">Contact</Link>
                </Button>
              </nav>
            </div>

            {/* Social links on right */}
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/mehedi-gazi"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/in/mehedi-gazi"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
