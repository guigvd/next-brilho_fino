import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Success = () => {
  return (
    <div className="flex flex-col justify-between items-center min-h-screen">
      <Navbar />
      <div className="w-5/6 flex-1 flex flex-col justify-center items-center gap-5 py-24">
        <h2 className="text-lg font-bold">Pedido Finalizado</h2>
        <p>Obrigado por sua compra! Seu pedido foi concluído com sucesso.</p>
        <p>Agradecemos por escolher nossa loja. Volte sempre!</p>
      </div>
      <Footer />
    </div>
  );
};

export default Success;
