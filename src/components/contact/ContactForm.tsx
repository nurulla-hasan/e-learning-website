"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSendMessageMutation } from "@/redux/feature/legal/legalApi";
import { SuccessToast } from "@/lib/utils";

const ContactForm = () => {
  const t = useTranslations("ContactPage");

  const [formData, setFormData] = useState({
    userEmail: "",
    userPhone: "",
    message: "",
  });

  const [sendMessage] = useSendMessageMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await sendMessage(formData).unwrap();
      setFormData({
        userEmail: "",
        userPhone: "",
        message: "",
      });
      SuccessToast("Message sent successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">
            {t("contact_us_form_title")}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                {t("email_label")}
              </Label>
              <Input
                id="email"
                name="userEmail"
                type="email"
                placeholder={t("email_placeholder")}
                value={formData.userEmail}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-foreground"
              >
                {t("phone_label")}
              </Label>
              <Input
                id="phone"
                name="userPhone"
                type="tel"
                placeholder={t("phone_placeholder")}
                value={formData.userPhone}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="text-sm font-medium text-foreground"
              >
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

            <Button type="submit">
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
  );
};

export default ContactForm;
