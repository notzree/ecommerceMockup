import Link from "next/link";
import {
  AiOutlineLeft,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";

import { useStateContext } from "../context/StateContext";
import { urlFor } from "../sanitylib/client";
import { useRef } from "react";
import getStripe from "../sanitylib/loadStripeCheckout";
import { toast } from "react-hot-toast";
export default function Cart() {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    decQty,
    incQty,
    qty,
    deleteProduct,
    toggleCartItemQuantity,
  } = useStateContext();

  const handleCheckout = async ()=>{
    const stripe = await getStripe();
    const response = await fetch('/api/stripe', {
     method: 'POST',
     headers: {
        'Content-Type': 'application/json',
     },
     body: JSON.stringify(cartItems),


    });
    if (response.statuscode === 500) return;

    const data = await response.json();
    toast.loading('Redirecting...');
    stripe.redirectToCheckout({sessionId: data.id});

  }



  return (
    <div
      className="w-96 bg-base-100 h-screen float-right fixed top-0 right-0"
      ref={cartRef}
    >
      <div className="">
        <button className=" ml-2 btn" onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span>Your Cart</span>{" "}
          <span className=" text-red-400">
            {" "}
            &nbsp;({totalQuantities} items)
          </span>
        </button>
        {cartItems.length < 1 && (
          <div className=" flex flex-col justify-center items-center">
            <AiOutlineShopping size={100} />
            <h3>Your shopping bag is empty</h3>
            <button
              onClick={() => setShowCart(false)}
              className="btn btn-secondary  my-2"
            >
              Continue Shopping
            </button>
          </div>
        )}
        <div>
          {cartItems.length >= 1 &&
            cartItems.map((item) => {
              return (
                <div className="flex  my-2" key={item?._id}>
                  <div className="w-40 m-4">
                    <img
                      src={urlFor(item?.image[0])}
                      className="mask mask-squircle"
                    />
                  </div>
                  <div className="">
                    <h5>{item?.name}</h5>
                    <h4>${item?.price}</h4>
                  </div>
                  <div className="flex flex-col m-3 justify-evenly items-center">
                    <div className="btn-group py-2">
                      <button
                        className="btn btn-xs py-2  px-2 "
                        onClick={() => toggleCartItemQuantity(item?._id, "dec")}
                      >
                        -
                      </button>
                      <p className=" btn btn-disabled btn-xs px-2 text-black">
                        {item?.quantity}
                      </p>
                      <button
                        className="btn btn-xs px-2"
                        onClick={() => toggleCartItemQuantity(item?._id, "inc")}
                      >
                        +
                      </button>
                    </div>
                    <div className="ml-10 items-end ">
                      <button
                        className="btn btn-sm"
                        onClick={() => deleteProduct(item)}
                      >
                        <TiDeleteOutline />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {cartItems.length >= 1 && (
          <div>
            <div>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="flex items-center justify-center">
              <button className="btn btn-info" onClick={handleCheckout}>Checkout with Stripe</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
