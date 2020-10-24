import { useRef } from 'react';

const InputText = ({ label, append, prepend, onChange, value = '', ...rest }) => {
    const inputRef = useRef(null);

    const handleLabelClick = () => inputRef.current.focus();
    const handleChange = (e) => onChange && onChange(e.target.value);

    const renderInputGroupPart = (part, content) => (
        <div className={`input-group-${part}`}>
            <span className="input-group-text">{content}</span>
        </div>
    );

    const inputField = (
        <input 
            type="text" 
            className="form-control" 
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