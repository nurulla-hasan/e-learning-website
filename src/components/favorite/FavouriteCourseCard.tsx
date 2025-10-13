import { Card, CardContent } from "@/components/ui/card";
import { IFavoriteCourse } from "@/types/course.type";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button"


type TProps = {
  course: IFavoriteCourse
}

const FavouriteCourseCard = ({ course }: TProps) => {
  return (
    <>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg pt-0">
        <div className="relative">
          <Image
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            width={600}
            height={600}
            className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-2 h-8 w-8 bg-white/80 backdrop-blur-sm hover:bg-white"
          >
            <Heart className={`h-4 w-4 ${course.isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
          </Button>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg leading-tight mb-3 text-balance">{course.title}</h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="font-bold text-xl text-foreground">${course.currentPrice.toFixed(2)}</span>
            <span className="text-sm text-muted-foreground line-through">${course.originalPrice.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1 mb-3">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium text-sm">{course.rating}</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>
        </CardContent>
      </Card>
    </>
  )
}

export default FavouriteCourseCard