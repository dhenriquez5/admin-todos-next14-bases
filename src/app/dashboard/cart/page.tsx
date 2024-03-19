import { ItemCard } from "@/products/components/ItemCard";
import { Product, products } from "@/products/data/products";
import { cookies } from "next/headers";
import { WidgetItem } from "../../../components/WidgetItem";

export const metadata = {
  title: "Carrito de comprast",
  description: "Carrito de comprast",
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }) => {
  const productsInCart: ProductInCart[] = [];
  for (const id of Object.keys(cart)) {
    const product = products.find((p) => p.id === id);
    if (product) {
      productsInCart.push({ product: product, quantity: cart[id] });
    }
  }
  return productsInCart;
};

export default function CartPage() {
  const cookieStore = cookies();
  const cookieCart = JSON.parse(cookieStore.get("cart")?.value ?? "{}");
  const productsInCart = getProductsInCart(cookieCart);

  const totalToPay = productsInCart.reduce(
    (prev, current) => current.product.price * current.quantity + prev,
    0
  );
  return (
    <div>
      <h1 className="text-3xl">Productos en el Carrito</h1>
      <hr className="mb-2" />
      <div className="flex flex-col sm:flex-row gap-2 w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map((product) => (
            <ItemCard
              key={product.product.id}
              product={product.product}
              quantity={product.quantity}
            />
          ))}
        </div>
        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title={"Total a pagar"}>
            <div className="flex justify-center gap-4 mt-2">
              <h3 className="text-3xl font-bold text-gray-700">
                Total: ${totalToPay.toFixed(2)}
              </h3>
            </div>
            <span className="text-center text-gray-500">
              {" "}
              Impuestos 19%: $ {(totalToPay * 0.19).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
}
