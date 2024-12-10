import { useEffect, useState } from "react";
import { url } from "../config/config";
export default function Activities() {
	const [activities, setActivities] = useState([]);
	async function fetchInterets() {
		try {
			const response = await fetch(url + "interets");
			if (response.ok) {
				const data = await response.json();
				setActivities(data);
			}
		} catch (error) {
			console.log(error.message);
		}
	}
	useEffect(() => {
		fetchInterets();
	}, []);
	return (
		<>
			<h2 className=''>Activities</h2>
			{activities &&
				activities.map((item) => (
					<div
						key={item._id}
						className='Activity'
					>
						<span>{item.activity} </span>
					</div>
				))}
		</>
	);
}
