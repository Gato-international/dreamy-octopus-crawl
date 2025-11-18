import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { showLoading, showSuccess, showError, dismissToast } from "@/utils/toast";

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const formSchema = z.object({
    phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = showLoading("Submitting your request...");
    try {
      const { error } = await supabase
        .from('callback_requests')
        .insert([{ phone_number: values.phoneNumber }]);

      dismissToast(toastId);

      if (error) {
        throw new Error(error.message);
      }

      showSuccess("Request received! We'll call you back soon.");
      form.reset();
    } catch (error) {
      dismissToast(toastId);
      showError(`Submission failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  return (
    <footer className="border-t border-border/40">
      <div className="container max-w-screen-2xl py-12 grid grid-cols-1 md:grid-cols-[1fr_1.2fr_1.5fr] gap-8">
        <div className="flex flex-col space-y-4">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/Fragancao-Logo-TEXT-TRANSPARANT.png" 
              alt="Fragancao Logo" 
              className="h-6 w-auto"
            />
          </Link>
          <p className="text-foreground/60">
            {t('footer.tagline')}
          </p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-[#1877F2] hover:opacity-80 transition-opacity" /></a>
            <a href="#" aria-label="Instagram"><Instagram className="h-5 w-5 text-[#E4405F] hover:opacity-80 transition-opacity" /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin className="h-5 w-5 text-[#0A66C2] hover:opacity-80 transition-opacity" /></a>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">{t('contactPage.contactDetails')}</h3>
          <ul className="space-y-2 text-foreground/60">
            <li>
              <span className="font-semibold text-foreground/80">{t('contactPage.phone')}: </span>
              +31 6 34864953
            </li>
            <li>
              <span className="font-semibold text-foreground/80">{t('contactPage.email')}: </span>
              <a href="mailto:info@fragancao.nl" className="hover:text-foreground underline">
                info@fragancao.nl
              </a>
            </li>
            <li>
              <span className="font-semibold text-foreground/80">{t('footer.kvk')}: </span>
              [Coming Soon]
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4">{t('footer.stayUpdated')}</h3>
          <p className="text-foreground/60 mb-4">
            {t('footer.newsletterPrompt')}
          </p>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input type="tel" placeholder={t('footer.phonePlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Sending..." : t('footer.requestCall')}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="border-t border-border/40 py-6">
        <p className="text-center text-sm text-foreground/60">
          {t('footer.copyright', { year })}
        </p>
      </div>
    </footer>
  );
};

export default Footer;