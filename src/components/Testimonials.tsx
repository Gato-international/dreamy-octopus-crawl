import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "Spotted this in the hotel lobby and it was a lifesaver! A quick spritz of a luxurious scent before my dinner date. So convenient and chic.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Isabella Rossi",
    role: "Hotel Guest",
  },
  {
    text: "The Fragancao machine is a touch of genius. The selection of perfumes is exquisite. It's like having a high-end department store counter available 24/7.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Liam Chen",
    role: "Luxury Shopper",
  },
  {
    text: "I was so impressed by the design of the machine itself. It adds such an elegant vibe to the venue. And the fragrance? Absolutely divine.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Chloe Dubois",
    role: "Event Planner",
  },
  {
    text: "Perfect for a quick refresh after a long flight. I felt instantly more put-together. A brilliant idea for airports!",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Marcus Thorne",
    role: "Frequent Flyer",
  },
  {
    text: "As a fragrance enthusiast, I was skeptical, but the quality is top-notch. It's a fantastic way to try out new premium scents.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Ava Sinclair",
    role: "Fragrance Blogger",
  },
  {
    text: "The user interface is so sleek and easy to use. A few taps and I was enveloped in a beautiful aroma. The future of fragrance on-the-go.",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    name: "Noah Patel",
    role: "Tech Enthusiast",
  },
  {
    text: "Our customers absolutely love it. It's become a real talking point and adds a memorable, luxurious experience to their visit.",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    name: "Olivia Kim",
    role: "Restaurant Owner",
  },
  {
    text: "Found this at the mall and it's a game-changer. I can always smell my best, no matter how long my day has been. The scents last for hours.",
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    name: "Ethan Rodriguez",
    role: "Mall Patron",
  },
  {
    text: "A little spritz from the Fragancao machine is the perfect confidence boost before a night out. The scents are so sophisticated.",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    name: "Sophia Nguyen",
    role: "Nightclub Goer",
  },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


const Testimonials = () => {
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
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;