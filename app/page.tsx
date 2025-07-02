"use client";

import React, { useState, useEffect } from 'react';
import { ChevronDown, Heart, Shield, Users, BookOpen, MessageCircle, MapPin, Mail, Phone, ArrowRight, Check, Star } from 'lucide-react';

const NestWebsite = () => {
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    services: false,
    about: false,
    guides: false,
    testimonials: false,
    contact: false
  });
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      name: "Perch",
      subtitle: "Light Support",
      description: "Gentle guidance via chat when you need it most",
      features: ["WhatsApp & Email Support", "Quick Problem Solving", "Resource Recommendations"],
      price: "₹2,999/month",
      icon: <MessageCircle className="w-6 h-6" />
    },
    {
      name: "Wingwork", 
      subtitle: "Hands-on Help",
      description: "Collaborative system design and implementation",
      features: ["Custom System Design", "Implementation Planning", "Ongoing Consultation"],
      price: "₹9,999/month",
      icon: <Users className="w-6 h-6" />
    },
    {
      name: "Nest Visit",
      subtitle: "In-Person Consults",
      description: "On-site workshops and training sessions",
      features: ["Campus Visits", "Staff Training", "Custom Workshops"],
      price: "₹15,000/day",
      icon: <MapPin className="w-6 h-6" />
    }
  ];

  const guides = [
    "Setting up Google Workspace for Schools",
    "Safe Student Data Management",
    "Canva for Educational Projects", 
    "Recording School Events with Phones",
    "Digital Classroom Basics",
    "Parent Communication Tools"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
		<img src="/nest-logo.png" alt="Nest Logo" className="w-20 h-20" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Nest</h1>
                <p className="text-sm text-gray-600">Where Tech Feels Safe</p>
              </div>
            </div>
		<nav className="hidden md:flex space-x-8">
		  <a href="#services" className="text-gray-700 hover:text-orange-600 transition-colors">Services</a>
		  <a href="#guides" className="text-gray-700 hover:text-orange-600 transition-colors">Guides</a>
		  <a href="/guides-admin" className="text-gray-700 hover:text-orange-600 transition-colors">Admin</a>
		  <a href="#about" className="text-gray-700 hover:text-orange-600 transition-colors">About</a>
		  <a href="#contact" className="text-gray-700 hover:text-orange-600 transition-colors">Contact</a>
		</nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-orange-200/50 mb-6">
                <Shield className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-gray-700">Trusted by Schools Across India</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
                Where Tech<br />
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Feels Safe
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                Gentle, human-friendly tech enablement for mid-sized schools. 
                No overwhelming systems, just clear guidance that empowers your team.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-full font-semibold border border-orange-200/50 hover:bg-white transition-all duration-300">
                Download Free Guide
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Support That Fits Your Pace</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the level of support that feels right for your school's digital transformation journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-200/50 hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                  activeService === index ? 'ring-2 ring-orange-400 shadow-lg' : ''
                } ${isVisible.services ? `opacity-100 translate-y-0 delay-${index * 200}` : 'opacity-0 translate-y-10'}`}
                onMouseEnter={() => setActiveService(index)}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-br from-orange-400 to-red-400 rounded-full text-white">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
                    <p className="text-sm text-gray-600">{service.subtitle}</p>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-2xl font-bold text-gray-800">{service.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section id="guides" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.guides ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-orange-200/50 mb-4">
              <BookOpen className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-gray-700">Featherlight Downloads</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Simple Guides, Powerful Results</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Step-by-step playbooks that any teacher or administrator can follow with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <div 
                key={index}
                className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-orange-200/50 hover:shadow-lg transition-all duration-300 group cursor-pointer ${
                  isVisible.guides ? `opacity-100 translate-y-0 delay-${index * 100}` : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                    {guide}
                  </h3>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors transform group-hover:translate-x-1" />
                </div>
                <p className="text-sm text-gray-600 mb-4">Clear, actionable steps with real-world examples from Indian schools.</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">Free Download</span>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Your Quiet Tech Partner</h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                I'm Dan, and I believe technology should feel like a gentle hand on your shoulder, 
                not a storm you have to weather. Nest exists to make digital transformation 
                feel safe, doable, and empowering for schools across India.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Human-Centered</h3>
                <p className="text-gray-600">Every solution is designed with teachers and administrators in mind, not just technology.</p>
              </div>

              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Safe & Secure</h3>
                <p className="text-gray-600">Your data, your students' privacy, and your peace of mind are always our top priorities.</p>
              </div>

              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Clear Guidance</h3>
                <p className="text-gray-600">No jargon, no complexity. Just clear, step-by-step guidance that actually makes sense.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Ready to Take Flight?</h2>
            <p className="text-lg text-gray-600">
              Let's start your school's gentle journey toward better technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-200/50 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700">hello@nesttechsafe.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-5 h-5 text-orange-600" />
                  <span className="text-gray-700">WhatsApp Support Available</span>
                </div>
              </div>
            </div>

            <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-200/50 transition-all duration-1000 ${isVisible.contact ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Start Today</h3>
              <p className="text-gray-600 mb-6">
                Download our free "Digital Readiness Assessment" and discover where your school stands on its tech journey.
              </p>
              <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Download Free Assessment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🪺</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Nest</h3>
              <p className="text-sm text-gray-400">Where Tech Feels Safe</p>
            </div>
          </div>
          <p className="text-gray-400 mb-4">
            Empowering schools across India with gentle, human-friendly technology guidance.
          </p>
          <p className="text-sm text-gray-500">
            © 2025 Nest EduTech. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NestWebsite;