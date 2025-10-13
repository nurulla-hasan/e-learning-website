import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { BarChart3, Heart, LogOut, Menu, Search, ShoppingBag, User, BookOpen, Clock, Package, LogIn } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter as useNextRouter } from '@/i18n/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";


const MobileMenu = () => {
    const tNav = useTranslations('Navbar');
    const t = useTranslations('DropDown');
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const nextRouter = useNextRouter();
    const currentPathname = usePathname();
    const locale = useLocale();

    const navItems = [
        { name: tNav("home"), href: "/" },
        { name: tNav("courses"), href: "/courses" },
        { name: tNav("about"), href: "/policy/about" },
        { name: tNav("contact"), href: "/contact" },
        // { name: "Google", href: "/google" },
    ]


    const handleNavigate = (path: string) => {
        router.push(path)
    }

    const handleLanguageChange = (locale: string) => {
        nextRouter.push(currentPathname, { locale, scroll: false });
    };

    const handleLogout = () => {
        // Add your logout logic here
        console.log("Logging out...")
        // Example: router.push("/login");
    }

    return (
        <>
            <div className="md:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="bg-white/10 rounded-full hover:bg-white/20 mr-6">
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
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <SheetTrigger asChild>

                        <Button variant="ghost" className="hover:text-black" size="icon">
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>

                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <div className="flex flex-col space-y-4 mt-8">
                            {/* Mobile Navigation Links */}
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`${currentPathname === item.href ? "text-blue-600" : "text-gray-700"} px-3 py-2 text-base font-medium transition-colors`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            {/* Mobile Icons */}
                            <div className="flex items-center space-x-4 px-3 py-4 border-t border-gray-200 mt-6">
                                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                                    <Search className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                                    <BarChart3 className="h-5 w-5" />
                                </Button>
                                <Button
                                    onClick={() => handleNavigate("/favorites")}
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    <Heart className="h-5 w-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                                    <ShoppingBag className="h-5 w-5" />
                                </Button>

                            </div>

                            <div className="px-3 py-4 border-t border-gray-200">
                                <div className="flex items-center space-x-3 mb-4">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src="/professional-headshot.png" alt="Mr. Mike" />
                                        <AvatarFallback>MM</AvatarFallback>
                                    </Avatar>
                                    <span className="text-base font-medium text-gray-700">Mr. Mike</span>
                                </div>
                                <div className="space-y-2">
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start text-gray-700 hover:text-blue-600"
                                        onClick={() => {
                                            handleNavigate("/profile")
                                            setIsOpen(false)
                                        }}
                                    >
                                        <User className="mr-2 h-4 w-4" />
                                        {t("profile")}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start text-gray-700 hover:text-blue-600"
                                        onClick={() => {
                                            handleNavigate("/my-learning")
                                            setIsOpen(false)
                                        }}
                                    >
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        {t("my_learning")}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start text-gray-700 hover:text-blue-600"
                                        onClick={() => {
                                            handleNavigate("/learning-history")
                                            setIsOpen(false)
                                        }}
                                    >
                                        <Clock className="mr-2 h-4 w-4" />
                                        {t("learning_history")}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start text-gray-700 hover:text-blue-600"
                                        onClick={() => {
                                            handleNavigate("/orders")
                                            setIsOpen(false)
                                        }}
                                    >
                                        <Package className="mr-2 h-4 w-4" />
                                        {t("my_orders")}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start text-gray-700 hover:text-blue-600"
                                        onClick={() => {
                                            handleNavigate("/login")
                                            setIsOpen(false)
                                        }}
                                    >
                                        <LogIn className="mr-2 h-4 w-4" />
                                        {t("sign_in")}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => {
                                            handleLogout()
                                            setIsOpen(false)
                                        }}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        {t("logout")}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}

export default MobileMenu