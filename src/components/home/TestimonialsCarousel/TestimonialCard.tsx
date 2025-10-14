import { Card } from "@/components/ui/card";
import { testimonials } from "@/data/testimonials.data";
import { StarRating } from "@/tools/StarRating";
import { motion } from "framer-motion"
import Image from "next/image";

const TestimonialCard = ({ testimonial, isActive }: { testimonial: (typeof testimonials)[0]; isActive: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0.7, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card className="p-6 h-full bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
        <StarRating 
          rating={testimonial.rating} 
          totalStars={5}
          size={18}
          gap={1}
          className="mb-2"
        />

        <motion.p
          className="text-gray-600 leading-relaxed mb-6 text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {testimonial.text}
        </motion.p>

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            <Image
              src={testimonial.avatar || "/placeholder.svg"}
              alt={testimonial.name}
              className="w-full h-full object-cover"
              width={60}
              height={60}
            />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 text-sm md:text-base">{testimonial.name}</h4>
            <p className="text-gray-500 text-xs md:text-sm">{testimonial.role}</p>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  )
}


export default TestimonialCard;