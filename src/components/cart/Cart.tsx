"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import useSmartFetchHook from "@/hooks/useSmartFetchHook";
import { useGetCartQuery } from "@/redux/feature/cart/cartApi";
import { useAddToCheckoutMutation } from "@/redux/feature/checkout/checkoutApi";
import { useRemoveFromCartMutation } from "@/redux/feature/cart/cartApi";
import Error from "@/tools/Error";
import NoData from "@/tools/NoData";
import PageLayout from "@/tools/PageLayout";
import CustomPagination from "@/tools/CustomPagination";
import { StarRating } from "@/tools/StarRating";
import { SuccessToast } from "@/lib/utils";
import RemoveButton from "./RemoveButton";

interface CartItem {
  id: string;
  courseId: string;
  cartId: string;
  courseTitle: string;
  courseThumbnail: string;
  price: number;
  discountPrice?: number;
  instructorName: string;
  categoryName: string;
  avgRating: number;
  totalRatings: number;
  totalLessons: number;
  totalHours: number;
}

const Cart = () => {
  const router = useRouter();
  const t = useTranslations("CartPage");

  const { currentPage, setCurrentPage, totalPages, items, isLoading, isError } =
    useSmartFetchHook(useGetCartQuery);

  const [addToCheckout, { isLoading: checkoutLoading }] =
    useAddToCheckoutMutation();

  // Cast items to CartItem array for TypeScript
  const cartItems = items as CartItem[];

  // Calculate total price considering discounts
  const totalPrice = cartItems.reduce((sum: number, item: CartItem) => {
    return sum + (item.discountPrice || item.price);
  }, 0);

  const handleCheckout = async () => {
    try {
      await addToCheckout({
        courseIds: cartItems.map((item) => item.courseId),
      });
      router.push("/checkout");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <PageLayout
      pagination={
        <CustomPagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
        />
      }
      paddingSize="compact"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course List */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="w-12 h-12 animate-spin" />
              </div>
            ) : isError ? (
              <Error msg={t("error_message")} />
            ) : items.length === 0 ? (
              <NoData msg={t("empty_cart")} />
            ) : (
              cartItems.map((course: CartItem) => (
                <Card
                  key={course.id}
                  className="overflow-hidden hover:shadow-md transition-shadow py-0"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row">
                      {/* Course Image */}
                      <div className="relative sm:w-40 sm:h-32 w-full h-48 flex-shrink-0 max-w-sm mx-auto sm:mx-0">
                        <Image
                          src={course.courseThumbnail || "/placeholder.svg"}
                          alt={course.courseTitle}
                          fill
                          className="w-full h-full object-cover rounded-lg"
                          sizes="(max-width: 640px) 100vw, 160px"
                          priority
                        />
                      </div>

                      {/* Course Details */}
                      <div className="flex-1 p-3 sm:p-4 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-card-foreground text-sm sm:text-base leading-tight mb-1 break-words">
                              {course.courseTitle}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-2">
                              By {course.instructorName}
                            </p>

                            {/* Rating */}
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span className="text-sm font-medium text-card-foreground">
                                {course.avgRating.toFixed(1)}
                              </span>
                              <StarRating
                                rating={course.avgRating}
                                totalStars={5}
                              />
                              <span className="text-xs text-muted-foreground">
                                ({course.totalRatings} Ratings)
                              </span>
                            </div>

                            {/* Course Meta */}
                            <div className="flex items-center gap-3 sm:gap-4 text-xs text-muted-foreground flex-wrap">
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{course.totalHours}h</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                <span>{course.totalLessons} lessons</span>
                              </div>
                            </div>
                          </div>

                          {/* Price and Actions */}
                          <div className="flex flex-col justify-between items-start md:items-end gap-3 md:gap-10 sm:gap-4 flex-shrink-0 h-full sm:h-auto">
                            <div className="text-base sm:text-lg font-bold text-card-foreground text-center">
                              zł{" "}
                              {course.discountPrice
                                ? course.discountPrice.toFixed(2)
                                : course.price.toFixed(2)}
                              {course.discountPrice && (
                                <span className="text-xs sm:text-sm text-muted-foreground line-through ml-1 sm:ml-2 block sm:inline">
                                  zł {course.price.toFixed(2)}
                                </span>
                              )}
                            </div>
                            <RemoveButton
                              courseId={course.courseId}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardContent>
              <h2 className="text-xl font-bold text-card-foreground mb-6">
                {t("order_overview")}
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    {t("total_courses")}:
                  </span>
                  <span className="font-medium text-card-foreground">
                    {cartItems.length}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <span className="text-muted-foreground">
                    {t("subtotal")}:
                  </span>
                  <span className="text-xl font-bold text-card-foreground">
                    zł{totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                loading={checkoutLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3"
                disabled={cartItems.length === 0 || checkoutLoading}
              >
                {t("checkout_button")}
              </Button>

              {cartItems.length === 0 && (
                <p className="text-sm text-muted-foreground text-center mt-3">
                  Select courses to proceed with checkout
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default Cart;
