
import Link from "next/link";
import styles from './main-header.module.css';
import Image from "next/image";
import logo from '@/assets/logo.png'
export default function MainHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Image src={logo} alt="Logo" className={styles.logo} priority />
        <Link href='/' className={styles.title}>Food Talashi</Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/meals" className={styles.link}>Browse Meals</Link>
        <Link href="/community" className={styles.link}>Foodie Community</Link>
      </nav>
    </header>
  );
}
