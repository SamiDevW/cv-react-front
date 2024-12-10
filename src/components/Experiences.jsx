import { useEffect, useState } from "react";
import { url } from "../config/config";
export default function Experiences() {
	const [experiences, setExperiences] = useState([]);
	async function fetchExperiences() {
		try {
			const response = await fetch(url + "experience");
			if (response.ok) {
				const data = await response.json();
				setExperiences(data);
			}
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		fetchExperiences();
	}, []);
	return (
		<div>
			<h2 className=''>Experiences profesionelles</h2>
			{experiences &&
				experiences.map((x) => (
					<div
						key={x._id}
						className='Exp'
					>
						<div>
							<span>Année: </span>
							<span>{x.year}</span>
						</div>
						<div>
							<span>Entreprise: </span>
							<span>{x.company}</span>
						</div>
						<div>
							<span>Mission: </span>
							<span>{x.mission}</span>
						</div>
					</div>
				))}
		</div>
	);
}
