
"use client";
import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRegisterMutation } from "@/redux/feature/auth/authApi";

const companyRegisterSchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required." }),
  companyEmail: z
    .string()
    .min(1, { message: "Company email is required." })
    .email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
  companyAddress: z
    .string()
    .min(1, { message: "Company address is required." }),
  companyVatId: z.string().min(1, { message: "VAT ID is required." }),
});

const CompanySignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm({
    resolver: zodResolver(companyRegisterSchema),
    defaultValues: {
      companyName: "",
      companyEmail: "",
      password: "",
      companyAddress: "",
      companyVatId: "",
    },
  });

  const onSubmit = (data: z.infer<typeof companyRegisterSchema>) => {
    const payload = {
      fullName: data.companyName,
      email: data.companyEmail,
      password: data.password,
      companyName: data.companyName,
      companyEmail: data.companyEmail,
      companyAddress: data.companyAddress,
      companyVatId: data.companyVatId,
    };
    register(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-6">
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="company@example.com"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter company address" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="companyVatId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIP ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter NIP ID" {...field} />
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

        <Button type="submit" className="w-full" loading={isLoading}>
          Create Company Account
        </Button>
      </form>
    </Form>
  );
};

export default CompanySignUpForm;
