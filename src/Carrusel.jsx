import React, { useState, useEffect } from 'react';
import UsuariosServices from './Service';
import './StylesFirstApp.css';

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation } from "swiper";

export const Carrusel = () => {
  const [usuarios, setUsers] = useState([]);
  const [filtro, setFilter] = useState('');
  const [MostrarBack, setMostrarBack] = useState(null);



  useEffect(() => {

    const UsuariosService = new UsuariosServices();

    UsuariosService.obtenerJSONUsuarios().then(data => {
      setUsers(data);
    });




  }, []);

  const Filtrar = event => {
    setFilter(event.target.value);
  };

  const VerMas = (idUsuario) => {
    console.log(idUsuario)
    setMostrarBack(idUsuario)
  }
  const VerMenos = (idUsuario) => {
    console.log(idUsuario);
    setMostrarBack(null);
  }

  const usuariosFiltrados = usuarios.filter(usuario => usuario.name.toLowerCase().includes(filtro.toLowerCase())
    || usuario.email.toLowerCase().includes(filtro.toLowerCase())
    || usuario.address.city.toLowerCase().includes(filtro.toLowerCase())
  );

  const usuariosEncontrados = usuariosFiltrados.length;
  let slidesPerView;
  if (window.innerWidth > 1024) {
    slidesPerView = 3;
    if (usuariosEncontrados < 3)
      slidesPerView = usuariosEncontrados;
  }
  else if (window.innerWidth > 768) {
    slidesPerView = 2;
    if (usuariosEncontrados < 2)
      slidesPerView = usuariosEncontrados;

  } else {
    slidesPerView = 1;
    if (usuariosEncontrados < 1)
      slidesPerView = usuariosEncontrados;
  }










  return (
    <>
      <div className="div-filtro">
        <input className="filtro" type="text" value={filtro} onChange={Filtrar} placeholder="Filtrar" />
      </div>
      <div className="slide-container" >

        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={40}
          loop={true}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="swiper-cards"
        >

          <div className="slide-content">
            <div className="card-wrapper ">
              {usuariosFiltrados.map(usuario => (
                <SwiperSlide key={usuario.id}>
                  <div className="card">
                    <div className="image-content">
                      <span className="overlay"></span>

                      <div className="card-image" >
                        <img src="src/Images/persona-incognita.jpeg" alt="" className="card-img" />
                      </div>
                    </div>

                    <div className="card-content">
                      {MostrarBack === usuario.id ? (
                        <>
                          <h2 className="name">
                            <p>{usuario.name}</p>
                            <p>{usuario.username}</p>
                            <p>{usuario.email}</p>
                            <p>{usuario.address.city}</p>
                            <p>{usuario.phone}</p>
                            <p>{usuario.company.name}</p>
                          </h2>
                          <button className="button" onClick={() => VerMenos(usuario.id)}>Ver menos</button>

                        </>
                      ) : (
                        <>
                          <h2 className="name">
                            <p>{usuario.name}</p>
                            <p>{usuario.email}</p>
                            <p>{usuario.address.city}</p>
                          </h2>
                          <button className="button" onClick={() => VerMas(usuario.id)}>Ver mas</button>
                        </>
                      )
                      }
                    </div>
                  </div>
                </SwiperSlide>

              ))}
            </div>
          </div>
        </Swiper>
      </div>

    </>
  );
};
