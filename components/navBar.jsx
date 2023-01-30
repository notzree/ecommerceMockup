import Cart from "./cart";
import { useStateContext } from "../context/StateContext";

export default function Navbar() {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/">Your E-commerce Store</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li tabIndex="0">
            <div className="tooltip tooltip-bottom" data-tip={totalQuantities}>
              <button className="" onClick={()=>setShowCart(true)}>Cart</button>
            </div>
          </li>
        </ul>
        {showCart && <Cart/>}
      </div>
      
    </div>
  );
}
