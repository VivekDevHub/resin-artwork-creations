import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedCategories from '../components/home/FeaturedCategories';
import BestSellers from '../components/home/BestSellers';
import WhyChooseUs from '../components/home/WhyChooseUs';
import AboutMeSection from '../components/home/AboutMeSection';
import CustomOrderCTA from '../components/home/CustomOrderCTA';
import FeaturedCollection from '../components/home/FeaturedCollection';
import CustomerReviews from '../components/home/CustomerReviews';
import SocialGallery from '../components/home/SocialGallery';
import FAQSection from '../components/home/FAQSection';
import NewsletterCTA from '../components/home/NewsletterCTA';

const Home = () => {
  return (
    <main>
      <Hero />
      <FeaturedCategories />
      <BestSellers />
      <WhyChooseUs />
      <AboutMeSection />
      <CustomOrderCTA />
      <FeaturedCollection />
      <CustomerReviews />
      <SocialGallery />
      <FAQSection />
      <NewsletterCTA />
    </main>
  );
};

export default Home;
