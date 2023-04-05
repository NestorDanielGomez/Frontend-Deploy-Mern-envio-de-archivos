import React from "react";
import Head from "next/head";
import Header from "./Header";
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Data-Send</title>
      </Head>
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto ">
          <main className="mt-20"> {children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
