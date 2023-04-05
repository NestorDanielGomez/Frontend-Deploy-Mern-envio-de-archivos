import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="container mx-auto flex flex-col  items-center py-8 justify-between md:flex-row">
      <Link href="/">
        <Image
          src="next.svg"
          alt="Picture of the author"
          width={50}
          height={50}
          className="w-60 mb-8 md:mb-0"
          priority
        />
      </Link>

      <div className="">
        <Link
          href="/login"
          className=" mr-2 bg-red-500 px-5 py-3 rounded text-white font-bold uppercase">
          iniciar Sesion
        </Link>
        <Link
          href="/crear-cuenta"
          className="bg-black px-5 py-3 rounded text-white font-bold uppercase">
          crear cuenta
        </Link>
      </div>
    </header>
  );
};

export default Header;
