import { MouseEventHandler } from "react";
import styles from "./ModalDelete.module.scss";

interface ModalDeleteProps {
  closeModal: MouseEventHandler<HTMLButtonElement>;
  deleteTask: () => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
  closeModal,
  deleteTask,
}) => {
  return (
    <main className={styles.box_container}>
      <div className={styles.box_header}>
        <h2 className={styles.h2}>Deletar tarefa</h2>

        <p className={styles.p}>
          Tem certeza que você deseja deletar esta tarefa?
        </p>
      </div>

      <section className={styles.section_button}>
        <button onClick={deleteTask} className={styles.btn_delete}>
          Deletar
        </button>

        <button onClick={closeModal} className={styles.cancel_btn}>
          Cancelar
        </button>
      </section>
    </main>
  );
};

export default ModalDelete;
