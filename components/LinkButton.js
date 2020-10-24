import LinkNext from './LinkNext';

const LinkButton = ({ children, title, href, className }) => (
  <LinkNext 
    href={href}
    role="button"
    className={`btn btn-link ${className}`} 
    title={title}
  >
    {children}
  </LinkNext>
);

export default LinkButton;