"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Image from "next/image";
import EditAccountModal from "../modal/auth/EditAccountModal";
import ChangePasswordModal from "../modal/auth/ChangePasswordModal";

const Profile = () => {
  const t = useTranslations("ProfilePage");

  return (
    <div className="flex items-center">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:justify-between">
        {/* Left Illustration */}
        <div className="w-full hidden lg:block lg:w-1/2 xl:w-2/5 relative">
          <div className="h-64 relative">
            <Image
              width={600}
              height={600}
              src="/images/profile.png"
              alt="Account Management"
              className="w-full object-cover"
            />
          </div>
        </div>

        {/* Right Main Content */}
        <div className="flex-1 py-12 lg:pl-8">
          <div className="space-y-8">
            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/images/profile.png" alt="Profile picture" />
                <AvatarFallback className="text-lg">LA</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl font-bold text-foreground">Leslie Alexander</h1>
              </div>
            </div>

            {/* Login Details Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">{t("loginDetails")}</CardTitle>
                <EditAccountModal/>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      {t("fullName")}
                    </label>
                    <p className="text-foreground font-medium">Leslie Alexander</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      {t("email")}
                    </label>
                    <p className="text-foreground font-medium">debra.holt@example.com</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      {t("phoneNumber")}
                    </label>
                    <p className="text-foreground font-medium">(208) 555-0112</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      {t("dateOfBirth")}
                    </label>
                    <p className="text-foreground font-medium">04/08/2002</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Password Card */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">{t("password")}</CardTitle>
               <ChangePasswordModal/>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    {t("currentPassword")}
                  </label>
                  <p className="text-foreground font-medium tracking-wider">••••••••</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
