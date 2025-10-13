import { Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

interface Review {
  id: number
  name: string
  date: string
  rating: number
  comment: string
  avatar?: string
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Dianne Russell",
    date: "05 January, 2025",
    rating: 4,
    comment:
      "I bought the Messi Argentina home jersey and was blown away by the fabric quality. The fit is true to size and super comfortable — feels just like the official kit. Definitely worth the price!",
  },
  {
    id: 2,
    name: "Darlene Robertson",
    date: "03 January, 2025",
    rating: 4,
    comment:
      "The material is excellent and the print looks sharp. Only reason I'm giving 4 stars is because the medium was a bit looser than expected — The fit is true to size and super comfortable and good. I might size down next time.",
  },
  {
    id: 3,
    name: "Darrell Steward",
    date: "01 January, 2025",
    rating: 4,
    comment:
      "I bought the Messi Argentina home jersey and was blown away by the fabric quality. The fit is true to size and super comfortable.",
  },
]

function StarRating({ rating, maxRating = 5 }: { rating: number; maxRating?: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
        />
      ))}
    </div>
  )
}

const ReviewTab = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Review & Rating:</h2>
      </div>

      {/* Overall Rating */}
      <Card className="p-6">
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold">4.8</div>
          <div className="flex items-center justify-center gap-2">
            <StarRating rating={4} />
            <span className="text-muted-foreground">(45)</span>
          </div>
          <div className="text-muted-foreground">Overall Rating</div>
        </div>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">All Review & Rating:</h3>

        {reviews.map((review) => (
          <Card key={review.id} className="p-6">
            <div className="flex gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                <AvatarFallback>
                  {review.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">{review.comment}</p>
              </div>
            </div>
          </Card>
        ))}

        {/* <div className="text-center pt-4">
          <Button variant="ghost" className="text-blue-500 hover:text-blue-600">
            View All →
          </Button>
        </div> */}
      </div>
    </div>
  )
}

export default ReviewTab;