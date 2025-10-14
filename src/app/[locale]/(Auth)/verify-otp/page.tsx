"use client"
import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  useResendResetOTPMutation,
  useResendSignupOTPMutation,
  useVerifyOTPForResetPasswordMutation,
  useVerifyOTPForSignupMutation,
} from "@/redux/feature/auth/authApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ErrorToast } from "@/lib/utils";

const verificationSchema = z.object({
  code: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const VerifyOtp = () => {
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null);
  const router = useRouter();
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    setSearchParams(new URLSearchParams(window.location.search));
  }, []);

  const form = useForm({
    resolver: zodResolver(verificationSchema),
    mode: "onSubmit",
    defaultValues: {
      code: "",
    },
  });

  // Resend OTP Mutations
  const [resendResetOTP, { isLoading: isResendResetLoading }] =
    useResendResetOTPMutation();
  const [resendSignupOTP, { isLoading: isResendSignupLoading }] =
    useResendSignupOTPMutation();

  // Verify OTP Mutations
  const [verifyOTPForSignup, { isLoading: isVerifyLoadingForSignup }] =
    useVerifyOTPForSignupMutation();
  const [
    verifyOTPForResetPassword,
    { isLoading: isVerifyLoadingForResetPassword },
  ] = useVerifyOTPForResetPasswordMutation();

  // Cooldown timer effect
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  // Set initial cooldown
  useEffect(() => {
    setCooldown(5);
  }, []);

  if (!searchParams) {
    return <div>Loading...</div>;
  }

  const type = searchParams.get("type");
  const email = decodeURIComponent(searchParams.get("email") || "");
  const otpToken = decodeURIComponent(searchParams.get("otpToken") || "");
  
  const onSubmit = async (data: z.infer<typeof verificationSchema>) => {
    const OTP = Number(data.code);
    try {
      if (type === "forget-password") {
        await verifyOTPForResetPassword({ 
          otp: OTP,
          email,
          otpToken,
        }).unwrap();
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
        
      } else if (type === "signup") {
        await verifyOTPForSignup({
          otp: OTP,
          email,
          otpToken,
        }).unwrap();
        router.push("/login");
      }
    } catch {
      // Error handling if needed
    }
  };

  const handleResendOTP = async () => {
    if (cooldown > 0) return;

    try {
      if (type === "forget-password") {
        await resendResetOTP({ email });
      } else if (type === "signup") {
        await resendSignupOTP({ email });
      }
      setCooldown(60);
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      ErrorToast(err?.data?.message || "Failed to resend OTP");
    }
  };

  const isLoading =
    isVerifyLoadingForSignup ||
    isVerifyLoadingForResetPassword ||
    isResendResetLoading ||
    isResendSignupLoading;
  const isResendLoading = isResendResetLoading || isResendSignupLoading;

  return (
    <div className="w-full max-w-sm md:max-w-lg">
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <Link
                href={
                  type === "signup" ? "/sign-up" : "/forgot-password"
                }
              >
                <ArrowLeft className="cursor-pointer" />
              </Link>
              <div className="flex flex-col gap-6 mt-6">
                <div className="text-center space-y-2">
                  <h1 className="text-2xl font-bold">
                    {type === "signup" ? "Verify Your Email" : "Reset Password"}
                  </h1>
                  <p className="text-gray-500">
                    We&apos;ve sent a verification code to {email}
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="space-y-2 flex flex-col justify-center items-center">
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" loading={isLoading}>
                  Verify
                </Button>

                <div className="text-center text-sm">
                  <span>Didn&apos;t receive code? </span>
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={cooldown > 0 || isResendLoading}
                    className="text-primary hover:underline"
                  >
                    {isResendLoading
                      ? "Sending..."
                      : cooldown > 0
                      ? `Resend in ${cooldown}s`
                      : "Resend Code"}
                  </button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtp;
