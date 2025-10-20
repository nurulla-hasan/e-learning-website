"use client"

import { TFaq } from "@/types/faq.type";
import FaqItem from "./FaqItem"
import Link from "next/link";
import { useGetFaqQuery } from "@/redux/feature/legal/legalApi";

const FaqList = () => {
  const { data: faqData, isLoading, isError } = useGetFaqQuery({});

  const faqItems: TFaq[] = faqData?.data || [];

  if (isLoading) {
    return (
      <main>
        <div className="text-center mb-12">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-80 mx-auto animate-pulse"></div>
          </div>
        </div>

        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
              <div className="px-6 py-4">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main>
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">Failed to load FAQs</p>
          <button
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <>
      <main>
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to our FAQ section!</h1>
          <p className="text-gray-600 leading-relaxed">
            Here, you&apos;ll find answers to common questions about orders, shipping and returns. If you need further
            assistance, feel free to{" "}
            <Link href="/contact" className="text-blue-600 underline hover:text-blue-700">
              contact us
            </Link>
            .
          </p>
        </div>

        <div className="space-y-4">
          {faqItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No FAQs available at the moment.</p>
            </div>
          ) : (
            faqItems.map((faq) => (
              <FaqItem key={faq.id} faq={faq}/>
            ))
          )}
        </div>
      </main>
    </>
  )
}


export default FaqList;