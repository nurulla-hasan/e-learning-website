"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup } from "@/components/ui/radio-group"
import { BookOpen, User } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useGetCheckoutQuery } from "@/redux/feature/checkout/checkoutApi"
import Error from "@/tools/Error"
// import RemoveButton from "./RemoveButton"

interface CheckoutCourseItem {
  id: string
  courseId: string
  courseTitle: string
  courseShortDescription: string
  courseThumbnail: string
  price: number
  discountPrice?: number
}

interface CheckoutOrder {
  id: string
  userId: string
  totalAmount: number
  status: string
  createdAt: string
  updatedAt: string
  items: CheckoutCourseItem[]
}

const Checkout = () => {
  const router = useRouter();
  const t = useTranslations('CheckoutPage');

  const { data, isLoading, error } = useGetCheckoutQuery({});
  const checkoutOrders: CheckoutOrder[] = Array.isArray(data?.data) ? (data!.data as CheckoutOrder[]) : [];
  const subtotal = checkoutOrders.reduce((sum: number, order: CheckoutOrder) => sum + (order.totalAmount || 0), 0);
  const total = subtotal;

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold text-foreground mb-6">{t("page_title")}</h1>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                      </div>
                      <div className="w-20 h-8 bg-gray-200 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <Card className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <Error msg={t("error_loading_checkout")} />
  }


  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Items Section */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold text-foreground mb-6">{t("page_title")}</h1>
          <div className="space-y-4">
            {checkoutOrders.length === 0 ? (
              <Card className="bg-card border-border shadow-sm">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">{t("no_checkout_items")}</p>
                </CardContent>
              </Card>
            ) : (
              checkoutOrders?.map((order: CheckoutOrder) => (
                <Card key={order.id} className="bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Order Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-full sm:w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-primary" />
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              order.status === 'PAID'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="mt-4 space-y-4">
                          {order.items?.map((ci) => (
                            <div key={ci.id} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                              <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                                <Image
                                  src={ci.courseThumbnail}
                                    alt={ci.courseTitle}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-foreground truncate">{ci.courseTitle}</div>
                                <div className="text-sm text-muted-foreground line-clamp-2">{ci.courseShortDescription}</div>
                              </div>
                              <div className="text-right">
                                {typeof ci.discountPrice === 'number' ? (
                                  <div className="flex flex-col items-end">
                                    <span className="text-sm text-muted-foreground line-through">zł {ci.price.toFixed(2)}</span>
                                    <span className="text-base font-semibold text-primary">zł {ci.discountPrice.toFixed(2)}</span>
                                  </div>
                                ) : (
                                  <span className="text-base font-semibold text-primary">zł {ci.price.toFixed(2)}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Amount and Actions */}
                      <div className="flex-shrink-0 flex flex-col justify-between text-right sm:text-left">
                        <div className="text-xl font-bold text-primary">zł {order.totalAmount.toFixed(2)}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
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
                  <span className="font-semibold text-foreground">zł {subtotal.toFixed(2)}</span>
                </div>
                <hr className="border-border" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-foreground">{t("total")}:</span>
                  <span className="text-xl font-bold text-primary">zł {total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Options */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-4">{t("payment_options")}</h3>
                <RadioGroup defaultValue="przelewy24" className="space-y-3">
                  <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                     <Image
                        src={"/images/payment.png"}
                        alt={"title"}
                        className="w-full md:w-48 object-cover rounded-lg bg-muted"
                        height={100}
                        width={100}
                        priority
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