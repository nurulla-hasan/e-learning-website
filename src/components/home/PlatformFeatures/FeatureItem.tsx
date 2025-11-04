import { TFeature } from "@/types/home.type";
import Image from "next/image";

type TProps = {
  feature: TFeature;
};

const FeatureItem = ({ feature }: TProps) => {
  return (
    <>
      <div className="bg-slate-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300 border border-slate-200">
        <div className="w-16 h-16 mx-auto mb-6 bg-sky-100/70 rounded-2xl flex items-center justify-center">
          <Image
            src={feature?.icon}
            width={50}
            height={50}
            alt="icon"
            className="h-auto w-auto"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          {feature?.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {feature?.subTitle}
        </p>
      </div>
    </>
  );
};

export default FeatureItem;
