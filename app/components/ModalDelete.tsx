import { MouseEventHandler } from "react";

interface ModalDeleteProps {
  closeModal: MouseEventHandler<HTMLButtonElement>;
  deleteTask: () => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
  closeModal,
  deleteTask,
}) => {
  return (
    <main className="container py-6">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-medium">Deletar tarefa</h2>

        <p className="pb-8 text-gray-500">
          Tem certeza que você deseja deletar esta tarefa?
        </p>
      </div>

      <section className="flex flex-col gap-4 lg:flex-row">
        <button
          onClick={deleteTask}
          className="w-full cursor-pointer rounded-lg bg-[linear-gradient(90deg,#D30707_0%,#F05353_68.65%)] px-6 py-4 text-center font-medium text-white"
        >
          Deletar
        </button>

        <button onClick={closeModal} className="cancel_btn">
          Cancelar
        </button>
      </section>
    </main>
  );
};

export default ModalDelete;
