'use client';

import PageHeader from "@/components/common/PageHeader";
import Profile from "@/components/profile/Profile";
import { useTranslations } from 'next-intl';

export default function ProfilePage() {
  const t = useTranslations('Header');
  const title = t('profile');

  return (
    <div className="min-h-screen">
      <PageHeader title={title} />
      <Profile />
    </div>
  );
}