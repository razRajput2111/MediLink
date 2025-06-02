import type { Doctor } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Stethoscope, ChevronRight } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg flex flex-col h-full">
      <div className="relative h-56 w-full">
        <Image
          src={doctor.imageUrl}
          alt={`Photo of ${doctor.name}`}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 group-hover:scale-105"
          data-ai-hint="doctor portrait"
        />
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="font-headline text-xl text-primary">{doctor.name}</CardTitle>
        <CardDescription className="text-accent flex items-center">
          <Stethoscope className="h-4 w-4 mr-1.5" />
          {doctor.specialty}
        </CardDescription>
        {doctor.departmentName && <p className="text-sm text-muted-foreground mt-1">{doctor.departmentName}</p>}
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <p className="text-sm text-foreground/80 mb-4 line-clamp-3">{doctor.bio}</p>
        <Button asChild variant="outline" className="w-full mt-auto group">
          <Link href={`/doctors/${doctor.id}`}>
            View Profile <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
