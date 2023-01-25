import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'
export const client = sanityClient({
projectId: 'bqq65ey9',
dataset: 'production2',
apiVersion: '2023-01-24',
useCdn: true,
token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source)=> builder.image(source);