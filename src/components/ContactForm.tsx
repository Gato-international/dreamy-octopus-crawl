import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { showLoading, showSuccess, showError, dismissToast } from "@/utils/toast";

interface ContactFormProps {
  title: string;
  description: string;
  phone: string;
  email: string;
  web: { label: string; url: string };
  labels: {
    contactDetails: string;
    phone: string;
    email: string;
    web: string;
    name: string;
    company: string;
    phoneNumber: string;
    subject: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
  };
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  company: z.string().optional(),
  phoneNumber: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export const ContactForm = ({
  title,
  description,
  phone,
  email,
  web,
  labels,
}: ContactFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      phoneNumber: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = showLoading("Sending your message...");
    try {
      const { error } = await supabase.functions.invoke('send-email', {
        body: values,
      });

      dismissToast(toastId);

      if (error) {
        throw new Error(error.message);
      }

      showSuccess("Message sent successfully! We'll get back to you soon.");
      form.reset();
    } catch (error) {
      dismissToast(toastId);
      showError(`Failed to send message: ${error.message}`);
    }
  }

  return (
    <section className="py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl font-heading">
                {title}
              </h1>
              <p className="text-muted-foreground">{description}</p>
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                {labels.contactDetails}
              </h3>
              <ul className="ml-4 list-disc space-y-2">
                <li>
                  <span className="font-bold">{labels.phone}: </span>
                  {phone}
                </li>
                <li>
                  <span className="font-bold">{labels.email}: </span>
                  <a href={`mailto:${email}`} className="underline">
                    {email}
                  </a>
                </li>
                <li>
                  <span className="font-bold">{labels.web}: </span>
                  <a href={web.url} target="_blank" rel="noopener noreferrer" className="underline">
                    {web.label}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mx-auto w-full max-w-screen-md flex-col gap-6 rounded-lg border p-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{labels.name}</FormLabel>
                      <FormControl>
                        <Input placeholder={labels.name} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{labels.company} (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder={labels.company} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{labels.phoneNumber} (Optional)</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder={labels.phoneNumber} {...field} />
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
                      <FormLabel>{labels.email}</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder={labels.email} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{labels.subject}</FormLabel>
                      <FormControl>
                        <Input placeholder={labels.subject} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{labels.message}</FormLabel>
                      <FormControl>
                        <Textarea placeholder={labels.messagePlaceholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "Sending..." : labels.submit}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};