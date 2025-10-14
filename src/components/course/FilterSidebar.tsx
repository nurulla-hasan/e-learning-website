import { ChevronDown, Filter } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { categories, levels } from "@/data/course.data";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import { StarRating } from "@/tools/StarRating";

type TProps = {
    selectedCategory: string | null;
    setSelectedCategory: Dispatch<SetStateAction<string | null>>;
    selectedLevel: string | null;
    setSelectedLevel: Dispatch<SetStateAction<string | null>>;
    priceRange: number[];
    setPriceRange: Dispatch<SetStateAction<number[]>>;
    minRating: number;
    setMinRating: Dispatch<SetStateAction<number>>;
}

const FilterSidebar = ({selectedCategory, setSelectedCategory, selectedLevel, setSelectedLevel, priceRange, setPriceRange, minRating, setMinRating}: TProps) => {
     const t = useTranslations('CoursesPage');
    
    const handleCategoryChange = (val: string) => {
      setSelectedCategory(val || null)
    }

    const handleLevelChange = (val: string) => {
      setSelectedLevel(val || null)
    }


    return (
       <>
          <div className="w-full lg:w-80 bg-sidebar p-6 space-y-6 rounded-lg">
            <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5" />
                <h2 className="text-lg font-semibold">{t("filter_by")}</h2>
            </div>

            {/* Category Filter */}
            <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium">
                   {t("category_title")}
                    <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 mt-3">
                  <RadioGroup value={selectedCategory ?? ""} onValueChange={handleCategoryChange}>
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <RadioGroupItem id={`cat-${category}`} value={category} />
                        <label htmlFor={`cat-${category}`} className="text-sm text-muted-foreground cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </CollapsibleContent>
            </Collapsible>

            {/* Level Filter */}
            <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium">
                     {t("level_title")}
                    <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 mt-3">
                  <RadioGroup value={selectedLevel ?? ""} onValueChange={handleLevelChange}>
                    {levels.map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <RadioGroupItem id={`lvl-${level}`} value={level} />
                        <label htmlFor={`lvl-${level}`} className="text-sm text-muted-foreground cursor-pointer">
                          {level}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </CollapsibleContent>
            </Collapsible>
            {/* Price Range (shadcn Slider) */}
            <div>
              <h3 className="font-medium mb-3">{t("price_range_title")}</h3>
              <div className="space-y-3">
                <Slider
                  value={priceRange}
                  min={0}
                  max={5000}
                  step={50}
                  onValueChange={(val) => {
                    const v = val as number[]
                    setPriceRange(v)
                  }}
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            {/* Rating Filter */}
            <div>
                <h3 className="font-medium mb-3">{t("rating_title")}</h3>
                <div className="space-y-2">
                    <StarRating 
                        rating={minRating} 
                        totalStars={5}
                        onRate={(newRating) => {
                            setMinRating(newRating)
                        }}
                        size={20}
                        gap={2}
                        className="mb-2"
                    />
                </div>
            </div>
        </div>
       </>
    )
}

export default FilterSidebar;

