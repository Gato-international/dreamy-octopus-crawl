import { ContactForm } from "@/components/ContactForm";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const { t } = useTranslation();

  const contactProps = {
    title: t('contactPage.title'),
    description: t('contactPage.description'),
    phone: "+31 6 34864953",
    email: "info@fragancao.com",
    web: { label: "fragancao.nl", url: "https://fragancao.nl" },
    labels: {
      contactDetails: t('contactPage.contactDetails'),
      phone: t('contactPage.phone'),
      email: t('contactPage.email'),
      web: t('contactPage.web'),
      firstName: t('contactPage.form.firstName'),
      lastName: t('contactPage.form.lastName'),
      subject: t('contactPage.form.subject'),
      message: t('contactPage.form.message'),
      messagePlaceholder: t('contactPage.form.messagePlaceholder'),
      submit: t('contactPage.form.submit'),
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us – Fragancao</title>
        <meta name="description" content="Get in touch with the Fragancao team. We're here to answer your questions about partnerships, our machines, or any other inquiries." />
      </Helmet>
      <ContactForm {...contactProps} />
    </>
  );
};

export default Contact;