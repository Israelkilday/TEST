import Image from "next/image";

const Header = () => {
  const currentDate = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header>
      <section className="justify-between border-b border-solid pb-5 lg:mx-14 lg:flex lg:pb-4">
        <Image
          src={"/logo.png"}
          width={150}
          height={36}
          alt="logo"
          className="mb-2"
        />

        <h1 className="pb-1 font-primary font-medium lg:pt-1 lg:text-2xl">
          Bem vindo de volta, Usuário
        </h1>

        <p className="text-gray-500 lg:pt-2">{currentDate}</p>
      </section>
    </header>
  );
};

export default Header;
