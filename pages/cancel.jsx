import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Success = () => {
  return (
    <div className="flex flex-col justify-between items-center min-h-screen">
      <Navbar />
      <div className="w-5/6 flex-1 flex flex-col justify-center items-center gap-5 py-24">
        <h2 className="text-lg font-bold">Pedido Cancelado</h2>
        <p>Lamentamos informar que o seu pedido foi cancelado.</p>
        <p>
          Caso tenha alguma dúvida ou precise de assistência, por favor, entre
          em contato conosco.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Success;
