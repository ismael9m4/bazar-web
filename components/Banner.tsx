export default function Banner() {
  return (
    <div
      className="
      rounded-2xl
      overflow-hidden
      bg-gradient-to-r
      from-blue-600
      to-cyan-500
      text-white
      p-10
      my-8"
    >
      <h1
        className="
        text-5xl
        font-bold"
      >
        Ofertas de la semana
      </h1>

      <p
        className="
        text-xl
        mt-4"
      >
        Termos, mates y cocina
        hasta 30% OFF
      </p>
    </div>
  );
}