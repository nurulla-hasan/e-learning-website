import PageHeader from "@/components/common/PageHeader";
import Profile from "@/components/profile/Profile"
import { getTranslations } from "next-intl/server";

interface TProps {
  params: {
    locale: string;
  };
}

const ProfilePage = async ({ params }: TProps) => {
  const {locale} = params;
  const t = await getTranslations({locale});
  const title = t("Header.profile");

    return (
        <>
            <div className="min-h-screen bg-background">
               <PageHeader title={title}/>
               <Profile/>
            </div>
        </>
    )
}


export default ProfilePage