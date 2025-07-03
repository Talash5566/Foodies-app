'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import styles from './community-share.module.css';

export default function CommunityPage() {
  const [meals, setMeals] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/sharedMeal');
        const data = await res.json();
        setMeals(data.reverse());
      } catch {
        toast.error('Failed to fetch community meals ❌');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.hero}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={styles.glowTitle}
        >
          🌐 Foodie Community
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={styles.subtitle}
        >
          Meals shared by our users — curated with love <span className={styles.glow}>🍽️</span>
        </motion.p>
      </div>

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading community meals...</p>
        </div>
      ) : (
        <motion.div 
          className={styles.grid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {meals.map((meal) => (
            <motion.div
              className={styles.card}
              key={meal._id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(meal)}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={meal.image || '/fallback-food.jpg'}
                  alt={meal.title}
                  className={styles.image}
                  onError={(e) => {
                    e.target.src = '/fallback-food.jpg';
                  }}
                />
                <div className={styles.imageOverlay}></div>
              </div>
              <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>{meal.title}</h2>
                <p className={styles.summary}>{meal.summary}</p>
                <div className={styles.author}>
                  <span className={styles.badge}>{meal.name?.[0] || 'U'}</span>
                  <span className={styles.authorName}>{meal.name || 'Anonymous'}</span>
                </div>
                <button className={styles.viewButton}>
                  <span className={styles.glow}>🍳</span> View Recipe
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeButton}
                onClick={() => setSelected(null)}
              >
                <span className={styles.glow}>✕</span>
              </button>
              
              <div className={styles.modalImageWrapper}>
                <img 
                  src={selected.image || '/fallback-food.jpg'} 
                  alt={selected.title}
                  onError={(e) => {
                    e.target.src = '/fallback-food.jpg';
                  }}
                />
                <div className={styles.modalImageOverlay}></div>
              </div>
              
              <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>{selected.title}</h2>
                <div className={styles.modalAuthor}>
                  <span className={styles.modalBadge}>{selected.name?.[0] || 'U'}</span>
                  <div>
                    <p className={styles.authorName}>{selected.name || 'Anonymous'}</p>
                    <p className={styles.authorEmail}>{selected.email || ''}</p>
                  </div>
                </div>
                
                <div className={styles.modalSection}>
                  <h3 className={styles.sectionTitle}>About this dish</h3>
                  <p className={styles.sectionText}>{selected.summary}</p>
                </div>
                
                <div className={styles.modalSection}>
                  <h3 className={styles.sectionTitle}>Recipe Instructions</h3>
                  <div className={styles.instructions}>
                    {selected.instruction || 'No instructions provided.'}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}