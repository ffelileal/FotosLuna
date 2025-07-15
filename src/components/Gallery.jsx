import React, { useState } from "react";
import Modal from "./Modal";
import "./Gallery.css";
import { motion } from "framer-motion"; // ✅ NUEVO

const FOTOS_POR_PAGINA = 20;

function Gallery({ photos, favoritos = [], toggleFavorito = () => {} }) {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [pagina, setPagina] = useState(1);

  const totalPaginas = Math.ceil(photos.length / FOTOS_POR_PAGINA);
  const fotosPagina = photos.slice(
    (pagina - 1) * FOTOS_POR_PAGINA,
    pagina * FOTOS_POR_PAGINA
  );

  const openModal = idx => setSelectedIdx(idx);
  const closeModal = () => setSelectedIdx(null);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="gallery-title">Galería Lunar</h2>
      <div className="gallery-grid">
        {fotosPagina.map((photo, idx) => (
          <div
            key={idx}
            className="gallery-item"
            onClick={() => openModal(idx)}
          >
            <button
              className={`fav-btn${favoritos.includes(photo.url) ? " fav" : ""}`}
              onClick={e => {
                e.stopPropagation();
                toggleFavorito(photo.url);
              }}
              title={favoritos.includes(photo.url) ? "Quitar de favoritos" : "Agregar a favoritos"}
            >
              {favoritos.includes(photo.url) ? "★" : "☆"}
            </button>
            <div className="img-wrapper">
              <img
                src={photo.url}
                alt={photo.comentario || "Foto de la luna"}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  background: "#181a20"
                }}
              />
            </div>
            <div className="gallery-info">
              <span>{photo.fecha}</span>
              <span>{photo.fase}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedIdx !== null && (
        <Modal
          photos={fotosPagina}
          currentIdx={selectedIdx}
          onClose={closeModal}
          onPrev={() => setSelectedIdx(i => (i > 0 ? i - 1 : i))}
          onNext={() => setSelectedIdx(i => (i < fotosPagina.length - 1 ? i + 1 : i))}
        />
      )}

      {totalPaginas > 1 && (
        <div className="paginacion">
          <button
            className="btn"
            onClick={() => setPagina(p => Math.max(1, p - 1))}
            disabled={pagina === 1}
          >
            Anterior
          </button>
          <span>
            Página {pagina} de {totalPaginas}
          </span>
          <button
            className="btn"
            onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
            disabled={pagina === totalPaginas}
          >
            Siguiente
          </button>
        </div>
      )}
    </motion.section>
  );
}

export default Gallery;
