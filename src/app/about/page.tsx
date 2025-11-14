import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const benefitsImage = PlaceHolderImages.find(p => p.id === 'benefits-image');
const engagementsImage = PlaceHolderImages.find(p => p.id === 'engagements-image');

export default function AboutPage() {
  const benefits = [
    "Une pureté exceptionnelle du gel de la feuille interne",
    "Traitement aseptique sans conservateurs ajoutés",
    "Soutient le système digestif et l'absorption des nutriments",
    "Maintient les niveaux d'énergie naturels",
    "Certifié par le Conseil scientifique international de l'aloès",
  ];

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">À propos de nous</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Notre engagement est de vous apporter le meilleur de la nature.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
          {benefitsImage && (
            <Image
              src={benefitsImage.imageUrl}
              alt={benefitsImage.description}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              data-ai-hint={benefitsImage.imageHint}
            />
          )}
        </div>
        <div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-secondary-foreground">La Promesse ALEO NATUREL</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Nous nous engageons à vous apporter le meilleur de la nature, avec des produits qui répondent aux plus hauts standards de qualité et de pureté.
          </p>
          <ul className="mt-8 space-y-4">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-3 mt-1 shrink-0" />
                <span className="text-secondary-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mt-24">
        <div className="md:order-last">
          <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-2xl">
            {engagementsImage && (
              <Image
                src={engagementsImage.imageUrl}
                alt={engagementsImage.description}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                data-ai-hint={engagementsImage.imageHint}
              />
            )}
          </div>
        </div>
        <div className="md:order-first">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-secondary-foreground">Nos histoires, nos engagements</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Depuis notre création, nous sommes animés par la passion de l'aloe vera et ses bienfaits. Notre histoire est celle d'une quête incessante de la qualité, du respect de la nature et de l'innovation au service de votre bien-être.
          </p>
           <p className="mt-4 text-lg text-muted-foreground">
            Chaque produit est le fruit d'un savoir-faire unique et d'un engagement profond envers nos clients et notre planète. Nous cultivons notre aloe vera de manière durable, sans pesticides, et nous nous assurons que chaque étape de la production préserve les précieuses propriétés de la plante.
          </p>
        </div>
      </div>
    </div>
  );
}
