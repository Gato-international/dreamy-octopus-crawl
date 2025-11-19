import { ContactForm } from "@/components/ContactForm";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  const { t } = useTranslation();

  const contactProps = {
    title: t('contactPage.title'),
    description: (
      <>
        {t('contactPage.description_part1')}
        <br />
        {t('contactPage.description_part2')}
      </>
    ),
    labels: {
      name: t('contactPage.form.name'),
      company: t('contactPage.form.company'),
      phoneNumber: t('contactPage.form.phoneNumber'),
      email: t('contactPage.form.email'),
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