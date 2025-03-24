"use client"

import { useState, useEffect } from "react"
import { Download, Mail, MapPin, Github, Linkedin, Moon, Sun } from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"

const data = {
  name: 'Balazs Saros',
  title: 'Senior Frontend Engineer',
  location: 'Budapest, Hungary',
  urls: {
    email: 'hello@bsaros.com',
    github: 'https://github.com/balzss',
    linkedin: 'https://linkedin.com/in/bsaros'
  },
  summary: 'Senior Frontend Engineer with 8+ years of experience, specializing in React and TypeScript for the past 5 years, with expertise in accessibility (a11y). Some background in full-stack development with Node.js. Proficient in Next.js, unit and integration testing. Passionate about building tools, designing CI/CD pipelines, improving developer workflows, and contributing to open-source projects.',
  experience: [
    {
      company: 'Instructure',
      role: 'Sr. Frontend Engineer',
      timePeriod: 'May 2023 - Present',
      notes: [
        'Working on the InstUI React component library with heavy focus on accessibility (WCAG)'
      ]
    },
    {
      company: 'INSPYRE Informatics',
      role: 'Frontend Developer',
      timePeriod: 'Jan 2023 - Apr 2023',
      notes: [
        'Worked on client projects with React and TypeScript'
      ]
    },
    {
      company: 'IBM Budapest Lab',
      role: 'Frontend Engineer',
      timePeriod: 'Jan 2020 - Jan 2023',
      notes: [
        'Worked on Carbon Design System',
        'Worked on Cloud Onboarding, improving the onboarding workflow, developing custom middlewares to connect with company APIs'
      ]
    },
    {
      company: 'ChemAxon',
      role: 'Frontend Developer',
      timePeriod: 'Jul 2018 - Jan 2020',
      notes: [
        'Worked on an administrative product for customers, connecting data from other company services',
        'Helped creating a greenfield project developing React extensions for Tableau'
      ]
    },
    {
      company: 'iMind.eu',
      role: 'Jr. Software Developer',
      timePeriod: 'Oct 2017 - Jul 2018',
    },
    {
      company: 'Mortoff IT Consulting and Services',
      role: 'Software Developer Intern',
      timePeriod: 'Aug 2016 - Sep 2017',
    }
  ],
  education: {
    school: 'Budapest University of Technology and Economics',
    field: 'BSc, Computer Engineering',
  },
  skills: [
    {
      categoryName: 'Languages',
      categoryItems: ['JavaScript', 'TypeScript', 'HTML', 'CSS']
    },
    {
      categoryName: 'Frameworks',
      categoryItems: ['React', 'Next.js', 'Material UI', 'Tailwind CSS', 'Styled Components']
    },
    {
      categoryName: 'Testing',
      categoryItems: ['Jest', 'React Testing Library', 'Cypress', 'Vitest', 'Chromatic']
    },
    {
      categoryName: 'Tools',
      categoryItems: ['Git', 'Webpack', 'Vite', 'Babel', 'GitHub Actions', 'Docker']
    }
  ]
}

function shortenUrl(url: string): string {
  return url.startsWith('https://') ? url.slice(8) : url;
}

export default function Resume() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  // Update theme when user changes it
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
    localStorage.setItem("theme", newTheme)
  }

  // Initialize theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null

    const initialTheme = savedTheme || "light"
    setTheme(initialTheme)
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="mx-auto max-w-[210mm] bg-card text-foreground p-6 sm:p-8 print:py-6 shadow-lg print:shadow-none print:text-sm">
        {/* Controls - visible only on screen */}
        <div className="mb-4 flex justify-between print:hidden">
          <Button
            onClick={() => window.print()}
          >
            <Download className="h-4 w-4" />
            Download PDF
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun className="h-4 w-4 " /> : <Moon className="h-4 w-4" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        {/* A4 Resume */}
        <div className="w-full text-foreground p-0 print:p-0 sm:p-4 ">
          {/* Header */}
          <header className="mb-4 border-b border-gray-200 pb-4">
            <h1 className="text-2xl font-bold ">Balazs Saros</h1>
            <h2 className="text-lg font-medium text-muted-foreground ">Senior Frontend Engineer</h2>

            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{data.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <a
                  href={`mailto:${data.urls.email}`}
                  className="hover:text-primary hover:underline "
                >
                  {data.urls.email}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Linkedin className="h-4 w-4" />
                <a
                  href={data.urls.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary hover:underline "
                >
                  {shortenUrl(data.urls.linkedin)}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <Github className="h-4 w-4" />
                <a
                  href={data.urls.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary hover:underline "
                >
                  {shortenUrl(data.urls.github)}
                </a>
              </div>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="mb-5">
            <h3 className="text-base font-bold">Professional Summary</h3>
            <p className="text-muted-foreground">{data.summary}</p>
          </section>

          {/* Work Experience */}
          <section className="mb-5">
            <h3 className="mb-1 text-base font-bold ">Work Experience</h3>

            {data.experience.map((item) => (
              <div className="mb-3" key={item.company}>
                <div className="flex justify-between">
                  <h4 className="font-medium ">{item.role}</h4>
                  <span className="text-muted-foreground text-right">{item.timePeriod}</span>
                </div>
                <div className="text-muted-foreground ">{item.company}</div>
                <ul className="mt-1 list-disc pl-5 text-muted-foreground ">
                  {item.notes?.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section className="mb-5">
            <h3 className="mb-1 text-base font-bold ">Skills</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-4">
              {data.skills.map((skill) => (
                <div key={skill.categoryName}>
                  <div className="font-medium ">{skill.categoryName}:</div>
                  <span className="text-muted-foreground ">{skill.categoryItems.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section className="mb-2">
            <h3 className="mb-1 text-base font-bold ">Education</h3>
            <div>
              <h4 className="font-medium ">{data.education.field}</h4>
              <div className="text-muted-foreground ">
                {data.education.school}
              </div>
            </div>
          </section>

        </div>
      </div>
    </ThemeProvider>
  )
}

