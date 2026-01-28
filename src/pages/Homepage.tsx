import anubisImg from "../assets/img/anubisPNG.png";

export default function Homepage({ fonts }: { fonts: any }) {
  return (
    <>
      <h1
        className="text-4xl text-yellow-500 text-center p-20 font-noto"
        style={fonts.robotoSlab}
      >
        Welcome to the Anubis Website
      </h1>
      <p className="text-center text-lg">
        <img src={anubisImg} alt="Anubis Logo" className="m-auto mb-4" />
      </p>
    </>
  );
}
