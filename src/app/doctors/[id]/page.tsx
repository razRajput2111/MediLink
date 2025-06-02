import Image from 'next/image';
import { placeholderDoctors, placeholderDepartments } from '@/lib/placeholder-data';
import type { Doctor } from '@/lib/types';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Stethoscope, CalendarDays, Clock, GraduationCap, Briefcase, Users, ChevronLeft } from 'lucide-react';

export async function generateStaticParams() {
  return placeholderDoctors.map((doctor) => ({
    id: doctor.id,
  }));
}

export default function DoctorProfilePage({ params }: { params: { id: string } }) {
  const doctor = placeholderDoctors.find(d => d.id === params.id);

  if (!doctor) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-destructive">Doctor not found</h1>
        <Button asChild variant="link" className="mt-4">
          <Link href="/doctors">Back to Doctors</Link>
        </Button>
      </div>
    );
  }

  const department = placeholderDepartments.find(dept => dept.id === doctor.departmentId);

  return (
    <div>
      <PageHeader title={doctor.name} description={`${doctor.specialty} at MediLink`} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button asChild variant="outline" className="mb-8 group">
          <Link href="/doctors">
            <ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Doctors
          </Link>
        </Button>
        <Card className="overflow-hidden shadow-xl rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-1 p-6 bg-secondary/30 flex flex-col items-center text-center">
              <div className="relative h-48 w-48 rounded-full overflow-hidden mb-6 shadow-lg border-4 border-primary">
                <Image
                  src={doctor.imageUrl}
                  alt={`Photo of ${doctor.name}`}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="doctor portrait professional"
                />
              </div>
              <h2 className="font-headline text-2xl font-semibold text-primary mb-1">{doctor.name}</h2>
              <p className="text-accent flex items-center justify-center">
                <Stethoscope className="h-5 w-5 mr-1.5" />
                {doctor.specialty}
              </p>
              {department && (
                <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center">
                  <Users className="h-4 w-4 mr-1.5" />
                  {department.name}
                </p>
              )}
               <div className="mt-4 space-x-2">
                <Button size="sm" className="bg-primary hover:bg-primary/90">Book Appointment</Button>
                <Button size="sm" variant="outline">Contact Doctor</Button>
              </div>
            </div>

            <div className="md:col-span-2 p-6 md:p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="font-headline text-2xl text-primary border-b pb-2">Doctor Profile</CardTitle>
              </CardHeader>
              <CardContent className="p-0 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2 flex items-center">
                    <Briefcase className="h-5 w-5 mr-2 text-accent" />
                    About
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">{doctor.bio}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2 flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-accent" />
                    Qualifications & Experience
                  </h3>
                  <ul className="list-disc list-inside text-foreground/80 space-y-1">
                    {doctor.qualifications.map((q, index) => (
                      <li key={index}>{q}</li>
                    ))}
                    <li>{doctor.experienceYears} years of experience</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2 flex items-center">
                    <CalendarDays className="h-5 w-5 mr-2 text-accent" />
                    Availability
                  </h3>
                  <div className="flex items-center text-foreground/80">
                    <Clock className="h-4 w-4 mr-1.5 text-muted-foreground" />
                    <span>{doctor.availability}</span>
                  </div>
                </div>
                
                {department && (
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-accent" />
                      Department
                    </h3>
                    <Link href={`/doctors?department=${department.id}`} className="text-primary hover:underline">
                        {department.name}
                    </Link>
                    <p className="text-sm text-foreground/80 mt-1">{department.description}</p>
                  </div>
                )}

              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
