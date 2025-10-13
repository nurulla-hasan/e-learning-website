"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export function ForgotPasswordForm() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")

        // Basic email validation
        if (!email.trim()) {
            setError("Email address is required")
            setIsLoading(false)
            return
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address")
            setIsLoading(false)
            return
        }
       
        router.push("/verify-otp")
    }

    const handleBackToLogin = () => {
        // Add navigation logic here
        router.push("/login")
    }

    if (isSuccess) {
        return (
            <Card className="w-full shadow-lg border-border/50">
                <CardHeader className="space-y-1 text-center">
                    <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-accent/10 mb-4">
                        <CheckCircle className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-2xl font-semibold text-center">Check Your Email</CardTitle>
                    <CardDescription className="text-center text-muted-foreground">
                        We&apos;ve sent a password reset link to <strong>{email}</strong>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">
                            Didn&apos;t receive the email? Check your spam folder or try again.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsSuccess(false)
                                setEmail("")
                            }}
                            className="text-sm"
                        >
                            Try different email
                        </Button>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        variant="ghost"
                        onClick={handleBackToLogin}
                        className="w-full text-muted-foreground hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to login
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                            Email address
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    if (error) setError("")
                                }}
                                className="pl-10 bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4 mt-4">
                    <Button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 duration-200 text-primary-foreground font-medium py-2.5 transition-colors"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center space-x-2">
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                                <span>Sending reset link...</span>
                            </div>
                        ) : (
                            "Continue"
                        )}
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={handleBackToLogin}
                        className="w-full text-muted-foreground bg-transparent hover:bg-transparent hover:text-foreground"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to login
                    </Button>
                </CardFooter>
            </form>
        </>
    )
}
