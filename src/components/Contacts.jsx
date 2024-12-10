import { useEffect, useState } from "react";
import { url } from "../config/config";
import Profile from "./Profile";

export default function Contacts() {
	const initialObject = {
		tel: "",
		email: "",
		adress: "",
		lastname: "",
		firstname: "",
		status: "",
	};
	const [contacts, setContacts] = useState(initialObject);
	// GET DATA
	async function fetchContact() {
		try {
			const response = await fetch(url + "contact");
			if (response.ok) {
				const data = await response.json();
				setContacts(data[0] || initialObject);
			}
		} catch (error) {
			console.log(error.message);
		}
	}
	useEffect(() => {
		fetchContact();
	}, []);
	return (
		<div className='AdminContacts'>
			<Profile
				lastname={contacts.lastname}
				firstname={contacts.firstname}
			/>
			<p>
				<span>Tel : </span>
				{contacts.tel}
			</p>
			<p>
				<span>Email : </span>
				{contacts.email}
			</p>
			<p>
				<span>Adress : </span>
				{contacts.adress}
			</p>
			<p>{contacts.status}</p>
		</div>
	);
}
