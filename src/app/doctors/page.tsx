'use client';

import { useState, useMemo, useEffect } from 'react';
import { DoctorCard } from '@/components/shared/DoctorCard';
import { PageHeader } from '@/components/shared/PageHeader';
import { placeholderDoctors, placeholderDepartments } from '@/lib/placeholder-data';
import type { Doctor } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Filter, Search } from 'lucide-react';

export default function DoctorDirectoryPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // In a real app, fetch doctors here
    setDoctors(placeholderDoctors);
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesDepartment = selectedDepartment === 'all' || doctor.departmentId === selectedDepartment;
      const matchesSearchTerm = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDepartment && matchesSearchTerm;
    });
  }, [doctors, selectedDepartment, searchTerm]);

  if (!isMounted) {
     // Basic skeleton or loading state to avoid hydration issues
    return (
      <div>
        <PageHeader title="Our Doctors" description="Find the right specialist for your needs." />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 p-6 bg-card rounded-lg shadow">
            <p className="text-center text-muted-foreground">Loading doctors...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Our Doctors" description="Find the right specialist for your needs. Filter by department or search by name/specialty." />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 p-6 bg-card rounded-lg shadow-md flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
          <div className="relative flex-grow w-full sm:w-auto">
             <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full pl-10">
                 <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {placeholderDepartments.map(dept => (
                  <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No doctors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
