import Header from "../components/Header";

export default function App({ Component, pageProps }) {
  return (
    <div className="grid grid-rows-[auto,1fr] h-screen overflow-hidden">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
