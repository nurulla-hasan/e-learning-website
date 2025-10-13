"use client"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import MobileMenu from "./MobileMenu"
import NavDropDown from "./NavDropDown"
import { useTranslations } from "next-intl"
import { usePathname, Link as NextIntlLink } from "@/i18n/navigation";
import { useRouter } from "next/navigation"
import LanguageDropDown from "./LanguageDropDown"


const Navbar = () => {
  const router = useRouter();
  const t = useTranslations('Navbar');
  const currentPathname = usePathname();

  const handleNavigate = (path: string) => {
    router.push(path)
  }



  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("courses"), href: "/courses" },
    { name: t("about"), href: "/policy/about" },
    { name: t("contact"), href: "/contact" },
    // { name: "Google", href: "/google" },
  ]


  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <NextIntlLink href="/" className="flex-shrink-0">
            <Image src="/images/logo.png" height={600} width={600} alt="logo" className="h-[60px] w-[60px]" />
          </NextIntlLink>
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={` ${currentPathname===item.href ? "text-blue-600" : "text-gray-700"} hover:text-blue-600 px-3 py-2 text-md font-medium transition-colors`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Right Side Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
              <BarChart3 className="h-5 w-5" />
            </Button> */}
            <Button
              onClick={() => handleNavigate("/favorites")}
              variant="ghost"
              size="icon"
              className="text-gray-600 cursor-pointer hover:text-gray-900"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button onClick={() => handleNavigate("/cart")} variant="ghost" size="icon" className="text-gray-600 cursor-pointer hover:text-gray-900">
              <ShoppingCart className="h-5 w-5" />
            </Button>
             <LanguageDropDown/>
            <NavDropDown/>
          </div>
          {/* Mobile menu button */}
          <MobileMenu/>
        </div>
      </div>
    </nav>
  )
}

export default Navbar