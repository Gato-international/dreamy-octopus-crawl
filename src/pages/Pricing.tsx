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
    name: "Plaatsing",
    description: "Ideaal voor enkele locaties zoals hotels, restaurants of boetieks.",
    price: "Omzetdeling",
    features: [
      "1 Deluxe Vending Machine",
      "Geen investeringskosten",
      "Aantrekkelijke omzetdeling",
      "Maandelijks onderhoud & bijvullen",
      "24/7 Online Support",
    ],
    cta: "Word Partner",
    popular: false,
  },
  {
    name: "Franchise",
    description: "Perfect voor bedrijven met meerdere locaties of ketens.",
    price: "Hogere Omzetdeling",
    features: [
      "Tot 10 machines",
      "Verbeterde omzetdeling",
      "Prioriteitssupport via telefoon & e-mail",
      "Tweewekelijks onderhoud & bijvullen",
      "Toegang tot analytics dashboard",
    ],
    cta: "Vraag een offerte aan",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Voor grootschalige, op maat gemaakte implementaties en unieke merkervaringen.",
    price: "Model op Maat",
    features: [
      "Onbeperkt aantal machines",
      "Machine design & branding op maat",
      "Persoonlijke accountmanager",
      "Onderhoud op aanvraag",
      "Geavanceerde API-integratie",
    ],
    cta: "Neem contact op",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <div className="container max-w-screen-lg py-12 pt-24 sm:pt-32">
      <div className="text-center mb-12 lg:mb-20">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Partnerships & Prijzen
        </h1>
        <p className="mt-6 text-lg leading-8 text-foreground/80 max-w-3xl mx-auto">
          Ontdek hoe onze Parfum Vending Machine een luxe ervaring kan toevoegen aan uw locatie en tegelijkertijd een nieuwe inkomstenbron kan genereren.
        </p>
      </div>

      <div className="text-center mb-12 lg:mb-20">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
           Verdien met elke spray
        </h2>
        <p className="mt-6 text-lg leading-8 text-foreground/80 max-w-3xl mx-auto">
          Met de Parfum Vending Machine – Pay per Spray – bieden we uw bezoekers een luxe parfumervaring voor slechts €3 per spray. Ideaal voor een snelle opfrisser na het sporten, na het werk of voor een avondje uit.
        </p>
      </div>

      <Card className="mb-12 lg:mb-20 max-w-4xl mx-auto bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Voorbeeld Omzetberekening</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold">40</p>
            <p className="text-foreground/80">Gem. sprays per dag</p>
          </div>
          <div>
            <p className="text-4xl font-bold">€120</p>
            <p className="text-foreground/80">Gem. dagomzet</p>
          </div>
          <div>
            <p className="text-4xl font-bold">€3.600</p>
            <p className="text-foreground/80">Gem. maandomzet</p>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-foreground/60 mx-auto text-center">
            *De daadwerkelijke resultaten zijn afhankelijk van locatie, zichtbaarheid en passantenstroom.
          </p>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 items-start">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.name}
            className={`flex flex-col h-full ${tier.popular ? "border-primary shadow-lg" : ""}`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{tier.name}</CardTitle>
                {tier.popular && <Badge variant="default">Populairst</Badge>}
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