import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdCancel, MdDelete } from "react-icons/md";
import { PiFloppyDiskBackBold } from "react-icons/pi";
import { enqueueSnackbar } from "notistack";
import { url, successSnackbar, warningSnackbar } from "../config/config";
export default function AdminTrainings() {
	const [trainings, setTrainings] = useState([]);
	const [establishment, setEstablishment] = useState("");
	const [year, setYear] = useState("");
	const [degree, setDegree] = useState("");
	const [isAdd, setIsAdd] = useState(false);
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
	async function saveTraining(e) {
		e.preventDefault();
		try {
			const response = await fetch(url + "training", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ year, establishment, degree }),
			});
			if (response.ok) {
				const data = await response.json();
				enqueueSnackbar(data.message, successSnackbar);
				fetchTrainings();
				setYear("");
				setEstablishment("");
				setDegree("");
			}
		} catch (error) {
			console.log(error);
		}
	}
	async function deleteExperince(id) {
		try {
			const response = await fetch(url + "training" + `/${id}`, {
				method: "DELETE",
			});
			if (response.ok) {
				const data = await response.json();
				enqueueSnackbar(data.message, warningSnackbar);
				fetchTrainings();
			}
		} catch (error) {
			console.log(error);
		}
	}
	function addTraining() {
		setIsAdd(true);
	}
	function handleCancel() {
		setIsAdd(false);
	}
	return (
		<div className=''>
			<h2 className=''>Formations</h2>
			{!isAdd && (
				<button
					className=''
					onClick={addTraining}
				>
					<CiCirclePlus size={24} />
				</button>
			)}
			{isAdd && (
				<form
					className=''
					onSubmit={saveTraining}
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
							placeholder='Insert establishment name...'
							value={establishment}
							onChange={(e) => {
								setEstablishment(e.target.value);
							}}
						/>
						<input
							type='text'
							className=''
							placeholder='Insert the degree...'
							value={degree}
							onChange={(e) => {
								setDegree(e.target.value);
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

			{trainings &&
				trainings.toReversed().map((x) => (
					<div
						key={x._id}
						className=' '
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
						<div>
							<span>
								<button
									onClick={() => {
										deleteExperince(x._id);
									}}
								>
									<MdDelete />
								</button>
							</span>
						</div>
					</div>
				))}
		</div>
	);
}
