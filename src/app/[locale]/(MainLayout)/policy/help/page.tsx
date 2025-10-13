import PageHeader from '@/components/common/PageHeader'
import Help from '@/components/policy/Help'
import { getTranslations } from 'next-intl/server';

interface TProps {
  params: {
    locale: string;
  };
}

const HelpPage = async ({ params }: TProps) => {
  const {locale} = params;
  const t = await getTranslations({locale});
  const title = t("Header.help");

  return (
    <>
      <div className="min-h-screen bg-background">
        <PageHeader title={title} />
        <Help/>
      </div>
    </>
  )
}

export default HelpPage