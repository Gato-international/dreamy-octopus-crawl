"use client";
import { Button } from "@/components/ui/button";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

type Image = {
  src: string;
  alt: string;
};

type Content = {
  headline: string;
  subheadline: string;
  description: string;
  primaryCta: { text: string; link: string };
  secondaryCta: { text: string; link: string };
  images: Image[];
};

const defaultImages = [
  {
    src: "/spray-bottle.png",
    alt: "Spray Bottle",
  },
  {
    src: "/select-finger.png",
    alt: "Select Finger",
  },
  {
    src: "/fragrance-spray.png",
    alt: "Fragrance Spray",
  },
];

export function Hero() {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const keys = [
        'about_headline', 'about_subheadline', 'about_description',
        'about_primary_cta_text', 'about_primary_cta_link',
        'about_secondary_cta_text', 'about_secondary_cta_link',
        'about_images'
      ];
      const { data, error } = await supabase.from('site_config').select('*').in('key', keys);
      
      if (error) {
        console.error("Error fetching about content:", error);
        setContent(null);
      } else {
        const config = data.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {} as Record<string, string>);

        let images = defaultImages;
        if (config.about_images) {
          try {
            const parsedImages = JSON.parse(config.about_images);
            if (Array.isArray(parsedImages) && parsedImages.length > 0) {
              images = parsedImages;
            }
          } catch (e) {
            console.error("Failed to parse about_images JSON:", e);
          }
        }

        setContent({
          headline: config.about_headline || "Three steps to your new scent",
          subheadline: config.about_subheadline || "How it works",
          description: config.about_description || "Our vending machine offers a seamless and luxurious experience. In just a few simple steps, you can enjoy a refreshing spray of your favorite high-end perfume.",
          primaryCta: {
            text: config.about_primary_cta_text || "Our Pricing",
            link: config.about_primary_cta_link || "/pricing",
          },
          secondaryCta: {
            text: config.about_secondary_cta_text || "Contact Us",
            link: config.about_secondary_cta_link || "/contact",
          },
          images: images,
        });
      }
      setLoading(false);
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              <Skeleton className="w-full h-full aspect-square rounded-xl" />
              <Skeleton className="w-full h-full aspect-square rounded-xl" />
              <Skeleton className="w-full h-full aspect-square rounded-xl col-span-2" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                {content.subheadline}
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                <TextGenerateEffect words={content.headline} />
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {content.description}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link to={content.primaryCta.link}>{content.primaryCta.text}</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to={content.secondaryCta.link}>{content.secondaryCta.text}</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <img
              alt={content.images[0]?.alt || "Image"}
              className="aspect-square w-full overflow-hidden rounded-xl object-cover"
              height="310"
              src={content.images[0]?.src || "/placeholder.svg"}
              width="310"
            />
            <img
              alt={content.images[1]?.alt || "Image"}
              className="aspect-square w-full overflow-hidden rounded-xl object-cover"
              height="310"
              src={content.images[1]?.src || "/placeholder.svg"}
              width="310"
            />
            <img
              alt={content.images[2]?.alt || "Image"}
              className="col-span-2 aspect-video w-full overflow-hidden rounded-xl object-cover"
              height="310"
              src={content.images[2]?.src || "/placeholder.svg"}
              width="620"
            />
          </div>
        </div>
      </div>
    </section>
  );
}