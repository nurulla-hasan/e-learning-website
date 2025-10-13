"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

interface PriceRangeSliderProps {
  min?: number
  max?: number
  step?: number
  defaultValue?: [number, number]
  onValueChange?: (value: [number, number]) => void
  className?: string
}

const PriceRangeSlider = ({
  min = 0,
  max = 5000,
  step = 50,
  defaultValue = [50, 2500],
  onValueChange,
  className,
}: PriceRangeSliderProps) => {
  const [values, setValues] = useState<[number, number]>(defaultValue);
   const t = useTranslations('CoursesPage');

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMin = Math.min(Number(e.target.value), values[1] - step)
      const newValues: [number, number] = [newMin, values[1]]
      setValues(newValues)
      onValueChange?.(newValues)
    },
    [values, step, onValueChange],
  )

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newMax = Math.max(Number(e.target.value), values[0] + step)
      const newValues: [number, number] = [values[0], newMax]
      setValues(newValues)
      onValueChange?.(newValues)
    },
    [values, step, onValueChange],
  )

  const minPercent = ((values[0] - min) / (max - min)) * 100
  const maxPercent = ((values[1] - min) / (max - min)) * 100

  return (
    <div className={cn("w-full max-w-md mx-auto space-y-6", className)}>
      <h2 className="font-medium">{t("price_range_title")}</h2>

      {/* Slider Track */}
      <div className="relative h-2">
        {/* Background track */}
        <div className="absolute w-full h-2 bg-gray-300 rounded-full" />

        {/* Active track */}
        <div
          className="absolute h-2 bg-cyan-500 rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* Min thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={values[0]}
          onChange={handleMinChange}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
          style={{ zIndex: 1 }}
        />

        {/* Max thumb */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={values[1]}
          onChange={handleMaxChange}
          className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
          style={{ zIndex: 2 }}
        />
      </div>

      {/* Value inputs */}
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="number"
            value={values[0]}
            onChange={(e) => {
              const newMin = Math.min(Number(e.target.value), values[1] - step)
              const newValues: [number, number] = [newMin, values[1]]
              setValues(newValues)
              onValueChange?.(newValues)
            }}
            className="w-full px-4 py-3 text-lg font-medium text-center border border-gray-300 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            min={min}
            max={max}
            step={step}
          />
        </div>
        <div className="flex-1">
          <input
            type="number"
            value={values[1]}
            onChange={(e) => {
              const newMax = Math.max(Number(e.target.value), values[0] + step)
              const newValues: [number, number] = [values[0], newMax]
              setValues(newValues)
              onValueChange?.(newValues)
            }}
            className="w-full px-4 py-3 text-lg font-medium text-center border border-gray-300 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            min={min}
            max={max}
            step={step}
          />
        </div>
      </div>
    </div>
  )
}


export default PriceRangeSlider;