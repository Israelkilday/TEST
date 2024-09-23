import { useState } from "react";
import styles from "./ModalUser.module.scss";

interface ModalUserProps {
  registerUser: (name: string) => void;
}

const ModalUser: React.FC<ModalUserProps> = ({ registerUser }) => {
  const [userName, setUserName] = useState("");

  const handleRegister = () => {
    if (userName) {
      registerUser(userName);
    } else {
      alert("Por favor, insira um nome.");
    }
  };

  return (
    <main className={styles.box_container}>
      <div className={styles.box_header}>
        <h2 className={styles.title}>Registre seu nome</h2>
      </div>
      <section className={styles.input_box}>
        <input
          name="userName"
          placeholder="Digite"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className={styles.input}
        />
      </section>

      <section className={styles.box_button}>
        <button onClick={handleRegister} className={styles.add_btn}>
          Registre-se
        </button>
      </section>
    </main>
  );
};

export default ModalUser;
