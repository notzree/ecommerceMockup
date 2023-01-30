import Link from "next/link";
import { urlFor } from "../sanitylib/client";
import Image from "next/image";
export default function ProductLibrary({
  products: { image, name, slug, price },
}) {
  
  return (
    <div className=" card px-2 py-2">
      <Link href={`/product/${slug.current}`}>
        <figure>
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            alt="Product image"
          />
        </figure>
        <div className="card-body">
          <p className=" card-title">{name}</p>

          <p className="text-sm">${price}</p>

        </div>
      </Link>
    </div>
  );
}
