import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../Firebase.jsx";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login realizado com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error(`Erro ao fazer login, tente novamente!`);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Login com Google realizado com sucesso!");
      navigate("/");
    } catch (error) {
      toast.error(`Erro ao fazer login com Google, tente novamente!`);
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Bem-vindo de volta!</h2>
          <p className="subtitle">Faça login para continuar</p>

          <button type="button" className="google-login" onClick={handleGoogleLogin}>
            <i className="bi bi-google"></i> Entrar com Google
          </button>

          <div className="divider">
            <span>ou</span>
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

          <div className="forgot-password">
            <NavLink to="/reset-password">Esqueceu a senha?</NavLink>
          </div>

          <button type="submit" className="login-button">
            Entrar
          </button>

          <div className="signup-link">
            <p>
              Não tem uma conta? <NavLink to="/signup">Cadastre-se</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;