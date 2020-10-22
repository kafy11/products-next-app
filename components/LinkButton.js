const LinkButton = ({ children, title, href }) => (
    <a 
      role="button" 
      className="btn btn-link float-right" 
      title={title}
      href={href}
    >
      {children}
    </a>
);

export default LinkButton;