import { useEffect } from "react";
import AppRouter from "./routes/AuthRouter";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import './styles/global.css'

function App() {
//   useEffect(() => {
//   fetch(import.meta.env.VITE_API_URL)
//     .catch(() => {});
// }, []);
useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}/api/news/public`)
    .catch(() => {});
}, []);
  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
