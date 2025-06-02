export interface Department {
  id: string;
  name: string;
  description: string;
  icon?: React.ElementType; // For Lucide icons
  imageUrl?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  departmentId: string;
  departmentName?: string; // Denormalized for convenience
  bio: string;
  availability: string; // Could be more complex, e.g., array of time slots
  imageUrl: string;
  qualifications: string[];
  experienceYears: number;
}

export interface Testimonial {
  id: string;
  patientName: string;
  quote: string;
  imageUrl?: string;
  date: string;
}
