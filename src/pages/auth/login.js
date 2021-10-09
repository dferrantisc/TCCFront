import React, { useContext, useEffect, useState } from "react";

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col,
} from "reactstrap";
// layout for this page
import Auth from "layouts/Auth.js";
import { AuthContext } from "context/AuthContext";
import { useRouter } from "next/router";

function Login() {
    const [login, setLogin] = useState(null);
    const [senha, setSenha] = useState(null);
    const router = useRouter();

    const { signIn } = useContext(AuthContext);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) router.push("/admin/dashboard");
    }, []);

    function handleSubmit(e) {
        e.preventDefault();

        signIn({ login, senha });
    }

    return ( <
        >
        <
        Col lg = "5"
        md = "7" >
        <
        Card className = "bg-secondary shadow border-0" >
        <
        CardBody className = "px-lg-5 py-lg-5" >
        <
        div className = "text-center text-muted mb-4" >
        Acessar a plataforma <
        /div> <
        Form role = "form"
        onSubmit = { handleSubmit } >
        <
        FormGroup className = "mb-3" >
        <
        InputGroup className = "input-group-alternative" >
        <
        InputGroupAddon addonType = "prepend" >
        <
        InputGroupText >
        <
        i className = "ni ni-single-02" / >
        <
        /InputGroupText> <
        /InputGroupAddon> <
        Input placeholder = "Login"
        type = "text"
        autoComplete = "login"
        onChange = {
            (e) => setLogin(e.target.value) }
        /> <
        /InputGroup> <
        /FormGroup> <
        FormGroup >
        <
        InputGroup className = "input-group-alternative" >
        <
        InputGroupAddon addonType = "prepend" >
        <
        InputGroupText >
        <
        i className = "ni ni-lock-circle-open" / >
        <
        /InputGroupText> <
        /InputGroupAddon> <
        Input placeholder = "Senha"
        type = "password"
        autoComplete = "password"
        onChange = {
            (e) => setSenha(e.target.value) }
        /> <
        /InputGroup> <
        /FormGroup>

        <
        div className = "text-center" >
        <
        Button className = "my-4"
        color = "primary"
        type = "submit" >
        Entrar <
        /Button> <
        /div> <
        /Form> <
        /CardBody> <
        /Card> <
        /Col> <
        />
    );
}

Login.layout = Auth;

export default Login;