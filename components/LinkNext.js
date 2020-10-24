import Link from 'next/link';

const LinkNext = ({ children, href, ...rest }) => (
  <Link href={href}>
    <a {...rest}>
      {children}
    </a>
  </Link>
);

export default LinkNext;