import Cart from "./cart";
import { useStateContext } from "../context/StateContext";

export default function Navbar() {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div class="navbar bg-base-200">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl">Your E-commerce Store</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li>
            <a>Shop</a>
          </li>
          <li tabindex="0">
            <div class="tooltip tooltip-bottom" data-tip={totalQuantities}>
              <button class="" onClick={()=>setShowCart(true)}>Cart</button>
            </div>
          </li>
        </ul>
        {showCart && <Cart/>}
      </div>
      
    </div>
  );
}
