import { TFaq } from "@/types/faq.type";
import { useState } from "react";

type TProps = {
  faq: TFaq;
};

const FaqItem = ({ faq }: TProps) => {
  const [openItem, setOpenItem] = useState(false);

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => setOpenItem(!openItem)}
          className="w-full px-6 py-4 text-left flex items-center gap-x-2 justify-between hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
        >
          <span className="font-medium text-gray-900">{faq.question}</span>
          <svg
            className={`w-5 h-5 text-blue-500 transition-transform duration-200 ${
              openItem ? "transform rotate-90" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
        {openItem && (
          <div className="px-6 pb-4">
            <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default FaqItem;
