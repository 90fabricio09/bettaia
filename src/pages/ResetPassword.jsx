import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase.jsx";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Email de redefinição de senha enviado! Verifique sua caixa de entrada.");
      
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-email":
          toast.error("Email inválido. Verifique e tente novamente.");
          break;
        case "auth/user-not-found":
          toast.error("Usuário não encontrado. Verifique o email digitado.");
          break;
        default:
          toast.error("Erro ao enviar email de redefinição: " + error.message);
          break;
      }
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Redefinir Senha</h2>
          <p className="subtitle">Digite o email cadastrado para receber o link de redefinição.</p>

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

          <button type="submit" className="login-button">
            Enviar Email de Redefinição
          </button>

          <div className="signup-link">
            <p>
              Lembrou a senha? <NavLink to="/login">Faça login</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
