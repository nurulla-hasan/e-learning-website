"use client"

import { faqItems } from "@/data/faq.data";
import FaqItem from "./FaqItem"
import Link from "next/link";

const FaqList = () => {

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
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
          {faqItems?.map((faq, index) => (
           <FaqItem key={index} faq={faq}/>
          ))}
        </div>
      </main>
    </>
  )
}


export default FaqList;