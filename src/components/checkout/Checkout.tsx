"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup } from "@/components/ui/radio-group"
import { Clock, BookOpen, User } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"

interface Course {
  id: string
  title: string
  instructor: string
  totalHours: number
  lessons: number
  price: number
  image: string
}

const courses: Course[] = [
  {
    id: "1",
    title: "Learn Ethical Hacking From Scratch",
    instructor: "Robert Smith",
    totalHours: 25,
    lessons: 34,
    price: 40.0,
    image: "/images/cart/figma-ui-ux-design-course.jpg",
  },
  {
    id: "2",
    title: "Digital Marketing Mastery-Social Media & Ads",
    instructor: "Leslie Alexander",
    totalHours: 35,
    lessons: 48,
    price: 35.0,
    image: "/images/cart/web-development-course.png",
  },
]

const Checkout = () => {
  const router = useRouter();
  const subtotal = courses.reduce((sum, course) => sum + course.price, 0)
  const total = subtotal // In a real app, this might include taxes, discounts, etc.
   const t = useTranslations('CheckoutPage');

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Courses Section */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold text-foreground mb-6">{t("page_title")}</h1>
          <div className="space-y-4">
            {courses.map((course) => (
              <Card key={course.id} className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Course Image */}
                    <div className="flex-shrink-0">
                      <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full sm:w-32 h-20 object-cover rounded-lg bg-muted"
                        height={600}
                        width={600}
                      />
                    </div>

                    {/* Course Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-card-foreground mb-2 text-balance">{course.title}</h3>
                      <div className="flex items-center gap-1 text-muted-foreground mb-3">
                        <User className="w-4 h-4" />
                        <span className="text-sm">By {course.instructor}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.totalHours} total hours</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.lessons} lessons</span>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex-shrink-0 text-right sm:text-left">
                      <div className="text-xl font-bold text-primary">${course.price.toFixed(2)}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="lg:col-span-1">
          <Card className="bg-card border-border shadow-sm sticky top-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">{t("payment_details")}</h2>

              {/* Price Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{t("subtotal")}:</span>
                  <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">{t("total")}:</span>
                  <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Options */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-4">{t("payment_options")}</h3>
                <RadioGroup defaultValue="przelewy24" className="space-y-3">
                  {/* <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="przelewy24" id="przelewy24" />
                    <Label htmlFor="przelewy24" className="flex-1 cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Przelewy24</span>
                        <div className="text-xs text-white font-semibold bg-accent px-2 py-1 rounded">P24</div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <span className="text-sm font-medium">Credit/Debit Card</span>
                    </Label>
                  </div> */}
                  <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                    {/* <RadioGroupItem value="paypal" id="paypal" /> */}
                    {/* <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                      <span className="text-sm font-medium">PayPal</span>
                    </Label> */}
                     <Image
                        src={"/images/payment.png"}
                        alt={"title"}
                        className="w-full md:w-48 object-cover rounded-lg bg-muted"
                        height={100}
                        width={100}
                      />
                  </div>
                </RadioGroup>
              </div>

              {/* Pay Now Button */}
              <Button
                onClick={()=> router.push("/orders")}
                className="w-full bg-primary text-white font-semibold py-3 text-base"
                size="lg"
              >
                {t("pay_button")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


export default Checkout