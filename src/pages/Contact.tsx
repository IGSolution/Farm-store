import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Leaf, MapPin, Phone, Mail, Clock } from "lucide-react";
import { MobileNav } from "@/components/MobileNav";
import { SocialIcons } from "@/components/SocialIcons";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import logo from "../assets/android-chrome-192x192.png"
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "send-contact-email",
        {
          body: formData,
        }
      );

      if (error) {
        throw error;
      }

      toast({
        title: "Message sent successfully!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="logo" className="h-8 w-8 text-green-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">KRP Farm</h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/marketplace"
                className="text-gray-500 hover:text-gray-900"
              >
                Marketplace
              </Link>
              <Link to="/about" className="text-gray-500 hover:text-gray-900">
                About
              </Link>
              {/* <Link to="/blog" className="text-gray-500 hover:text-gray-900">
                Blog
              </Link>*/}
              <Link
                to="/contact"
                className="text-gray-500 hover:text-gray-900 font-medium"
              >
                Contact
              </Link>
            </nav>

            <div className="hidden md:flex gap-2">
              <Link to="/marketplace">
                <Button variant="outline">Browse Marketplace</Button>
              </Link>
              <Link to="/auth">
                <Button>Get Started</Button>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Have questions about our marketplace? Need help with an order? We're
            here to help. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
                <CardDescription>
                  Multiple ways to reach our support team
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">Address</h4>
                    <p className="text-gray-600">
                      KRP-FEMA Head Office, Gyero Junction, Bukuru express way,
                      adjacent, jos South LGC secretariat
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">Phone</h4>
                    <p className="text-gray-600">
                      +234 (803) 966 8177, <br />
                      +234 (807) 792 0919
                    </p>
                    <p className="text-sm text-gray-500">Mon-Fri 8AM-6PM WAT</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <p className="text-gray-600">krpkaneng@gmail.com</p>
                    <p className="text-sm text-gray-500">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Business Hours
                    </h4>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 6:00 PM
                      <br />
                      Saturday: 9:00 AM - 4:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Delivery Hours
                    </h4>
                    <p className="text-gray-600">
                      Wednesdays: 8:00 AM - 9:00 PM
                    </p>
                  </div>
                </div>
                <div className="pt-6 border-t">
                  <h4 className="font-medium text-gray-900 mb-3">Follow Us</h4>
                  <SocialIcons />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as
                  possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="What is this regarding?"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                How do I order?
              </h4>
              <p className="text-gray-600 mb-4">
                To place an order, go to the shop page, select the items you
                wish to order for and make a purchase.
              </p>

              <h4 className="font-semibold text-gray-900 mb-2">
                How much food do I need to order?
              </h4>
              <p className="text-gray-600 mb-4">
                The minimum order number would be indicated on each item.
              </p>

              <h4 className="font-semibold text-gray-900 mb-2">
                How fresh are the products?
              </h4>
              <p className="text-gray-600">
                All our products come directly from local farmers and are
                harvested within 24-48 hours of delivery.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Will you deliver the items to us?
              </h4>
              <p className="text-gray-600 mb-4">
                Yes, we do carry out delivery. Reach out to us on social media
                to signify your nearest bus stop as a pickup site.
              </p>

              <h4 className="font-semibold text-gray-900 mb-2">
                Can I return products?
              </h4>
              <p className="text-gray-600 mb-4">
                Yes, we have a 24-hour return policy for fresh produce if you're
                not satisfied with the quality.
              </p>

              <h4 className="font-semibold text-gray-900 mb-2">
                How are your contribution improving the economy?
              </h4>
              <p className="text-gray-600">
                Our operations have generated income and employment for young
                individuals in rural areas, helping to stem the tide of
                rural-urban migration. We see every job created as a step
                towards reducing poverty in our communities
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="logo" className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-xl font-bold">KRP Farm</span>
              </Link>
              <p className="mt-4 text-gray-400 max-w-md">
                Connecting Nigerian farmers with consumers for fresh, local
                produce delivery.
              </p>
              <div className="mt-6">
                <SocialIcons />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
                Quick Links
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/marketplace"
                    className="text-gray-300 hover:text-white"
                  >
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-300 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4">
                Support
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link to="/auth" className="text-gray-300 hover:text-white">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:support@farmstore.ng"
                    className="text-gray-300 hover:text-white"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+2348000000000"
                    className="text-gray-300 hover:text-white"
                  >
                    Call Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 KRP FARM.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
