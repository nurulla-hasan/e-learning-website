"use client"

import { ErrorToast, SuccessToast } from "@/lib/utils"
import { useSendSubscribeMutation } from "@/redux/feature/legal/legalApi"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import type React from "react"

import { useState } from "react"

const Footer = () => {
  const [email, setEmail] = useState("");
  const t = useTranslations('Header');
  const tFooter = useTranslations('Footer');

  const [sendSubscribe, { isLoading }] = useSendSubscribeMutation()

  const handleSubscribe =async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await sendSubscribe({ email }).unwrap()
      setEmail("")
      SuccessToast("Subscribe successfully")
    } catch (error: any) {
      ErrorToast(error?.data?.message || 'Subscription failed. Please try again.');
    }
  }

  return (
    <footer className="bg-gray-800 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold text-white">{tFooter("subscribe_title")}</h3>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 lg:max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={tFooter("email_placeholder")}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                required
              />
              <button
                disabled={isLoading}
                type="submit"
                className="px-6 py-2 cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-colors duration-200 whitespace-nowrap"
              >
                {isLoading ? "Loading..." : tFooter("subscribe_button")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Social Media */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              {/* Logo */}
              <div className="w-12 h-12 bg-white flex items-center justify-center rounded-md">
                {/* <div className="w-8 h-8 bg-white rounded transform rotate-12"></div> */}
                <Link href="/" className="flex-shrink-0">
                <Image src="/images/logo.png" height={600} width={600} alt="logo" className="h-[45px] w-[45px]" />
              </Link>
              </div>
              
            </div>
            <div>
              <p className="text-gray-300 mb-4">{tFooter("find_us_on")}</p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
                >
                  <span className="text-white text-sm font-bold">f</span>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
                >
                  <span className="text-white text-sm font-bold">𝕏</span>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
                >
                  <span className="text-white text-sm font-bold">in</span>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-600 transition-colors"
                >
                  <span className="text-white text-sm font-bold">ig</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">{tFooter("contact_info")}</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 mt-0.5 text-cyan-400">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <span className="text-gray-300">+60 3-4567 8901</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 mt-0.5 text-cyan-400">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span className="text-gray-300">hello@blueoak.edu.my</span>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 mt-0.5 text-cyan-400">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-300">Jalan Damansara, Kuala Lumpur, Malaysia</span>
              </div>
            </div>
          </div>

          {/* About & Legal */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">{tFooter("about_and_legal")}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/policy/about" className="text-gray-300 hover:text-primary transition-colors">
                  {t("about")}
                </Link>
              </li>
              <li>
                <Link href="/policy/terms-condition" className="text-gray-300 hover:text-primary transition-colors">
                  {t("terms")}
                </Link>
              </li>
              <li>
                <Link href="/policy/privacy-policy" className="text-gray-300 hover:text-primary transition-colors">
                  {t("privacy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">{tFooter("help_and_support")}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-primary transition-colors">
                  {t("contact")}
                </Link>
              </li>
              <li>
                <Link href="/policy/help" className="text-gray-300 hover:text-primary transition-colors">
                  {t("help")}
                </Link>
              </li>
              <li>
                <Link href="/policy/faqs" className="text-gray-300 hover:text-primary transition-colors">
                  {t("faqs")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-400 text-sm">{tFooter("copyright")}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
