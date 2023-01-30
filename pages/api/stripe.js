import Stripe from 'stripe';


const stripe =new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Create Checkout Sessions from body params.
 
        const params = {
            submit_type : 'pay',
            mode: 'payment',
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {shipping_rate: 'shr_1MW60CKIUZ1MFolO49ZxrHk5'},
                {shipping_rate: 'shr_1MW60ZKIUZ1MFolOSXkcLtZE'}
            ],
            line_items: req.body.map((item)=>{
                const img = item.image[0].asset._ref;
                const newImage = img.replace('image-', 'https://cdn.sanity.io./images/bqq65ey9/production2/').replace('-png','.png').replace('-jpg','.jpg') // change this depending on img file type.
                return{
                    price_data:{
                        currency: 'cad',
                        product_data:{
                            name: item.name,
                            images: [newImage],

                        },
                        unit_amount: item.price * 100,
                        tax_behavior: "inclusive",
                    },
                   
                    adjustable_quantity:{
                        enabled:true,
                        minimum:1,

                    },
                    quantity: item.quantity,
                }
            }),
            success_url: `${req.headers.origin}/?success=true`,
            cancel_url: `${req.headers.origin}/?canceled=true`,
            automatic_tax: {enabled: true},
          }

      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
   //   res.redirect(303, session.url);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}