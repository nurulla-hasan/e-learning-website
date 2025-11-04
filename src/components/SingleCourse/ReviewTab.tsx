import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { StarRating } from "@/tools/StarRating";
import { useTranslations } from "next-intl";

// Define types based on API response
interface Review {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    fullName: string;
    image?: string;
  };
}

interface ReviewTabProps {
  reviews: Review[];
}

const ReviewTab = ({ reviews }: ReviewTabProps) => {
  // Calculate overall rating from reviews
  const overallRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";
  const t = useTranslations("CourseDetails.reviews");

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">{t("title")}</h2>
      </div>

      {/* Overall Rating */}
      <Card className="p-6">
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold">{overallRating}</div>
          <div className="flex items-center justify-center gap-2">
            <StarRating rating={parseFloat(overallRating)} totalStars={5} size={20} />
            <span className="text-muted-foreground">({reviews.length})</span>
          </div>
          <div className="text-muted-foreground">{t("overall_label")}</div>
        </div>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">{t("list_title")}</h3>

        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.id} className="p-6">
              <div className="flex gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={review.user.image || "/placeholder.svg"} alt={review.user.fullName} />
                  <AvatarFallback>
                    {review.user.fullName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">{review.user.fullName}</h4>
                      <p className="text-sm text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                    <StarRating rating={review.rating} totalStars={5} size={16} />
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">{review.comment}</p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground">{t("empty")}</p>
        )}
      </div>
    </div>
  );
};

export default ReviewTab;