import { urlFor } from "../../sanitylib/client"
import { client } from "../../sanitylib/client";
export async function getStaticProps({ params: {slug}}){
    const queryP ='*[_type == "ProductLine"  && banner == false]'; //grab all products from sanity dashboard that are not the banner product
    const products = await client.fetch(queryP);

    const queryHighlight = `*[_type == "ProductLine"  && slug.current == '${slug}'][0]` //grab all products from sanity dashboard that are not the banner product
    const productHighlight = await client.fetch(queryHighlight);

   return {
    props:{
      products:products,
      highlight: productHighlight
    }
   }
  }
  export const getStaticPaths = async ()=>{
    const query = `*[_type == "product"]{
        slug{
            current
        }
    }`

    const products = await client.fetch(query);
    const paths = products.map((product)=>({
        params: {
            slug: products.slug.current
        }
    }));
    return {
        paths,
        fallback: 'blocking'
    }
  }



const ProductDetails = ({products,highlight}) =>{
    const {image,name,slug,price} = highlight;
    
    return(
        <div className="min-h-screen bg-base-200 flex flex-col">
            <div className="artboard phone-1">
            <img src={urlFor(image && image[0])} class="" />
            </div>
            
        </div>

    )


}
export default ProductDetails