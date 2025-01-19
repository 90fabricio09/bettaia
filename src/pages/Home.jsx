import React from "react";
import Logo from '../assets/images/png.png';
import Demonstration from '../assets/images/demonstration.gif'
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <header className="header">
        <img className="logo" src={Logo} alt="Logo da Betta IA" />
        <nav className="nav">
          <NavLink className="btn-login" to="/login">Fazer login</NavLink>
        </nav>
      </header>

      <main className="main-content">

        <div className="text-content">
          <img className="image-logo" src={Logo} alt="Logo da Betta IA" />
          <h2>Turbine sua criatividade e eficiência</h2>
          <p>
            Descubra como a <strong>Betta IA</strong> pode ajudar você a escrever, planejar, aprender e alcançar novos patamares de produtividade. Nossa IA foi criada para simplificar tarefas e aumentar sua eficiência!
          </p>
          <NavLink className="btn-main" to="/login">
            Fazer Login
          </NavLink>
        </div>

        <div className="features">
          <div className="feature-card">
            <i className="bi bi-pencil-fill feature-icon"></i>
            <h3>Escreva com Inteligência</h3>
            <p>
              Crie textos incríveis com o suporte da IA. Desde redações até estratégias de marketing, a Betta IA é a sua parceira criativa.
            </p>
          </div>
          <div className="feature-card">
            <i className="bi bi-list-task feature-icon"></i>
            <h3>Planeje Projetos com Facilidade</h3>
            <p>
              Gerencie tarefas e organize ideias com ferramentas integradas de planejamento alimentadas pela IA.
            </p>
          </div>
          <div className="feature-card">
            <i className="bi bi-lightbulb-fill feature-icon"></i>
            <h3>Aprenda Novas Habilidades</h3>
            <p>
              A Betta IA ajuda você a dominar novos tópicos com explicações simples e adaptadas ao seu ritmo.
            </p>
          </div>
        </div>

        <div className="demonstration">
          <div className="demonstration-content">
            <div className="text-content">
              <h2>Como a Betta IA funciona?</h2>
              <p>
                Descubra como nossa inteligência artificial pode ajudar você a simplificar tarefas e alcançar novos patamares de produtividade. A Betta IA é sua parceira ideal para planejamento, aprendizado e criação de conteúdo.
              </p>
            </div>
            <img src={Demonstration} alt="Demonstração da Betta IA em ação" />
          </div>
        </div>

      </main>

      <footer class="footer">
        <div class="footer-content">
          <p><b>Betta IA</b> • &copy; Todos os direitos reservados.</p>
          <p>Desenvolvido com 💙 por <a href="https://bettabrasil.com.br" target="_blank">Betta Brasil</a></p>
        </div>
      </footer>

    </div>
  );
};

export default Home;
