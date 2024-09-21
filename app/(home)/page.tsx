"use client";

import Image from "next/image";
import { useState } from "react";
import Modal from "react-modal";
import Header from "../components/Header";
import ModalDelete from "../components/ModalDelete";
import ModalAddTasks from "../components/ModalAddTasks";

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
  const [modalType, setModalType] = useState<"details" | "delete" | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const openModal = (type: "details" | "delete", taskId?: number) => {
    setModalType(type);

    if (type === "delete" && taskId !== undefined) {
      setTaskToDelete(taskId);
    }
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setTaskToDelete(null);
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

  const deleteTask = () => {
    if (taskToDelete !== null) {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== taskToDelete),
      );
      closeModal();
    }
  };

  const handleCheckBox = (index: number) => {
    const updatedCheckedTasks = [...checkedTasks];
    updatedCheckedTasks[index] = !updatedCheckedTasks[index];
    setCheckedTasks(updatedCheckedTasks);
  };

  const renderTasks = (isCompleted: boolean) => {
    return (
      <ul className="flex flex-col gap-2">
        {tasks
          .map((task, index) => ({ checked: checkedTasks[index], task, index }))
          .filter(({ checked }) => checked === isCompleted) // Filtra de acordo com o estado da tarefa
          .map(({ task, index }) => (
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
                    width={24}
                    height={24}
                    alt="checkbox-image"
                  />
                </button>

                <p className="mb-1">{task.text}</p>
              </div>

              <button onClick={() => openModal("delete", task.id)}>
                <Image
                  src={"/trash.png"}
                  width={24}
                  height={24}
                  alt="trash-image"
                />
              </button>
            </li>
          ))}
      </ul>
    );
  };

  return (
    <main className="container py-6">
      <Header />

      {/* Tarefas pendentes */}
      <section className="my-6 flex-col items-center justify-center rounded-2xl border border-solid p-8 shadow-sm lg:mx-auto lg:mt-10 lg:flex lg:w-[450px]">
        {(tasks.length === 0 ||
          checkedTasks.some((checked) => !checked) ||
          !checkedTasks.some((checked) => checked)) && (
          <div className="lg:w-full">
            <h2 className="pb-6 text-center text-gray-500">
              Suas tarefas de hoje
            </h2>
            {renderTasks(false)}
          </div>
        )}
        {checkedTasks.some((checked) => checked) && (
          <div className="lg:w-full">
            <h2 className="py-6 text-center text-gray-500">
              Suas tarefas finalizadas
            </h2>
            {renderTasks(true)}
          </div>
        )}
      </section>

      <div className="items-center lg:mx-auto lg:w-[450px]">
        <button onClick={() => openModal("details")} className="add_btn">
          Adicionar nova tarefa
        </button>
      </div>

      {modal && (
        <Modal
          isOpen={modal}
          style={modaStyles}
          onRequestClose={closeModal}
          contentLabel="To do list"
          className={`h-full w-full bg-white outline-none lg:fixed lg:left-[50%] lg:top-[50%] lg:max-w-[450px] lg:translate-x-[-50%] lg:translate-y-[-50%] lg:rounded-2xl ${modalType === "delete" ? "lg:max-h-[232px]" : "lg:max-h-[286px]"}`}
        >
          {modalType === "details" && (
            <ModalAddTasks
              closeModal={closeModal}
              newTask={newTask}
              setNewTask={setNewTask}
              addTask={addTask}
            />
          )}

          {modalType === "delete" && (
            <ModalDelete closeModal={closeModal} deleteTask={deleteTask} />
          )}
        </Modal>
      )}
    </main>
  );
}
