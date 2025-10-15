"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Play, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

// Define types based on API response
interface Lesson {
  title: string;
  order: number;
}

interface Section {
  id: string;
  courseId: string;
  title: string;
  order: number;
  totalLength: number;
  totalLessons: number;
  testCount: number;
  createdAt: string;
  updatedAt: string;
  Lesson: Lesson[];
  Test: any[]; // Assuming Test is an array, adjust if needed
}

interface CurriculamTabProps {
  sections: Section[];
}

const CurriculamTab = ({ sections }: CurriculamTabProps) => {
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => (prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]))
  }

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Course Content:</h2>
      </div>

      {sections.map((section) => (
        <Card key={section.id} className="overflow-hidden">
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => toggleSection(section.id)}
          >
            <div className="flex items-center gap-3">
              {expandedSections.includes(section.id) ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="font-medium">
                Section {section.order}: {section.title}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{section.totalLessons} Lessons</span>
              <span>{section.totalLength} min</span>
            </div>
          </div>

          {expandedSections.includes(section.id) && section.Lesson.length > 0 && (
            <CardContent className="pt-0 pb-4">
              <div className="space-y-2">
                {section.Lesson.map((lesson, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-4 hover:bg-muted/30 rounded-md transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Play className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">{lesson.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Lesson {lesson.order}</span>
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