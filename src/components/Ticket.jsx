import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import ImgSup from '../assets/images/image-light.png'
import ImgSupBlue from '../assets/images/image.png'

function Ticket() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const aba = document.getElementById('aba');
        if (isOpen) {
            aba.style.display = 'block';
            setTimeout(() => {
                aba.style.opacity = 1;
            }, 1);
        } else {
            aba.style.opacity = 0;
            setTimeout(() => {
                aba.style.display = 'none';
            }, 300);
        }
    }, [isOpen]);

    const toggleAba = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="window">
                <button id="toggleButton" className="btn-sup" onClick={toggleAba}>
                    <i id="icon1" className="bi bi-chat-fill" style={{ display: isOpen ? 'none' : 'inline' }}></i>
                    <i id="icon2" className="bi bi-x-lg" style={{ display: isOpen ? 'inline' : 'none' }}></i>
                </button>
                <div id="aba" className="aba" style={{ opacity: 0, transition: 'opacity 300ms ease' }}>
                    <img className="sup_image" src={ImgSup} alt="Imagem Suporte" />
                    <h2>Olá<span>!</span> Como podemos te ajudar<span>?</span></h2>
                    <div className="global-content">
                        <div className="content-sup">
                            <a href="https://wa.me/5511937350748" target="_blank" rel="noopener noreferrer">
                                <h3>Contato via WhatsApp</h3>
                                <p>Normalmente respondemos em até 10 min.</p>
                                <i className="bi bi-whatsapp"></i>
                            </a>
                        </div>
                        <div className="content-sup">
                            <a href="https://www.instagram.com/bettarello_comercial/" target="_blank" rel="noopener noreferrer">
                                <h3>Nosso Instagram</h3>
                                <p>Venha nos conhecer mais de perto.</p>
                                <i className="bi bi-instagram"></i>
                            </a>
                        </div>
                        <div className="content-sup">
                            <a href="https://bettaagency.com.br">
                                <h3>Betta Agency</h3>
                                <p>Conheça a Betta Agency.</p>
                                <img className="sup-icon" src={ImgSupBlue} alt="Logo Betta" />
                            </a>
                        </div>
                    </div>
                    <p>Caso necessite de assistência, sinta-se à vontade para interagir com uma das opções disponíveis acima. Estamos à sua disposição.</p>
                </div>
            </div>
        </>
    );
}

export default Ticket;