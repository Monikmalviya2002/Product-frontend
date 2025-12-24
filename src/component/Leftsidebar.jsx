import logo from "../assets/logo.png"


export default function Leftsidebar({ activePage, setActivePage }) {
  const itemClass = (page) =>
    `cursor-pointer text-sm px-2 py-1 rounded
     ${activePage === page
       ? "text-white font-medium bg-gray-800"
       : "text-gray-400 hover:text-white"}`;

  return (
    <aside className="w-60 bg-gray-800 text-gray-300 p-4">
      <div className="flex">
           <img  src={logo} alt="logo" className="w-25 h-25 object-contain"/>
         </div>

      <nav className="space-y-2">
        <p
          className={itemClass("home")}
          onClick={() => setActivePage("home")}
        >
          Home
        </p>

        <p
          className={itemClass("products")}
          onClick={() => setActivePage("products")}
        >
          Products
        </p>
      </nav>
    </aside>
  );
}
