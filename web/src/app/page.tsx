'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  CheckCircle,
  Fish,
  Clock,
  Truck,
  Shield,
  Star,
  MapPin,
  Heart,
  Smartphone,
  Award,
  TrendingUp,
  Users,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Zap,
  Package,
  Leaf,
} from 'lucide-react';
import Link from 'next/link';
import { APP_NAME } from '@/constants';

export default function LandingPage() {
  const features = [
    {
      icon: Fish,
      title: 'Ocean Fresh Quality',
      description: 'Directly sourced from local fishermen within 2 hours of catch. Quality guaranteed.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Clock,
      title: 'Sunrise Delivery',
      description: 'Get your fish delivered as early as 6 AM for the freshest morning meal.',
      gradient: 'from-orange-500 to-yellow-500',
    },
    {
      icon: Truck,
      title: 'Zone-Based Delivery',
      description: 'Fast delivery across Chennai. Free shipping on orders above ₹300.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: '100% freshness guarantee or full refund. Your satisfaction is our priority.',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Happy Customers', color: 'text-blue-400' },
    { icon: Package, value: '50,000+', label: 'Orders Delivered', color: 'text-cyan-400' },
    { icon: Award, value: '4.8/5', label: 'Customer Rating', color: 'text-yellow-400' },
    { icon: MapPin, value: '25+', label: 'Zones Covered', color: 'text-green-400' },
  ];

  const categories = [
    { name: 'Sea Fish', icon: '🐟', count: '20+ varieties' },
    { name: 'River Fish', icon: '🐠', count: '15+ varieties' },
    { name: 'Prawns', icon: '🦐', count: '8+ varieties' },
    { name: 'Crabs', icon: '🦀', count: '5+ varieties' },
    { name: 'Squid', icon: '🦑', count: '4+ varieties' },
    { name: 'Seasonal', icon: '⭐', count: '10+ varieties' },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      location: 'T. Nagar, Chennai',
      rating: 5,
      text: "Best fish delivery service in Chennai! The quality is outstanding and delivery is always on time. I've been ordering for 6 months now.",
      image: 'P',
    },
    {
      name: 'Rajesh Kumar',
      location: 'Anna Nagar, Chennai',
      rating: 5,
      text: 'Love the sunrise delivery option. Perfect for cooking fresh breakfast! The cleaning service is excellent and saves so much time.',
      image: 'R',
    },
    {
      name: 'Lakshmi Menon',
      location: 'Adyar, Chennai',
      rating: 5,
      text: 'Great variety and the cleaning options are fantastic. The recipe section helped me try new dishes. Highly recommended!',
      image: 'L',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg">
                <Fish className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">
                {APP_NAME}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
              <a href="#features" className="text-slate-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#how-it-works" className="text-slate-700 hover:text-blue-600 transition-colors">How it Works</a>
              <a href="#testimonials" className="text-slate-700 hover:text-blue-600 transition-colors">Reviews</a>
              <a href="#contact" className="text-slate-700 hover:text-blue-600 transition-colors">Contact</a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="outline" size="sm" className="hidden sm:flex border-2 text-slate-900 hover:bg-slate-50">Login</Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-blue-500/30 text-white font-semibold">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Background */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070&auto=format&fit=crop')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-cyan-600 to-teal-600 opacity-90" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white text-blue-600 hover:bg-blue-50 border-0 shadow-xl text-base px-6 py-2">
              🎉 Special Launch Offer - Get ₹50 OFF on First Order
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-blue-900">
              Fresh Fish, Delivered
              <br />
              <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                Straight to Your Door
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-cyan-800 mb-10 max-w-2xl mx-auto leading-relaxed font-bold">
              Premium quality seafood from ocean to table in hours. Chennai's most trusted fish delivery service with bilingual support.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-10">
              <Link href="/register">
                <Button size="lg" className="h-14 px-8 text-lg bg-white text-blue-600 hover:bg-blue-50 shadow-2xl shadow-black/20 font-semibold group">
                  <Smartphone className="mr-2 h-5 w-5" />
                  Start Shopping Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" className="h-14 px-8 text-lg bg-white/90 backdrop-blur-sm text-cyan-700 border-2 border-cyan-300 hover:bg-white hover:border-cyan-500 shadow-xl font-semibold">
                  <Fish className="mr-2 h-5 w-5" />
                  Browse Catalog
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-semibold">
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg text-blue-900">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>100% Fresh Guarantee</span>
              </div>
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg text-blue-900">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Free Delivery ₹300+</span>
              </div>
              <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg text-blue-900">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Same Day Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-slate-300 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-gradient-to-b from-white via-cyan-50/30 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">Our Selection</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">60+ Premium Varieties</h2>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto font-medium">
              From traditional favorites to exotic catches, we have everything you need
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-blue-200 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
                  <h3 className="font-bold mb-1 text-slate-900">{category.name}</h3>
                  <p className="text-xs text-slate-600 font-medium">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">Why Choose Us</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              The <span className="text-blue-600">FreshCatch</span> Advantage
            </h2>
            <p className="text-xl text-slate-700 max-w-2xl mx-auto font-medium">
              Experience premium seafood delivery with unmatched quality and service
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-blue-200 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">{feature.title}</h3>
                  <p className="text-slate-700 font-medium leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">Simple Process</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">How It Works</h2>
            <p className="text-xl text-slate-700 font-medium">Fresh fish delivered in 4 easy steps</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { step: '01', title: 'Browse & Select', desc: 'Choose from 60+ varieties with detailed info', icon: Fish },
              { step: '02', title: 'Customize Order', desc: 'Select cleaning options and quantity', icon: Leaf },
              { step: '03', title: 'Choose Time Slot', desc: 'Pick from 4 delivery windows', icon: Clock },
              { step: '04', title: 'Fresh Delivery', desc: 'Track order and receive fresh fish', icon: Truck },
            ].map((step, index) => (
              <div key={index} className="relative text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-white text-3xl font-bold mb-4 shadow-xl group-hover:scale-110 transition-transform">
                  {step.step}
                </div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-3">
                  <step.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-slate-900">{step.title}</h3>
                <p className="text-slate-700 font-medium">{step.desc}</p>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-1 bg-gradient-to-r from-blue-400 to-transparent -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 -z-10" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">Testimonials</Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Loved by Thousands</h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-2xl font-bold ml-2 text-slate-900">4.8 out of 5</span>
              </div>
              <p className="text-slate-700 font-medium">Based on 5,000+ verified reviews</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow border-2">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-slate-700 mb-4 leading-relaxed">"{testimonial.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {testimonial.image}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{testimonial.name}</p>
                        <p className="text-sm text-slate-500 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1534043464124-3be32fe000c9?q=80&w=2070&auto=format&fit=crop')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-cyan-600 to-teal-600 opacity-90" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">
              Ready to Experience Premium Fresh?
            </h2>
            <p className="text-xl mb-10 font-bold text-teal-800">
              Join 10,000+ satisfied customers. Order now and get ₹50 OFF on your first purchase!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="h-16 px-10 text-lg bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-2xl font-bold">
                  <Heart className="mr-2 h-6 w-6" />
                  Create Free Account
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" className="h-16 px-10 text-lg bg-white text-cyan-700 border-2 border-cyan-400 hover:bg-cyan-50 hover:border-cyan-600 shadow-2xl font-bold">
                  <Zap className="mr-2 h-6 w-6" />
                  Already a Member? Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-slate-300">
        <div className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500">
                  <Fish className="h-7 w-7 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">{APP_NAME}</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md leading-relaxed">
                Chennai's most trusted fresh fish delivery service. From ocean to table in hours with quality guarantee.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
                <li><Link href="/catalog" className="hover:text-white transition-colors">Fish Catalog</Link></li>
                <li><Link href="/recipes" className="hover:text-white transition-colors">Recipes</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>hello@freshcatch.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span>Chennai, Tamil Nadu</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-500">© 2024 {APP_NAME}. All rights reserved.</p>
              <div className="flex gap-6 text-sm">
                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                <Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
