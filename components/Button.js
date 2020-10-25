//bootstrap button
const Button = ({ submit, color = "primary", children, className, ...rest }) => (
    <button 
        type={(submit) ? "submit" : "button"} 
        className={`btn btn-${color} ${className}`}
        {...rest}
    >
        {children}
    </button>
);

export default Button;