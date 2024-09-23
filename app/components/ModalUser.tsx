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
    // <main className="container py-6">
    <main className={styles.box_container}>
      {/* <div className="flex flex-col gap-6"> */}
      <div className={styles.box_header}>
        {/* <h2 className="text-2xl font-medium">Registre seu nome</h2> */}
        <h2 className={styles.title}>Registre seu nome</h2>
      </div>

      {/* <section className="flex flex-col gap-2 pt-6"> */}
      <section className={styles.input_box}>
        <span>Usuário</span>
        <input
          type="text"
          name="userName"
          placeholder="Digite"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          // className="mb-6 rounded-lg border px-4 py-3 outline-none"
          className={styles.input}
        />
      </section>

      {/* <section className="flex flex-col gap-4 lg:flex-row"> */}
      <section className={styles.box_button}>
        <button onClick={handleRegister} className={styles.add_btn}>
          Registre-se
        </button>
      </section>
    </main>
  );
};

export default ModalUser;
