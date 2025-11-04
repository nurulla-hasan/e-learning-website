"use client";
import { Button } from "@/components/ui/button";
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
import { useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRegisterMutation } from "@/redux/feature/auth/authApi";
import { useTranslations } from "next-intl";

type TranslationFn = (
  key: string,
  values?: Record<string, string | number | Date>
) => string;

const createCompanySchema = (t: TranslationFn) =>
  z
    .object({
      companyName: z
        .string()
        .min(1, { message: t("errors.company_name_required") }),
      companyEmail: z
        .string()
        .min(1, { message: t("errors.company_email_required") })
        .email({ message: t("errors.company_email_invalid") }),
      password: z
        .string()
        .min(6, { message: t("errors.password_min") }),
      confirmPassword: z
        .string()
        .min(6, { message: t("errors.confirm_password_min") }),
      companyAddress: z
        .string()
        .min(1, { message: t("errors.company_address_required") }),
      companyVatId: z
        .string()
        .min(1, { message: t("errors.vat_required") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("errors.password_mismatch"),
      path: ["confirmPassword"],
    });

type CompanyFormSchema = z.infer<ReturnType<typeof createCompanySchema>>;

const CompanySignUpForm = () => {
  const t = useTranslations("Auth.company");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const [register, { isLoading }] = useRegisterMutation();

  const translationFn = useMemo<TranslationFn>(
    () => (key, values) => t(key, values),
    [t]
  );

  const formSchema = useMemo(
    () => createCompanySchema(translationFn),
    [translationFn]
  );

  const form = useForm<CompanyFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      companyEmail: "",
      password: "",
      confirmPassword: "",
      companyAddress: "",
      companyVatId: "",
    },
  });

  const onSubmit = (data: CompanyFormSchema) => {
    const payload = {
      fullName: data.companyName,
      email: data.companyEmail,
      password: data.password,
      companyName: data.companyName,
      companyEmail: data.companyEmail,
      companyAddress: data.companyAddress,
      companyVatId: data.companyVatId,
    };
    // console.log(payload);
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
              <FormLabel>{t("labels.company_name")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("placeholders.company_name")}
                  {...field}
                />
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
              <FormLabel>{t("labels.company_email")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("placeholders.company_email")}
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
              <FormLabel>{t("labels.company_address")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("placeholders.company_address")}
                  {...field}
                />
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
              <FormLabel>{t("labels.company_vat")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("placeholders.company_vat")}
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
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" loading={isLoading}>
          {t("buttons.submit")}
        </Button>
      </form>
    </Form>
  );
};

export default CompanySignUpForm;
