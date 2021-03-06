import { useRef } from 'react';

//Componet used to create the form fields
const InputText = ({ label, append, prepend, onChange, value = '', className, ...rest }) => {
    //ref to copy the label click for the input
    const inputRef = useRef(null);
    const handleLabelClick = () => inputRef.current.focus();

    //gets the value of the field
    const handleChange = (e) => onChange && onChange(e.target.value);

    const renderInputGroupPart = (part, content) => (
        <div className={`input-group-${part}`}>
            <span className="input-group-text">{content}</span>
        </div>
    );

    const inputField = (
        <input 
            type="text" 
            className={`form-control ${className}`}
            ref={inputRef}
            onChange={handleChange}
            value={value}
            {...rest}
        />
    );

    if(!append && !prepend){
        return (
            <div className="form-group">
                <label onClick={handleLabelClick}>{label}</label>
                {inputField}
            </div>      
        );
    }
    
    return (
        <div className="form-group">
            <label onClick={handleLabelClick}>{label}</label>
            <div className="input-group mb-3">
                {renderInputGroupPart('prepend', prepend)}
                {inputField}
                {renderInputGroupPart('append', append)}
            </div>
        </div>
    )
}

export default InputText;