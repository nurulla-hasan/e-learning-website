import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ILearningCourse } from "@/types/course.type";
import { Badge } from "@/components/ui/badge";

type TProps = {
  course: ILearningCourse;
};

const LearningCourseItem = ({ course }: TProps) => {
  const progressPercentage = course.progress?.progress?.overallProgress || 0;
  const isCompleted = progressPercentage >= 100;

      const buildCombinedCertificateHTML = (course: ILearningCourse) => {
        const safe = (v: string | number | undefined) =>
          typeof v === "string" || typeof v === "number" ? String(v) : "";
        const recipientName = "Imię i Nazwisko"; // TODO: replace with actual learner name
        const birthDate = ""; // TODO: supply if available
        const validFrom = course.enrolledAt ? new Date(course.enrolledAt).toLocaleDateString("pl-PL") : "";
        const validTo = new Date().toLocaleDateString("pl-PL");
        const issueDate = new Date().toLocaleDateString("pl-PL");
        const registrationNumber = safe(course.id);
        return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zaświadczenie i Program Szkolenia</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    .page-container{max-width:1024px;margin:0 auto;padding:2rem;font-family:Inter,ui-sans-serif,system-ui}
    .certificate-card{border:2px solid #e5e7eb;border-radius:.5rem;box-shadow:0 4px 6px -1px rgba(0,0,0,.1);background:#fff;color:#1f2937;margin-bottom:2rem}
    .table-card{border:1px solid #e5e7eb;border-radius:.5rem;overflow:hidden;background:#fff;box-shadow:0 4px 6px -1px rgba(0,0,0,.1)}
    .font-serif-title{font-family:Georgia,'Times New Roman',Times,serif}
    .table-header{background:#f3f4f6}
    .table-data,.table-header-cell{border-right:1px solid #e5e7eb}
    .table-row:last-child{border-bottom:none}
    .text-muted-foreground{color:#6b7280}
    .text-destructive-underline{color:#ef4444;text-decoration:underline;text-decoration-color:#ef4444}
    @media print{body{background:#fff}}
  </style>
</head>
<body class="bg-gray-100">

<div class="page-container">
  <div class="certificate-card w-full mx-auto">
    <div class="p-12 space-y-8">
      <div class="text-center space-y-2">
        <p class="text-sm text-muted-foreground italic">(pieczęć organizatora szkolenia)</p>
        <div class="h-8"></div>
      </div>
      <div class="text-center space-y-4">
        <h1 class="text-3xl font-serif-title font-bold tracking-wider">ZAŚWIADCZENIE</h1>
        <h2 class="text-xl font-serif-title leading-relaxed">o ukończeniu szkolenia w dziedzinie bezpieczeństwa i higieny pracy</h2>
      </div>
      <div class="space-y-6 text-sm leading-relaxed">
        <div class="flex flex-wrap items-baseline gap-2">
          <span>Pani</span>
          <span class="font-bold text-destructive-underline">${recipientName}</span>
          <span>urodzona dnia</span>
          <span class="font-bold text-destructive-underline">${birthDate}</span>
          <span>r.</span>
        </div>
        <div class="italic text-xs text-muted-foreground">(imię i nazwisko / nazwa firmy)</div>
        <p class="text-justify">ukończyła szkolenie okresowe pracowników zatrudnionych na stanowiskach robotniczych, o których mowa w § 2 ust. 1 pkt 2 rozporządzenia MGiP z dnia 27 lipca 2004 r. w sprawie szkolenia w dziedzinie bezpieczeństwa i higieny pracy (Dz. U. 180 poz. 1860)</p>
        <div class="italic text-xs text-muted-foreground">(należy zaznaczyć właściwą grupę osób objętych szkoleniem zgodnie z przepisami prawa pracy)</div>
        <p>zorganizowane w formie i instruktażu przez</p>
        <div class="text-center space-y-1">
          <p class="font-bold">HUS PREMIUM Spółka z o.o.</p>
          <p>ul. Kościelna 3</p>
          <p>62-110 Damasławek</p>
          <div class="italic text-xs text-muted-foreground">(nazwa organizatora szkolenia)</div>
        </div>
        <div class="flex flex-wrap items-baseline gap-2">
          <span>w okresie od dnia</span>
          <span class="font-bold text-destructive-underline">${validFrom}</span>
          <span>r. do dnia</span>
          <span class="font-bold text-destructive-underline">${validTo}</span>
          <span>r.</span>
        </div>
        <p class="text-justify">Celem szkolenia była aktualizacja i uzupełnienie wiedzy i umiejętności w szczególności z zakresu oceny zagrożeń związanych z wykonywaną pracą, metod ochrony przed zagrożeniami dla zdrowia i bezpieczeństwa pracowników, kształtowania warunków pracy w sposób zgodny z przepisami i zasadami bezpieczeństwa i higieny pracy, postępowania w razie wypadku oraz w sytuacjach awaryjnych</p>
        <p class="text-justify">Zaświadczenie wydano na podstawie § 16 ust. 3 rozporządzenia Ministra Gospodarki i Pracy z dnia 27 lipca 2004 r. w sprawie szkolenia w dziedzinie bezpieczeństwa i higieny pracy (Dz.U. nr 180, poz. 1860, ze zm.).</p>
      </div>
      <div class="space-y-8 pt-8">
        <div class="flex justify-between items-end">
          <div class="space-y-2">
            <div class="flex items-baseline gap-2">
              <span>Damasławek, dnia</span>
              <span class="font-bold text-destructive-underline">${issueDate}</span>
              <span>r.</span>
            </div>
            <div class="italic text-xs text-muted-foreground">(miejscowość)</div>
          </div>
          <div class="text-right space-y-2">
            <div class="h-8 border-b w-48 border-black"></div>
            <div class="italic text-xs text-muted-foreground">(data wystawienia wraz z podpisem i pieczęcią organizatora szkolenia)</div>
          </div>
        </div>
        <div class="flex items-baseline gap-2">
          <span>Nr zaświadczenia wg rejestru:</span>
          <span class="font-bold text-destructive-underline">${registrationNumber}</span>
        </div>
        <div class="text-center pt-8">
          <div class="h-8 border-b w-96 mx-auto border-black"></div>
          <div class="italic text-xs text-muted-foreground mt-2">(pieczęć i podpis osoby upoważnionej przez organizatora szkolenia)</div>
        </div>
      </div>
    </div>
  </div>

  <div class="table-card w-full mx-auto">
    <div class="text-center p-6 border-b border-gray-200">
      <h2 class="text-2xl font-serif-title">Program szkolenia</h2>
    </div>
    <div class="overflow-hidden">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b table-header bg-gray-100">
            <th class="table-header-cell px-4 py-3 text-left font-medium w-16">L.p</th>
            <th class="table-header-cell px-4 py-3 text-left font-medium">Temat szkolenia</th>
            <th class="px-4 py-3 text-center font-medium w-24">Liczba godzin*)</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b table-row">
            <td class="table-data px-4 py-4 text-center font-medium align-top">1</td>
            <td class="table-data px-4 py-4 align-top">
              <div class="space-y-2">
                <p class="text-sm leading-relaxed">Wybrane regulacje prawne z zakresu bhp</p>
                <div class="ml-4 space-y-1">
                  <p class="text-sm leading-relaxed text-muted-foreground">a) Postanowienia Kodeksu pracy dotyczące praw i obowiązków pracowników</p>
                  <p class="text-sm leading-relaxed text-muted-foreground">b) Zasady poruszania się w magazynie</p>
                </div>
              </div>
            </td>
            <td class="px-4 py-4 text-center font-medium align-top">2</td>
          </tr>
          <tr class="border-b table-row">
            <td class="table-data px-4 py-4 text-center font-medium align-top">2</td>
            <td class="table-data px-4 py-4 align-top">
              <div class="space-y-2">
                <p class="text-sm leading-relaxed">Metody bezpiecznej pracy na stanowisku pracy</p>
                <div class="ml-4 space-y-1">
                  <p class="text-sm leading-relaxed text-muted-foreground">a) Bezpieczeństwo przy obsłudze maszyn</p>
                  <p class="text-sm leading-relaxed text-muted-foreground">b) Środki ochrony indywidualnej</p>
                </div>
              </div>
            </td>
            <td class="px-4 py-4 text-center font-medium align-top">2</td>
          </tr>
          <tr class="border-b table-row">
            <td class="table-data px-4 py-4 text-center font-medium align-top">3</td>
            <td class="table-data px-4 py-4 align-top">
              <div class="space-y-2">
                <p class="text-sm leading-relaxed">Postępowanie w sytuacjach awaryjnych</p>
              </div>
            </td>
            <td class="px-4 py-4 text-center font-medium align-top">1</td>
          </tr>
          <tr class="border-b bg-gray-200">
            <td class="table-data px-4 py-3 text-center font-medium">Razem:</td>
            <td class="table-data px-4 py-3"></td>
            <td class="px-4 py-3 text-center font-medium">minimum 5</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

</div>

</body>
</html>`;
      };

  const handleDownloadCertificate = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const combinedHtml = buildCombinedCertificateHTML(course);

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (!doc) {
      document.body.removeChild(iframe);
      return;
    }
    doc.open();
    doc.write(combinedHtml);
    doc.close();

    const afterPrint = () => {
      window.removeEventListener("focus", afterPrint);
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 0);
    };

    // Trigger print when iframe content is ready
    iframe.onload = () => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    };
    // Cleanup once user returns focus after printing
    window.addEventListener("focus", afterPrint);
  };

  const handleViewCertificate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const combinedHtml = buildCombinedCertificateHTML(course);

    const win = window.open("", "_blank");
    if (!win) return;
    win.document.open();
    win.document.write(combinedHtml);
    win.document.close();
    win.focus();
  };

  return (
    <>
      <Card className="group overflow-hidden transition-all duration-200 py-0">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row gap-0">
            {/* Course Image - Left Side */}
            <div className="md:w-80 flex-shrink-0">
              <div className="relative w-full h-48 md:h-full overflow-hidden">
                <Link href={`/my-learning/${course.courseId}`}>
                  <Image
                    src={course.courseThumbnail || "/placeholder.svg"}
                    alt={course.courseTitle}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    fill
                    placeholder="blur"
                    blurDataURL={course.courseThumbnail || "/placeholder.svg"}
                    sizes=" (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </Link>
              </div>
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
                    {course.certificate && (
                      <>
                        <Button
                          onClick={(e) => handleDownloadCertificate(e)}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download Certificate
                        </Button>
                        <Button
                          onClick={(e) => handleViewCertificate(e)}
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View Certificate
                        </Button>
                      </>
                    )}
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
