import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">Notifications</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Vos dernières notifications.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
        <Bell className="h-24 w-24" />
        <p className="mt-4 text-xl">Aucune nouvelle notification pour le moment.</p>
      </div>
    </div>
  );
}
