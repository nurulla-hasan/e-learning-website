import { Search } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'
import { Input } from '../ui/input';
import { useTranslations } from 'next-intl';

type TSearchFormProps = {
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>
}

const SearchForm = ({searchTerm, setSearchTerm}: TSearchFormProps) => {
    const t = useTranslations('CoursesPage');

    return (
        <>
            {/* Header */}
            <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <nav className="text-sm text-muted-foreground">
                            <span>{t("course_bradcramb")}</span>
                        </nav>
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={t("search_placeholder")}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
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