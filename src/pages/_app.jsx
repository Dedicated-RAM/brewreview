import "../styles/globals.css";
import Header from "@/components/Header";

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="grid grid-rows-[auto,1fr] h-screen overflow-hidden">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
