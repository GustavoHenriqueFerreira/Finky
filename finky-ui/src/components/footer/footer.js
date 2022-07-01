import React from 'react'
import "../../assets/css/footer.css"
import facebook from "../../assets/img/facebook.png"

export default function Footer() {
    return (
        <footer className="rodape">
            <div className="container flex">
                <div> 
                    <h1 className='titulo'>Finky</h1>
                    <p className='subtitulo'>Como falar com a gente?</p>
                    <p className='email'>meajuda@finky.com.br</p>
                </div>

                <nav className='menu_rodape'>
                    <a>Home</a>
                    <a>Como funciona</a>
                    <a>Parceiros</a>
                    <a>Quem somos</a>
                    <a>Contatos</a>
                </nav>

                <nav className='menu_rodape'>
                    <a>Simulador</a>
                    <a>FAQ</a>
                    <a>FinBlog</a>
                    <a>Solicitar finaciamento</a>
                </nav>

                <div className='imagem'>
                    <img className='imgFacabook' src={facebook} />
                    <img className='imgFacabook' src={facebook} />
                    <img className='imgFacabook' src={facebook} />
                </div>

            </div>

            <p className='texto_copyright'>&copy; 2022 Finky</p>
        </footer>
    )
}