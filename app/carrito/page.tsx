"use client";

import { useCart } from "@/context/CartContext";

export default function Carrito() {

  const {
    items,
    removeItem,
  } = useCart();

  const total =
    items.reduce(
      (acc: number, item: any) =>
        acc +
        item.precio * item.cantidad,
      0
    );

  const mensaje =
    items
      .map(
        (i: any) =>
          `${i.nombre}
x${i.cantidad}
$${Number(i.precio).toLocaleString()}`
      )
      .join("\n\n");

  const whatsapp =
    `https://wa.me/549385XXXXXXX?text=` +
    encodeURIComponent(
      `🛒 Nuevo pedido

${mensaje}

TOTAL:
$${total.toLocaleString()}`
    );

  return (
    <main
      className="
      max-w-6xl
      mx-auto
      p-6"
    >
      <h1
        className="
        text-4xl
        font-bold
        mb-8"
      >
        Mi carrito
      </h1>

      {items.length === 0 ? (
        <div
          className="
          bg-white
          rounded-xl
          shadow
          p-8
          text-center"
        >
          Tu carrito está vacío
        </div>
      ) : (
        <>
          <div className="space-y-4">

            {items.map((item: any) => (

              <div
                key={item.id}
                className="
                bg-white
                rounded-xl
                p-4
                shadow
                flex
                justify-between
                items-center"
              >
                <div>

                  <h2
                    className="
                    font-semibold"
                  >
                    {item.nombre}
                  </h2>

                  <p
                    className="
                    text-gray-500"
                  >
                    Cantidad:
                    {" "}
                    {item.cantidad}
                  </p>

                </div>

                <div
                  className="
                  text-right"
                >
                  <p
                    className="
                    font-bold"
                  >
                    $
                    {(
                      item.precio *
                      item.cantidad
                    ).toLocaleString()}
                  </p>

                  <button
                    onClick={() =>
                      removeItem(
                        item.id
                      )
                    }
                    className="
                    text-red-600
                    hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </div>

            ))}

          </div>

          <div
            className="
            mt-8
            bg-white
            rounded-xl
            shadow
            p-6"
          >
            <h2
              className="
              text-3xl
              font-bold"
            >
              Total:
              $
              {total.toLocaleString()}
            </h2>

            <a
              href={whatsapp}
              target="_blank"
              className="
              mt-4
              inline-block
              bg-green-600
              hover:bg-green-700
              text-white
              px-8
              py-4
              rounded-xl"
            >
              Finalizar por WhatsApp
            </a>
          </div>
        </>
      )}

    </main>
  );
}