"use client";
import { useTranslations } from "next-intl";

type TProps = {
    title: string;
}

const PageHeader = ( { title }: TProps) => {
    const t = useTranslations('Navbar');

    return (
        <>
            <div className="bg-secondary py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-semibold text-center mb-4 text-balance">{title}</h1>
                    <nav className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <span className="hover:text-foreground cursor-pointer transition-colors">{t('home')}</span>
                        <span>›</span>
                        <span className="text-foreground">{title}</span>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default PageHeader