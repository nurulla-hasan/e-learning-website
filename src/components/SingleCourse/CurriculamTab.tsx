"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Play, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Lesson {
  title: string
  duration: string
  type: "video" | "resource"
}

interface Module {
  id: number
  title: string
  lectureCount: number
  totalDuration: string
  lessons: Lesson[]
}

const modules: Module[] = [
  {
    id: 1,
    title: "Introduction to Web Design & Development",
    lectureCount: 5,
    totalDuration: "1hr 24min",
    lessons: [
      { title: "Welcome to the Course", duration: "05:45", type: "video" },
      { title: "Understanding the Web", duration: "04:37", type: "video" },
      { title: "HTML Basics: Tags, Elements, and Attributes", duration: "07:24", type: "video" },
      { title: "Working with Images & Multimedia", duration: "12:25", type: "video" },
      { title: "Resources For This Section", duration: "01:30", type: "resource" },
    ],
  },
  {
    id: 2,
    title: "HTML5 - Building the Structure",
    lectureCount: 4,
    totalDuration: "1hr 18min",
    lessons: [
      { title: "HTML5 Document Structure", duration: "08:15", type: "video" },
      { title: "Semantic HTML Elements", duration: "12:30", type: "video" },
      { title: "Forms and Input Elements", duration: "15:45", type: "video" },
      { title: "HTML5 Best Practices", duration: "09:20", type: "video" },
    ],
  },
  {
    id: 3,
    title: "CSS3 - Styling Websites",
    lectureCount: 6,
    totalDuration: "2hr 05min",
    lessons: [
      { title: "CSS Fundamentals and Selectors", duration: "10:30", type: "video" },
      { title: "Box Model and Layout", duration: "14:20", type: "video" },
      { title: "Flexbox Layout System", duration: "18:45", type: "video" },
      { title: "CSS Grid for Complex Layouts", duration: "22:15", type: "video" },
      { title: "Responsive Design Techniques", duration: "16:30", type: "video" },
      { title: "CSS3 Animations and Transitions", duration: "13:25", type: "video" },
    ],
  },
  {
    id: 4,
    title: "JavaScript Basics",
    lectureCount: 5,
    totalDuration: "1hr 52min",
    lessons: [
      { title: "JavaScript Fundamentals", duration: "11:45", type: "video" },
      { title: "DOM Manipulation", duration: "16:20", type: "video" },
      { title: "Event Handling", duration: "13:30", type: "video" },
      { title: "Functions and Scope", duration: "14:15", type: "video" },
      { title: "JavaScript Project Examples", duration: "08:45", type: "resource" },
    ],
  },
  {
    id: 5,
    title: "Final Project - Build and Launch a Live Website",
    lectureCount: 4,
    totalDuration: "1hr 35min",
    lessons: [
      { title: "Project Planning and Setup", duration: "12:30", type: "video" },
      { title: "Building Your Portfolio Website", duration: "28:45", type: "video" },
      { title: "Testing and Optimization", duration: "15:20", type: "video" },
      { title: "Deployment and Going Live", duration: "18:40", type: "video" },
    ],
  },
]

const CurriculamTab = () => {
  const [expandedModules, setExpandedModules] = useState<number[]>([])

  const toggleModule = (moduleId: number) => {
    setExpandedModules((prev) => (prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]))
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Course Content:</h2>
      </div>

      {modules.map((module) => (
        <Card key={module.id} className="overflow-hidden">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => toggleModule(module.id)}
          >
            <div className="flex items-center gap-3">
              {expandedModules.includes(module.id) ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="font-medium">
                Module {module.id}: {module.title}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{module.lectureCount} Lectures</span>
              <span>{module.totalDuration}</span>
            </div>
          </div>

          {expandedModules.includes(module.id) && module.lessons.length > 0 && (
            <CardContent className="pt-0 pb-4">
              <div className="space-y-2">
                {module.lessons.map((lesson, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-4 hover:bg-muted/30 rounded-md transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {lesson.type === "video" ? (
                        <Play className="h-4 w-4 text-blue-500" />
                      ) : (
                        <FileText className="h-4 w-4 text-blue-500" />
                      )}
                      <span className="text-sm">{lesson.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}

export default CurriculamTab;