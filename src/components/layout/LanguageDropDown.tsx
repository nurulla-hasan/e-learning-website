import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useLocale } from 'next-intl';
import { usePathname, useRouter as useNextRouter  } from '@/i18n/navigation';
import { Button } from '../ui/button';


const LanguageDropDown = () => {
    const locale = useLocale();
    const nextRouter = useNextRouter();
    const currentPathname = usePathname();

    const handleLanguageChange = (locale: string) => {
        nextRouter.push(currentPathname, { locale, scroll: false });
    };
    
    return (
        <> 
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="bg-white/10 rounded-full">
                    {/* <Languages className="h-6 w-6" />
                          <span className="sr-only">Language</span> */}
                    {locale.toUpperCase()}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                    EN
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('pl')}>
                    PL
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('uk')}>
                    UK
                </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
        </>
    )
}

export default LanguageDropDown