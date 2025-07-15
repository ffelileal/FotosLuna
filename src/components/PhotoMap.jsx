import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Corrige el icono de los marcadores de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function PhotoMap({ photos }) {
  // Filtra solo las fotos con coordenadas
  const fotosConCoords = photos.filter(f => f.lat && f.lng);

  // Centra el mapa en la primera foto con coordenadas, o en Córdoba por defecto
  const center = fotosConCoords.length
    ? [fotosConCoords[0].lat, fotosConCoords[0].lng]
    : [-31.4167, -64.1833];

  return (
    <div style={{ width: "100%", maxWidth: 700, margin: "2em auto" }}>
      <h2 style={{ textAlign: "center" }}>Mapa de ubicaciones</h2>
      <MapContainer center={center} zoom={6} style={{ height: "350px", width: "100%", borderRadius: "12px" }}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {fotosConCoords.map((photo, idx) => (
          <Marker key={idx} position={[photo.lat, photo.lng]}>
            <Popup>
              <div style={{ maxWidth: 180 }}>
                <img src={photo.url} alt="" style={{ width: "100%", borderRadius: 6 }} />
                <div><b>{photo.fecha}</b></div>
                <div>{photo.lugar}</div>
                <div style={{ fontSize: "0.95em", color: "#888" }}>{photo.comentario}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default PhotoMap;