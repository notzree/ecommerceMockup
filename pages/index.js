import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import { client } from '../sanitylib/client';
import ProductLibrary from '../components/productLibrary';
import HeroBanner from '../components/heroBanner';

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps(){
  const queryP ='*[_type == "ProductLine"  && banner == false]'; //grab all products from sanity dashboard that are not the banner product
  const products = await client.fetch(queryP);
  const queryB = '*[_type =="ProductLine" && banner == true]'
  const banner = await client.fetch(queryB);
 return {
  props:{
    products:products,
    banner:banner[0]
  }
 }
}
export default function Home({products , banner}) {
  console.log(products);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
      <div className="min-h-screen bg-base-200">
        <div className="flex justify-center items-center min-w-full h-96 bg-base-300">
          <HeroBanner BannerProduct = {banner}/>
        </div>
        <div className='flex justify-center items-center py-2'>
          <h2 className='text-lg font-bold'>
            Product Title
        </h2>
        </div>
        <div className="flex  justify-center items-center">
        {
                products?.map((product)=>(
                <div>
              <ProductLibrary products={product} key ={product._id}/>
                </div>
                ))
            }
        </div>
      </div>
    </main>
    </>
  )
}
