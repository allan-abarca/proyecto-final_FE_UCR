import React, {useState} from "react";

const Accessibility = ()=>{
    const [highContrast, setHighContrast] = useState(false);
    const [fontChange, setFontChange] = useState(false);
    const [readerMode, setReaderMode] = useState(false);

    return(
        <div>
            <h3>Opciones de Accesibilidad</h3>
            <div>
                <input type="checkbox" checked={highContrast} onChange={()=> setHighContrast(!highContrast)}/>
                <label>Filtro de alto contraste</label>
            </div>
            <div>
                <input type="checkbox" checked={fontChange} onChange={()=> setFontChange(!fontChange)}/>
                <label>Cambio de tipografía</label>
            </div>
            <div>
                <input type="checkbox" checked={readerMode} onChange={()=> setReaderMode(!readerMode)}/>
                <label>Reader Mode on/off</label>
            </div>
        </div>
    );
};

export default Accessibility;