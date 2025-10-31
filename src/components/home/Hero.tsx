"use client";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const Hero = () =>{
  const router = useRouter();
  const t = useTranslations('Hero');

  return (
    <div className="h-[calc(100vh-65px)] relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero.png')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Animated Digital Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating circles
        <div className="absolute top-20 right-20 w-4 h-4 border-2 border-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-40 w-6 h-6 border border-cyan-300 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 right-16 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>

        {/* Digital lines */}
        {/* <div className="absolute top-32 right-32 w-20 h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
        <div className="absolute top-60 right-24 w-16 h-px bg-linear-to-r from-cyan-400 to-transparent rotate-45 animate-pulse"></div> */}

        {/* Tech icons simulation */}
        {/* <div className="absolute top-24 right-60 text-cyan-400 animate-pulse">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div> */}

        {/* <div className="absolute bottom-40 right-32 text-cyan-300 animate-bounce">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div> */}

        {/* Digital HUD elements */}
        {/* <div className="absolute top-16 right-16 border border-cyan-400/30 rounded-lg p-2 backdrop-blur-sm">
          <div className="text-xs text-cyan-400 font-mono">E-Learning</div>
        </div> */}
{/* 
        <div className="absolute bottom-24 right-20 border border-cyan-300/30 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="text-xs text-cyan-300 font-mono">Online</div>
          </div>
        </div> */}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center h-[calc(100vh-65px)]">
        <div className="container max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {t("title")}
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8 max-w-xl">
              {t("subtitle")}
            </p>

            {/* CTA Button */}
            <button onClick={()=> router.push("/courses")} className="group cursor-pointer bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-3 hover:gap-4">
              {t("button")}
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Additional floating elements for depth */}
      {/* <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/3 right-1/4 w-32 h-32 border border-cyan-400/20 rounded-full animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div
          className="absolute bottom-1/3 right-1/3 w-24 h-24 border-2 border-cyan-300/10 rounded-full animate-spin"
          style={{ animationDuration: "15s", animationDirection: "reverse" }}
        ></div>
      </div> */}
    </div>
  )
}


export default Hero;