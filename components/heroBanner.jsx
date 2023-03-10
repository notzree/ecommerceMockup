import { urlFor } from "../sanitylib/client";

export default function HeroBanner({BannerProduct:{image,name,slug,price}}){

    
    return (
        
        <div className="hero-content flex-col lg:flex-row bg-base-300">
          <img src={urlFor(image && image[0])} className="max-w-sm rounded-lg shadow-2xl" />
          <div>
            <h1 className="text-5xl font-bold">Big Text</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">Buy now</button>
          </div>
        </div>
      

    )
}