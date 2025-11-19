import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { showLoading, showSuccess, showError, dismissToast } from "@/utils/toast";

interface ContactFormProps {
  title: string;
  description: React.ReactNode;
  labels: {
    name: string;
    company: string;
    phoneNumber: string;
    email: string;
    subject: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
  };
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  company: z.string().min(1, { message: "Company name is required." }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export const ContactForm = ({
  title,
  description,
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
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl font-heading">
              {title}
            </h1>
            <p className="text-muted-foreground max-w-3xl mx-auto">{description}</p>
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
                      <FormLabel>{labels.company}</FormLabel>
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
                      <FormLabel>{labels.phoneNumber}</FormLabel>
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