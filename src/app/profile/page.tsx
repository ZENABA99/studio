'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Edit, LogOut } from 'lucide-react';
import { useAuth, useUser, useDoc, useMemoFirebase } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { doc, getFirestore } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

const mockOrders = [
  {
    id: 'ORDER-8792',
    date: '23/07/2024',
    status: 'Livré',
    total: '29.99 FCFA',
  },
  {
    id: 'ORDER-8791',
    date: '15/07/2024',
    status: 'Livré',
    total: '62.49 FCFA',
  },
  {
    id: 'ORDER-8790',
    date: '02/07/2024',
    status: 'Livré',
    total: '19.99 FCFA',
  },
];

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const firestore = getFirestore(auth.app);

  const userDocRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc(userDocRef);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: 'Déconnecté',
        description: 'Vous avez été déconnecté avec succès.',
      });
      router.push('/');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erreur de déconnexion',
        description: error.message,
      });
    }
  };

  if (isUserLoading || (user && isProfileLoading)) {
    return (
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-1 space-y-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Skeleton className="h-24 w-24 rounded-full mb-4" />
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-5 w-64" />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Historique des commandes</CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-40 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!user || !userProfile) {
    // This could also redirect to login
    return (
      <div className="container mx-auto px-4 py-16 lg:py-24 text-center">
         <h1 className="text-2xl font-bold">Veuillez vous connecter pour voir votre profil.</h1>
         <Button onClick={() => router.push('/login')} className="mt-4">
           Se connecter
         </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">
          Mon Profil
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Gérez les informations de votre compte et consultez votre historique de commandes.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 items-start">
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.photoURL || undefined} alt={userProfile.firstName} />
                  <AvatarFallback>
                    {userProfile.firstName?.[0]}
                    {userProfile.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold font-headline">
                  {userProfile.firstName} {userProfile.lastName}
                </h2>
                <p className="text-muted-foreground">{userProfile.email}</p>
              </div>
              <Separator className="my-6" />
              <div className="space-y-2">
                 <Button variant="outline" className="w-full justify-start">
                    <Edit className="mr-2 h-4 w-4" /> Modifier le profil
                 </Button>
                 <Button variant="destructive" onClick={handleLogout} className="w-full justify-start">
                    <LogOut className="mr-2 h-4 w-4" /> Se déconnecter
                 </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Historique des commandes</CardTitle>
              <CardDescription>
                Voici la liste de vos commandes récentes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N° de Commande</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{order.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">{order.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
