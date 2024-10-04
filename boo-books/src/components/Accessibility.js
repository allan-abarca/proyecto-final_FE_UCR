import React, { useState } from "react"; 
import './Accessibility.css'; 

const Accessibility = () => { 
    // Estados para las tres opciones de accesibilidad: alto contraste, cambio de tipografía y modo lector
    const [highContrast, setHighContrast] = useState(false);
    const [fontChange, setFontChange] = useState(false);
    const [readerMode, setReaderMode] = useState(false);

    return (
        <div className="accessibility-container">
            <div className="accessibility-header">
                Opciones de Accesibilidad
            </div>
            
            <div className="accessibility-options">
                {/* Checkbox para activar/desactivar el alto contraste */}
                <div>
                    <input type="checkbox" 
                        checked={highContrast} 
                        onChange={() => setHighContrast(!highContrast)} 
                    />
                    <label>Filtro de alto contraste</label>
                </div>

                {/* Checkbox para cambiar la tipografía */}
                <div>
                    <input type="checkbox" 
                        checked={fontChange} 
                        onChange={() => setFontChange(!fontChange)} 
                    />
                    <label>Cambio de tipografía</label>
                </div>

                {/* Checkbox para activar/desactivar el modo lector */}
                <div>
                    <input type="checkbox" 
                        checked={readerMode} 
                        onChange={() => setReaderMode(!readerMode)} 
                    />
                    <label>Reader Mode on/off</label>
                </div>
            </div>
        </div>
    );
};

export default Accessibility;
