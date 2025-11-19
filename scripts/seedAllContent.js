/**
 * Comprehensive Content Seeding Script
 *
 * This script populates ALL content from your website into the database
 * including all images, text, and editable sections
 *
 * Usage: npm run seed:all
 */

import mongoose from 'mongoose';
import SiteContent from '../models/SiteContent.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../.env.local') });

const allContent = [
  // ============ HEADER/NAVIGATION ============
  {
    section_id: 'header_logo',
    content_type: 'image',
    content: {
      url: '/assets/images/logo2.png',
      alt: 'Savage Squad Logo',
    },
    metadata: {
      section_name: 'Header Logo',
      page: 'global',
      order: 1,
    },
    updated_by: 'system',
  },
  {
    section_id: 'sidebar_logo',
    content_type: 'image',
    content: {
      url: '/assets/images/savage squad logos_1 gold.png',
      alt: 'Savage Squad Gold Logo',
    },
    metadata: {
      section_name: 'Sidebar Logo',
      page: 'global',
      order: 2,
    },
    updated_by: 'system',
  },

  // ============ HERO SECTION ============
  {
    section_id: 'hero_title',
    content_type: 'rich_text',
    content: {
      text: 'EMPOWER YOUR CREDIT JOURNEY',
      html: '<h1>EMPOWER YOUR CREDIT JOURNEY</h1>',
    },
    metadata: {
      section_name: 'Hero Title',
      page: 'home',
      order: 10,
    },
    updated_by: 'system',
  },
  {
    section_id: 'hero_description',
    content_type: 'rich_text',
    content: {
      text: 'Savage Squad provides surety bond certified credit services. Schedule your free consultation today and discover how we can help you achieve your financial goals through expert credit analysis and personalized solutions.',
      html: '<p>Savage Squad provides surety bond certified credit services. Schedule your free consultation today and discover how we can help you achieve your financial goals through expert credit analysis and personalized solutions.</p>',
    },
    metadata: {
      section_name: 'Hero Description',
      page: 'home',
      order: 11,
    },
    updated_by: 'system',
  },
  {
    section_id: 'hero_image_main',
    content_type: 'image',
    content: {
      url: '/assets/images/index/hero23.png',
      alt: 'Hero Main Image - Credit Services',
    },
    metadata: {
      section_name: 'Hero Main Image',
      page: 'home',
      order: 12,
    },
    updated_by: 'system',
  },
  {
    section_id: 'hero_image_watch',
    content_type: 'image',
    content: {
      url: '/assets/images/index/hero_watch.png',
      alt: 'Hero Watch Image',
    },
    metadata: {
      section_name: 'Hero Watch Image',
      page: 'home',
      order: 13,
    },
    updated_by: 'system',
  },
  {
    section_id: 'hero_icon_star',
    content_type: 'image',
    content: {
      url: '/assets/images/icon/hero_star.png',
      alt: 'Hero Star Icon',
    },
    metadata: {
      section_name: 'Hero Star Icon',
      page: 'home',
      order: 14,
    },
    updated_by: 'system',
  },

  // ============ ABOUT SECTION ============
  {
    section_id: 'about_title',
    content_type: 'rich_text',
    content: {
      text: 'About Savage Squad',
      html: '<h3>About Savage Squad</h3>',
    },
    metadata: {
      section_name: 'About Title',
      page: 'home',
      order: 20,
    },
    updated_by: 'system',
  },
  {
    section_id: 'about_description',
    content_type: 'rich_text',
    content: {
      text: 'We are a surety bond certified company specializing in professional credit services. Our mission is to educate clients on credit health, provide accurate credit analysis, and guide them toward achieving their financial goals through a simple and transparent process.',
      html: '<p class="p-f-s">We are a surety bond certified company specializing in professional credit services. Our mission is to educate clients on credit health, provide accurate credit analysis, and guide them toward achieving their financial goals through a simple and transparent process.</p>',
    },
    metadata: {
      section_name: 'About Description',
      page: 'home',
      order: 21,
    },
    updated_by: 'system',
  },
  {
    section_id: 'about_clients_count',
    content_type: 'text',
    content: {
      text: '38',
    },
    metadata: {
      section_name: 'About - Clients Count (K+)',
      page: 'home',
      order: 22,
    },
    updated_by: 'system',
  },
  {
    section_id: 'about_clients_text',
    content_type: 'rich_text',
    content: {
      text: 'Clients have trusted Savage Squad with their credit journey!',
      html: '<p class="p-f-s">Clients have trusted Savage Squad with their credit journey!</p>',
    },
    metadata: {
      section_name: 'About - Clients Text',
      page: 'home',
      order: 23,
    },
    updated_by: 'system',
  },
  {
    section_id: 'about_bonded_percentage',
    content_type: 'text',
    content: {
      text: '100%',
    },
    metadata: {
      section_name: 'About - Bonded Percentage',
      page: 'home',
      order: 24,
    },
    updated_by: 'system',
  },
  {
    section_id: 'about_bonded_text',
    content_type: 'rich_text',
    content: {
      text: 'Surety Bond Certified for your protection and peace of mind',
      html: '<p class="p-f-s">Surety Bond Certified for your protection and peace of mind</p>',
    },
    metadata: {
      section_name: 'About - Bonded Text',
      page: 'home',
      order: 25,
    },
    updated_by: 'system',
  },
  {
    section_id: 'about_card_image1',
    content_type: 'image',
    content: {
      url: '/assets/images/index/about_card_img1.svg',
      alt: 'About Card Image 1',
    },
    metadata: {
      section_name: 'About Card Image 1',
      page: 'home',
      order: 26,
    },
    updated_by: 'system',
  },
  {
    section_id: 'about_card_image2',
    content_type: 'image',
    content: {
      url: '/assets/images/index/about_card_img2.svg',
      alt: 'About Card Image 2',
    },
    metadata: {
      section_name: 'About Card Image 2',
      page: 'home',
      order: 27,
    },
    updated_by: 'system',
  },

  // ============ FINANCE/SERVICES SECTION ============
  {
    section_id: 'finance_title',
    content_type: 'rich_text',
    content: {
      text: 'PROFESSIONAL CREDIT SERVICES YOU CAN TRUST',
      html: '<h2>PROFESSIONAL CREDIT SERVICES YOU CAN TRUST</h2>',
    },
    metadata: {
      section_name: 'Finance Section Title',
      page: 'home',
      order: 30,
    },
    updated_by: 'system',
  },
  {
    section_id: 'finance_description',
    content_type: 'rich_text',
    content: {
      text: 'As a surety bond certified provider, Savage Squad offers comprehensive credit services designed to help you understand and improve your credit health. Our easy process starts with a free consultation, followed by accurate credit analysis using your credit monitoring details.',
      html: '<p class="mt-0">As a surety bond certified provider, Savage Squad offers comprehensive credit services designed to help you understand and improve your credit health. Our easy process starts with a free consultation, followed by accurate credit analysis using your credit monitoring details.</p>',
    },
    metadata: {
      section_name: 'Finance Section Description',
      page: 'home',
      order: 31,
    },
    updated_by: 'system',
  },
  {
    section_id: 'service_icon_graph',
    content_type: 'image',
    content: {
      url: '/assets/images/icon/graphe.png',
      alt: 'Credit Analysis Graph Icon',
    },
    metadata: {
      section_name: 'Service Icon - Graph',
      page: 'home',
      order: 32,
    },
    updated_by: 'system',
  },
  {
    section_id: 'service_credit_analysis_title',
    content_type: 'text',
    content: {
      text: 'Credit Analysis',
    },
    metadata: {
      section_name: 'Service - Credit Analysis Title',
      page: 'home',
      order: 33,
    },
    updated_by: 'system',
  },
  {
    section_id: 'service_credit_analysis_desc',
    content_type: 'rich_text',
    content: {
      text: 'Comprehensive credit report review and accurate analysis to identify opportunities for improvement.',
      html: '<p class="p-f-s">Comprehensive credit report review and accurate analysis to identify opportunities for improvement.</p>',
    },
    metadata: {
      section_name: 'Service - Credit Analysis Description',
      page: 'home',
      order: 34,
    },
    updated_by: 'system',
  },
  {
    section_id: 'service_icon_dollar',
    content_type: 'image',
    content: {
      url: '/assets/images/icon/doller.png',
      alt: 'Free Consultation Dollar Icon',
    },
    metadata: {
      section_name: 'Service Icon - Dollar',
      page: 'home',
      order: 35,
    },
    updated_by: 'system',
  },
  {
    section_id: 'service_consultation_title',
    content_type: 'text',
    content: {
      text: 'Free Consultation',
    },
    metadata: {
      section_name: 'Service - Consultation Title',
      page: 'home',
      order: 36,
    },
    updated_by: 'system',
  },
  {
    section_id: 'service_consultation_desc',
    content_type: 'rich_text',
    content: {
      text: 'Schedule your free consultation and learn how we can help you achieve your credit goals.',
      html: '<p class="p-f-s">Schedule your free consultation and learn how we can help you achieve your credit goals.</p>',
    },
    metadata: {
      section_name: 'Service - Consultation Description',
      page: 'home',
      order: 37,
    },
    updated_by: 'system',
  },
  {
    section_id: 'service_icon_arrow',
    content_type: 'image',
    content: {
      url: '/assets/images/icon/arow.png',
      alt: 'Expert Guidance Arrow Icon',
    },
    metadata: {
      section_name: 'Service Icon - Arrow',
      page: 'home',
      order: 38,
    },
    updated_by: 'system',
  },
  {
    section_id: 'service_guidance_title',
    content_type: 'text',
    content: {
      text: 'Expert Guidance',
    },
    metadata: {
      section_name: 'Service - Guidance Title',
      page: 'home',
      order: 39,
    },
    updated_by: 'system',
  },
  {
    section_id: 'service_guidance_desc',
    content_type: 'rich_text',
    content: {
      text: 'Personalized education and support throughout your entire credit journey.',
      html: '<p class="p-f-s">Personalized education and support throughout your entire credit journey.</p>',
    },
    metadata: {
      section_name: 'Service - Guidance Description',
      page: 'home',
      order: 40,
    },
    updated_by: 'system',
  },

  // ============ GATEWAY/PROCESS SECTION ============
  {
    section_id: 'gateway_image',
    content_type: 'image',
    content: {
      url: '/assets/images/index/gateway-2.png',
      alt: 'Gateway Process Image',
    },
    metadata: {
      section_name: 'Gateway Main Image',
      page: 'home',
      order: 50,
    },
    updated_by: 'system',
  },
  {
    section_id: 'process_title',
    content_type: 'rich_text',
    content: {
      text: 'SIMPLE 3-STEP PROCESS',
      html: '<h2>SIMPLE 3-STEP PROCESS</h2>',
    },
    metadata: {
      section_name: 'Process Title',
      page: 'home',
      order: 51,
    },
    updated_by: 'system',
  },
  {
    section_id: 'process_description',
    content_type: 'rich_text',
    content: {
      text: 'Getting started with Savage Squad is easy. Our straightforward process ensures you receive the best credit services with complete transparency and professional guidance every step of the way.',
      html: '<p class="pt-lg-4 pt-md-3 pt-sm-2 pt-2 pb-2">Getting started with Savage Squad is easy. Our straightforward process ensures you receive the best credit services with complete transparency and professional guidance every step of the way.</p>',
    },
    metadata: {
      section_name: 'Process Description',
      page: 'home',
      order: 52,
    },
    updated_by: 'system',
  },
  {
    section_id: 'process_icon_1',
    content_type: 'image',
    content: {
      url: '/assets/images/icon/gate-icon1.png',
      alt: 'Process Step 1 Icon',
    },
    metadata: {
      section_name: 'Process Icon 1',
      page: 'home',
      order: 53,
    },
    updated_by: 'system',
  },
  {
    section_id: 'process_step1_title',
    content_type: 'text',
    content: {
      text: 'Schedule Free Consultation',
    },
    metadata: {
      section_name: 'Process Step 1 Title',
      page: 'home',
      order: 54,
    },
    updated_by: 'system',
  },
  {
    section_id: 'process_step1_desc',
    content_type: 'rich_text',
    content: {
      text: 'Book your free consultation to discuss your credit goals and learn about our surety bond certified services.',
      html: '<p class="p-f-s">Book your free consultation to discuss your credit goals and learn about our surety bond certified services.</p>',
    },
    metadata: {
      section_name: 'Process Step 1 Description',
      page: 'home',
      order: 55,
    },
    updated_by: 'system',
  },
  {
    section_id: 'process_icon_2',
    content_type: 'image',
    content: {
      url: '/assets/images/icon/gate-icon2.png',
      alt: 'Process Step 2 Icon',
    },
    metadata: {
      section_name: 'Process Icon 2',
      page: 'home',
      order: 56,
    },
    updated_by: 'system',
  },
  {
    section_id: 'process_step2_title',
    content_type: 'text',
    content: {
      text: 'Provide Credit Monitoring Access',
    },
    metadata: {
      section_name: 'Process Step 2 Title',
      page: 'home',
      order: 57,
    },
    updated_by: 'system',
  },
  {
    section_id: 'process_step2_desc',
    content_type: 'rich_text',
    content: {
      text: 'Securely share your credit monitoring login details so we can conduct an accurate and comprehensive credit analysis.',
      html: '<p class="p-f-s">Securely share your credit monitoring login details so we can conduct an accurate and comprehensive credit analysis.</p>',
    },
    metadata: {
      section_name: 'Process Step 2 Description',
      page: 'home',
      order: 58,
    },
    updated_by: 'system',
  },
  {
    section_id: 'process_icon_3',
    content_type: 'image',
    content: {
      url: '/assets/images/icon/gate-icon3.png',
      alt: 'Process Step 3 Icon',
    },
    metadata: {
      section_name: 'Process Icon 3',
      page: 'home',
      order: 59,
    },
    updated_by: 'system',
  },
  {
    section_id: 'process_step3_title',
    content_type: 'text',
    content: {
      text: 'Receive Your Credit Analysis',
    },
    metadata: {
      section_name: 'Process Step 3 Title',
      page: 'home',
      order: 60,
    },
    updated_by: 'system',
  },
  {
    section_id: 'process_step3_desc',
    content_type: 'rich_text',
    content: {
      text: 'Get a detailed credit analysis with clear expectations and personalized recommendations for your credit journey.',
      html: '<p class="p-f-s">Get a detailed credit analysis with clear expectations and personalized recommendations for your credit journey.</p>',
    },
    metadata: {
      section_name: 'Process Step 3 Description',
      page: 'home',
      order: 61,
    },
    updated_by: 'system',
  },

  // ============ SERVICES/PORTAL SECTION ============
  {
    section_id: 'services_title',
    content_type: 'rich_text',
    content: {
      text: 'SURETY BOND CERTIFIED CREDIT SERVICES',
      html: '<h2 class="text-lg-start text-md-start text-sm-center text-center">SURETY BOND CERTIFIED CREDIT SERVICES</h2>',
    },
    metadata: {
      section_name: 'Services Section Title',
      page: 'home',
      order: 70,
    },
    updated_by: 'system',
  },
  {
    section_id: 'services_description',
    content_type: 'rich_text',
    content: {
      text: 'Savage squad is proud to be surety bond certified, providing you with professional credit services you can trust. Access our client portal and mobile apps for convenient credit monitoring and support anytime, anywhere.',
      html: '<p class="text-lg-start text-md-start text-sm-center text-center mt-lg-4 mt-md-2 mt-sm-2 mt-2 pb-4">Savage squad is proud to be surety bond certified, providing you with professional credit services you can trust. Access our client portal and mobile apps for convenient credit monitoring and support anytime, anywhere.</p>',
    },
    metadata: {
      section_name: 'Services Section Description',
      page: 'home',
      order: 71,
    },
    updated_by: 'system',
  },
  {
    section_id: 'services_image_lady',
    content_type: 'image',
    content: {
      url: '/assets/images/index/lady-mobile.png',
      alt: 'Lady with Mobile - Client Portal',
    },
    metadata: {
      section_name: 'Services Lady Mobile Image',
      page: 'home',
      order: 72,
    },
    updated_by: 'system',
  },
  {
    section_id: 'services_icon_white_star',
    content_type: 'image',
    content: {
      url: '/assets/images/icon/whitStar.png',
      alt: 'White Star Icon',
    },
    metadata: {
      section_name: 'Services White Star Icon',
      page: 'home',
      order: 73,
    },
    updated_by: 'system',
  },

  // ============ VISA/ACCESS SECTION ============
  {
    section_id: 'visa_background',
    content_type: 'image',
    content: {
      url: '/assets/images/index/vesa-back.png',
      alt: 'Visa Section Background',
    },
    metadata: {
      section_name: 'Visa Section Background',
      page: 'home',
      order: 80,
    },
    updated_by: 'system',
  },
  {
    section_id: 'visa_title',
    content_type: 'rich_text',
    content: {
      text: 'Access Your Account Anywhere',
      html: '<h3 class="text-md-start text-sm-center text-center">Access Your Account Anywhere</h3>',
    },
    metadata: {
      section_name: 'Visa/Access Title',
      page: 'home',
      order: 81,
    },
    updated_by: 'system',
  },
  {
    section_id: 'visa_description',
    content_type: 'rich_text',
    content: {
      text: 'Savage squad offers multiple ways to stay connected with your credit journey. Access our secure client portal from any device or download our mobile apps for iOS and Android. Manage your account, view your credit analysis, and communicate with our team - all at your fingertips.',
      html: '<p class="text-md-start text-sm-center text-center p-f-s">Savage squad offers multiple ways to stay connected with your credit journey. Access our secure client portal from any device or download our mobile apps for iOS and Android.</p><p class="text-md-start text-sm-center text-center p-f-s">Manage your account, view your credit analysis, and communicate with our team - all at your fingertips.</p>',
    },
    metadata: {
      section_name: 'Visa/Access Description',
      page: 'home',
      order: 82,
    },
    updated_by: 'system',
  },
  {
    section_id: 'visa_icon_1',
    content_type: 'image',
    content: {
      url: '/assets/images/icon/vis-1.png',
      alt: 'Platform Icon 1',
    },
    metadata: {
      section_name: 'Visa Icon 1',
      page: 'home',
      order: 83,
    },
    updated_by: 'system',
  },
  {
    section_id: 'visa_icon_2',
    content_type: 'image',
    content: {
      url: '/assets/images/icon/ves-2.png',
      alt: 'Platform Icon 2',
    },
    metadata: {
      section_name: 'Visa Icon 2',
      page: 'home',
      order: 84,
    },
    updated_by: 'system',
  },
  {
    section_id: 'visa_icon_3',
    content_type: 'image',
    content: {
      url: '/assets/images/icon/ves-3.png',
      alt: 'Platform Icon 3',
    },
    metadata: {
      section_name: 'Visa Icon 3',
      page: 'home',
      order: 85,
    },
    updated_by: 'system',
  },
  {
    section_id: 'visa_icon_4',
    content_type: 'image',
    content: {
      url: '/assets/images/icon/ves-4.png',
      alt: 'Platform Icon 4',
    },
    metadata: {
      section_name: 'Visa Icon 4',
      page: 'home',
      order: 86,
    },
    updated_by: 'system',
  },
  {
    section_id: 'visa_icon_5',
    content_type: 'image',
    content: {
      url: '/assets/images/icon/ves-5.png',
      alt: 'Platform Icon 5',
    },
    metadata: {
      section_name: 'Visa Icon 5',
      page: 'home',
      order: 87,
    },
    updated_by: 'system',
  },
  {
    section_id: 'app_store_playstore',
    content_type: 'image',
    content: {
      url: '/assets/images/index/playstore.png',
      alt: 'Download on Google Play Store',
    },
    metadata: {
      section_name: 'Google Play Store Badge',
      page: 'home',
      order: 88,
    },
    updated_by: 'system',
  },
  {
    section_id: 'app_store_apple',
    content_type: 'image',
    content: {
      url: '/assets/images/index/appstore.png',
      alt: 'Download on Apple App Store',
    },
    metadata: {
      section_name: 'Apple App Store Badge',
      page: 'home',
      order: 89,
    },
    updated_by: 'system',
  },

  // ============ PRICING SECTION ============
  {
    section_id: 'pricing_image',
    content_type: 'image',
    content: {
      url: '/assets/images/index/pricinge.png',
      alt: 'Pricing Section Image',
    },
    metadata: {
      section_name: 'Pricing Main Image',
      page: 'home',
      order: 90,
    },
    updated_by: 'system',
  },
  {
    section_id: 'pricing_title',
    content_type: 'rich_text',
    content: {
      text: 'FLEXIBLE SERVICE OPTIONS',
      html: '<h2 class="text-md-start text-sm-center text-center">FLEXIBLE SERVICE OPTIONS</h2>',
    },
    metadata: {
      section_name: 'Pricing Section Title',
      page: 'home',
      order: 91,
    },
    updated_by: 'system',
  },
  {
    section_id: 'pricing_description',
    content_type: 'rich_text',
    content: {
      text: 'Start with a free consultation to understand your credit situation. Our transparent pricing and surety bond certification ensure you receive professional service with complete peace of mind.',
      html: '<p class="text-md-start text-sm-center text-center p-md-0 p-sm-2 p-2">Start with a free consultation to understand your credit situation. Our transparent pricing and surety bond certification ensure you receive professional service with complete peace of mind.</p>',
    },
    metadata: {
      section_name: 'Pricing Section Description',
      page: 'home',
      order: 92,
    },
    updated_by: 'system',
  },

  // ============ TESTIMONIALS SECTION ============
  {
    section_id: 'testimonials_title',
    content_type: 'rich_text',
    content: {
      text: 'Trusted By Our Clients',
      html: '<h2 class="text-center">Trusted By Our Clients</h2>',
    },
    metadata: {
      section_name: 'Testimonials Title',
      page: 'home',
      order: 100,
    },
    updated_by: 'system',
  },
  {
    section_id: 'testimonials_description',
    content_type: 'rich_text',
    content: {
      text: 'See what our clients say about their experience with Savage Squad. We take pride in helping people achieve their credit goals through professional, surety bond certified services and personalized support.',
      html: '<p class="text-center pt-3 pb-5 mb-2">See what our clients say about their experience with Savage Squad. We take pride in helping people achieve their credit goals through professional, surety bond certified services and personalized support.</p>',
    },
    metadata: {
      section_name: 'Testimonials Description',
      page: 'home',
      order: 101,
    },
    updated_by: 'system',
  },
  {
    section_id: 'testimonial_image_1',
    content_type: 'image',
    content: {
      url: '/assets/images/slider/profational2.png',
      alt: 'Johnny Stone - Client Testimonial',
    },
    metadata: {
      section_name: 'Testimonial Image 1',
      page: 'home',
      order: 102,
    },
    updated_by: 'system',
  },
  {
    section_id: 'testimonial_comma',
    content_type: 'image',
    content: {
      url: '/assets/images/slider/Comma.png',
      alt: 'Testimonial Quote Mark',
    },
    metadata: {
      section_name: 'Testimonial Comma Icon',
      page: 'home',
      order: 103,
    },
    updated_by: 'system',
  },
  {
    section_id: 'testimonial_1_text',
    content_type: 'rich_text',
    content: {
      text: 'Savage squad helped me understand my credit report and provided clear guidance on improving my credit. Their professional service and transparent process made all the difference in my financial journey!',
      html: '<p class="text-center p-f-s">Savage squad helped me understand my credit report and provided clear guidance on improving my credit. Their professional service and transparent process made all the difference in my financial journey!</p>',
    },
    metadata: {
      section_name: 'Testimonial 1 Text',
      page: 'home',
      order: 104,
    },
    updated_by: 'system',
  },
  {
    section_id: 'testimonial_1_name',
    content_type: 'text',
    content: {
      text: 'Johnny Stone',
    },
    metadata: {
      section_name: 'Testimonial 1 Name',
      page: 'home',
      order: 105,
    },
    updated_by: 'system',
  },
  {
    section_id: 'testimonial_image_2',
    content_type: 'image',
    content: {
      url: '/assets/images/slider/profactional3.png',
      alt: 'Stephen Stewart - Client Testimonial',
    },
    metadata: {
      section_name: 'Testimonial Image 2',
      page: 'home',
      order: 106,
    },
    updated_by: 'system',
  },
  {
    section_id: 'testimonial_image_3',
    content_type: 'image',
    content: {
      url: '/assets/images/slider/profacitional.png',
      alt: 'Tom Hiddellon - Client Testimonial',
    },
    metadata: {
      section_name: 'Testimonial Image 3',
      page: 'home',
      order: 107,
    },
    updated_by: 'system',
  },

  // ============ FAQ SECTION ============
  {
    section_id: 'faq_title',
    content_type: 'rich_text',
    content: {
      text: 'FREQUENTLY ASKED QUESTIONS',
      html: '<h2 class="text-lg-start text-md-start text-sm-center text-center">FREQUENTLY ASKED QUESTIONS</h2>',
    },
    metadata: {
      section_name: 'FAQ Title',
      page: 'home',
      order: 110,
    },
    updated_by: 'system',
  },
  {
    section_id: 'faq_description',
    content_type: 'rich_text',
    content: {
      text: 'Have questions about our credit services? We\'re here to help! Browse our most common questions below or schedule a free consultation to speak directly with our team about your specific situation.',
      html: '<p class="text-lg-start text-md-start text-sm-center text-center mt-md-3 mt-3">Have questions about our credit services? We\'re here to help! Browse our most common questions below or schedule a free consultation to speak directly with our team about your specific situation.</p>',
    },
    metadata: {
      section_name: 'FAQ Description',
      page: 'home',
      order: 111,
    },
    updated_by: 'system',
  },
  {
    section_id: 'faq_q1',
    content_type: 'text',
    content: {
      text: 'What services does Savage squad provide?',
    },
    metadata: {
      section_name: 'FAQ Question 1',
      page: 'home',
      order: 112,
    },
    updated_by: 'system',
  },
  {
    section_id: 'faq_a1',
    content_type: 'rich_text',
    content: {
      text: 'Savage squad is a surety bond certified provider of professional credit services. We help clients through free consultations, accurate credit analysis, and personalized education to achieve their financial goals. We review your credit reports and provide clear recommendations.',
      html: '<p>Savage squad is a surety bond certified provider of professional credit services. We help clients through free consultations, accurate credit analysis, and personalized education to achieve their financial goals. We review your credit reports and provide clear recommendations.</p>',
    },
    metadata: {
      section_name: 'FAQ Answer 1',
      page: 'home',
      order: 113,
    },
    updated_by: 'system',
  },
  {
    section_id: 'faq_q2',
    content_type: 'text',
    content: {
      text: 'How do I get started with Savage sqaud?',
    },
    metadata: {
      section_name: 'FAQ Question 2',
      page: 'home',
      order: 114,
    },
    updated_by: 'system',
  },
  {
    section_id: 'faq_a2',
    content_type: 'rich_text',
    content: {
      text: 'Simply schedule your free consultation using our online booking system. During the consultation, we\'ll discuss your credit goals. Then, you\'ll provide your credit monitoring login details so we can conduct an accurate credit analysis and provide personalized recommendations.',
      html: '<p>Simply schedule your free consultation using our online booking system. During the consultation, we\'ll discuss your credit goals. Then, you\'ll provide your credit monitoring login details so we can conduct an accurate credit analysis and provide personalized recommendations.</p>',
    },
    metadata: {
      section_name: 'FAQ Answer 2',
      page: 'home',
      order: 115,
    },
    updated_by: 'system',
  },
  {
    section_id: 'faq_q3',
    content_type: 'text',
    content: {
      text: 'Is my information secure with Savage sqaud?',
    },
    metadata: {
      section_name: 'FAQ Question 3',
      page: 'home',
      order: 116,
    },
    updated_by: 'system',
  },
  {
    section_id: 'faq_a3',
    content_type: 'rich_text',
    content: {
      text: 'Absolutely! We are surety bond certified, which provides an additional layer of protection and accountability. Your credit monitoring login details and personal information are handled with the highest security standards and used solely for conducting your credit analysis.',
      html: '<p>Absolutely! We are surety bond certified, which provides an additional layer of protection and accountability. Your credit monitoring login details and personal information are handled with the highest security standards and used solely for conducting your credit analysis.</p>',
    },
    metadata: {
      section_name: 'FAQ Answer 3',
      page: 'home',
      order: 117,
    },
    updated_by: 'system',
  },
  {
    section_id: 'faq_q4',
    content_type: 'text',
    content: {
      text: 'Can I access my account from my phone?',
    },
    metadata: {
      section_name: 'FAQ Question 4',
      page: 'home',
      order: 118,
    },
    updated_by: 'system',
  },
  {
    section_id: 'faq_a4',
    content_type: 'rich_text',
    content: {
      text: 'Yes! Savage squad offers mobile apps for both iOS and Android devices. You can also access our client portal from any web browser. This gives you 24/7 access to your account, credit analysis, and direct communication with our team.',
      html: '<p>Yes! Savage squad offers mobile apps for both iOS and Android devices. You can also access our client portal from any web browser. This gives you 24/7 access to your account, credit analysis, and direct communication with our team.</p>',
    },
    metadata: {
      section_name: 'FAQ Answer 4',
      page: 'home',
      order: 119,
    },
    updated_by: 'system',
  },

  // ============ CONTACT SECTION ============
  {
    section_id: 'contact_title',
    content_type: 'rich_text',
    content: {
      text: 'CONTACT',
      html: '<h2 class="text-center">CONTACT</h2>',
    },
    metadata: {
      section_name: 'Contact Section Title',
      page: 'home',
      order: 120,
    },
    updated_by: 'system',
  },
  {
    section_id: 'contact_description',
    content_type: 'rich_text',
    content: {
      text: 'Get in touch with Savage squad for professional credit services. We\'re here to answer your questions and help you achieve your financial goals.',
      html: '<p class="text-center">Get in touch with Savage squad for professional credit services. We\'re here to answer your questions and help you achieve your financial goals.</p>',
    },
    metadata: {
      section_name: 'Contact Section Description',
      page: 'home',
      order: 121,
    },
    updated_by: 'system',
  },
  {
    section_id: 'contact_address',
    content_type: 'text',
    content: {
      text: '1980 Post Oak Suite 100 Houston, TX 77056',
    },
    metadata: {
      section_name: 'Contact Address',
      page: 'home',
      order: 122,
    },
    updated_by: 'system',
  },
  {
    section_id: 'contact_phone',
    content_type: 'text',
    content: {
      text: '+1-866-753-4963',
    },
    metadata: {
      section_name: 'Contact Phone',
      page: 'home',
      order: 123,
    },
    updated_by: 'system',
  },
  {
    section_id: 'contact_email',
    content_type: 'text',
    content: {
      text: 'Credit@savagesquad.com',
    },
    metadata: {
      section_name: 'Contact Email',
      page: 'home',
      order: 124,
    },
    updated_by: 'system',
  },

  // ============ FOOTER SECTION ============
  {
    section_id: 'footer_logo',
    content_type: 'image',
    content: {
      url: '/assets/images/logo2.png',
      alt: 'Savage squad Footer Logo',
    },
    metadata: {
      section_name: 'Footer Logo',
      page: 'global',
      order: 200,
    },
    updated_by: 'system',
  },
  {
    section_id: 'footer_copyright',
    content_type: 'text',
    content: {
      text: 'Copyright © 2025 Savage sqaud. All Rights Reserved. Surety Bond Certified.',
    },
    metadata: {
      section_name: 'Footer Copyright',
      page: 'global',
      order: 201,
    },
    updated_by: 'system',
  },
];

