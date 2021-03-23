import React from 'react';
import '../css/Footer.css';

export default function Footer() {
    return (
        <div className="footer-content">
            <br/>
            <p>Made with Love, by <a className="p-link" href="https://pietabrood.github.io/Portfolio2/" target="_blank">Pieter Nortje</a></p>
            <div className="icons">
                <a className="a-tag" href="https://github.com/pietabrood" target="_blank"><i className="fa fa-github icon" aria-hidden="true"></i></a>
                <a className="a-tag" href="https://linkedin.com/in/pieternortje/" target="_blank"><i className="fa fa-linkedin icon" aria-hidden="true"></i></a>
            </div>
        </div>
    )
}
