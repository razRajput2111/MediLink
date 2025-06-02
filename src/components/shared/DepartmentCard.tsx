import type { Department } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface DepartmentCardProps {
  department: Department;
}

export function DepartmentCard({ department }: DepartmentCardProps) {
  const IconComponent = department.icon;
  return (
    <Link href={`/doctors?department=${department.id}`} className="block group">
      <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg">
        {department.imageUrl && (
          <div className="relative h-48 w-full">
            <Image
              src={department.imageUrl}
              alt={department.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint="medical department"
            />
          </div>
        )}
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {IconComponent && <IconComponent className="h-8 w-8 text-primary" />}
              <CardTitle className="font-headline text-xl text-primary">{department.name}</CardTitle>
            </div>
            <ChevronRight className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-foreground/80 line-clamp-3">{department.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
