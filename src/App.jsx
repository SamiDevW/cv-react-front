import { BrowserRouter, Route, Routes } from "react-router";
import { SnackbarProvider } from "notistack";
import Admin from "./pages/Admin";
import "./css/custom.css";
import "./App.css";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/home";

function App() {
	return (
		<SnackbarProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<Home />}
					></Route>
					<Route
						path='/admin'
						element={<Admin />}
					></Route>

					<Route
						path='*'
						element={<ErrorPage />}
					></Route>
				</Routes>
			</BrowserRouter>
		</SnackbarProvider>
	);
}

export default App;
