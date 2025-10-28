import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ILearningCourse } from "@/types/course.type";
import { Badge } from "@/components/ui/badge";

import { useLazyGetCertificateQuery } from "@/redux/feature/lesson/lessonApi";
import { ErrorToast } from "@/lib/utils";

type TProps = {
  course: ILearningCourse;
};

const LearningCourseItem = ({ course }: TProps) => {
  const progressPercentage = course.progress?.progressPercentage || 0;
  const isCompleted = progressPercentage === 100;

  const [getCertificate, { isLoading: isCertificateLoading }] = useLazyGetCertificateQuery();

  interface CertificateData {
    fullName?: string;
    startDate: string | Date;
    endDate: string | Date;
    dob?: string | Date;
    certificateNumber?: string;
  }

  const replacePlaceholders = (html: string, data: CertificateData) => {
    return html
      .replace(/\${fullName}/g, data.fullName || 'N/A')
      .replace(/&{startDate}/g, new Date(data.startDate).toLocaleDateString())
      .replace(/\${startDate}/g, new Date(data.startDate).toLocaleDateString())
      .replace(/&{endDate}/g, new Date(data.endDate).toLocaleDateString())
      .replace(/\${endDate}/g, new Date(data.endDate).toLocaleDateString())
      .replace(/\${dob}/g, data.dob ? new Date(data.dob).toLocaleDateString() : 'N/A')
      .replace(/\${certificateNumber}/g, data.certificateNumber || 'N/A')
      .replace(/&{certificateNumber}/g, data.certificateNumber || 'N/A');
  };

  const handleDownloadCertificate = async () => {
    try {
      const response = await getCertificate(course.courseId).unwrap();
      console.log("API Response:", response); // Debug log
      const certificateHtml = response?.data?.certificateHtmlContent;

      if (!certificateHtml) {
        console.log("API Response:", response); // Debug log
        ErrorToast("Certificate content not found. Please try again later.");
        return;
      }

      if (certificateHtml) {
        const processedHtml = replacePlaceholders(certificateHtml, response.data);
        console.log("Processed HTML:", processedHtml); // Debug

        // Create a new window for printing
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (!printWindow) {
          ErrorToast("Failed to open print window. Please check your popup blocker.");
          return;
        }

        printWindow.document.open();
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Certificate</title>
            <style>
              body {
                margin: 0;
                padding: 20px;
                font-family: Arial, sans-serif;
                background: white;
              }
            </style>
          </head>
          <body>
            ${processedHtml}
          </body>
          </html>
        `);
        printWindow.document.close();

        printWindow.onload = () => {
          console.log("Print window loaded successfully"); // Debug
          // SuccessToast("Certificate opened successfully! Print dialog will open shortly.");

          // Small delay to ensure everything is loaded
          setTimeout(() => {
            printWindow.focus();
            printWindow.print();
          }, 500);
        };

        // Clean up after print
        const afterPrint = () => {
          window.removeEventListener("focus", afterPrint);
        };
        window.addEventListener("focus", afterPrint);
      }
    } catch (error) {
      console.error("Failed to download certificate", error);
      ErrorToast("Failed to download certificate. Please check your connection and try again.");
    }
  };

  const handleViewCertificate = async () => {
    try {
      const response = await getCertificate(course.courseId).unwrap();
      const certificateHtml = response?.data?.certificateHtmlContent;

      if (!certificateHtml) {
        console.log("API Response:", response); // Debug log
        ErrorToast("Certificate content not found. Please try again later.");
        return;
      }

      if (certificateHtml) {
        const processedHtml = replacePlaceholders(certificateHtml, response.data);
        const win = window.open("", "_blank");
        if (!win) {
          ErrorToast("Failed to open new window. Please check your popup blocker settings.");
          return;
        }
        win.document.open();
        win.document.write(processedHtml);
        win.document.close();
        // SuccessToast("Certificate opened successfully in new window!");
        win.focus();
      }
    } catch (error) {
      console.error("Failed to view certificate", error);
      ErrorToast("Failed to view certificate. Please check your connection and try again.");
    }
  };


  return (
    <>
      <Card className="group overflow-hidden transition-all duration-200 py-0">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row gap-0">
            {/* Course Image - Left Side */}
            <div className="md:w-96 shrink-0 relative">
              <div className="relative w-full h-48 md:h-full overflow-hidden">
                <Image
                  src={course.courseThumbnail || "/placeholder.svg"}
                  alt={course.courseTitle}
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                  fill
                  placeholder="blur"
                  blurDataURL={course.courseThumbnail || "/placeholder.svg"}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              <Link href={`/my-learning/${course.courseId}`} className="absolute inset-0 z-10" />
            </div>

            {/* Course Content - Right Side */}
            <div className="flex-1 p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-card-foreground text-lg leading-tight">
                    {course.courseTitle}
                  </h3>
                  {course.lifetimeAccess && <Badge>Lifetime Access</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">
                  By {course.instructorName}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {course.courseShortDescription}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                  {course.categoryName}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  {course.courseLevel}
                </span>
                <span className="text-xs">
                  {course.totalLessons} lessons • {course.totalSections}{" "}
                  sections
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-card-foreground">
                    {progressPercentage}% Complete
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              <div className="flex items-center justify-between pt-2">
                {isCompleted && (
                  <div className="flex flex-wrap gap-2">
                    {/* {course.certificate && ( */}
                      <>
                        <Button
                          onClick={handleDownloadCertificate}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          disabled={isCertificateLoading}
                        >
                          <Download className="h-4 w-4" />
                          {isCertificateLoading ? "Loading..." : "Download & Print"}
                        </Button>
                        <Button
                          onClick={handleViewCertificate}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          disabled={isCertificateLoading}
                        >
                          <Eye className="h-4 w-4" />
                          {isCertificateLoading ? "Loading..." : "View Certificate"}
                        </Button>
                      </>
                    {/* )} */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default LearningCourseItem;
