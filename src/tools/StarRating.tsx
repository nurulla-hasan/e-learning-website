import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export const StarRating = ({
  rating = 0,
  totalStars = 5,
  onRate,
  size = 18,
  gap = 1,
  className,
}: {
  rating: number;
  totalStars: number;
  onRate?: (rating: number) => void;
  size?: number;
  gap?: number;
  className?: string;
}) => {
  return (
    <div className={cn(`flex items-center gap-${gap}`, className)}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const isActive = starValue <= rating;

        return (
          <Star
            key={starValue}
            size={size}
            className={cn(
              "cursor-pointer transition-transform duration-200",
              isActive ? "text-yellow-400 fill-yellow-400" : "text-primary",
              onRate && "hover:scale-110"
            )}
            onClick={() => {
              if (!onRate) return;
              onRate(rating === starValue ? 0 : starValue);
            }}
          />
        );
      })}
    </div>
  );
};