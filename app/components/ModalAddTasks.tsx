import { Dispatch, MouseEventHandler, SetStateAction } from "react";

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
    <main className="container py-6">
      <h2 className="text-2xl font-medium">Nova tarefa</h2>

      <section className="flex flex-col gap-2 pt-6">
        <span>Título</span>
        <input
          type="text"
          name="tasks"
          placeholder="Digite"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="rounded-lg border px-4 py-3 outline-none"
        />
      </section>

      <section className="mt-8 flex flex-col gap-4 lg:flex-row">
        <button onClick={addTask} className="add_btn">
          Adicionar
        </button>

        <button onClick={closeModal} className="cancel_btn">
          Cancelar
        </button>
      </section>
    </main>
  );
};

export default ModalAddTasks;
