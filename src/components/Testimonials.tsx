import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const staticTestimonials = [
  { id: '1', name: 'Alice Johnson', role: 'Fashion Blogger', text: 'Absolutely love the convenience! A quick spray of luxury before any event makes all the difference. The scents are divine.', image_url: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: '2', name: 'David Chen', role: 'Nightclub Owner', text: 'Our patrons are impressed. The machine adds a touch of class to our establishment and has become a popular feature.', image_url: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: '3', name: 'Sophia Rodriguez', role: 'Event Planner', text: 'A brilliant addition to high-end events. Guests appreciate the opportunity to freshen up with such premium fragrances.', image_url: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: '4', name: 'Michael Smith', role: 'Gym Manager', text: 'Our members are thrilled. It\'s the perfect post-workout luxury that sets our gym apart from the rest.', image_url: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { id: '5', name: 'Emily White', role: 'Hotel Concierge', text: 'The Fragancao machine elevates our guest experience. It\'s a small detail that leaves a huge, positive impression.', image_url: 'https://randomuser.me/api/portraits/women/5.jpg' },
  { id: '6', name: 'Chris Lee', role: 'Restaurant Host', text: 'A fantastic concept. Our diners love being able to apply a beautiful scent before being seated. It\'s a conversation starter!', image_url: 'https://randomuser.me/api/portraits/men/6.jpg' },
];

const Testimonials = () => {
  const firstColumn = staticTestimonials.slice(0, 3);
  const secondColumn = staticTestimonials.slice(3, 6);
  const thirdColumn = staticTestimonials.slice(0, 3); // Re-using for visual balance

  return (
    <section className="my-20 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            What our users say
          </h2>
          <p className="text-center mt-5 opacity-75">
            See what our customers have to say about us.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn.map(t => ({...t, image: t.image_url}))} duration={15} />
          <TestimonialsColumn testimonials={secondColumn.map(t => ({...t, image: t.image_url}))} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn.map(t => ({...t, image: t.image_url}))} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;