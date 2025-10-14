"use client"
import { useSelector } from "react-redux";
import { useRouter } from "@/i18n/navigation";
import { useRegisterMutation } from "@/redux/feature/auth/authApi";
import { RootState } from "@/redux/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";

const companySchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required." }),
  companyEmail: z.string().min(1, { message: "Company email is required." }).email({ message: "Invalid email address." }),
  companyAddress: z.string().min(1, { message: "Company address is required." }),
  companyVatId: z.string().min(1, { message: "VAT ID is required." }),
});

const CompanyForm = () => {
  const router = useRouter();
  const registerData = useSelector((state: RootState) => state.auth.registerData);
  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: "",
      companyEmail: "",
      companyAddress: "",
      companyVatId: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof companySchema>) => {
    if (!registerData) {
      router.push('/sign-up');
      return;
    }
    const payload = {
      fullName: registerData.fullname,
      email: registerData.email,
      dateOfBirth: registerData.dateOfBirth,
      password: registerData.password,
      companyName: data.companyName,
      companyEmail: data.companyEmail,
      companyAddress: data.companyAddress,
      companyVatId: data.companyVatId,
    };
    console.log(payload);
    try {
      await register(payload).unwrap();
      // Success handling
    } catch (error) {
      console.log(error);
    }
  };

  const onSkip = async () => {
    if (!registerData) {
      router.push('/sign-up');
      return;
    }
    const payload = {
      fullName: registerData.fullname,
      email: registerData.email,
      dateOfBirth: registerData.dateOfBirth,
      password: registerData.password,
    };
    console.log(payload);
    try {
      await register(payload).unwrap();
      // Success handling
    } catch (error) {
      console.log(error);
    }
  };

  if (!registerData) {
    return (
      <div className="w-full max-w-sm md:max-w-lg">
        <Card className="overflow-hidden p-0">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col items-center text-center">
              <AlertCircle className="h-12 w-12 text-destructive mb-4" />
              <h2 className="text-xl font-semibold text-destructive mb-2">
                Oops! Something went wrong
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                No register data found. Please go back and fill the form again.
              </p>
              <Link href="/sign-up">
                <Button className="w-full">
                  Go Back to Sign Up
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm md:max-w-lg">
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <Link href="/sign-up">
                <ArrowLeft className="cursor-pointer" />
              </Link>
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-semibold text-title">
                    Company Information
                  </h1>
                  <p className="text-sm text-subtitle">
                    Enter your company details below.
                  </p>
                </div>

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company name" {...field} />
                      </FormControl>
                      <FormMessage />
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
                      <FormMessage />
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyVatId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>VAT ID</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter VAT ID" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-4 mt-4">
                  <Button type="button" variant="outline" onClick={onSkip}>
                    Skip as Student
                  </Button>
                  <Button loading={isLoading} type="submit" className="w-full">
                    Submit as Company
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyForm;