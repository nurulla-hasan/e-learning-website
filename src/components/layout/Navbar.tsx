"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";
import NavDropDown from "./NavDropDown";
import { useTranslations } from "next-intl";
import { usePathname, Link as NextIntlLink } from "@/i18n/navigation";
import { useRouter } from "next/navigation";
import LanguageDropDown from "./LanguageDropDown";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetUserProfileQuery } from "@/redux/feature/profile/profileApi";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();
  const t = useTranslations("Navbar");
  const currentPathname = usePathname();

  const token = useSelector((state: RootState) => state.auth.accessToken);
  const user = useSelector((state: RootState) => state.profile.profile);
  const isAuthenticated = Boolean(token && user);

  const { isLoading } = useGetUserProfileQuery(undefined, {
    skip: !token,
  });

  const handleNavigate = (path: string) => {
    router.push(path);
  };
  const navItems = [
    { name: t("home"), href: "/" },
    { name: t("courses"), href: "/courses" },
    { name: t("about"), href: "/policy/about" },
    { name: t("contact"), href: "/contact" },
    // { name: "Google", href: "/google" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex justify-between items-center h-18">
          <NextIntlLink href="/" className="flex-shrink-0">
            <Image
              src="/images/logo.png"
              height={600}
              width={600}
              alt="logo"
              className="h-[60px] w-[60px]"
              priority
            />
          </NextIntlLink>
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={` ${
                    currentPathname === item.href
                      ? "text-cyan-600"
                      : "text-gray-700"
                  } hover:text-cyan-600 px-3 py-2 text-md font-medium transition-colors`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Right Side Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {isClient && (
              <>
                {isLoading ? (
                  <>
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </>
                ) : (
                  isAuthenticated && (
                    <>
                      <Button
                        onClick={() => handleNavigate("/favorites")}
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                      >
                        <Bookmark />
                      </Button>
                      <Button
                        onClick={() => handleNavigate("/cart")}
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                      >
                        <ShoppingCart />
                      </Button>
                    </>
                  )
                )}
              </>
            )}
            <LanguageDropDown />
            {isClient && (
              <NavDropDown
                user={user}
                isAuthenticated={isAuthenticated}
                isLoading={isLoading}
              />
            )}
          </div>
          {/* Mobile menu button */}
          <MobileMenu
            user={user}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
