import { ChevronDown, Filter } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { levels } from "@/data/course.data";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Dispatch, SetStateAction } from "react";
import { useTranslations } from "next-intl";
import { StarRating } from "@/tools/StarRating";
import { Skeleton } from "@/components/ui/skeleton";

type TProps = {
    selectedCategories: string[];
    setSelectedCategories: Dispatch<SetStateAction<string[]>>;
    selectedLevels: string[];
    setSelectedLevels: Dispatch<SetStateAction<string[]>>;
    priceRange: number[];
    setPriceRange: Dispatch<SetStateAction<number[]>>;
    minRating: number;
    setMinRating: Dispatch<SetStateAction<number>>;
    categories: any[];
    categoriesLoading: boolean;
}

const FilterSidebar = ({selectedCategories, setSelectedCategories, selectedLevels, setSelectedLevels, priceRange, setPriceRange, minRating, setMinRating, categories, categoriesLoading}: TProps) => {
     const t = useTranslations('CoursesPage');
    
    const toggleCategory = (category: string, checked: boolean) => {
      if (checked) {
        setSelectedCategories([...selectedCategories, category])
      } else {
        setSelectedCategories(selectedCategories.filter(c => c !== category))
      }
    }

    const toggleLevel = (level: string, checked: boolean) => {
      if (checked) {
        setSelectedLevels([...selectedLevels, level])
      } else {
        setSelectedLevels(selectedLevels.filter(l => l !== level))
      }
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
                  {categoriesLoading ? (
                    <div className="space-y-3 mt-3">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Skeleton className="h-4 w-4" />
                          <Skeleton className="h-4 w-4/5" />
                        </div>
                      ))}
                    </div>
                  ) : categories && categories.length > 0 ? (
                    categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`cat-${category.id}`}
                          checked={selectedCategories.includes(category.name)}
                          onCheckedChange={(checked) => toggleCategory(category.name, Boolean(checked))}
                          className="data-[state=checked]:border-[#46BEF2] data-[state=checked]:bg-[#46BEF2] data-[state=checked]:text-white dark:data-[state=checked]:border-[#46BEF2] dark:data-[state=checked]:bg-[#46BEF2]"
                        />
                        <label htmlFor={`cat-${category.id}`} className="text-sm text-muted-foreground cursor-pointer">
                          {category.name}
                        </label>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">{t("no_categories") || "No categories found"}</p>
                  )}
                </CollapsibleContent>
            </Collapsible>

            {/* Level Filter */}
            <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-between w-full text-left font-medium">
                     {t("level_title")}
                    <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-3 mt-3">
                    {levels.map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <Checkbox
                          id={`lvl-${level}`}
                          checked={selectedLevels.includes(level)}
                          onCheckedChange={(checked) => toggleLevel(level, Boolean(checked))}
                          className="data-[state=checked]:border-[#46BEF2] data-[state=checked]:bg-[#46BEF2] data-[state=checked]:text-white dark:data-[state=checked]:border-[#46BEF2] dark:data-[state=checked]:bg-[#46BEF2]"
                        />
                        <label htmlFor={`lvl-${level}`} className="text-sm text-muted-foreground cursor-pointer">
                          {level}
                        </label>
                      </div>
                    ))}
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

