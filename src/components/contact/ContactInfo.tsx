import { MapPin, Mail, Phone } from "lucide-react"
import { useTranslations } from "next-intl";

const ContactInfo =() => {
  const t = useTranslations('ContactPage');

  return (
    <section className="">
      <h1 className="text-3xl font-semibold text-foreground mb-4">{t("contact_info_title")}</h1>
      <p className="text-muted-foreground mb-12 mx-auto text-balance">
        {t("contact_info_subtitle")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Location */}
        <div className="flex flex-col items-center text-center bg-secondary px-4 py-8 shadow-sm rounded-md">
          <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mb-4">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">{t("location_title")}:</h3>
          <p className="text-muted-foreground text-sm">620 Eighth St, Carlina, Delaware 19958</p>
        </div>

        {/* Email */}
        <div className="flex flex-col items-center text-center bg-secondary px-4 py-8 shadow-sm rounded-md">
          <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">{t("email_title")}:</h3>
          <p className="text-muted-foreground text-sm">info@ourshop.com</p>
        </div>

        {/* Phone */}
        <div className="flex flex-col items-center text-center bg-secondary px-4 py-8 shadow-sm rounded-md">
          <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center mb-4">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">{t("phone_title")}:</h3>
          <p className="text-muted-foreground text-sm">+374 440 555</p>
        </div>
      </div>
    </section>
  )
}


export default ContactInfo;