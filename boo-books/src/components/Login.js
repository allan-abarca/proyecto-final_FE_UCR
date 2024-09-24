// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import "./Login.css";
// // import { response } from "express";

// const validationSchema = Yup.object({
//     name: Yup.string().required("Requerido"),
//     email: Yup.string().email("Email invalido").required("Requerido"),
//     password: Yup.string().min(6, "Debe tener al menos 6 caracteres").required("Requerido"),
//     // confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Las contraseñas deben de coincidir").required("Requerido"),
// });

// const Login = ()=>{
//     const initialValues = {
//         name: "",
//         email: "",
//         password: "",
//         // confirmPassword: "",
//     };

//     const onSumbit = (values, {setSubmitting, resetForm})=>{

//         axios.post("http://localhost:5000/api/registration", values)
//         .then(response =>{
//             console.log(response.data);
//             resetForm();
//         })
//         .catch(error =>{
//             console.error(error);
//         })
//         .finally(()=>{
//             setSubmitting(false);
//         });

//         // console.log("Formulario enviado");
//         // console.log(values);
//     };

//     return(
//         <div className="registro-container">
//             <h2>Registro de pacientes</h2>
//             <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={onSumbit}
//             >
//                 {({isSubmitting})=>(
//                     <Form>
//                     <div className="form-control">
//                         <label htmlFor="name">Nombre</label>
//                         <Field type="text" id="name" name="name"/>
//                         <ErrorMessage name="name" component="div" className="error"/>
//                     </div>
//                     <div className="form-control">
//                         <label htmlFor="email">Correo</label>
//                         <Field type="email" id="email" name="email"/>
//                         <ErrorMessage name="email" component="div" className="error"/>
//                     </div>
//                     <div className="form-control">
//                         <label htmlFor="password">Clave</label>
//                         <Field type="password" id="password" name="password"/>
//                         <ErrorMessage name="password" component="div" className="error"/>
//                     </div>
//                     {/* <div className="form-control">
//                         <label htmlFor="confirmPassword">Confirmar clave</label>
//                         <Field type="password" id="confirmPassword" name="confirmPassword"/>
//                         <ErrorMessage name="confirmPassword" component="div" className="error"/>
//                     </div> */}
//                     <button type="submit" disabled={isSubmitting}>Registrar</button>
//                 </Form>
//                 )}
//             </Formik>
//         </div>
//     );
// };

// export default Login;

// ****************************************************************

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// Aquí definimos las reglas de validación para el formulario usando `Yup`.
// Validamos que el email tenga formato correcto y que la contraseña tenga al menos 6 caracteres.
const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Email requerido"),
    password: Yup.string().min(6, "La contraseña debe tener al menos 6 caracteres").required("Contraseña requerida"),
});

// El componente `Login` gestiona el formulario de inicio de sesión.
const Login = () => {
    
    const [isAdmin, setIsAdmin] = useState(false);
   
    const navigate = useNavigate();

    // Esta función maneja lo que pasa cuando el formulario se envía.
    // Aquí estamos verificando las credenciales según si el usuario es admin o no.
    const handleLogin = (values) => {
        const { email, password } = values;
        
        // Si el checkbox de admin está activado, verificamos las credenciales de admin.
        if (isAdmin) {
            // Credenciales fijas para el admin.
            if (email === "admin@admin.com" && password === "Admin1234") {
                navigate("/admin"); // Redirigimos a la página del admin.
            } else {
                alert("Credenciales incorrectas para admin");
            }
        } else {
            // Si no es admin, verificamos las credenciales de usuario.
            if (email === "user@user.com" && password === "User1234") {
                navigate("/user"); // Redirigimos a la página del usuario.
            } else {
                alert("Credenciales incorrectas para usuario");
            }
        }
    };

    return (
        <div>
            {/* Título del formulario */}
            <h1>Login</h1>

            {/* Usamos Formik para manejar el formulario */}
            <Formik
                initialValues={{ email: "", password: "" }} // Valores iniciales del formulario.
                validationSchema={validationSchema} // Validación del formulario.
                onSubmit={handleLogin}
            >
                {/* El componente Form de Formik maneja el envío automático del formulario */}
                <Form>
                    {/* Campo del email */}
                    <div>
                        <label>Email:</label>
                        <Field type="email" name="email" /> {/* Campo para ingresar el email */}
                        <ErrorMessage name="email" component="div" /> {/* Muestra los errores de validación del email */}
                    </div>

                    {/* Campo de la contraseña */}
                    <div>
                        <label>Contraseña:</label>
                        <Field type="password" name="password" /> {/* Campo para ingresar la contraseña */}
                        <ErrorMessage name="password" component="div" /> {/* Muestra los errores de validación de la contraseña */}
                    </div>

                    {/* Checkbox para elegir si se ingresa como administrador */}
                    <div>
                        <label>
                            {/* Si el checkbox se marca o desmarca, se actualiza `isAdmin` */}
                            <Field
                                type="checkbox"
                                name="isAdmin"
                                checked={isAdmin}
                                onChange={() => setIsAdmin(!isAdmin)}
                            />
                            Entrar como Admin
                        </label>
                    </div>

                    {/* Botón para enviar el formulario */}
                    <button type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;
