import Head from 'next/head';

export const defaultFavicon = "/favicon.ico";

//Template for the head of the document adding title and favicon
const PageHead = ({ title, favicon = defaultFavicon }) => (
    <Head>
        <title>{title}</title>
        <link className="page-head__favicon" rel="icon" href={favicon} />
    </Head>
);

export default PageHead;