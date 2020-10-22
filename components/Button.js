const Button = ({ submit, color = "primary", children }) => (
    <button 
        type={(submit) ? "submit" : "button"} 
        className={`btn btn-${color}`}
    >
        {children}
    </button>
);

export default Button;