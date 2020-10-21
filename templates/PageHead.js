import Head from 'next/head'

export default ({ title, favicon = "/favicon.ico" }) => (
    <Head>
        <title>{title}</title>
        <link rel="icon" href={favicon} />
    </Head>
)
