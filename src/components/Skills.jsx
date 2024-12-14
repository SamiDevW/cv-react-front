import { useEffect, useState } from "react";
import { url } from "../config/config";

export default function Skills() {
	const [skills, setSkills] = useState("");
	async function fetchSkills() {
		try {
			const response = await fetch(url + "skill");
			if (response.ok) {
				const data = await response.json();
				setSkills(data);
			}
		} catch (error) {
			console.error(error.message);
		}
	}
	useEffect(() => {
		fetchSkills();
	}, []);
	return (
		<div className='Skills'>
			<h2>Compétences</h2>
			{skills &&
				skills.map((item) => (
					<div
						className='Skill'
						key={item._id}
					>
						<span>{item.skill} </span>
					</div>
				))}
		</div>
	);
}
