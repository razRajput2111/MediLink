import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { placeholderDepartments, placeholderDoctors, placeholderTestimonials } from '@/lib/placeholder-data';
import { DepartmentCard } from '@/components/shared/DepartmentCard';
import { DoctorCard } from '@/components/shared/DoctorCard';
import { TestimonialCard } from '@/components/shared/TestimonialCard';
import { ChevronRight, Phone, MapPin, Mail } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-headline text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Welcome to MediLink
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Your trusted partner in health and wellness. We provide compassionate care with cutting-edge technology.
          </p>
          <div className="space-x-0 space-y-4 sm:space-x-4 sm:space-y-0">
            <Button asChild size="lg" className="bg-background text-primary hover:bg-background/90">
              <Link href="/doctors">Find a Doctor</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-background text-primary-foreground hover:bg-background/10 hover:text-primary">
              <Link href="/contact">Book Appointment</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Snippet */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">About MediLink Hospital</h2>
            <p className="text-lg text-foreground/80 mb-6">
              MediLink Hospital is a leading healthcare provider dedicated to offering a comprehensive range of medical services. Our state-of-the-art facility is equipped with the latest technology, and our team of experienced professionals is committed to delivering personalized care to each patient.
            </p>
            <Button asChild variant="link" className="text-accent hover:text-accent/80 text-lg">
              <Link href="/about">Learn More <ChevronRight className="ml-1 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Departments Section */}
      <section id="departments" className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-headline text-3xl font-bold text-primary mb-10 text-center">Our Departments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholderDepartments.slice(0,3).map((dept) => (
              <DepartmentCard key={dept.id} department={dept} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-headline text-3xl font-bold text-primary mb-10 text-center">Meet Our Doctors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholderDoctors.slice(0, 3).map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/doctors">View All Doctors</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-headline text-3xl font-bold text-primary mb-10 text-center">What Our Patients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {placeholderTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Snippet */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-xl rounded-lg p-8 md:p-12 bg-gradient-to-r from-primary/80 to-accent/80 text-primary-foreground">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="font-headline text-3xl text-center text-white">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="p-0 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <MapPin className="h-10 w-10 mb-3 text-white" />
                <h3 className="font-semibold text-lg mb-1 text-white">Our Location</h3>
                <p className="text-sm text-white/90">123 Health St, Wellness City, HC 45678</p>
              </div>
              <div className="flex flex-col items-center">
                <Phone className="h-10 w-10 mb-3 text-white" />
                <h3 className="font-semibold text-lg mb-1 text-white">Call Us</h3>
                <a href="tel:+1234567890" className="text-sm text-white/90 hover:underline">(123) 456-7890</a>
              </div>
              <div className="flex flex-col items-center">
                <Mail className="h-10 w-10 mb-3 text-white" />
                <h3 className="font-semibold text-lg mb-1 text-white">Email Us</h3>
                <a href="mailto:info@medilink.org" className="text-sm text-white/90 hover:underline">info@medilink.org</a>
              </div>
            </CardContent>
             <div className="text-center mt-10">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Link href="/contact">Send a Message</Link>
                </Button>
              </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
