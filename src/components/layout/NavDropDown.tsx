"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, BookOpen, Clock, Package, LogIn } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/feature/auth/authSlice";

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  role: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface NavDropDownProps {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const NavDropDown = ({
  user,
  isAuthenticated,
  isLoading,
}: NavDropDownProps) => {
  const router = useRouter();
  const t = useTranslations("DropDown");
  const dispatch = useDispatch();
  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <DropdownMenu>
      {isLoading ? (
        <div className="flex items-center space-x-2 ml-6">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-26" />
        </div>
      ) : isAuthenticated ? (
        <>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 ml-4 hover:bg-gray-50"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/images/profile.png" alt={user?.fullName} />
                <AvatarFallback className="text-gray-700">MM</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-700">
                {user?.fullName}
              </span>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => handleNavigate("/profile")}
              className="cursor-pointer"
            >
              <User />
              <span>{t("profile")}</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => handleNavigate("/my-learning")}
              className="cursor-pointer"
            >
              <BookOpen />
              <span>{t("my_learning")}</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => handleNavigate("/learning-history")}
              className="cursor-pointer"
            >
              <Clock />
              <span>{t("learning_history")}</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => handleNavigate("/orders")}
              className="cursor-pointer"
            >
              <Package />
              <span>{t("my_orders")}</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <LogOut />
              <span>{t("logout")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </>
      ) : (
        <>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <User />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => handleNavigate("/login")}
              className="cursor-pointer"
            >
              <LogIn />
              <span>{t("sign_in")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </>
      )}
    </DropdownMenu>
  );
};

export default NavDropDown;
