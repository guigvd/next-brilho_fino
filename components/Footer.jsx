
const Footer = () => {
  
  return (
    <div className="bg-slate-200 py-10 border-t">
      <div className="w-5/6 mx-auto text-center md:text-left flex flex-col md:flex-row justify-between">
        <div>
          <h1 className="text-xl text-purple-800">Brilho Fino</h1>
          <p>Sua beleza merece o Brilho Fino das nossas joias!</p>
        </div>

        <div className="mt-4 md:mt-0">
          <p className="font-bold">Contact Us</p>
          <a href="https://www.linkedin.com/in/guigvd/" target="_blank">@GUIGVD</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
