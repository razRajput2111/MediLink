// @/components/layout/Footer.tsx
import Link from 'next/link';
import { Hospital, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t">
      <div className="container mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Hospital className="h-8 w-8 text-primary" />
              <span className="font-headline text-2xl font-bold text-primary">MediLink</span>
            </Link>
            <p className="text-sm">
              Providing compassionate and quality healthcare to our community.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-headline">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/doctors" className="hover:text-primary transition-colors">Find a Doctor</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/#departments" className="hover:text-primary transition-colors">Departments</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-headline">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 text-primary flex-shrink-0" />
                <span>123 Health St, Wellness City, HC 45678</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-primary transition-colors">(123) 456-7890</a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-primary flex-shrink-0" />
                <a href="mailto:info@medilink.org" className="hover:text-primary transition-colors">info@medilink.org</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MediLink. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
