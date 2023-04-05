import React from "react";
import Layout from "@/components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";

const Login = () => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("El email no es valido").required("El Email es obligatorio"),
      password: Yup.string()
        .required("El password es obligatorio")
        .min(6, "El password necesita como minimo 6 caracteres"),
    }),
    onSubmit: () => {},
  });
  return (
    <Layout>
      <div className="md:w-4/5 lg:w-3/5 mx-auto mb-15">
        <h2 className="font-sans font-bold text-4xl text-gray-800 text-center my-4">
          Iniciar Sesión
        </h2>
        <div className="flex justify-center mt-5">
          <div className="max-w-lg w-full">
            <form
              onSubmit={formik.handleSubmit}
              className="bg-white shadow-md px-5 pt-6 pb-8 mb-4 ">
              <div className="mb-4">
                <label htmlFor="email" className="block text-black text-sm font-bold mb-2 ">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Ingrese un Email"
                  className="w-full py-2 px-3 shadow appearance-none border rounded  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="my-2 p-4 bg-gray-200 border-l-4 border-red-500 text-red-700 ">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.email} </p>
                  </div>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-black text-sm font-bold mb-2 ">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="ingrese un Password"
                  className="w-full py-2 px-3 shadow appearance-none border rounded  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="my-2 p-4 bg-gray-200 border-l-4 border-red-500 text-red-700 ">
                    <p className="font-bold">Error</p>
                    <p>{formik.errors.password} </p>
                  </div>
                ) : null}
              </div>
              <input
                type="submit"
                className="bg-red-600 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold"
                value="Iniciar Sesion"
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
