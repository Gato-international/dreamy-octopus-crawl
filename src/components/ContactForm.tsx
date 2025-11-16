import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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
    firstName: string;
    lastName: string;
    subject: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
  };
}

export const ContactForm = ({
  title,
  description,
  phone,
  email,
  web,
  labels,
}: ContactFormProps) => {
  return (
    <section className="py-24 sm:py-32">
      <div className="container">
        <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex max-w-sm flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <h1 className="mb-2 text-5xl font-semibold lg:mb-1 lg:text-6xl">
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
            <form className="flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="firstname">{labels.firstName}</Label>
                  <Input type="text" id="firstname" placeholder={labels.firstName} />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="lastname">{labels.lastName}</Label>
                  <Input type="text" id="lastname" placeholder={labels.lastName} />
                </div>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">{labels.email}</Label>
                <Input type="email" id="email" placeholder={labels.email} />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="subject">{labels.subject}</Label>
                <Input type="text" id="subject" placeholder={labels.subject} />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message">{labels.message}</Label>
                <Textarea placeholder={labels.messagePlaceholder} id="message" />
              </div>
              <Button type="submit" className="w-full">{labels.submit}</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};