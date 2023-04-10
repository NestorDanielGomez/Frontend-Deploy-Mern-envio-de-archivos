import { useContext, useEffect } from "react";
import authContext from "@/context/auth/authContext";
import appContext from "@/context/app/appContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const { usuarioAutenticado, usuario, cerrarSesion } = useContext(authContext);
  const { limpiarState } = useContext(appContext);

  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const redireccionar = () => {
    router.push("/");
    limpiarState();
  };

  return (
    <header className="container mx-auto mb-1 flex flex-col  items-center py-8 justify-between md:flex-row">
      <Image
        src="/next.svg"
        alt="Picture of the author"
        width={50}
        height={50}
        className="w-60 mb-8 md:mb-0 cursor-pointer"
        priority
        onClick={() => redireccionar()}
      />

      <div className="">
        {usuario ? (
          <div className="flex items-center">
            <p className="mr-3">
              Hola: <strong>{usuario.nombre}</strong>
            </p>
            <button
              className=" mr-2 bg-red-500 px-5 py-3 rounded text-white font-bold uppercase"
              type="button"
              onClick={() => cerrarSesion()}>
              cerrar sesion
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
