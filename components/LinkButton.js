import LinkNext from './LinkNext';

//A bootstrap link button
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