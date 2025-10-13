import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import { TCourse } from "@/types/course.type";
import Link from "next/link";
import { useState } from "react";

type TProps = {
    course: TCourse
}

const CourseListItem = ({ course }: TProps) => {
    const [isFavorite, setIsFavorite] = useState(false)

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite)
        // Here you can add logic to save to database or local storage
    }
    return (
        <>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow pt-0 relative">
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 z-10 h-8 w-8 p-0 bg-white/80 hover:bg-white/90 rounded-full shadow-sm"
                    onClick={toggleFavorite}
                >
                    <Heart
                        className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"
                            } transition-colors`}
                    />
                </Button>
                <Link href="/courses/55" className="aspect-video relative overflow-hidden">
                    <Image
                        src={course.image || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        width={500}
                        height={500}
                    />
                </Link>
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{course.description}</p>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < Math.floor(course.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-medium">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                            {course.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                            {course.level}
                        </Badge>
                    </div>
                </CardContent>
                <CardFooter className="pt-0">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-primary">${course.price.toFixed(2)}</span>
                            <span className="text-sm text-muted-foreground line-through">
                                ${course.originalPrice.toFixed(2)}
                            </span>
                        </div>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                            Enroll Now
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </>
    )
}

export default CourseListItem