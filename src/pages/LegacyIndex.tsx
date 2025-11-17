import { Helmet } from "react-helmet-async";
import { AnimatedHero } from "@/components/ui/animated-hero";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { TrendingUp, Star, Bot } from "lucide-react";

// Mock data for legacy components
const features = [
    {
        title: "Extra Revenue Stream",
        description: "Generate passive income without extra effort or staff.",
        icon: <TrendingUp />
    },
    {
        title: "Enhanced Customer Experience",
        description: "Offer your guests a unique, memorable experience.",
        icon: <Star />
    },
    {
        title: "Fully Automated",
        description: "No maintenance, no hassle - everything runs automatically.",
        icon: <Bot />
    }
];

const testimonials = [
    {
        text: "The Fragancao machine has been a fantastic addition to our hotel lobby. Our guests love the touch of luxury.",
        name: "John Doe",
        role: "Manager, Grand Hotel",
        image_url: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        text: "A brilliant concept that actually delivers. We've seen a noticeable increase in guest satisfaction.",
        name: "Jane Smith",
        role: "Owner, The Velvet Lounge",
        image_url: "https://randomuser.me/api/portraits/women/44.jpg"
    }
];

const LegacyIndex = () => {
  return (
    <>
      <Helmet>
        <title>Fragancao (Legacy) – Luxury Fragrance Vending</title>
        <meta name="description" content="Discover the original Fragancao experience. Automated perfume vending for premium locations." />
      </Helmet>
      
      <AnimatedHero />

      <div className="py-20">
        <FeaturesSectionWithHoverEffects features={features} />
      </div>

      <div className="py-20 bg-secondary/20">
        <TestimonialsColumn testimonials={testimonials} title="What Our Partners Say" description="Our partners have seen great results." />
      </div>

      <section className="py-20 sm:py-32">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Ready to Elevate Your Venue?</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
                <Link to="/contact">Request a Consultation</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
                <Link to="/pricing">View Partnership Models</Link>
            </Button>
            </div>
        </div>
      </section>
    </>
  );
};

export default LegacyIndex;