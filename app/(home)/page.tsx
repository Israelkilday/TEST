"use client";

import Image from "next/image";
import { useState } from "react";
import Modal from "react-modal";
import ModalDetails from "../components/ModalDetails";
import Header from "../components/Header";

interface Taskprops {
  id: number;
  text: string;
}

Modal.setAppElement("body");

const modaStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};

export default function Home() {
  const [modal, setModal] = useState(false);
  const [tasks, setTasks] = useState<Taskprops[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [checkedTasks, setCheckedTasks] = useState<boolean[]>([]);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const addTask = () => {
    if (newTask.trim()) {
      const newId = Date.now();
      setTasks((prevTasks) => [...prevTasks, { id: newId, text: newTask }]);
      setCheckedTasks((prevChecked) => [...prevChecked, false]);
      setNewTask("");
      closeModal();
    }
  };

  const handleCheckBox = (index: number) => {
    const updatedCheckedTasks = [...checkedTasks];
    updatedCheckedTasks[index] = !updatedCheckedTasks[index];
    setCheckedTasks(updatedCheckedTasks);
  };

  return (
    <main className="container py-6">
      <Header />

      <section className="my-6 rounded-2xl border border-solid p-8 shadow-sm">
        <h2 className="pb-6 text-center text-gray-500">Suas tarefas de hoje</h2>

        <ul className="flex flex-col gap-2">
          {tasks.map((task, index) => (
            <li
              key={task.id}
              className="flex justify-between rounded-lg border border-dashed border-[#eaecf0] p-4 text-center duration-150 hover:border-[#ffffff] hover:bg-[#f7f9fd]"
            >
              <div className="flex items-center gap-3">
                <button onClick={() => handleCheckBox(index)}>
                  <Image
                    src={
                      checkedTasks[index]
                        ? "/Checkbox-active.png"
                        : "/Checkbox.png"
                    }
                    width={30}
                    height={30}
                    alt="checkbox"
                  />
                </button>

                <p className="mb-1">{task.text}</p>
              </div>

              <button>i</button>
            </li>
          ))}
        </ul>
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
          <ModalDetails
            closeModal={closeModal}
            newTask={newTask}
            setNewTask={setNewTask}
            addTask={addTask}
          />
        </Modal>
      )}
    </main>
  );
}
