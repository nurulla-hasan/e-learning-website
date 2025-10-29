"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Image from "next/image";
import EditAccountModal from "../modal/auth/EditAccountModal";
import ChangePasswordModal from "../modal/auth/ChangePasswordModal";
import PageLayout from "@/tools/PageLayout";
import { useGetUserProfileQuery } from "@/redux/feature/profile/profileApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState } from "react";

const Profile = () => {
  const t = useTranslations("ProfilePage");
  const { isLoading } = useGetUserProfileQuery({});
  const user = useSelector((state: RootState) => state.profile.profile);
  const [imageError, setImageError] = useState(false);
  console.log(user);

  // Return loading state if user data is not yet loaded
  if (isLoading || !user) {
    return (
      <PageLayout paddingSize="none">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout paddingSize="none">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          {/* Left Illustration */}
          <div className="w-full hidden lg:block lg:w-1/2 xl:w-2/5 relative">
            <div className="relative">
              <Image
                width={600}
                height={600}
                src={
                  imageError || !user?.image
                    ? "/images/profile.png"
                    : user.image
                }
                alt="profile image"
                className="w-full object-cover rounded-xl"
                onError={() => setImageError(true)}
              />
            </div>
          </div>

          {/* Right Main Content */}
          <div className="flex-1 md:py-12 py-4 lg:pl-8">
            <div className="space-y-8">
              {/* Profile Header */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={
                      imageError || !user?.image
                        ? "/images/profile.png"
                        : user.image
                    }
                    alt="Profile picture"
                  />
                  <AvatarFallback className="text-lg">LA</AvatarFallback>
                </Avatar>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-foreground">
                    {user?.fullName}
                  </h1>
                </div>
              </div>

              {/* Login Details Card */}
              <Card className="w-full">
                <CardHeader className="flex flex-col lg:flex-row items-center justify-between">
                  <CardTitle className="text-lg">{t("loginDetails")}</CardTitle>
                  <EditAccountModal isLoading={isLoading} user={user} />
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        {t("fullName")}
                      </label>
                      <p className="text-foreground font-medium">
                        {user?.fullName}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        {t("email")}
                      </label>
                      <p className="text-foreground font-medium">
                        {user?.email}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        {t("phoneNumber")}
                      </label>
                      <p className="text-foreground font-medium">
                        {user?.phoneNumber}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        {t("dateOfBirth")}
                      </label>
                      <p className="text-foreground font-medium">{user?.dateOfBirth}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">
                        NIP ID
                      </label>
                      <p className="text-foreground font-medium">{user?.vatId}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Password Card */}
              <Card>
                <CardHeader className="flex flex-col lg:flex-row items-center justify-between">
                  <CardTitle className="text-lg">{t("password")}</CardTitle>
                  <ChangePasswordModal/>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">
                      {t("currentPassword")}
                    </label>
                    <p className="text-foreground font-medium tracking-wider">
                      ••••••••
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
    </PageLayout>
  );
};

export default Profile;
