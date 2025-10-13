"use client";
import SignUpForm from "@/components/auth/SignUpForm";
import { UserPlus } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary/10">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground text-balance">Create your account</h2>
          {/* <p className="mt-2 text-sm text-muted-foreground text-pretty">
            Join us today and unlock access to powerful features designed for your success.
          </p> */}
        </div>
        <Card className="w-full shadow-lg border-border/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">Sign Up</CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              Create your account to get started with our platform
            </CardDescription>
          </CardHeader>
          {/* Sign Up Form */}
          <SignUpForm/>
        </Card>
      </div>
    </div>
  )
}


export default SignUpPage;