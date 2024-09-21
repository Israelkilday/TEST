import Image from "next/image";

const Header = () => {
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main>
      <section className="border-b border-solid pb-5">
        <Image
          src={"/logo.png"}
          width={150}
          height={36}
          alt="logo"
          className="mb-2"
        />

        <h1 className="pb-1 font-primary font-medium">
          Bem vindo de volta, Usuário
        </h1>

        <p className="text-gray-500">{currentDate}</p>
      </section>
    </main>
  );
};

export default Header;
