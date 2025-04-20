
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const bookingSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  date: z.date({
    required_error: "Please select a date",
  }),
  time: z.string().min(1, { message: "Please select a time" }),
  service: z.string().min(1, { message: "Please select a service" }),
  message: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const availableTimeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", 
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", 
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", 
  "4:00 PM", "4:30 PM", "5:00 PM"
];

const services = [
  "Jewelry Consultation",
  "Custom Design Appointment",
  "Jewelry Repair Estimate",
  "Ring Sizing",
  "Cleaning & Inspection",
  "Private Viewing",
  "Anniversary Gift Selection",
  "Bridal Jewelry Consultation"
];

const BookingPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: BookingFormValues) => {
    console.log("Booking submitted:", data);
    
    // This would typically be an API call
    setTimeout(() => {
      toast({
        title: "Booking confirmed",
        description: `Your ${data.service} is scheduled for ${format(data.date, "MMMM do, yyyy")} at ${data.time}`,
      });
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-16">
        <Card className="border-larana-brown/20 shadow-sm animate-fade-in">
          <CardContent className="pt-6 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="text-green-600 w-8 h-8" />
            </div>
            <CardTitle className="text-2xl font-serif text-larana-brown-dark mb-2">
              Booking Confirmed
            </CardTitle>
            <CardDescription className="text-lg mb-6">
              Thank you for booking an appointment with Larana Jewelry.
            </CardDescription>
            <p className="mb-6 text-larana-brown">
              We've sent a confirmation email with all the details. Our team will contact you shortly to confirm your appointment.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                className="border-larana-brown text-larana-brown hover:bg-larana-beige hover:text-larana-brown-dark"
                onClick={() => window.location.href = "/"}
              >
                Return to Homepage
              </Button>
              <Button
                className="bg-larana-brown hover:bg-larana-brown-dark text-white"
                onClick={() => {
                  setIsSubmitted(false);
                  form.reset();
                }}
              >
                Make Another Booking
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto px-4 py-16 animate-fade-in">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-serif text-larana-brown-dark mb-4">Book an Appointment</h1>
        <p className="text-larana-brown max-w-2xl mx-auto">
          Schedule a personalized appointment with our jewelry experts for consultations, 
          custom designs, repairs, or simply to explore our exclusive collections.
        </p>
      </div>
      
      <Card className="border-larana-brown/20 shadow-sm">
        <CardHeader>
          <CardTitle>Appointment Details</CardTitle>
          <CardDescription>
            Please fill in your information to book an appointment at our boutique.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service}>{service}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => 
                              date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                              date.getDay() === 0 // Sunday
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableTimeSlots.map((time) => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please share any specific requests or questions you may have."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This helps us prepare for your appointment.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4 flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-larana-brown hover:bg-larana-brown-dark text-white min-w-[120px]"
                >
                  Book Appointment
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-larana-beige border-none shadow-sm">
          <CardContent className="pt-6">
            <h3 className="font-serif text-lg text-larana-brown-dark mb-2">Our Location</h3>
            <p className="text-larana-brown text-sm">
              123 Luxury Avenue<br />
              New York, NY 10001<br />
              United States
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-larana-beige border-none shadow-sm">
          <CardContent className="pt-6">
            <h3 className="font-serif text-lg text-larana-brown-dark mb-2">Opening Hours</h3>
            <p className="text-larana-brown text-sm">
              Monday - Friday: 10:00 AM - 6:00 PM<br />
              Saturday: 10:00 AM - 5:00 PM<br />
              Sunday: Closed
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-larana-beige border-none shadow-sm">
          <CardContent className="pt-6">
            <h3 className="font-serif text-lg text-larana-brown-dark mb-2">Contact Us</h3>
            <p className="text-larana-brown text-sm">
              Phone: +1 (212) 555-1234<br />
              Email: appointments@larana.com<br />
              Instagram: @laranajewelry
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingPage;
