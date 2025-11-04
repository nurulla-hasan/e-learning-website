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
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useResetPasswordMutation } from "@/redux/feature/auth/authApi";
import { Link } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

type TranslationFn = (
  key: string,
  values?: Record<string, string | number | Date>
) => string;

const createResetPasswordSchema = (t: TranslationFn) =>
  z
    .object({
      newPassword: z
        .string()
        .min(6, { message: t("errors.password_min") }),
      confirmNewPassword: z
        .string()
        .min(6, { message: t("errors.confirm_password_min") }),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: t("errors.password_mismatch"),
      path: ["confirmNewPassword"],
    });

type ResetPasswordFormSchema = z.infer<ReturnType<typeof createResetPasswordSchema>>;

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const email = decodeURIComponent(searchParams.get("email") || "");
  const t = useTranslations("Auth.reset");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const toggleNewPasswordVisibility = () =>
    setShowNewPassword(!showNewPassword);
  const toggleConfirmNewPasswordVisibility = () =>
    setShowConfirmNewPassword(!showConfirmNewPassword);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const translationFn = useMemo<TranslationFn>(
    () => (key, values) => t(key, values),
    [t]
  );

  const formSchema = useMemo(
    () => createResetPasswordSchema(translationFn),
    [translationFn]
  );

  const form = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = (data: ResetPasswordFormSchema) => {
    const payload = {
      email,
      password: data.confirmNewPassword,
    };
    resetPassword(payload);
  };

  return (
    <div className="w-full max-w-sm md:max-w-lg">
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
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

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("labels.new_password")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            placeholder={t("placeholders.new_password")}
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-primary cursor-pointer"
                            onClick={toggleNewPasswordVisibility}
                          >
                            {showNewPassword ? (
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
                  name="confirmNewPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("labels.confirm_new_password")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmNewPassword ? "text" : "password"}
                            placeholder={t("placeholders.confirm_new_password")}
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-primary cursor-pointer"
                            onClick={toggleConfirmNewPasswordVisibility}
                          >
                            {showConfirmNewPassword ? (
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
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;
