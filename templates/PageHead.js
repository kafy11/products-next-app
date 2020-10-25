import Head from 'next/head';

//Template for the head of the document adding title and favicon
const PageHead = ({ title, favicon = "/favicon.ico" }) => (
    <Head>
        <title>{title}</title>
        <link rel="icon" href={favicon} />
    </Head>
);

export default PageHead;