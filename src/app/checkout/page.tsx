'use client';

import { useCart } from '@/components/cart/cart-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCard, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, 'Le nom doit comporter au moins 2 caractères.'),
  email: z.string().email('Adresse e-mail invalide.'),
  address: z.string().min(10, "L'adresse doit comporter au moins 10 caractères."),
  city: z.string().min(2, 'La ville doit comporter au moins 2 caractères.'),
  zip: z.string().min(4, 'Le code postal doit comporter au moins 4 caractères.'),
  card: z.string().regex(/^[0-9]{16}$/, 'Numéro de carte invalide.'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, 'Date d\'expiration invalide (MM/YY).'),
  cvc: z.string().regex(/^[0-9]{3}$/, 'CVC invalide.'),
});

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      zip: '',
      card: '',
      expiry: '',
      cvc: '',
    },
  });

  const shippingCost = 5.0;
  const totalCost = cartTotal + shippingCost;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: 'Commande passée!',
      description:
        'Merci pour votre achat. Votre commande a été traitée avec succès.',
    });
    clearCart();
    form.reset();
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 lg:py-24 text-center">
        <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground/50" />
        <h1 className="mt-8 font-headline text-4xl md:text-5xl font-bold">
          Votre panier est vide
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Vous n'avez aucun article dans votre panier.
        </p>
        <Button asChild className="mt-8" size="lg">
          <Link href="/products">Parcourir les produits</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          Paiement
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Finalisez votre commande en remplissant les informations ci-dessous.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div className="lg:order-last">
          <Card>
            <CardHeader>
              <CardTitle>Résumé de la commande</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                         <Image src={item.image.src} alt={item.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">{(item.price * item.quantity).toFixed(2)} FCFA</p>
                  </div>
                ))}
              </div>
              <Separator className="my-6" />
              <div className="space-y-2">
                 <div className="flex justify-between">
                    <p className="text-muted-foreground">Sous-total</p>
                    <p>{cartTotal.toFixed(2)} FCFA</p>
                 </div>
                 <div className="flex justify-between">
                    <p className="text-muted-foreground">Frais de port</p>
                    <p>{shippingCost.toFixed(2)} FCFA</p>
                 </div>
                 <Separator className="my-2" />
                 <div className="flex justify-between font-bold text-lg">
                    <p>Total</p>
                    <p>{totalCost.toFixed(2)} FCFA</p>
                 </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Card>
                 <CardHeader>
                    <CardTitle>Informations de livraison</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom complet</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom complet" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input placeholder="votre.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Adresse</FormLabel>
                          <FormControl>
                            <Input placeholder="123 rue de l'Exemple" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                       <FormField control={form.control} name="city" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ville</FormLabel>
                            <FormControl><Input placeholder="Paris" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField control={form.control} name="zip" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Code postal</FormLabel>
                            <FormControl><Input placeholder="75000" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                 </CardContent>
              </Card>

              <Card>
                 <CardHeader>
                    <CardTitle>Informations de paiement</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <FormField control={form.control} name="card" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Numéro de carte</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="•••• •••• •••• ••••" {...field} />
                              <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="expiry" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expiration (MM/YY)</FormLabel>
                            <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                       />
                       <FormField control={form.control} name="cvc" render={({ field }) => (
                          <FormItem>
                            <FormLabel>CVC</FormLabel>
                            <FormControl><Input placeholder="CVC" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                       />
                    </div>
                 </CardContent>
              </Card>
              
              <Button type="submit" size="lg" className="w-full">
                Payer {totalCost.toFixed(2)} FCFA
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
