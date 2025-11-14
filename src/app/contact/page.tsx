"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit comporter au moins 2 caractères."),
  email: z.string().email("Adresse e-mail invalide."),
  message: z.string().min(10, "Le message doit comporter au moins 10 caractères."),
});

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Message envoyé!",
      description: "Merci de nous avoir contactés. Nous vous répondrons bientôt.",
    });
    form.reset();
  }

  const address = "123 Aloe Vera Lane, Wellness City, 90210";
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(address)}`;


  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Contactez-nous</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Nous aimerions avoir de vos nouvelles! Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-muted/30 p-8 rounded-lg">
          <h2 className="text-2xl font-bold font-headline mb-6">Prenez contact</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">E-mail</h3>
                <a href="mailto:support@aloeverashop.com" className="text-muted-foreground hover:text-primary transition-colors">
                  support@aloeverashop.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Téléphone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Adresse</h3>
                <p className="text-muted-foreground">{address}</p>
              </div>
            </div>
          </div>
           <div className="mt-8 rounded-lg overflow-hidden">
            <iframe
                className="w-full h-64"
                loading="lazy"
                allowFullScreen
                src={googleMapsUrl.replace('YOUR_API_KEY', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '')}>
            </iframe>
            <p className="text-xs text-muted-foreground mt-2">Pour que la carte s'affiche, une clé API Google Maps est nécessaire.</p>
          </div>
        </div>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre nom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="votre.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Comment pouvons-nous vous aider?"
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size="lg">Envoyer le message</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
