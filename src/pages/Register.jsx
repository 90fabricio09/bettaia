import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../Firebase.jsx";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Registro realizado com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao registrar: " + error.message);
    }
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Registro com Google realizado com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error("Erro ao registrar com Google: " + error.message);
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Crie sua conta</h2>
          <p className="subtitle">Registre-se para começar</p>

          <button type="button" className="google-login" onClick={handleGoogleRegister}>
            <i className="bi bi-google"></i> Registrar com Google
          </button>

          <div className="divider">
            <span>ou</span>
          </div>

          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group password-group">
            <label htmlFor="password">Senha</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <i
                className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                onClick={() => setShowPassword(!showPassword)}
              ></i>
            </div>
          </div>

          <div className="form-group password-group">
            <label htmlFor="confirm-password">Confirme a Senha</label>
            <div className="password-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <i
                className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"}`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              ></i>
            </div>
          </div>

          <button type="submit" className="login-button">
            Registrar
          </button>

          <div className="signup-link">
            <p>
              Já tem uma conta? <NavLink to="/login">Faça login</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;