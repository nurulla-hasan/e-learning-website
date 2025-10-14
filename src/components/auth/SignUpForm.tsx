"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { useRouter } from "@/i18n/navigation";
import { SetRegisterData } from "@/redux/feature/auth/authSlice";

const registerSchema = z.object({
  fullname: z.string().min(1, { message: "Full name is required." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Invalid email address." }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required." }).regex(/^\d{2}-\d{2}-\d{4}$/, { message: "Date must be in dd-mm-yyyy format." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const dispatch = useDispatch();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullname: "",
      email: "",
      dateOfBirth: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    dispatch(SetRegisterData(data));
    router.push('/company-form');
  };

  return (
    <div className="w-full max-w-sm md:max-w-lg">
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <Link href="/auth/login">
                <ArrowLeft className="cursor-pointer" />
              </Link>
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-semibold text-title">
                    Create an account
                  </h1>
                  <p className="text-sm text-subtitle">
                    Enter your details below to create your account.
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@email.com"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="dd-mm-yyyy"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-primary cursor-pointer"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? (
                              <EyeOff size={20} />
                            ) : (
                              <Eye size={20} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </div>
              <div className="text-center text-sm mt-6">
                Already have an account?{" "}
                <Link href="/login" className="text-primary">
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
