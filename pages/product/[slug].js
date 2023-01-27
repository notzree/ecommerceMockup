import ProductLibrary from "../../components/productLibrary";
import { urlFor } from "../../sanitylib/client";
import { client } from "../../sanitylib/client";

import { useStateContext } from "../../context/StateContext";
export async function getStaticProps({ params: { slug } }) {
  const queryP = '*[_type == "ProductLine"  && banner == false]'; //grab all products from sanity dashboard that are not the banner product
  const products = await client.fetch(queryP);

  const queryHighlight = `*[_type == "ProductLine"  && slug.current == '${slug}'][0]`; //grab all products from sanity dashboard that are not the banner product
  const productHighlight = await client.fetch(queryHighlight);

  return {
    props: {
      products: products,
      highlight: productHighlight,
    },
  };
}
export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
        slug{
            current
        }
    }`;

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: products.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

const ProductDetails = ({ products, highlight }) => {
  const { image, name, slug, price, details } = highlight;
  const {decQty,incQty, qty} = useStateContext();
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <div className="flex items-center justify-center">
        <div className="hero-content">
          <div className="flex">
            <img
              src={urlFor(image && image[0])}
              class="justify-center items-center"
            />
          </div>
          <div>
            <h2 className="text-5xl py-2">{name}</h2>
            <div className=" py-2 bg-stone-400  rounded-md  px-2">
              <pre>
                <code>{details}</code>
              </pre>
            </div>
            <div className="btn-group py-2">
            <button className="btn py-2  px-2 " onClick={decQty}>-</button>
            <p className=" btn btn-disabled px-2">{qty}</p>
            <button className="btn px-2"  onClick={incQty}>+</button>
          </div>
          </div>
        </div>

        <div></div>
      </div>
      <div className="flex justify-center items-center scale-50">
        {products.map((product) => (
          <ProductLibrary products={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};
export default ProductDetails;
