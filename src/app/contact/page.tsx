'use client';

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { generateReplySuggestions, type GenerateReplySuggestionsOutput } from '@/ai/flows/smart-reply-suggestions';
import { Loader2, MessageSquare, Send, Lightbulb, AlertTriangle } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<GenerateReplySuggestionsOutput | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setIsLoading(true);
    setAiResponse(null);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const response = await generateReplySuggestions({ inquiry: data.message });
      setAiResponse(response);

      toast({
        title: "Message Sent & Suggestions Generated!",
        description: "Your message has been 'sent'. Check below for AI-powered reply suggestions.",
        variant: "default",
      });
      // reset(); // Optionally reset form. Keep data for context.
    } catch (error) {
      console.error("Error sending message or generating suggestions:", error);
      toast({
        title: "Error",
        description: "There was an problem. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return (
      <div>
        <PageHeader title="Contact Us" description="We're here to help. Send us a message or find our contact details below." />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
           <p className="text-center text-muted-foreground">Loading form...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Contact Us" description="We're here to help. Send us a message or find our contact details below." />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <Card className="shadow-xl rounded-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary flex items-center">
                <MessageSquare className="h-6 w-6 mr-2" /> Send Us a Message
              </CardTitle>
              <CardDescription>Fill out the form below, and we'll get back to you as soon as possible.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" {...register("name")} placeholder="John Doe" disabled={isLoading} />
                  {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" {...register("email")} placeholder="you@example.com" disabled={isLoading} />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" {...register("subject")} placeholder="Regarding my appointment" disabled={isLoading} />
                  {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" {...register("message")} rows={5} placeholder="Your message here..." disabled={isLoading} />
                  {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  Send Message & Get Suggestions
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {aiResponse && (
              <Card className="shadow-xl rounded-lg bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="font-headline text-xl text-primary flex items-center">
                    <Lightbulb className="h-5 w-5 mr-2 text-accent" /> AI Reply Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {aiResponse.shouldRespond ? (
                     <div className="p-3 rounded-md bg-accent/10 border border-accent/30 text-accent-foreground">
                      <p className="font-medium flex items-center"><AlertTriangle className="h-5 w-5 mr-2 text-accent" /> Staff Action Recommended</p>
                      <p className="text-sm">The AI suggests these inquiries may benefit from a personalized staff response rather than a canned one.</p>
                    </div>
                  ) : (
                    <div className="p-3 rounded-md bg-green-500/10 border border-green-500/30 text-green-700 dark:text-green-400">
                      <p className="font-medium flex items-center"><Lightbulb className="h-5 w-5 mr-2" /> Canned Responses Likely Applicable</p>
                      <p className="text-sm">The AI suggests canned responses might be suitable for this type of inquiry.</p>
                    </div>
                  )}
                 
                  <h4 className="font-semibold text-foreground">Suggested Replies:</h4>
                  {aiResponse.suggestions.length > 0 ? (
                    <ul className="list-disc list-inside space-y-2 pl-4 text-sm text-foreground/80">
                      {aiResponse.suggestions.map((suggestion, index) => (
                        <li key={index} className="p-2 bg-card rounded">{suggestion}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No specific reply suggestions generated.</p>
                  )}
                </CardContent>
              </Card>
            )}
            
            <Card className="shadow-xl rounded-lg">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-primary">Hospital Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-foreground/80">
                <p><strong>Address:</strong> 123 Health St, Wellness City, HC 45678</p>
                <p><strong>Phone:</strong> <a href="tel:+1234567890" className="text-primary hover:underline">(123) 456-7890</a></p>
                <p><strong>Email:</strong> <a href="mailto:info@medilink.org" className="text-primary hover:underline">info@medilink.org</a></p>
                <p><strong>Hours:</strong> Monday - Friday, 9 AM - 5 PM</p>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
