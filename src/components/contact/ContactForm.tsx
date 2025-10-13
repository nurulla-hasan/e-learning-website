"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"

const ContactForm = () => {
  const t = useTranslations('ContactPage');

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">{t("contact_us_form_title")}</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                {t("email_label")}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t("email_placeholder")}
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                {t("phone_label")}
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder={t("phone_placeholder")}
                value={formData.phone}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium text-foreground">
                {t("message_label")}
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder={t("message_placeholder")}
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full resize-none"
              />
            </div>

            <Button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-md flex items-center gap-2 transition-colors"
            >
              {t("send_message_button")}
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>

        {/* Contact Image */}
        <div className="lg:pl-8">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <Image
              width={600}
              height={600}
              src="/images/contact.png"
              alt="Person typing on laptop keyboard"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactForm;