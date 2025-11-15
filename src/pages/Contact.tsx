import { ContactForm } from "@/components/ContactForm";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    web: { label: "", url: "" },
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      const { data, error } = await supabase.from("site_config").select("*");
      if (error) {
        console.error("Error fetching site config:", error);
      } else {
        const config = data.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {} as Record<string, string>);

        setContactInfo({
          phone: config.contact_phone || "",
          email: config.contact_email || "",
          web: {
            label: config.contact_web_label || "",
            url: config.contact_web_url || "#",
          },
        });
      }
    };
    fetchContactInfo();
  }, []);

  return <ContactForm {...contactInfo} />;
};

export default Contact;