import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
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
                <a>
                  Cart
                  <svg
                    class="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </a>
                <ul class="p-2 bg-base-100">
                  <li>
                    <a>Temporary item 1</a>
                  </li>
                  <li>
                    <a>Temporary item 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Contact us</a>
              </li>
            </ul>
          </div>
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
