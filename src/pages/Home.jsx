import React, { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import Activities from "../components/Activities";
import Contacts from "../components/Contacts";
import Experiences from "../components/Experiences";
import Languages from "../components/Languages";
import Skills from "../components/Skills";
import Trainings from "../components/Trainings";
import Footer from "../layout/Footer";
import LoadingScreen from "./LoadingScreen";
import { url } from "../config/config";

export default function Home() {
	const [isLoading, setIsloading] = useState(true);
	async function fetchContact() {
		try {
			const response = await fetch(url + "contact");
			if (response.ok) {
				setIsloading(false);
			}
		} catch (error) {
			console.log(error.message);
		}
	}
	useEffect(() => {
		fetchContact();
	}, []);
	if (isLoading) {
		return <LoadingScreen />;
	} else {
		return (
			<>
				<Navbar />
				<main className='Admin'>
					<Contacts />
					<section className='AdminPrimary'>
						<Trainings />
						<Experiences />
					</section>
					<section className='AdminSecondary'>
						<Skills />
						<Languages />
						<Activities />
					</section>
				</main>
				<Footer />
			</>
		);
	}
}
