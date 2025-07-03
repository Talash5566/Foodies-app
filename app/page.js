'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import burger from '@/assets/burger.jpg';
import pizza from '@/assets/pizza.jpg';
import curry from '@/assets/curry.jpg';
import dumplings from '@/assets/dumplings.jpg';
import macncheese from '@/assets/macncheese.jpg';
import schnitzel from '@/assets/schnitzel.jpg';
import salad from '@/assets/tomato-salad.jpg';

export default function Home() {
  const foodImages = [burger, pizza, curry, dumplings, macncheese, schnitzel, salad];
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % foodImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [foodImages.length]);

  return (
    <main
      style={{
        backgroundColor: '#0a0a0a',
        minHeight: '100vh',
        color: 'white',
        fontFamily: "'Poppins', sans-serif",
        overflowX: 'hidden',
      }}
    >
      {/* Top Gradient Wave Background */}
      <div style={{ position: 'relative', zIndex: 0 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          style={{ position: 'absolute', top: 0, width: '100%', height: '300px' }}
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#59453c" />
              <stop offset="100%" stopColor="#8f3a09" />
            </linearGradient>
          </defs>
          <path
            fill="url(#gradient)"
            d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,181.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,0L0,0Z"
          />
        </svg>
      </div>

      {/* Hero Section */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: '8rem',
          paddingBottom: '3rem',
          textAlign: 'center',
          zIndex: 1,
          position: 'relative',
        }}
      >
        <h1
          style={{
            fontSize: '3.5rem',
            background: 'linear-gradient(90deg, #ff7b00, #ff2e00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'fadeIn 1.5s ease-out',
          }}
        >
          Discover Flavours at <br /> Food Talashi
        </h1>

        <p
          style={{
            fontSize: '1.3rem',
            color: '#e0e0e0',
            maxWidth: '600px',
            marginTop: '1rem',
          }}
        >
          Dive into hand-picked recipes, stunning presentations, and a food community like no other.
        </p>

        <div
          style={{
            marginTop: '3rem',
            width: '90%',
            maxWidth: '700px',
            height: '350px',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 8px 30px rgba(255, 102, 0, 0.25)',
            animation: 'fadeIn 2s ease-in',
          }}
        >
          <Image
            src={foodImages[currentSlide]}
            alt="Delicious food"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            priority
          />
        </div>

        <Link
          href="/meals"
          style={{
            marginTop: '2rem',
            backgroundColor: '#ff6600',
            color: 'white',
            padding: '0.9rem 2.4rem',
            fontSize: '1.2rem',
            borderRadius: '40px',
            fontWeight: 'bold',
            boxShadow: '0 8px 24px rgba(255, 102, 0, 0.4)',
            textDecoration: 'none',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(255, 102, 0, 0.5)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 102, 0, 0.4)';
          }}
        >
          Explore Meals →
        </Link>
      </section>

      {/* Why Section */}
      <section
        style={{
          backgroundColor: '#111111',
          padding: '4rem 2rem',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            fontSize: '2.5rem',
            color: '#ff6600',
            marginBottom: '1rem',
            animation: 'slideUp 1s ease',
          }}
        >
          Why Food Talashi?
        </h2>
        <p
          style={{
            fontSize: '1.2rem',
            maxWidth: '800px',
            margin: '0 auto',
            color: '#cccccc',
            lineHeight: '1.8',
          }}
        >
          We believe food is not just nourishment—it&apos;s emotion. Whether you&apos;re craving creamy mac & cheese, spicy curry, or classic schnitzel, Food Talashi brings the world of tastes to your screen. Join a vibrant foodie community where everyone shares love, culture, and mouthwatering dishes.
        </p>
      </section>

      {/* Blog-style Animated Footer */}
      <section
        style={{
          padding: '4rem 2rem',
          textAlign: 'center',
          background: '#0a0a0a',
          animation: 'fadeIn 2s ease',
        }}
      >
        <h3
          style={{
            fontSize: '2rem',
            color: '#ff884d',
            marginBottom: '1rem',
          }}
        >
          🔥 From Our Food Journal
        </h3>
        <p
          style={{
            fontSize: '1.1rem',
            color: '#bbbbbb',
            maxWidth: '700px',
            margin: '0 auto',
            fontStyle: 'italic',
          }}
        >
          “Food is the ingredient that binds us together. Every dish you see on Food Talashi has a story, a heart, and a hungry soul behind it.”
        </p>
      </section>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}
