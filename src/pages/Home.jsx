import React from "react";
import Navbar from "../layout/Navbar";
import Activities from "../components/Activities";
import Contacts from "../components/Contacts";
import Experiences from "../components/Experiences";
import Languages from "../components/Languages";
import Skills from "../components/Skills";
import Trainings from "../components/Trainings";
import Footer from "../layout/Footer";

export default function Home() {
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
