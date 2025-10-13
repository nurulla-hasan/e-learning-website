import { useTranslations } from "next-intl";
import FeatureItem from "./FeatureItem";

const PlatformFeatures = () =>{
    const t = useTranslations("HomePage.platform")
  

  const features = [
    {
      title: "24/7 Access",
      subTitle: "Learn anytime, anywhere",
      icon: "/images/features/lock.png"
    },
    {
      title: "Course Materials Included",
      subTitle: "Videos, PDFs, DOCX, and more",
      icon: "/images/features/video.png"
    },
    {
      title: "Instant Certificates",
      subTitle: "Auto-generated PDFs on completion",
      icon: "/images/features/certificate.png"
    },
    {
      title: "Secure Payment",
      subTitle: "Integrated with Przelewy24",
      icon: "/images/features/payment.png"
    }
  ]


  return (
    <main className="bg-background">
      <section className="w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-title mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features?.map((feature, index)=>(
              <FeatureItem key={index} feature={feature}/>
            ))
            }
          </div>
        </div>
      </section>
    </main>
  )
}


export default PlatformFeatures;