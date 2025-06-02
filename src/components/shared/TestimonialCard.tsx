import type { Testimonial } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const fallbackName = testimonial.patientName.split(' ').map(n => n[0]).join('').toUpperCase();
  return (
    <Card className="shadow-lg rounded-lg overflow-hidden h-full flex flex-col bg-card">
      <CardContent className="p-6 flex-grow flex flex-col">
        <Quote className="h-8 w-8 text-accent mb-4" />
        <p className="text-foreground/80 italic mb-6 flex-grow">"{testimonial.quote}"</p>
        <div className="flex items-center mt-auto pt-4 border-t border-border">
          {testimonial.imageUrl && (
            <Avatar className="h-12 w-12 mr-4">
              <AvatarImage src={testimonial.imageUrl} alt={testimonial.patientName} data-ai-hint="happy patient" />
              <AvatarFallback>{fallbackName}</AvatarFallback>
            </Avatar>
          )}
          <div>
            <p className="font-semibold text-primary">{testimonial.patientName}</p>
            <p className="text-xs text-muted-foreground">{new Date(testimonial.date).toLocaleDateString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
