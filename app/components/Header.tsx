import Image from "next/image";
import styles from "./Header.module.scss";

interface HeaderProps {
  userName: string | null;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header>
      <section className={styles.section}>
        <Image
          src={"/logo.png"}
          width={150}
          height={36}
          alt="logo"
          className={styles.logo}
        />

        <h1 className={styles.heading}>Bem-vindo de volta, {userName}</h1>

        <p className={styles.date}>{currentDate}</p>
      </section>
    </header>
  );
};

export default Header;
