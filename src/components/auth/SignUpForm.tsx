"use client";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useRegisterMutation } from "@/redux/feature/auth/authApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanySignUpForm from "./CompanySignUpForm";
import { useTranslations } from "next-intl";

type TranslationFn = (
  key: string,
  values?: Record<string, string | number | Date>
) => string;

const createRegisterSchema = (t: TranslationFn) =>
  z
    .object({
      fullname: z.string().min(1, { message: t("errors.fullname_required") }),
      email: z
        .string()
        .min(1, { message: t("errors.email_required") })
        .email({ message: t("errors.email_invalid") }),
      dateOfBirth: z
        .string()
        .min(1, { message: t("errors.date_required") })
        .regex(/^\d{2}-\d{2}-\d{4}$/, {
          message: t("errors.date_format"),
        }),
      password: z
        .string()
        .min(6, { message: t("errors.password_min") }),
      confirmPassword: z
        .string()
        .min(6, { message: t("errors.confirm_password_min") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("errors.password_mismatch"),
      path: ["confirmPassword"],
    });

type RegisterFormSchema = z.infer<ReturnType<typeof createRegisterSchema>>;

const Register = () => {
  const t = useTranslations("Auth.signup");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [register, { isLoading }] = useRegisterMutation();

  const translationFn = useMemo<TranslationFn>(
    () => (key, values) => t(key, values),
    [t]
  );

  const formSchema = useMemo(
    () => createRegisterSchema(translationFn),
    [translationFn]
  );

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      email: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormSchema) => {
    const payload = {
      fullName: data.fullname,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      password: data.password,
    };
    register(payload);
  };

  return (
    <div className="w-full max-w-sm md:max-w-xl">
      <Card className="overflow-hidden p-0">
        <CardContent className="p-6 md:p-8">
          <Link href="/login">
            <ArrowLeft className="cursor-pointer" />
          </Link>
          <div className="flex flex-col gap-6 mt-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-semibold text-title">
                {t("title")}
              </h1>
              <p className="text-sm text-subtitle">{t("subtitle")}</p>
            </div>
            <Tabs defaultValue="student" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student">{t("tabs.student")}</TabsTrigger>
                <TabsTrigger value="company">{t("tabs.company")}</TabsTrigger>
              </TabsList>
              <TabsContent value="student">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 pt-6"
                  >
                    <FormField
                      control={form.control}
                      name="fullname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("labels.fullname")}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t("placeholders.fullname")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("labels.email")}</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={t("placeholders.email")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("labels.date_of_birth")}</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder={t("placeholders.date_of_birth")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("labels.password")}</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder={t("placeholders.password")}
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("labels.confirm_password")}</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder={t("placeholders.confirm_password")}
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
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      loading={isLoading}
                    >
                      {t("buttons.submit")}
                    </Button>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="company">
                <CompanySignUpForm />
              </TabsContent>
            </Tabs>
          </div>
          <div className="text-center text-sm mt-6">
            {t("links.have_account")} {" "}
            <Link href="/login" className="text-primary">
              {t("links.login")}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
