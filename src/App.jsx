import React, { useState, useEffect } from "react";
import "./App.css";
import { FiMoon, FiSun } from "react-icons/fi";
import Gallery from "./components/Gallery";
import PhotoCalendar from "./components/PhotoCalendar";
import PhotoMap from "./components/PhotoMap";
import photos from "./data/photos.json";
import { motion } from "framer-motion";


function App() {
  const [section, setSection] = useState("inicio");
  const [busqueda, setBusqueda] = useState("");
  const [fase, setFase] = useState("");
  const [fecha, setFecha] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [favoritos, setFavoritos] = useState(() => {
    // Carga favoritos desde localStorage al iniciar
    const fav = localStorage.getItem("favoritos");
    return fav ? JSON.parse(fav) : [];
  });

  // Guarda favoritos en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  // Función para alternar favorito
  const toggleFavorito = (url) => {
    setFavoritos(favs =>
      favs.includes(url) ? favs.filter(f => f !== url) : [...favs, url]
    );
  };

  // Filtrado de fotos
  const fotosFiltradas = photos.filter(photo => {
    const coincideBusqueda =
      busqueda === "" ||
      photo.comentario?.toLowerCase().includes(busqueda.toLowerCase()) ||
      photo.lugar?.toLowerCase().includes(busqueda.toLowerCase());
    const coincideFase = fase === "" || photo.fase === fase;
    const coincideFecha = fecha === "" || photo.fecha === fecha;
    return coincideBusqueda && coincideFase && coincideFecha;
  });

  // Total de fotos
  const totalFotos = photos.length;

  // Fotos por fase
  const fotosPorFase = photos.reduce((acc, photo) => {
    acc[photo.fase] = (acc[photo.fase] || 0) + 1;
    return acc;
  }, {});

  // Fotos por año y mes
  const fotosPorAnio = {};
  const fotosPorMes = {};
  photos.forEach(photo => {
    const [anio, mes] = photo.fecha.includes('-')
      ? photo.fecha.split('-')
      : photo.fecha.split('/').reverse();
    fotosPorAnio[anio] = (fotosPorAnio[anio] || 0) + 1;
    const claveMes = `${anio}-${mes}`;
    fotosPorMes[claveMes] = (fotosPorMes[claveMes] || 0) + 1;
  });

  return (
    <div className={`app${darkMode ? " dark" : " light"}`}>
      <nav className="navbar">
        <div className="logo">
          <FiMoon size={28} style={{ marginRight: 8 }} />
          <span>Bitácora Lunar</span>
        </div>
        <ul>
          <li className={section === "inicio" ? "active" : ""} onClick={() => setSection("inicio")}>Inicio</li>
          <li className={section === "galeria" ? "active" : ""} onClick={() => setSection("galeria")}>Galería</li>
          <li className={section === "fases" ? "active" : ""} onClick={() => setSection("fases")}>Fases Lunares</li>
          <li className={section === "sobre" ? "active" : ""} onClick={() => setSection("sobre")}>Sobre el proyecto</li>
          <li className={section === "contacto" ? "active" : ""} onClick={() => setSection("contacto")}>Contacto</li>
          <li className={section === "mapa" ? "active" : ""} onClick={() => setSection("mapa")}>Mapa</li>
          <li className={section === "favoritos" ? "active" : ""} onClick={() => setSection("favoritos")}>
            Favoritos
          </li>
          <li className={section === "estadisticas" ? "active" : ""} onClick={() => setSection("estadisticas")}>
            Estadísticas
          </li>
        </ul>
        <button
          className="toggle-theme"
          onClick={() => setDarkMode(m => !m)}
          title={darkMode ? "Modo claro" : "Modo oscuro"}
        >
          {darkMode ? <FiSun size={22} /> : <FiMoon size={22} />}
        </button>
      </nav>
      <main>
      {section === "inicio" && (
  <motion.section
    className="home"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h1>🌕 Bienvenido a Bitácora Lunar</h1>
    <p>
      Un viaje visual por más de 200 noches, fases y momentos únicos de la Luna. <br />
      Explorá la galería, filtrá por fecha o fase lunar, y descubrí los detalles técnicos de cada captura desde Córdoba, Argentina.
    </p>
    <blockquote style={{ fontStyle: "italic", color: "#ccc", margin: "1.5em auto", maxWidth: 600 }}>
      "La Luna es el reflejo del alma de la Tierra." – Anónimo
    </blockquote>
    <button className="btn" onClick={() => setSection("galeria")}>
      Ver galería
    </button>
  </motion.section>
)}
        {section === "galeria" && (
          <section>
            <PhotoCalendar
              photos={photos}
              onSelectDate={setFecha}
              selectedDate={fecha}
              onClearDate={() => setFecha("")}
            />
            <div className="filtros-galeria">
              <input
                type="text"
                placeholder="Buscar por comentario o lugar..."
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
              />
              <select value={fase} onChange={e => setFase(e.target.value)}>
                <option value="">Todas las fases</option>
                <option value="Luna nueva">Luna nueva</option>
                <option value="Cuarto creciente">Cuarto creciente</option>
                <option value="Luna llena">Luna llena</option>
                <option value="Cuarto menguante">Cuarto menguante</option>
                <option value="Luna gibosa">Luna gibosa</option>
                <option value="Luna gibosa menguante">Luna gibosa menguante</option>
                {/* Agrega más fases si tienes */}
              </select>
              <input
                type="date"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
              />
              <button className="btn" onClick={() => { setBusqueda(""); setFase(""); setFecha(""); }}>
                Limpiar filtros
              </button>
            </div>
            <Gallery photos={fotosFiltradas} />
          </section>
        )}
        {section === "fases" && (
          <section className="fases-lunares" style={{maxWidth: 700, margin: "0 auto", padding: "2em 1em"}}>
            <h2>Fases Lunares</h2>
            <ul style={{lineHeight: 2}}>
              <li>
                <button className="fase-btn" onClick={() => { setFase("Luna nueva"); setSection("galeria"); }}>
                  Luna Nueva
                </button>: No visible desde la Tierra.
              </li>
              <li>
                <button className="fase-btn" onClick={() => { setFase("Cuarto creciente"); setSection("galeria"); }}>
                  Cuarto Creciente
                </button>: Se ve la mitad derecha iluminada.
              </li>
              <li>
                <button className="fase-btn" onClick={() => { setFase("Luna llena"); setSection("galeria"); }}>
                  Luna Llena
                </button>: La Luna se ve completamente iluminada.
              </li>
              <li>
                <button className="fase-btn" onClick={() => { setFase("Cuarto menguante"); setSection("galeria"); }}>
                  Cuarto Menguante
                </button>: Se ve la mitad izquierda iluminada.
              </li>
              <li>
                <button className="fase-btn" onClick={() => { setFase("Luna gibosa"); setSection("galeria"); }}>
                  Luna Gibosa
                </button>: Más de la mitad visible, pero no llena.
              </li>
              <li>
                <button className="fase-btn" onClick={() => { setFase("Luna gibosa menguante"); setSection("galeria"); }}>
                  Luna Gibosa Menguante
                </button>: Más de la mitad visible, pero no llena.
              </li>
            </ul>
            <p style={{color:"#b0b3c6", marginTop:16}}>
              Haz clic en una fase para ver todas las fotos correspondientes en la galería.
            </p>
          </section>
        )}
        {section === "sobre" && (
          <section className="sobre-proyecto" style={{maxWidth: 700, margin: "0 auto", padding: "2em 1em"}}>
            <h2>Sobre el proyecto</h2>
            <p>
              <b>Bitácora Lunar</b> es una colección personal de fotografías originales de la Luna, tomadas en diferentes noches, horarios y fases, desde Córdoba, Argentina. 
              El objetivo es compartir la belleza y diversidad de nuestro satélite natural, mostrando cómo cambia su aspecto a lo largo del tiempo.
            </p>
            <p>
              El sitio permite explorar la galería, buscar por fecha, fase lunar o palabra clave, y conocer detalles técnicos de cada captura.
            </p>
            <p style={{color:"#b0b3c6"}}>
              Proyecto realizado con React, diseño responsive y mucho entusiasmo por la astronomía y la fotografía.
            </p>
          </section>
        )}
        {section === "contacto" && (
          <section className="contacto" style={{maxWidth: 700, margin: "0 auto", padding: "2em 1em"}}>
            <h2>Contacto</h2>
            <p>
              ¿Tienes dudas, sugerencias o quieres compartir tu experiencia lunar?
              <br />
              Puedes escribirme a: <a href="mailto:tuemail@ejemplo.com" style={{color:"#4cafef"}}>tuemail@ejemplo.com</a>
            </p>
            <p>
              También puedes seguir el proyecto en Instagram: <a href="https://instagram.com/ffeli.leal" target="_blank" rel="noopener noreferrer" style={{color:"#4cafef"}}>@tuusuario</a>
            </p>
          </section>
        )}
        {section === "mapa" && (
          <PhotoMap photos={photos} />
        )}
        {section === "favoritos" && (
          <section>
            <h2 style={{textAlign: "center"}}>Tus fotos favoritas</h2>
            <Gallery
              photos={photos.filter(photo => favoritos.includes(photo.url))}
              favoritos={favoritos}
              toggleFavorito={toggleFavorito}
            />
            {favoritos.length === 0 && (
              <p style={{textAlign: "center", color: "#b0b3c6"}}>Aún no tienes fotos favoritas.</p>
            )}
          </section>
        )}
        {section === "estadisticas" && (
          <section style={{maxWidth: 700, margin: "0 auto", padding: "2em 1em"}}>
            <h2>Estadísticas</h2>
            <p><b>Total de fotos:</b> {totalFotos}</p>
            <h3>Por fase lunar</h3>
            <ul>
              {Object.entries(fotosPorFase).map(([fase, cantidad]) => (
                <li key={fase}>{fase}: {cantidad}</li>
              ))}
            </ul>
            <h3>Por año</h3>
            <ul>
              {Object.entries(fotosPorAnio).map(([anio, cantidad]) => (
                <li key={anio}>{anio}: {cantidad}</li>
              ))}
            </ul>
            <h3>Por mes</h3>
            <ul>
              {Object.entries(fotosPorMes).map(([mes, cantidad]) => (
                <li key={mes}>{mes}: {cantidad}</li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <footer>
        © {new Date().getFullYear()} Bitácora Lunar · Fotografías originales
        <div className="footer-links">
          <a href="mailto:felileal25@gmail.com" title="Email" target="_blank" rel="noopener noreferrer">✉️</a>
          <a href="https://instagram.com/ffeli.leal" title="Instagram" target="_blank" rel="noopener noreferrer">📷</a>
          <a href="https://twitter.com/felileal25" title="Twitter" target="_blank" rel="noopener noreferrer">🐦</a>
          {/* Agrega más enlaces si quieres */}
        </div>
      </footer>
    </div>
  );
}

export default App;