async function seedAllContent() {
  try {
    console.log('🌱 Starting comprehensive content seeding...');
    console.log('📡 Connecting to MongoDB...');

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const collectionName = SiteContent.collection.name;
    console.log(`📝 Using collection: ${collectionName}`);
    console.log(`📦 Seeding ${allContent.length} content items...\n`);

    let created = 0;
    let updated = 0;
    let skipped = 0;

    for (const item of allContent) {
      const existing = await SiteContent.findOne({ section_id: item.section_id });

      if (existing) {
        console.log(`⏭️  Skipped: ${item.section_id} (already exists)`);
        skipped++;
      } else {
        await SiteContent.create(item);
        console.log(`✨ Created: ${item.section_id} - ${item.metadata?.section_name}`);
        created++;
      }
    }

    console.log('\n📊 Seeding Summary:');
    console.log(`   ✅ Created: ${created}`);
    console.log(`   📝 Updated: ${updated}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   📦 Total: ${allContent.length}`);
    console.log('\n🎉 Comprehensive content seeding completed successfully!');
    console.log('\n💡 All images and editable content are now in the database.');
    console.log('   You can now edit them from the admin panel at /admin/editor');

    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');

  } catch (error) {
    console.error('❌ Error seeding content:', error);
    process.exit(1);
  }
}

seedAllContent();
