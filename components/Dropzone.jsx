import React, { useContext, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import clienteAxios from "@/config/axios";
import Formulario from "./Formulario";
import appContext from "@/context/app/appContext";
import authContext from "@/context/auth/authContext";

const Dropzone = () => {
  const { mostrarAlerta, subirArchivoAlServidor, cargando, crearEnlace } = useContext(appContext);
  const { usuario, autenticado } = useContext(authContext);

  const onDropRejected = () => {
    mostrarAlerta(
      "No se pudo subir, el limite es 1mb, con tu cuenta gratis podras subir archivos mas grandes"
    );
  };

  const onDropAccepted = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    formData.append("archivo", acceptedFiles[0]);

    subirArchivoAlServidor(formData, acceptedFiles[0].path);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDropAccepted,
    onDropRejected,
    maxSize: 1000000,
  });

  const archivos = acceptedFiles.map((archivo) => (
    <li
      key={archivo.lastModified}
      className="bg-white flex-1 p-3 mb-4 shadow-lg rounded text-center">
      <p className="text-xl font-bold">{archivo.path}</p>
      <p className="text-sm text-gray-500">{(archivo.size / Math.pow(1024, 2)).toFixed(2)}MB</p>
    </li>
  ));

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
      {acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full">
          <h4 className="mb-4 text-2xl font-bold text-center">Archivos</h4>
          <ul className="">{archivos}</ul>

          {autenticado && <Formulario />}
          {cargando ? (
            <p className="uppercase my-10 text-center text-gray-600">Subiendo archivo...</p>
          ) : (
            <button
              className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-900 uppercase font-bold"
              type="button"
              onClickCapture={() => crearEnlace()}>
              Crear Enlace
            </button>
          )}
        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone w-full py-32" })}>
          <input className="h-100" {...getInputProps()} />

          {isDragActive ? (
            <p className=" text-gray-600 text-2xl text-center"> Suelta el archivo aqui </p>
          ) : (
            <div className="text-center">
              <p className="text-2xl text-center text-gray-600">
                Selecciona un archivo y arrastralo aquí
              </p>
              <button
                className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-900 uppercase font-bold"
                type="button">
                Selecciona archivos para subir
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
