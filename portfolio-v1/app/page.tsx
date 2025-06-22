"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Code, Award, Briefcase, Terminal, Github, Linkedin } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { SkillBadge } from "@/components/skill-badge"
import { Navigation } from "@/components/navigation"
import { ExperienceCard } from "@/components/experience-card"
import { EducationCard } from "@/components/education-card"
import { CertificationCard } from "@/components/certification-card"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { clientX, clientY } = e
      const x = clientX / window.innerWidth
      const y = clientY / window.innerHeight

      containerRef.current.style.setProperty("--mouse-x", `${x}`)
      containerRef.current.style.setProperty("--mouse-y", `${y}`)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const programmingLanguages = ["Python", "Java", "PHP", "C", "SQL", "HTML/CSS", "JavaScript", "Lua", "Bash"]

  const tools = [
    "Visual Studio Code",
    "Git",
    "Microsoft SQL Server",
    "MySQL",
    "Wireshark",
    "Solidworks 2022",
    "Blender v4",
    "Oracle Virtualbox",
    "Netbeans IDE",
    "XAMPP",
    "Powershell/UNIX",
    "Ubuntu",
    "Docker",
  ]

  const frameworks = [
    "Matplotlib",
    "Numpy",
    "Tailwind CSS",
    "Laravel + Herd",
    "Pytest",
    "JUnit",
    "OpenSSL",
    "MySQL",
    "Jupyter Notebook",
  ]

  return (
    <div
      id="top"
      ref={containerRef}
      className="flex min-h-screen flex-col bg-black text-white"
      style={{
        backgroundImage:
          "radial-gradient(circle at calc(var(--mouse-x, 0.5) * 100%) calc(var(--mouse-y, 0.5) * 100%), rgba(50, 50, 50, 0.3), transparent 400px)",
      }}
    >
      <Navigation />

      <main className="flex-1">
        <section className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 py-12 md:py-24 px-4 md:px-6">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block rounded-full bg-gray-800 px-3 py-1 text-sm">
              <span className="text-gray-400">CS Student @UU Belfast / Aspiring Inventor.</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Mehedi Gazi
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              Current - BSc Hons Computing Science @UU Belfast. Developer focused on the bridging the computing aspect
              and the mechanical aspect. Strong passion for physical machinisation, focus on Embedded Systems
              Engineering and ML Learning. Aspiring Inventor and Engineer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link href="#projects">
                  View My Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full border-gray-700">
                <Link href="#contact">Get in Touch</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="relative min-h-[300px] rounded-xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-50"></div>
            <div className="relative z-10">
              <div className="mb-4">
                <Terminal className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">Status 🡳</h3>
              <p className="text-2xl font-bold mb-4">Full-Stack Development + Research in Embedded Systems / ML</p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  {
                    title: "CS50x",
                    description: "Harvard's Introduction to Computer Science",
                  },
                  {
                    title: "Full-Stack Engineering",
                    description: "CodeAcademy Professional Certification",
                  },
                  {
                    title: "Portfolio Projects",
                    description: "Building diverse software applications + physical side of engineering",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 hover:bg-gray-800/80 transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  >
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        <section id="experience" className="py-12 md:py-24 bg-gray-950">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-4">PROFESSIONAL JOURNEY</h2>
              <h3 className="text-4xl md:text-5xl font-bold">
                Work{" "}
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Experience
                </span>
              </h3>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-2">
              <ExperienceCard
                title="Self-learnt Developer"
                company="Freelance - Home"
                period="Jul 2024 - Present"
                description="Building a portfolio of diverse software projects while strengthening programming foundations through Harvard's CS50x and Full-Stack Engineering certifications."
                responsibilities={[
                  "Revitalizing programming foundation through Harvard's CS50x",
                  "Strengthening expertise in C, Python, Java, PHP, SQL, JavaScript",
                  "Building a portfolio of diverse software projects and research into ML / Embedded Systems Engineering",
                  "Applying modern development practices",
                ]}
                index={0}
              />

              <ExperienceCard
                title="PT Team Member + Shift Manager"
                company="Domino's (Belfast - Castlebar)"
                period="Dec 2022 - July 2024"
                description="Worked part-time alongside studies in computing, supporting shift management during peak operational hours."
                responsibilities={[
                  "Supported shift management during peak operational hours",
                  "Coordinated inventory management and optimized stock deliveries",
                  "Developed teamwork and leadership skills",
                  "Balanced work with academic commitments",
                ]}
                index={1}
              />
            </div>
          </div>
        </section>

        <section id="projects" className="py-12 md:py-24 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-4">FEATURED WORK</h2>
              <h3 className="text-4xl md:text-5xl font-bold">
                My{" "}
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Projects
                </span>
              </h3>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="ILC State Exam Project"
                description="Arduino-based C project using SolidWorks and 3D-Based CAD with a near-perfect score (198/200)."
                tags={["Arduino", "C", "SolidWorks", "3D CAD"]}
                link="https://github.com/mehedi-gazi"
                index={0}
              />
              <ProjectCard
                title="JC State Exam Project"
                description="Full lifecycle development from research and design to manufacturing, testing and documentation."
                tags={["Arduino IDE", "2D Design", "CNC", "VS Code"]}
                link="https://github.com/mehedi-gazi"
                index={1}
              />
              <ProjectCard
                title="Portfolio Website"
                description="Personal portfolio website built with Next.js, Tailwind CSS, and Framer Motion."
                tags={["Next.js", "React", "Tailwind CSS", "Framer Motion"]}
                link="https://github.com/mehedi-gazi"
                index={2}
              />
            </div>
          </div>
        </section>

        <section id="education" className="py-12 md:py-24 bg-gray-950">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-4">ACADEMIC BACKGROUND</h2>
              <h3 className="text-4xl md:text-5xl font-bold">
                Education &{" "}
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Certifications
                </span>
              </h3>
            </motion.div>

            <div className="grid gap-8 lg:grid-cols-2 mb-16">
              <EducationCard
                degree="BSc, Hons in Computing Science"
                institution="University of Ulster - Belfast Campus"
                location="Belfast, Northern Ireland"
                period="Sep 2022 - June 2026"
                index={0}
              />

              <EducationCard
                degree="ILC / JC (Irish Leaving Certificate + Junior Certificate)"
                institution="St. Gerald's College DLS Castlebar"
                location="Castlebar, Ireland"
                period="2016 - 2022"
                index={1}
              />
            </div>

            <h4 className="text-2xl font-bold mb-8 text-center">Certifications In Progress</h4>
            <div className="grid gap-8 lg:grid-cols-2">
              <CertificationCard
                title="CS50x: Introduction to Computer Science"
                issuer="Harvard University's EdX"
                period="In Progress, est. August-September 2025"
                description="12-week verified certificate covering essentials of computer science, including Scratch, C, algorithms, data structures, Python, SQL, HTML/CSS, JavaScript, and Flask."
                index={0}
              />

              <CertificationCard
                title="Full-Stack Engineer Certification"
                issuer="CodeAcademy"
                period="In Progress, est. August-September 2025"
                description="150 hours covering JavaScript, HTML, CSS, React, Node/Express, PostgreSQL, Redux, and PERN applications with projects including personal portfolio and e-commerce website."
                index={1}
              />
            </div>
          </div>
        </section>

        <section id="skills" className="py-12 md:py-24 bg-black">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-4">TECHNICAL EXPERTISE</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-12">
                My{" "}
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Skills
                </span>
              </h3>
            </motion.div>

            <div className="space-y-12">
              <div>
                <h4 className="text-xl font-semibold mb-6 flex items-center">
                  <Code className="mr-2 h-5 w-5 text-purple-500" />
                  Programming Languages
                </h4>
                <div className="flex flex-wrap gap-3">
                  {programmingLanguages.map((skill, i) => (
                    <SkillBadge key={skill} name={skill} delay={i * 0.05} />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-6 flex items-center">
                  <Terminal className="mr-2 h-5 w-5 text-purple-500" />
                  Tools & Software
                </h4>
                <div className="flex flex-wrap gap-3">
                  {tools.map((tool, i) => (
                    <SkillBadge key={tool} name={tool} delay={i * 0.05} />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-6 flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-purple-500" />
                  Frameworks & Libraries
                </h4>
                <div className="flex flex-wrap gap-3">
                  {frameworks.map((framework, i) => (
                    <SkillBadge key={framework} name={framework} delay={i * 0.05} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="awards" className="py-12 md:py-24 bg-gray-950">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm uppercase tracking-wider text-gray-400 mb-4">RECOGNITION</h2>
              <h3 className="text-4xl md:text-5xl font-bold">
                Awards &{" "}
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Honors
                </span>
              </h3>
            </motion.div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Project of the Year + Runner Up (Technology)",
                  organization: "St. Gerald's College DLS Castlebar",
                  year: "2019, 2022",
                },
                {
                  title: "Mathletes Connacht Provincial Finalist",
                  organization: "University of Galway",
                  year: "2014",
                },
                {
                  title: "School Computer Club Winner & Runner Up",
                  organization: "St Patricks BNS De La Salle",
                  year: "2012, 2014",
                },
                {
                  title: "Khan Academy School Winner",
                  organization: "St Patricks BNS De La Salle",
                  year: "2014",
                },
                {
                  title: "Spelling Bee Runner-up",
                  organization: "St Patricks BNS De La Salle",
                  year: "2016",
                },
                {
                  title: "Virtual Work Experience",
                  organization: "Citi + JP Morgan (Forage)",
                  year: "In Progress",
                },
              ].map((award, i) => (
                <motion.div
                  key={award.title}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800 hover:border-purple-500/50 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Award className="h-8 w-8 text-purple-500 mb-4" />
                  <h4 className="text-lg font-semibold mb-2">{award.title}</h4>
                  <p className="text-gray-400 mb-1">{award.organization}</p>
                  <p className="text-sm text-gray-500">{award.year}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-12 md:py-24 bg-gradient-to-b from-gray-950 to-black">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Connect</h2>
              <p className="text-gray-400 mb-8">
                I'm currently looking for new opportunities to apply my skills and knowledge. Feel free to reach out if
                you'd like to collaborate or have any questions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-full px-8">
                  <Link href="mailto:xn.m2977@gmail.com">Email Me</Link>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8 border-gray-700">
                  <Link href="tel:+353833429844">Call Me</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <footer className="border-t border-gray-800 py-8">
          <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Mayhedhe (Mehedi) Gazi. All rights reserved.
            </p>
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
          </div>
        </footer>
      </main>
    </div>
  )
}
