"use client";

import { motion } from "framer-motion";
import { SubtleGrid } from "@/src/shared/components/ui/hero-background";
import { Button } from "@/src/shared/components/ui/neon-button";
import { MessageSquare, Phone, Mail, MapPin } from "lucide-react";
import { message } from "antd";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
export const Contact = () => {
  const { t } = useTranslation();

  const contactSchema = z.object({
    user_name: z.string().min(3, t("contact.messages.nameError")),
    user_phone: z
      .string()
      .regex(/^01[0125][0-9]{8}$/, t("contact.messages.phoneError")),
    user_email: z.string().email(t("contact.messages.emailError")),
    device_type: z.string().min(1, t("contact.messages.deviceError")),
    issue_type: z.string().min(1, t("contact.messages.issueError")),
    message_details: z.string().optional().nullable(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
  });

  const formRef = useRef<HTMLFormElement>(null);
  const onSubmit = async (data: z.infer<typeof contactSchema>) => {
    try {
      await emailjs.send(
        "service_oh0x7i8", // Service ID
        "template_i2lx67g", // Template ID
        {
          user_name: data.user_name,
          user_phone: data.user_phone,
          user_email: data.user_email,
          device_type: data.device_type,
          issue_type: data.issue_type,
          message_details: data.message_details || "No details provided",
        },
        "8c8HlsGEFnZP4KKf4",
      );

      message.success(t("contact.messages.success"));
      reset();
    } catch (error) {
      console.log(error);
      message.error(t("contact.messages.error"));
    }
  };
  return (
    <section
      id="contact"
      className="py-24 bg-slate-50 relative overflow-hidden"
    >
      <SubtleGrid color="#00000008" className="opacity-100" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-slate-50/50 rounded-[3rem] overflow-hidden shadow-xl border border-slate-200">
          <div className="grid lg:grid-cols-2">
            <div className="p-12 lg:p-20">
              <h2 className="text-brand-100 font-bold mb-4">
                {t("contact.badge")}
              </h2>
              <h3 className="text-2xl font-black mb-10 text-slate-900 tracking-tight">
                {t("contact.title")}
              </h3>

              <form
                ref={formRef}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600">
                      {t("contact.form.name")}
                    </label>
                    <input
                      type="text"
                      {...register("user_name")}
                      className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border ${errors.user_name ? "border-red-500" : "border-slate-200"} text-slate-900 focus:border-brand-100 focus:ring-2 focus:ring-brand-100/10 outline-none transition-all placeholder:text-slate-400`}
                      placeholder={t("contact.form.namePlaceholder")}
                    />
                    {errors.user_name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.user_name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600">
                      {t("contact.form.phone")}
                    </label>
                    <input
                      type="tel"
                      {...register("user_phone")}
                      className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border ${errors.user_phone ? "border-red-500" : "border-slate-200"} text-slate-900 focus:border-brand-100 focus:ring-2 focus:ring-brand-100/10 outline-none transition-all placeholder:text-slate-400`}
                      placeholder={t("contact.form.phonePlaceholder")}
                    />
                    {errors.user_phone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.user_phone.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    {...register("user_email")}
                    className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border ${errors.user_email ? "border-red-500" : "border-slate-200"} text-slate-900 focus:border-brand-100 focus:ring-2 focus:ring-brand-100/10 outline-none transition-all placeholder:text-slate-400`}
                    placeholder={t("contact.form.emailPlaceholder")}
                  />
                  {errors.user_email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.user_email.message}
                    </p>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600">
                      {t("contact.form.deviceType")}
                    </label>
                    <div className="relative">
                      <select
                        {...register("device_type")}
                        className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border ${errors.device_type ? "border-red-500" : "border-slate-200"} text-slate-900 focus:border-brand-100 focus:ring-2 focus:ring-brand-100/10 outline-none transition-all appearance-none`}
                      >
                        <option value="">
                          {t("contact.form.deviceSelect")}
                        </option>
                        <option value="iPhone 15 Pro Max">
                          iPhone 15 Pro Max
                        </option>
                        <option value="iPhone 14 Pro Max">
                          iPhone 14 Pro Max
                        </option>
                        <option value="iPhone 13 Pro Max">
                          iPhone 13 Pro Max
                        </option>
                        <option value="iPhone 12 Pro Max">
                          iPhone 12 Pro Max
                        </option>
                        <option value="أخرى">{t("contact.form.other")}</option>
                      </select>
                      {errors.device_type && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.device_type.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-600">
                      {t("contact.form.issueType")}
                    </label>
                    <div className="relative">
                      <select
                        {...register("issue_type")}
                        className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border ${errors.issue_type ? "border-red-500" : "border-slate-200"} text-slate-900 focus:border-brand-100 focus:ring-2 focus:ring-brand-100/10 outline-none transition-all appearance-none`}
                      >
                        <option value="">
                          {t("contact.form.issueSelect")}
                        </option>
                        <option value="كسر في الشاشة">
                          {t("contact.form.screen")}
                        </option>
                        <option value="مشكلة في البطارية">
                          {t("contact.form.battery")}
                        </option>
                        <option value="كسر في الظهر">
                          {t("contact.form.back")}
                        </option>
                        <option value="مشكلة في الكاميرا">
                          {t("contact.form.camera")}
                        </option>
                        <option value="أخرى">{t("contact.form.other")}</option>
                      </select>
                      {errors.issue_type && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.issue_type.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-600">
                    {t("contact.form.details")}
                  </label>
                  <textarea
                    {...register("message_details")}
                    rows={4}
                    className={`w-full px-6 py-4 rounded-2xl bg-slate-50 border ${errors.message_details ? "border-red-500" : "border-slate-200"} text-slate-900 focus:border-brand-100 focus:ring-2 focus:ring-brand-100/10 outline-none transition-all placeholder:text-slate-400`}
                    placeholder={t("contact.form.detailsPlaceholder")}
                  ></textarea>
                  {errors.message_details && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message_details.message}
                    </p>
                  )}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="solid"
                    size="lg"
                    className="w-full bg-brand-100 text-white hover:bg-brand-400 rounded-2xl shadow-lg shadow-brand-100/20"
                  >
                    {t("contact.form.submit")}
                  </Button>
                </motion.div>
              </form>
            </div>

            <div className="bg-brand-100 p-12 lg:p-20 text-white flex flex-col justify-center">
              <h4 className="text-2xl font-bold mb-10">
                {t("contact.info.title")}
              </h4>

              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <div className="font-bold mb-1">
                      {t("contact.info.whatsapp")}
                    </div>
                    <a
                      href="https://wa.me/201009911934"
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      01009911934
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="font-bold mb-1">
                      {t("contact.info.phone")}
                    </div>
                    <a
                      href="tel:01009911934"
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      01009911934
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="font-bold mb-1">
                      {t("contact.info.email")}
                    </div>
                    <a
                      href="mailto:Info@focus-fastestrepair.com"
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      info@focus-fastestrepair.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="font-bold mb-1">
                      {t("contact.info.location")}
                    </div>
                    <p className="text-white/80">{t("contact.info.address")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
