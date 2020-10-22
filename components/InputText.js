import { useRef } from 'react';

const InputText = ({ label, append, prepend, ...rest }) => {
    const inputRef = useRef(null);

    const handleLabelClick = () => inputRef.current.focus();
    const renderInputGroupPart = (part, content) => (
        <div className={`input-group-${part}`}>
            <span className="input-group-text">{content}</span>
        </div>
    );

    if(!append && !prepend){
        return (
            <div className="form-group">
                <label onClick={handleLabelClick}>{label}</label>
                <input 
                    type="text" 
                    className="form-control" 
                    ref={inputRef}
                    {...rest}
                />
            </div>      
        );
    }
    
    return (
        <div className="form-group">
            <label onClick={handleLabelClick}>{label}</label>
            <div className="input-group mb-3">
                {renderInputGroupPart('prepend', prepend)}
                <input 
                    type="text" 
                    className="form-control" 
                    ref={inputRef}
                    {...rest}
                />
                {renderInputGroupPart('append', append)}
            </div>
        </div>
    )
}

export default InputText;