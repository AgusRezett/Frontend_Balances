import React /* , { useState } */ from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Rutas de Páginas
import Home from "./pages/Home";

//Componenetes
/* import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; */

//Estilos
import "./css/home.css";

export default function App() {
	// Estado para renderizar o no la barra de navegación y el footer
	/* const [renderFooNav, setRenderFooNav] = useState(true); */

	return (
		<Router basename="/Balances">
			<Link to="/contacto">contacto</Link>
			<Link to="/">home</Link>
			{/* <Navbar /> */}
			<Switch>
				{/* <Route path="/contacto" component={Contacto} />
				<Route path="/faq" component={Faq} /> */}
				<Route path="/" exact component={Home} />
			</Switch>
			{/* <Footer /> */}
		</Router>
	);
}
