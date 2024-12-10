import { useEffect, useState } from "react";
import { url } from "../config/config";

export default function Languages() {
	const [langues, setLangues] = useState([]);
	async function fetchLangues() {
		try {
			const response = await fetch(url + "langues");
			if (response.ok) {
				const data = await response.json();
				setLangues(data);
			}
		} catch (error) {
			console.log(error.message);
		}
	}
	useEffect(() => {
		fetchLangues();
	}, []);
	return (
		<div className=''>
			<h2 className=''>Langues</h2>
			{langues &&
				langues.map((item) => (
					<div
						className='Language'
						key={item._id}
					>
						<span className=' '>
							<strong>{item.name}</strong>: {item.level}
						</span>
					</div>
				))}
		</div>
	);
}
