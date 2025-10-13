"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { historyCourses } from "@/data/course.data"
import { Download, Eye } from "lucide-react"
import Image from "next/image"




const CourseTable = () => {
  return (
    <Card className="overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="text-left p-4 font-semibold text-foreground">Course Name</th>
              <th className="text-left p-4 font-semibold text-foreground">Status</th>
              <th className="text-left p-4 font-semibold text-foreground">Completed On</th>
              <th className="text-left p-4 font-semibold text-foreground">Certificate</th>
              <th className="text-left p-4 font-semibold text-foreground">Action</th>
            </tr>
          </thead>
          <tbody>
            {historyCourses.map((course, index) => (
              <tr key={course.id} className={index !== historyCourses.length - 1 ? "border-b" : ""}>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <Image
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium text-foreground text-pretty">{course.name}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    {course.status}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground">{course.completedOn}</td>
                <td className="p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-950/20"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </td>
                <td className="p-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-950/20"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Review
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 p-4">
        {historyCourses.map((course) => (
          <Card key={course.id} className="p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <Image src={course.thumbnail || "/placeholder.svg"} alt={course.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground text-pretty leading-tight">{course.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    {course.status}
                  </span>
                  <span className="text-sm text-muted-foreground">{course.completedOn}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-950/20 bg-transparent"
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-950/20 bg-transparent"
              >
                <Eye className="h-4 w-4 mr-1" />
                Review
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}

export default CourseTable