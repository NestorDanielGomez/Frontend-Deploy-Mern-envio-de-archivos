import { useContext, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import authContext from "@/context/auth/authContext";
import appContext from "@/context/app/appContext";
import Link from "next/link";
import Dropzone from "@/components/Dropzone";
import Alerta from "@/components/Alerta";

export default function Home() {
  const { usuarioAutenticado } = useContext(authContext);
  const { msg_archivo, url } = useContext(appContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      usuarioAutenticado();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {url ? (
          <>
            {" "}
            <p className="mt-10 text-center text-2xl ">
              <span className="font-bold text-blue-900 text-3xl uppercase">Tu URL es:</span>{" "}
              <strong>{`${process.env.frontendURL}/enlaces/${url}`}</strong>
            </p>
            <button
              className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-900 uppercase font-bold"
              type="button"
              onClickCapture={() =>
                navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`)
              }>
              Copiar Enlace
            </button>
          </>
        ) : (
          <>
            {msg_archivo && <Alerta />}
            <div className="py-10 p-5 lg:flex md:shadow-lg  bg-white rounded-lg ">
              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <Dropzone />
              </div>

              <div className="mb-3 mx-2 mt-16 md:flex-1  lg:mt-0">
                <h2 className="my-4 text-4xl font-sans font-bold text-gray-800 ">
                  Compartir archivos de forma sencilla y segura
                </h2>
                <p className="text-lg leading-loose">
                  <span className="text-red-500 font-bold">DATA-SEND</span> te permite compartir
                  archivos con cifrado de extremo a extremo y un archivo que es eliminado después de
                  ser descargado. Así que puedes mantener lo que compartes en privado y asegurarte
                  de que tus cosas no permanezcan en línea para siempre.
                </p>
                <Link href="/crear-cuenta">
                  <p className="p-2 text-red-500 font-bold text-lg hover:text-red-700 border border-red-800  text-center">
                    Crea una cuenta para mayores beneficios
                  </p>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
