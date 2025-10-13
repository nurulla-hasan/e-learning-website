/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    google: any
    googleTranslateElementInit: () => void
  }
}

export default function GoogleTranslate() {
  useEffect(() => {
    // Google Translate script যোগ করা
    const addScript = () => {
      const script = document.createElement("script")
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      script.async = true
      document.body.appendChild(script)
    }

    // Google Translate initialize করার function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en", // মূল ভাষা
          includedLanguages: "en,bn,hi,ur,ar,es,fr,de,zh,ja,ko", // সাপোর্টেড ভাষাসমূহ
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element",
      )
    }

    // Script load করা
    if (!document.querySelector('script[src*="translate.google.com"]')) {
      addScript()
    }

    return () => {
      // Cleanup function
      const script = document.querySelector('script[src*="translate.google.com"]')
      if (script) {
        script.remove()
      }
    }
  }, [])

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">ভাষা পরিবর্তন:</span>
      <div id="google_translate_element" className="inline-block"></div>
    </div>
  )
}
