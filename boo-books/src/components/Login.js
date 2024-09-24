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

import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Email requerido"),
    password: Yup.string().min(6, "La constraseña debe tener al menos 6 caracteres").required("Contraseña requerida"),
});

const Login = ()=>{
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (values)=>{
        const {email, password} = values;
        if (isAdmin) {
            if (email === "admin@admin.com" && password === "Admin1234") {
                navigate("/admin");
            } else {
                alert("Credenciales incorrectas para admin");
            }
        } else {
            if (email === "user@user.com" && password === "User1234") {
                navigate("/user");
            } else {
                alert("Credenciales incorrectas para usuario");
            }
        }
    };

    return(
        <div>
            <h1>Login</h1>
            <Formik
                initialValues={{email:"", password:""}}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                <Form>
                    <div>
                        <label>Email:</label>
                        <Field type="email" name="email"/>
                        <ErrorMessage name="email" component="div"/>
                    </div>
                    <div>
                        <label>Contaseña:</label>
                        <Field type="password" name="password"/>
                        <ErrorMessage name="password" component="div"/>
                    </div>
                    <div>
                        <label>
                            <Field type="checkbox" name="isAdmin" checked={isAdmin} onChange={()=> setIsAdmin(!isAdmin)}/>
                            Entrar como Admin
                        </label>
                    </div>
                    <button type="submit">Login</button>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;