"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function LoginForm() {
    const [email, setEmail] = useState("user@gmail.com")
    const [password, setPassword] = useState("123456")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
   // const [err, setError] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        router.push("/")
        setIsLoading(true)
        // setError("")

        // // Simulate API call
        // try {
        //     await new Promise((resolve) => setTimeout(resolve, 1000))
        //     // Add your authentication logic here
        //     console.log("Login attempt:", { email, password })
        // } catch (err) {
        //     setError("Invalid email or password. Please try again.")
        // } finally {
        //     setIsLoading(false)
        // }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="pb-4">
                <CardContent className="space-y-4 py-4">
                    {/* {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )} */}

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                            Email address
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="pl-10 bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent"
                                required
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">
                            Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="pl-10 pr-10 bg-input border-border focus:ring-2 focus:ring-ring focus:border-transparent"
                                required
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                                disabled={isLoading}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pb-3">
                        <div className="flex items-center space-x-2">
                            <input
                                id="remember"
                                type="checkbox"
                                className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring"
                                disabled={isLoading}
                            />
                            <Label htmlFor="remember" className="text-sm text-muted-foreground">
                                Remember me
                            </Label>
                        </div>
                        <Link
                            href="/forgot-password"
                            className="text-sm text-blue-500 hover:text-blue-600 hover:underline cursor-pointer transition-colors font-medium duration-200"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                    <Button
                        type="submit"
                        className="w-full bg-cyan-500 hover:bg-cyan-600 duration-200 font-semibold py-2.5 transition-colors"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="flex items-center space-x-2">
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                                <span>Signing in...</span>
                            </div>
                        ) : (
                            "Sign in"
                        )}
                    </Button>

                </CardFooter>
            </form>
        </>
    )
}
