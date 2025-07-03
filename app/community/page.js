'use client';
import Image from 'next/image';
import styles from './community.module.css';
import { useEffect, useState } from 'react';

import burger from '@/assets/burger.jpg';
import pizza from '@/assets/pizza.jpg';
import curry from '@/assets/curry.jpg';
import dumplings from '@/assets/dumplings.jpg';
import macncheese from '@/assets/macncheese.jpg';
import schnitzel from '@/assets/schnitzel.jpg';
import salad from '@/assets/tomato-salad.jpg';

const foodImages = [burger, pizza, curry, dumplings, macncheese, schnitzel, salad];
const quotes = [
  "“Good food is the foundation of genuine happiness.” – Auguste Escoffier",
  "“Food is symbolic of love when words are inadequate.” – Alan D. Wolfelt",
  "“People who love to eat are always the best people.” – Julia Child",
];

export default function CommunityPage() {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(quoteTimer);
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 className={styles.title}>Welcome to the Foodie Community</h1>
        <p className={styles.subtitle}>
          A place where every bite tells a story — share, explore, and celebrate food with us.
        </p>
      </section>

      <section className={styles.quoteSection}>
        <p className={styles.quote}>{quotes[quoteIndex]}</p>
      </section>

      <section className={styles.gallerySection}>
        <h2 className={styles.galleryTitle}>🍽️ Community Favorites</h2>
        <div className={styles.gallery}>
          {foodImages.map((img, idx) => (
            <div key={idx} className={styles.imageCard}>
              <Image
                src={img}
                alt={`Food ${idx}`}
                width={300}
                height={200}
                className={styles.image}
                priority
              />
            </div>
          ))}
        </div>
      </section>

      <section className={styles.blogSection}>
        <h3 className={styles.blogHeading}>🥘 Food Stories From Our Members</h3>
        <p className={styles.blogText}>
          Every meal has a memory. In Food Talashi, members share stories behind dishes they grew up eating,
          the ones they learned to cook, and the ones they can’t stop craving. From a grandmother’s curry to a modern fusion
          taco — this is where the love of food lives.
        </p>
      </section>
    </main>
  );
}
