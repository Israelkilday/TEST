import { useState } from "react";

// Definindo a interface para as props do ModalUser
interface ModalUserProps {
  registerUser: (name: string) => void;
}

const ModalUser: React.FC<ModalUserProps> = ({ registerUser }) => {
  const [userName, setUserName] = useState("");

  const handleRegister = () => {
    if (userName) {
      registerUser(userName); // Chama a função registerUser passada como prop
    } else {
      alert("Por favor, insira um nome.");
    }
  };

  return (
    <main className="container py-6">
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-medium">Registre seu nome</h2>
      </div>

      <section className="flex flex-col gap-2 pt-6">
        <span>Usuário</span>
        <input
          type="text"
          name="userName"
          placeholder="Digite"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="mb-6 rounded-lg border px-4 py-3 outline-none"
        />
      </section>

      <section className="flex flex-col gap-4 lg:flex-row">
        <button onClick={handleRegister} className="add_btn">
          Registre
        </button>
      </section>
    </main>
  );
};

export default ModalUser;
