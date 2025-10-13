"use client";
import type { LucideIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface CategoryCardProps {
    icon: LucideIcon
    title: string
}

const CategoryItem = ({ icon: Icon, title }: CategoryCardProps) => {
    const router = useRouter();

    const handleNavigate = (category:string) => {
        router.push(`/course-by-category/${category}`)
    }
    return (
        <div
            onClick={()=> handleNavigate(title)}
            className="bg-[#EDF9FE] rounded-3xl p-8 flex flex-col items-center justify-center min-h-[200px] w-full max-w-[200px] shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-sky-300/50"
        >
            <div className="w-20 h-20 bg-white rounded-lg rotate-45 flex items-center justify-center mb-6 shadow-sm">
                <Icon className="w-8 h-8 text-sky-500 -rotate-45" />
            </div>

            {/* Category title */}
            <h3 className="text-sky-400 font-medium text-center text-sm leading-tight">{title}</h3>
        </div>
    )
}


export default CategoryItem;