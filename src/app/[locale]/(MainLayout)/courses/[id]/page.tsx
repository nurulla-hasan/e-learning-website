import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Users, Clock, Award, CheckCircle, Play} from "lucide-react"
import Image from "next/image"
import CurriculamTab from "@/components/SingleCourse/CurriculamTab"
import ReviewTab from "@/components/SingleCourse/ReviewTab"

const CourseDetailsPage = () =>{
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Home</span>
            <span>/</span>
            <span>Courses</span>
            <span>/</span>
            <span>IT & Software</span>
          </nav>
        </div>
      </header>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-balance">
                Web Design & Development Fundamentals - From Zero to Expert Level
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Learn to design and develop responsive, modern websites from scratch and become an industry-ready
                expert.
              </p>

              {/* Rating and Stats */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="font-semibold">4.8</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-muted-foreground">(86)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>219 enrolled in this course</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Last update 09/2025</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Instructor:</span>
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src="/images/instructor/instructor-teaching.png" />
                    <AvatarFallback>RS</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">Robert Smith</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">About the Course:</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    This course is designed to take you from a complete beginner to a skilled web designer and developer
                    capable of building beautiful, responsive websites. Whether you want to start a freelance career,
                    land a developer job, or simply create websites for personal projects, this course equips you with
                    everything you need.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We start with the very basics — understanding how websites work — and move towards advanced topics
                    like responsive design, interactivity with JavaScript, and deploying live projects.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Who This Course Is For:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Beginners: No prior coding or design knowledge required.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Designers: Graphic or UI designers looking to transition into web development.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Entrepreneurs: Those wanting to create their own business websites without hiring a developer.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Freelancers: People aiming to expand their service offerings and earn more clients.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Course Includes:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">12 hours of on-demand video</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Downloadable resources & project files</span>
                      </li>
                    </ul>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Lifetime access</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">Certificate of completion</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Instructor Profile */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Instructor:</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="/images/instructor/female-instructor.png" />
                      <AvatarFallback>SR</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold">Sophia Reynolds</h4>
                      <p className="text-sm text-muted-foreground">Senior UI/UX Designer & Design Mentor</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Sophia is a seasoned UI/UX Designer with over 5 years of industry experience, having worked with
                        global brands and startups to create intuitive, user-friendly digital products.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="curriculum" className="mt-6">
                <CurriculamTab/>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <ReviewTab/>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Preview Card */}
            <Card className="pt-0 pb-6">
              <CardHeader className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-blue-600 to-purple-700 rounded-t-lg overflow-hidden">
                  <Image src="/images/instructor/course-preview.png" alt="Course preview" className="w-full h-full object-cover" width={600} height={600}/>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="lg" variant="secondary" className="rounded-full">
                      <Play className="w-6 h-6 mr-2" />
                      PREVIEW
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">$89.00</span>
                  <span className="text-lg text-muted-foreground line-through">$95.00</span>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    Add To Cart
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    Buy Now
                  </Button>
                  <Button variant="ghost" className="w-full text-primary">
                    Request In-Person Training
                  </Button>
                </div>

                {/* Course Stats */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      <span className="text-sm">Lessons</span>
                    </div>
                    <span className="text-sm font-medium">25</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm">Quizzes</span>
                    </div>
                    <span className="text-sm font-medium">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Duration</span>
                    </div>
                    <span className="text-sm font-medium">12 Hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span className="text-sm">Skill Level</span>
                    </div>
                    <span className="text-sm font-medium">Intermediate</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span className="text-sm">Certificate</span>
                    </div>
                    <span className="text-sm font-medium">Yes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">Full Lifetime Access</span>
                    </div>
                    <span className="text-sm font-medium">Yes</span>
                  </div>
                </div>

                {/* Social Actions */}
                {/* <div className="flex items-center justify-center gap-4 pt-4 border-t">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Facebook className="w-4 h-4" />
                  </Button>
                </div> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


export default CourseDetailsPage