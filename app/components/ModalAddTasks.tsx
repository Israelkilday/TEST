import { Dispatch, MouseEventHandler, SetStateAction } from "react";
import styles from "./ModalAddTasks.module.scss";

interface ModalDetailsProps {
  closeModal: MouseEventHandler<HTMLButtonElement>;
  addTask: MouseEventHandler<HTMLButtonElement>;
  setNewTask: Dispatch<SetStateAction<string>>;
  newTask: string;
}

const ModalAddTasks: React.FC<ModalDetailsProps> = ({
  closeModal,
  newTask,
  setNewTask,
  addTask,
}) => {
  return (
    <main className={styles.box_container}>
      <h2 className={styles.header}>Nova tarefa</h2>

      <section className={styles.section}>
        <span>Título</span>
        <input
          type="text"
          name="tasks"
          placeholder="Digite"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className={styles.input}
        />
      </section>

      <section className={styles.section_button}>
        <button onClick={addTask} className={styles.add_btn}>
          Adicionar
        </button>

        <button onClick={closeModal} className={styles.cancel_btn}>
          Cancelar
        </button>
      </section>
    </main>
  );
};

export default ModalAddTasks;
