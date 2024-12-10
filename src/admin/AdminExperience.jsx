import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdCancel, MdDelete } from "react-icons/md";
import { PiFloppyDiskBackBold } from "react-icons/pi";
import { url, successSnackbar, warningSnackbar } from "../config/config";
import { enqueueSnackbar } from "notistack";
export default function AdminExperience() {
	const [experiences, setExperiences] = useState([]);
	const [year, setYear] = useState("");
	const [company, setCompany] = useState("");
	const [mission, setMission] = useState("");
	const [isAdd, setIsAdd] = useState(false);
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
	async function saveExperience(e) {
		e.preventDefault();
		try {
			const response = await fetch(url + "experience", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ year, company, mission }),
			});
			if (response.ok) {
				const data = await response.json();

				setYear("");
				setCompany("");
				setMission("");
				fetchExperiences();
				enqueueSnackbar(data.message, successSnackbar);
			}
		} catch (error) {
			console.log(error);
		}
	}
	async function deleteExperince(id) {
		try {
			const response = await fetch(`${url}'experience'/${id}`, {
				method: "DELETE",
			});
			if (response.ok) {
				const data = await response.json();
				enqueueSnackbar(data.message, warningSnackbar);
				fetchExperiences();
			}
		} catch (error) {
			console.log(error);
		}
	}
	function addExperience() {
		setIsAdd(true);
	}
	function handleCancel() {
		setIsAdd(false);
	}
	return (
		<div>
			<h2 className=''>Experiences profesionelles</h2>
			{!isAdd && (
				<button
					className=''
					onClick={addExperience}
				>
					<CiCirclePlus size={24} />
				</button>
			)}
			{isAdd && (
				<form
					className=''
					onSubmit={saveExperience}
				>
					<div className=''>
						<input
							type='text'
							className=''
							placeholder='Insert the year...'
							value={year}
							onChange={(e) => {
								setYear(e.target.value);
							}}
						/>
						<input
							type='text'
							className=''
							placeholder='Insert company name...'
							value={company}
							onChange={(e) => {
								setCompany(e.target.value);
							}}
						/>
						<input
							type='text'
							className=''
							placeholder='Insert the description...'
							value={mission}
							onChange={(e) => {
								setMission(e.target.value);
							}}
						/>
					</div>
					<div className=''>
						<button className=''>
							<PiFloppyDiskBackBold />
						</button>
						<button
							className=''
							onClick={handleCancel}
						>
							<MdCancel />
						</button>
					</div>
				</form>
			)}

			<div>
				{experiences &&
					experiences.map((x) => (
						<div
							key={x._id}
							className=''
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
								{/* <span>{x._id}</span> */}
							</div>
							<div>
								<span>
									<button
										onClick={() => {
											deleteExperince(x._id);
										}}
										className=''
									>
										<MdDelete />
									</button>
								</span>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
