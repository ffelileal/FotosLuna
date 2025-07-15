import React from "react";
import { FiMapPin, FiCalendar, FiClock, FiMoon } from "react-icons/fi";
import "./Modal.css";

function Modal({ photos, currentIdx, onClose, onPrev, onNext }) {
  const photo = photos[currentIdx];

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-slideshow-controls">
          <button onClick={onPrev} disabled={currentIdx === 0}>&lt;</button>
          <img src={photo.url} alt={photo.comentario || "Foto de la luna"} />
          <button onClick={onNext} disabled={currentIdx === photos.length - 1}>&gt;</button>
        </div>
        <div className="modal-details">
          <div><FiCalendar /> <b>Fecha:</b> {photo.fecha}</div>
          <div><FiClock /> <b>Hora:</b> {photo.hora}</div>
          <div><FiMoon /> <b>Fase:</b> {photo.fase}</div>
          <div><FiMapPin /> <b>Lugar:</b> {photo.lugar}</div>
          {photo.comentario && <div className="comentario">“{photo.comentario}”</div>}
          {photo.camara && <div><b>Cámara:</b> {photo.camara}</div>}
          {photo.lente && <div><b>Lente:</b> {photo.lente}</div>}
          {photo.exposicion && <div><b>Exposición:</b> {photo.exposicion}</div>}
          {photo.apertura && <div><b>Apertura:</b> {photo.apertura}</div>}
          {photo.iso && <div><b>ISO:</b> {photo.iso}</div>}
          {photo.resolucion && <div><b>Resolución:</b> {photo.resolucion}</div>}
        </div>
        <div className="modal-share">
          <span>Compartir:</span>
          <a
            href={`https://wa.me/?text=Mirá esta foto de la luna: ${window.location.origin}${photo.url}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Compartir en WhatsApp"
          >🟢</a>
          <a
            href={`https://twitter.com/intent/tweet?url=${window.location.origin}${photo.url}&text=Mirá esta foto de la luna`}
            target="_blank"
            rel="noopener noreferrer"
            title="Compartir en Twitter"
          >🐦</a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.origin}${photo.url}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Compartir en Facebook"
          >📘</a>
        </div>
        <a
          href={photo.url}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="btn-descargar"
        >
          Descargar imagen
        </a>
      </div>
    </div>
  );
}

export default Modal;