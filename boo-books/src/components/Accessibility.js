import React, { useState } from "react";

// Este componente se llama "Accessibility" y maneja opciones de accesibilidad para la página.
const Accessibility = () => {
    // Aquí estamos creando tres "estados" para las opciones de accesibilidad.
    // `highContrast` es para activar o desactivar el filtro de alto contraste.
    // `fontChange` es para activar o desactivar el cambio de tipografía.
    // `readerMode` es para activar o desactivar el modo de lectura.
    const [highContrast, setHighContrast] = useState(false);
    const [fontChange, setFontChange] = useState(false);
    const [readerMode, setReaderMode] = useState(false);

    return (
        <div>
            <h3>Opciones de Accesibilidad</h3>
            
            {/* Opción para activar el filtro de alto contraste */}
            <div>
                {/* Este checkbox marca o desmarca si el filtro de alto contraste está activado */}
                <input type="checkbox" checked={highContrast} onChange={() => setHighContrast(!highContrast)} />
                <label>Filtro de alto contraste</label>
            </div>

            {/* Opción para activar el cambio de tipografía */}
            <div>
                {/* Este checkbox marca o desmarca si la tipografía va a cambiar */}
                <input type="checkbox" checked={fontChange} onChange={() => setFontChange(!fontChange)} />
                <label>Cambio de tipografía</label>
            </div>

            {/* Opción para activar el modo lector */}
            <div>
                {/* Este checkbox marca o desmarca si el modo lector está activado */}
                <input type="checkbox" checked={readerMode} onChange={() => setReaderMode(!readerMode)} />
                <label>Reader Mode on/off</label>
            </div>
        </div>
    );
};

export default Accessibility;
