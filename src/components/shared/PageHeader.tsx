import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string | ReactNode;
  className?: string;
}

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={`py-8 sm:py-12 bg-gradient-to-r from-primary/10 to-accent/10 ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2 text-center">
          {title}
        </h1>
        {description && (
          <div className="text-base sm:text-lg text-foreground/80 max-w-3xl mx-auto text-center">
            {typeof description === 'string' ? <p>{description}</p> : description}
          </div>
        )}
      </div>
    </div>
  );
}
