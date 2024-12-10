import { useState } from "react";
import AdminActivities from "../admin/AdminActivities";
import AdminContact from "../admin/AdminContacts";
import AdminExperience from "../admin/AdminExperience";
import AdminLanguages from "../admin/AdminLanguages";
import AdminSkills from "../admin/AdminSkills";
import AdminTrainings from "../admin/AdminTrainings";
import Navbar from "../layout/Navbar";
import Login from "./Login";
import { enqueueSnackbar } from "notistack";
import { url, successSnackbar, warningSnackbar } from "../config/config";
import Footer from "../layout/Footer";
export default function Admin() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(url + "login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});
			if (response.ok) {
				const data = await response.json();
				setIsLoggedIn(data.isLoggedIn);
				enqueueSnackbar(data.message, successSnackbar);
			}
		} catch (error) {
			console.log(error.message);
		}
	};

	if (!isLoggedIn) {
		return (
			<Login
				username={username}
				password={password}
				setUsername={(e) => setUsername(e.target.value)}
				setPassword={(e) => setPassword(e.target.value)}
				handleSubmit={handleSubmit}
			/>
		);
	}
	return (
		<>
			<Navbar />
			<main className='Admin'>
				<AdminContact />
				<section className='AdminPrimary'>
					<AdminTrainings />
					<AdminExperience />
				</section>
				<section className='AdminSecondary'>
					<AdminSkills />
					<AdminLanguages />
					<AdminActivities />
				</section>
			</main>
			<Footer />
		</>
	);
}
