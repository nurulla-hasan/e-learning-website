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
import { useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft } from "lucide-react";
import { useForgetPasswordMutation } from "@/redux/feature/auth/authApi";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type TranslationFn = (
  key: string,
  values?: Record<string, string | number | Date>
) => string;

const createForgotPasswordSchema = (t: TranslationFn) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t("errors.email_required") })
      .email({ message: t("errors.email_invalid") }),
  });

const ForgetPasswordForm = () => {
  const t = useTranslations("Auth.forgot");
  const translationFn = useMemo<TranslationFn>(
    () => (key: string, values?: Record<string, string | number | Date>) =>
      t(key, values),
    [t]
  );

  const formSchema = useMemo(
    () => createForgotPasswordSchema(translationFn),
    [translationFn]
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    forgetPassword(data);
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
                  <h1 className="text-2xl font-semibold text-title mb-2">
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

                <Button type="submit" className="w-full" loading={isLoading}>
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

export default ForgetPasswordForm;
