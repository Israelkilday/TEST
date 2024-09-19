import Image from "next/image";
import Modal from "react-modal";

export default function Home() {
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  Modal.setAppElement("body");

  return (
    <main className="container py-6">
      <section className="border-b border-solid pb-5">
        <Image
          src={"/logo.png"}
          width={150}
          height={36}
          alt="logo"
          className="mb-2"
        />

        <h1 className="font-primary pb-1 font-medium">
          Bem vindo de volta, Usuário
        </h1>

        <p className="font-normal text-gray-500">{currentDate}</p>
      </section>

      <section className="my-6 rounded-2xl border border-solid p-8 shadow-sm">
        <h2 className="text-center text-gray-500">Suas tarefas de hoje</h2>
      </section>

      <button className="w-full rounded-lg bg-[linear-gradient(90deg,#0796D3_0%,#53C0F0_68.65%)] px-6 py-4 text-center font-medium text-white">
        Adicionar nova tarefa
      </button>
    </main>
  );
}
