import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email requerido"),
  password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("Contraseña requerida"),
});

const Login = () => {
  const navigate = useNavigate();

  // aqui se manejara el login
  const handleLogin = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", values);
      const { role } = response.data;

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error("Error en el login:", error.response ? error.response.data : error.message);
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}  
      >
        <Form>
          <div>
            <label>Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <label>Contraseña:</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
