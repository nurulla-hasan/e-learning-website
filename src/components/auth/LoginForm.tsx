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
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useLoginMutation } from "@/redux/feature/auth/authApi";
import { useTranslations } from "next-intl";

type TranslationFn = (
  key: string,
  values?: Record<string, string | number | Date>
) => string;

const createLoginSchema = (t: TranslationFn) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t("errors.email_required") })
      .email({ message: t("errors.email_invalid") }),
    password: z
      .string()
      .min(6, { message: t("errors.password_min") }),
  });

const LoginForm = () => {
  const t = useTranslations("Auth.login");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [login, { isLoading }] = useLoginMutation();

  const translationFn = useMemo<TranslationFn>(
    () => (key, values) => t(key, values),
    [t]
  );

  const formSchema = useMemo(
    () => createLoginSchema(translationFn),
    [translationFn]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await login(data);
  };

  return (
    <div className="w-full max-w-sm md:max-w-lg">
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <Link href="/">
                <ArrowLeft className="cursor-pointer" />
              </Link>
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-semibold text-title">
                    {t("title")}
                  </h1>
                  <p className="text-sm text-subtitle">{t("subtitle")}</p>
                </div>
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>{t("labels.password")}</FormLabel>
                        <Link
                          href="forgot-password"
                          className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                          {t("links.forgot_password")}
                        </Link>
                      </div>
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

                <Button loading={isLoading} type="submit" className="w-full">
                  {t("buttons.submit")}
                </Button>
              </div>
              <div className="text-center text-sm mt-6">
                {t("links.no_account")} {" "}
                <Link href="sign-up" className="text-primary">
                  {t("links.sign_up")}
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
