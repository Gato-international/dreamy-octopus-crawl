import { ContactForm } from "@/components/ContactForm";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  const contactProps = {
    title: t('contactPage.title'),
    description: t('contactPage.description'),
    phone: "+31 6 12345678",
    email: "info@fragancao.com",
    web: { label: "fragancao.com", url: "#" },
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
    <ContactForm {...contactProps} />
  );
};

export default Contact;