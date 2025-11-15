import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const pricingTiers = [
  {
    name: "Placement",
    description: "Ideal for single venues like hotels, restaurants, or boutiques.",
    price: "Contact Us",
    features: [
      "1 Deluxe Vending Machine",
      "5 Premium Fragrances",
      "24/7 Online Support",
      "Monthly Maintenance & Restock",
    ],
    cta: "Get a Quote",
    popular: false,
  },
  {
    name: "Franchise",
    description: "Perfect for businesses with multiple locations or chains.",
    price: "Contact Us",
    features: [
      "Up to 10 Machines",
      "Custom Fragrance Selection",
      "Priority Phone & Email Support",
      "Bi-weekly Maintenance & Restock",
      "Usage Analytics Dashboard",
    ],
    cta: "Get a Quote",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large-scale, custom deployments and unique brand experiences.",
    price: "Contact Us",
    features: [
      "Unlimited Machines",
      "Bespoke Machine Design & Branding",
      "Dedicated Account Manager",
      "On-demand Maintenance",
      "Advanced API Integration",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <div className="container max-w-screen-lg py-12 pt-24 sm:pt-32">
      <div className="text-center mb-12 lg:mb-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Simple, transparent pricing
        </h1>
        <p className="mt-6 text-lg leading-8 text-foreground/80 max-w-2xl mx-auto">
          Choose the perfect plan to bring a touch of luxury to your
          establishment. All plans are tailored to your specific needs.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-start">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.name}
            className={`flex flex-col h-full ${tier.popular ? "border-primary shadow-lg" : ""}`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{tier.name}</CardTitle>
                {tier.popular && <Badge variant="default">Most Popular</Badge>}
              </div>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-4xl font-bold mb-6">{tier.price}</p>
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={tier.popular ? "default" : "outline"}>
                {tier.cta}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pricing;