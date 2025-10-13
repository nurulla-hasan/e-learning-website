import React from "react"

type TProps = {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: TProps) => {
  return (
    <>
      <div className="min-h-screen bg-[#e5f7ff] flex items-center justify-center p-4">
        {children}
       </div>
    </>
  )
}

export default AuthLayout