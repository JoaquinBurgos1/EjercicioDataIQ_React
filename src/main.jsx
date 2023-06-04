import React from 'react'
import ReactDOM from 'react-dom/client'
import { Titulo } from './Titulo';
import { Carrusel } from './Carrusel';
import './Styles.css';
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Titulo/>
        <Carrusel/>
    </React.StrictMode>
)