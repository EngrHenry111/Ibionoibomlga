import AppRouter from "./routes/AuthRouter";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import './styles/global.css'

function App() {
  return (
    <>
      <Header />
      <AppRouter />
      <Footer />
    </>
  );
}

export default App;
