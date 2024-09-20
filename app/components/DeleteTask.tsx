const DeleteTask = () => {
  return (
    <div>
      <h2 className="text-2xl font-medium">Deletar tarefa</h2>

      <section className="flex flex-col gap-2 pt-6">
        <p>Tem certeza que você deseja deletar esta tarefa?</p>
        <input
          type="text"
          name="tasks"
          placeholder="Digite"
          className="rounded-lg border px-4 py-3 outline-none"
        />
      </section>

      <section className="mt-8 flex flex-col gap-4">
        <button className="add_btn">Adicionar</button>
        <button className="w-full cursor-pointer rounded-lg bg-[#e7eefb] px-6 py-4 text-center font-medium">
          Cancelar
        </button>
      </section>
    </div>
  );
};

export default DeleteTask;
