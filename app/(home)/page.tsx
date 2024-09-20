"use client";

import Image from "next/image";
import { useState } from "react";
import Modal from "react-modal";
import ModalDetails from "../components/ModalDetails";

Modal.setAppElement("body");

const modaStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function Home() {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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

      <button onClick={openModal} className="add_btn">
        Adicionar nova tarefa
      </button>

      {modal && (
        <Modal
          isOpen={modal}
          style={modaStyles}
          onRequestClose={closeModal}
          contentLabel="To do list"
          className="h-full w-full bg-white outline-none lg:fixed lg:left-[50%] lg:top-[50%] lg:max-h-[500px] lg:max-w-[800px] lg:translate-x-[-50%] lg:translate-y-[-50%] lg:rounded-[30px]"
        >
          <ModalDetails />
        </Modal>
      )}
    </main>
  );
}
