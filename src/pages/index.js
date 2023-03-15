import SaleWidget from "@/components/SaleWidget";

export default function Home() {

  return (
    <>
      <h1 className="font-comfortaa_reg text-5xl uppercase pb-4 text-center">Presale</h1>
      <h3 className="font-lato_reg text-xl uppercase pb-6 text-center">Get your bread fresh out of the oven</h3>
      <div className="w-full flex justify-center px-4 sm:px-0">
        <SaleWidget />
      </div>
    </>
  );
}
