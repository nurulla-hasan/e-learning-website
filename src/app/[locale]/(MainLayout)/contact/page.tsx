import PageHeader from "@/components/common/PageHeader";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { getTranslations } from "next-intl/server";

interface TProps {
  params: {
    locale: string;
  };
}

const ContactPage = async ({ params }: TProps) => {
  const {locale} = params;
  const t = await getTranslations({locale});
  const title = t("Header.contact");

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={title} />
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ContactInfo />
        <div className="mt-16">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}


export default ContactPage;