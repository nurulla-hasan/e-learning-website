import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Heart,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  User,
  BookOpen,
  Clock,
  Package,
  LogIn,
  Home,
  Info,
  MessageCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter as useNextRouter } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useGetUserProfileQuery } from "@/redux/feature/profile/profileApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/feature/auth/authSlice";
import { useDispatch } from "react-redux";
import { getInitials } from "@/lib/utils";
import { Switch } from "../ui/switch";

const MobileMenu = ({
  user,
  isAuthenticated,
}: {
  user: any;
  isAuthenticated: boolean;
}) => {
  const tNav = useTranslations("Navbar");
  const t = useTranslations("DropDown");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const nextRouter = useNextRouter();
  const currentPathname = usePathname();
  const locale = useLocale();

  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const { isLoading } = useGetUserProfileQuery(undefined, {
    skip: !token,
  });

  const navItems = [
    {
      name: tNav("home"),
      href: "/",
      icon: <Home className="mr-3 h-4 w-4 text-muted-foreground" />,
    },
    {
      name: tNav("courses"),
      href: "/courses",
      icon: <BookOpen className="mr-3 h-4 w-4 text-muted-foreground" />,
    },
    {
      name: tNav("about"),
      href: "/policy/about",
      icon: <Info className="mr-3 h-4 w-4 text-muted-foreground" />,
    },
    {
      name: tNav("contact"),
      href: "/contact",
      icon: <MessageCircle className="mr-3 h-4 w-4 text-muted-foreground" />,
    },
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleLanguageChange = (locale: string) => {
    nextRouter.push(currentPathname, { locale, scroll: false });
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <>
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.image} alt={user?.fullName} />
                    <AvatarFallback>
                      {getInitials(user?.fullName || "")}
                    </AvatarFallback>
                  </Avatar>
                  {/* <span className="text-base font-medium text-gray-700">
                  {user?.fullName}
                </span> */}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {isLoading ? (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    Loading...
                  </div>
                ) : isAuthenticated ? (
                  <>
                    <DropdownMenuItem
                      onClick={() => {
                        handleNavigate("/profile");
                        setIsOpen(false);
                      }}
                    >
                      <User className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span>{t("profile")}</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => {
                        handleNavigate("/my-learning");
                        setIsOpen(false);
                      }}
                    >
                      <BookOpen className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span>{t("my_learning")}</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => {
                        handleNavigate("/learning-history");
                        setIsOpen(false);
                      }}
                    >
                      <Clock className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span>{t("learning_history")}</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => {
                        handleNavigate("/orders");
                        setIsOpen(false);
                      }}
                    >
                      <Package className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span>{t("my_orders")}</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => handleNavigate("/training-request")}
                      className="cursor-pointer"
                    >
                      <Package />
                      <span>{t("training_request")}</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => {
                        handleNavigate("/favorites");
                        setIsOpen(false);
                      }}
                    >
                      <Heart className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span>Favorites</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => {
                        handleNavigate("/cart");
                        setIsOpen(false);
                      }}
                    >
                      <ShoppingBag className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span>Cart</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      <span>{t("logout")}</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem
                      onClick={() => {
                        handleNavigate("/favorites");
                        setIsOpen(false);
                      }}
                    >
                      <Heart className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span>Favorites</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => {
                        handleNavigate("/cart");
                        setIsOpen(false);
                      }}
                    >
                      <ShoppingBag className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span>Cart</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      onClick={() => {
                        handleNavigate("/login");
                        setIsOpen(false);
                      }}
                    >
                      <LogIn className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span>{t("sign_in")}</span>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <SheetTrigger asChild>
              <Button variant="ghost" className="hover:text-black" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          </div>

          <SheetContent>
            <SheetDescription className="sr-only">Menu</SheetDescription>
            <div className="flex items-center space-x-3 p-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user?.image} alt={user?.fullName} />
                <AvatarFallback>
                  {getInitials(user?.fullName || "")}
                </AvatarFallback>
              </Avatar>
              <span className="text-base font-medium text-gray-700">
                {user?.fullName}
              </span>
            </div>
            <div className="flex flex-col space-y-4 px-4 border-t pt-4">
              {/* Mobile Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    currentPathname === item.href
                      ? "text-cyan-600 bg-cyan-50"
                      : "text-gray-700"
                  } flex items-center border rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent/50`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}

              {/* Language Toggle */}
              <div className="pt-4 border-t mt-4">
                <div className="px-3 py-2">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        {tNav("language")}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {locale === "en"
                          ? "Switch to Polish"
                          : "Przełącz na angielski"}
                      </p>
                    </div>
                    <div className="inline-flex w-fit items-center bg-muted rounded-full p-0.5">
                      <button
                        onClick={() => handleLanguageChange("en")}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          locale === "en"
                            ? "bg-white shadow-sm text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => handleLanguageChange("pl")}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          locale === "pl"
                            ? "bg-white shadow-sm text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        PL
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Icons - Removed as they're now in the dropdown */}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default MobileMenu;
