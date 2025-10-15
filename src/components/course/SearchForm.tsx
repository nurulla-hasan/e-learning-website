// src/components/course/SearchForm.tsx
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { ChangeEvent } from "react";

interface SearchFormProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchForm = ({ searchTerm, setSearchTerm }: SearchFormProps) => {
  const t = useTranslations('CoursesPage');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

    return (
        <>
            {/* Header */}
            <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-4">
                    <div className="flex items-center justify-between">
                        <nav className="text-sm text-muted-foreground">
                            <span>{t("course_bradcramb")}</span>
                        </nav>
                        <div className="relative w-full max-w-xs">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={t("search_placeholder")}
                                value={searchTerm}
                                onChange={handleSearch}
                                className="pl-10"
                            />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default SearchForm