import { useContext, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Layout from "@/components/Layout";
import authContext from "@/context/auth/authContext";

export default function Home() {
  const { usuarioAutenticado } = useContext(authContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      usuarioAutenticado();
    }
  }, []);

  return (
    <Layout>
      <h2>Index</h2>
    </Layout>
  );
}
