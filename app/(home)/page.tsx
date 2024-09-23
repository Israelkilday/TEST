"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Header from "../components/Header";
import ModalDelete from "../components/ModalDelete";
import ModalAddTasks from "../components/ModalAddTasks";
import ModalUser from "../components/ModalUser";
import styles from "./Home.module.scss";

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
  const [userModal, setUserModal] = useState(false);
  const [tasks, setTasks] = useState<Taskprops[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [checkedTasks, setCheckedTasks] = useState<boolean[]>([]);
  const [modalType, setModalType] = useState<"details" | "delete" | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    const storedTasks = localStorage.getItem("tasks");

    if (storedUserName) {
      setUserName(storedUserName);
    } else {
      setUserModal(true);
    }

    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks(parsedTasks);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setCheckedTasks(parsedTasks.map((task: any) => task.completed || false));
    }
  }, []);

  const openModal = (type: "details" | "delete", taskId?: number) => {
    if (!userName) {
      setUserModal(true);
      return;
    }

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
      const updatedTasks = [...tasks, { id: newId, text: newTask }];

      setTasks(updatedTasks);
      setCheckedTasks((prevChecked) => [...prevChecked, false]);
      setNewTask("");

      closeModal();

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
  };

  const deleteTask = () => {
    if (taskToDelete !== null) {
      const updatedTasks = tasks.filter((task) => task.id !== taskToDelete);
      const updatedCheckedTasks = updatedTasks.map(
        (task) => checkedTasks[tasks.findIndex((t) => t.id === task.id)],
      );

      setTasks(updatedTasks);
      setCheckedTasks(updatedCheckedTasks);

      const taskStore = updatedTasks.map((task, index) => ({
        ...task,
        completed: updatedCheckedTasks[index],
      }));
      localStorage.setItem("tasks", JSON.stringify(taskStore));

      closeModal();
    }
  };

  const handleCheckBox = (index: number) => {
    const updatedCheckedTasks = [...checkedTasks];
    updatedCheckedTasks[index] = !updatedCheckedTasks[index];
    setCheckedTasks(updatedCheckedTasks);

    const updatedTasks = tasks.map((task, i) => ({
      ...task,
      completed: updatedCheckedTasks[i],
    }));

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");

    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks);
      setTasks(parsedTasks);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setCheckedTasks(parsedTasks.map((task: any) => task.completed || false));
    }
  }, []);

  const renderTasks = (isCompleted: boolean) => {
    return (
      <ul className="flex flex-col gap-2">
        {tasks
          .map((task, index) => ({ checked: checkedTasks[index], task, index }))
          .filter(({ checked }) => checked === isCompleted)
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

                <p
                  className={`mb-1 ${isCompleted ? "text-gray-500 line-through" : ""}`}
                >
                  {task.text}
                </p>
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

  const handleRegisterUser = (name: string) => {
    setUserName(name);
    localStorage.setItem("userName", name);
    setUserModal(false);
  };

  return (
    <main className={styles.container}>
      <Header userName={userName} />

      <section className={styles.section_tasks}>
        {(tasks.length === 0 ||
          checkedTasks.some((checked) => !checked) ||
          !checkedTasks.some((checked) => checked)) && (
          <div className={styles.task_header}>
            <h2 className={styles.task_pending}>Suas tarefas de hoje</h2>
            {renderTasks(false)}
          </div>
        )}
        {checkedTasks.some((checked) => checked) && (
          <div className="lg:w-full">
            <h2 className={styles.task_finish}>Suas tarefas finalizadas</h2>
            {renderTasks(true)}
          </div>
        )}
      </section>

      {/* <div className="items-center lg:mx-auto lg:w-[450px]"> */}
      <div className={styles.box_button}>
        <button onClick={() => openModal("details")} className={styles.add_btn}>
          Adicionar nova tarefa
        </button>
      </div>

      {modal && (
        <Modal
          isOpen={modal}
          style={modaStyles}
          onRequestClose={closeModal}
          contentLabel="To do list"
          className={`h-full w-full bg-white shadow-md outline-none lg:fixed lg:left-[50%] lg:top-[50%] lg:max-w-[450px] lg:translate-x-[-50%] lg:translate-y-[-50%] lg:rounded-2xl ${modalType === "delete" ? "lg:max-h-[237px]" : "lg:max-h-[296px]"}`}
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

      {userModal && (
        <Modal
          isOpen={userModal}
          style={modaStyles}
          onRequestClose={() => setUserModal(false)}
          contentLabel="Registro de Usuário"
          className="h-full w-full bg-white shadow-md outline-none lg:fixed lg:left-[50%] lg:top-[50%] lg:max-h-[286px] lg:max-w-[450px] lg:translate-x-[-50%] lg:translate-y-[-50%] lg:rounded-2xl"
        >
          <ModalUser
            registerUser={handleRegisterUser} // Passa a função para registrar o nome
          />
        </Modal>
      )}
    </main>
  );
}
