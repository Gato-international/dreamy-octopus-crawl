import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContactFormProps {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
}

export const ContactForm = ({
  title = "Neem Contact Op",
  description = "Heeft u vragen, feedback of interesse in een samenwerking? Laat ons weten hoe we kunnen helpen!",
  phone = "+31 6 12345678",
  email = "info@fragancao.com",
  web = { label: "fragancao.com", url: "#" },
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
                Contactgegevens
              </h3>
              <ul className="ml-4 list-disc space-y-2">
                <li>
                  <span className="font-bold">Telefoon: </span>
                  {phone}
                </li>
                <li>
                  <span className="font-bold">Email: </span>
                  <a href={`mailto:${email}`} className="underline">
                    {email}
                  </a>
                </li>
                <li>
                  <span className="font-bold">Web: </span>
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
                  <Label htmlFor="firstname">Voornaam</Label>
                  <Input type="text" id="firstname" placeholder="Voornaam" />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="lastname">Achternaam</Label>
                  <Input type="text" id="lastname" placeholder="Achternaam" />
                </div>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" placeholder="Email" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="subject">Onderwerp</Label>
                <Input type="text" id="subject" placeholder="Onderwerp" />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message">Bericht</Label>
                <Textarea placeholder="Typ hier uw bericht." id="message" />
              </div>
              <Button type="submit" className="w-full">Verstuur Bericht</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};