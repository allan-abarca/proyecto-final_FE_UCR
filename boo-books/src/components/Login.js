import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './Login.css'; 
import loginImage from '../images/boo-books.jpg'; 

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email requerido"),
  password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("Contraseña requerida"),
});

const Login = () => {
  const navigate = useNavigate();

  // Manejo del login
  const handleLogin = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", values);
      
      const { _id: userId, role } = response.data;
      localStorage.setItem('userId', userId);

      // Redirigir según el rol del usuario
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
    <div className={styles.loginContainer}>
      <div className={styles.imageContainer}>
        <img src={loginImage} alt="Login" className={styles.loginImage} />
      </div>
      <div className={styles.loginBox}>
        <h1>Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className={styles.formGroup}>
              <label>Email:</label>
              <Field type="email" name="email" className={styles.formControl} />
              <ErrorMessage name="email" component="div" className={styles.errorMessage} />
            </div>
            <div className={styles.formGroup}>
              <label>Contraseña:</label>
              <Field type="password" name="password" className={styles.formControl} />
              <ErrorMessage name="password" component="div" className={styles.errorMessage} />
            </div>
            <button type="submit" className={styles.loginButton}>Login</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;

