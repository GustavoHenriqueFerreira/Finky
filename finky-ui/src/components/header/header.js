import React from 'react';
import "../../assets/css/header.css"

export default function Header() {
    return (
        <header className="topo">
            <div className="container flex">
                <div className="flex">
                    <h1><a href="#">Finky</a></h1>
                </div>
                <nav className="menu">
                    <ul className="flex">
                        <li><a href="#">Início</a></li>
                        <li><a href="#">Como funciona</a></li>
                        <li><a href="#">Parceiros</a></li>
                        <li><a href="#">Quem Somos</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">FinBlog</a></li>
                        <li><a href="#">Contato</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}