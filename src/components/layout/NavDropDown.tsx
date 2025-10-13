"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, BookOpen, Clock, Package, LogIn } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

const NavDropDown = () => {
    const router = useRouter();
    const t = useTranslations('DropDown');
    const handleNavigate = (path: string) => {
        router.push(path)
    }

    const handleLogout = () => {
      router.push("/")
      console.log("Logging out...")
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 ml-4 hover:bg-gray-50">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/images/profile.png" alt="Mr. Mike" />
            <AvatarFallback className="text-gray-700">MM</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-700">Mr. Mike</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={() => handleNavigate("/profile")} className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>{t("profile")}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => handleNavigate("/my-learning")} className="cursor-pointer">
          <BookOpen className="mr-2 h-4 w-4" />
          <span>{t("my_learning")}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => handleNavigate("/learning-history")} className="cursor-pointer">
          <Clock className="mr-2 h-4 w-4" />
          <span>{t("learning_history")}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => handleNavigate("/orders")} className="cursor-pointer">
          <Package className="mr-2 h-4 w-4" />
          <span>{t("my_orders")}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => handleNavigate("/login")} className="cursor-pointer">
          <LogIn className="mr-2 h-4 w-4" />
          <span>{t("sign_in")}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600 focus:text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t("logout")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default NavDropDown
