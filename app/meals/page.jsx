"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from '@/app/meals/mealpage.module.css'
import meals from "@/meals_data.json";
import { useRouter } from 'next/navigation';
const MealsPage = () => {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);
  const router = useRouter();
  const handle = (e) => {
    e.preventDefault();

    router.push('/meals/share/Cummunity-share')
  }
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <h1 data-aos="fade-down">🍽️ Explore Delicious Meals</h1>
        <p data-aos="fade-up">
          Curated dishes from our Foodie Community — find your next favorite meal!
        </p>
      </section>

      <div className={styles.buttonWrapper} data-aos="fade-up">
        <button onClick={handle} className={styles.communityBtn}>
          🌍 See Community Posts
        </button>
        <button
          onClick={() => router.push('/meals/share')}
          className={styles.shareBtn}
        >
          🍲 Share Your Meal
        </button>
      </div>



      <div className={styles.grid}>
        {meals.slice(0, 30).map((meal) => (
          <div key={meal.id} className={styles.card} data-aos="zoom-in">
            <div className={styles.imageWrapper}>
              <img src={meal.image} alt={meal.title} />
            </div>
            <div className={styles.cardContent}>
              <h2>{meal.title}</h2>
              <p className={styles.summary}>{meal.summary}</p>
              <div className={styles.author}>
                <span className={styles.badge}>{meal.author[0]}</span>
                {meal.author}
              </div>
              <details className={styles.instructions}>
                <summary>🍳 View Recipe</summary>
                <p>{meal.instructions}</p>
              </details>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MealsPage;
