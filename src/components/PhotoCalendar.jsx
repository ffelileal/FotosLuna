import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import './PhotoCalendar.css';

function PhotoCalendar({ photos, onSelectDate, selectedDate, onClearDate }) {
  // Normaliza fechas a formato YYYY-MM-DD
  const photoDates = photos.map(p => {
    const f = p.fecha.includes('-') ? p.fecha : p.fecha.split('/').reverse().join('-');
    return f;
  });

  function tileClassName({ date, view }) {
    if (view === 'month') {
      const d = date.toISOString().slice(0, 10);
      if (photoDates.includes(d)) {
        if (selectedDate === d) return 'photo-day selected-photo-day';
        return 'photo-day';
      }
      if (selectedDate === d) return 'selected-photo-day';
    }
    return null;
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h3>Calendario lunar</h3>
        <span className="calendar-desc">
          Haz clic en un día resaltado para ver las fotos tomadas esa fecha.
        </span>
        {selectedDate && (
          <button className="btn limpiar-fecha" onClick={onClearDate}>
            Limpiar selección
          </button>
        )}
      </div>
      <Calendar
        onClickDay={date => {
          const d = date.toISOString().slice(0, 10);
          onSelectDate(d);
        }}
        tileClassName={tileClassName}
        value={selectedDate ? new Date(selectedDate) : null}
      />
    </div>
  );
}

export default PhotoCalendar;