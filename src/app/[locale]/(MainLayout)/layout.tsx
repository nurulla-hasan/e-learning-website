import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"
import React from "react"


type TProps = {
    children: React.ReactNode
}

const MainLayout = ({children} : TProps) => {
  return (
    <>
      <Navbar/>
      {children}
      <Footer/>
    </>
  )
}

export default MainLayout