import { useEffect, useState } from "react";
import { url } from "../config/config";
export default function Trainings() {
	const [trainings, setTrainings] = useState([]);
	async function fetchTrainings() {
		try {
			const response = await fetch(url + "training");
			if (response.ok) {
				const data = await response.json();
				setTrainings(data);
			}
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		fetchTrainings();
	}, []);
	return (
		<div>
			<h2>Formations</h2>
			{trainings &&
				trainings.toReversed().map((x) => (
					<div
						key={x._id}
						className='Training'
					>
						<div>
							<span>Année: </span>
							<span>{x.year}</span>
						</div>
						<div>
							<span>Etablissement: </span>
							<span>{x.establishment}</span>
						</div>
						<div>
							<span>Diplome: </span>
							<span>{x.degree}</span>
						</div>
					</div>
				))}
		</div>
	);
}
