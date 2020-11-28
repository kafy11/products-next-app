import Link from 'next/link';

//Generates a link that redirects on the client-side
const LinkNext = ({ children, href, ...rest }) => (
  <Link href={href}>
    <a {...rest}>
      {children}
    </a>
  </Link>
);

export default LinkNext;