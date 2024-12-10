import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdCancel, MdDelete } from "react-icons/md";
import { PiFloppyDiskBackBold } from "react-icons/pi";
import { url, successSnackbar, warningSnackbar } from "../config/config";
import { enqueueSnackbar } from "notistack";
export default function AdminLanguages() {
	const [name, setName] = useState("");
	const [level, setLevel] = useState("");
	const [langues, setLangues] = useState([]);
	const [isAdd, setIsAdd] = useState(false);
	// GET
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
	// POST
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const response = await fetch(url + "langues", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, level }),
			});
			if (response.ok) {
				const data = await response.json();
				enqueueSnackbar(data.message, successSnackbar);
				fetchLangues();
			}
		} catch (error) {
			console.log(error.message);
		}
	}
	//DELETE
	async function handleDelete(id) {
		try {
			const response = await fetch(url + "langues" + `/${id}`, {
				method: "DELETE",
			});
			if (response.ok) {
				const data = await response.json();
				enqueueSnackbar(data.message, warningSnackbar);
				fetchLangues();
			}
		} catch (error) {
			console.log(error.message);
		}
	}
	function addLangue() {
		setIsAdd(true);
	}
	function handleCancel() {
		setIsAdd(false);
	}
	return (
		<div>
			<h2 className=''>Langues</h2>
			{!isAdd && (
				<button
					className=''
					onClick={addLangue}
				>
					<CiCirclePlus size={24} />
				</button>
			)}
			{isAdd && (
				<form
					className=''
					onSubmit={handleSubmit}
				>
					<input
						className=''
						type='text'
						onChange={(e) => setName(e.target.value)}
					/>
					<select
						className=''
						onChange={(e) => setLevel(e.target.value)}
					>
						<option value='Débutant'>Débutant</option>
						<option value='Intermediaire'>Intermediaire</option>
						<option value='Avancé'>Avancé</option>
						<option value='Courant'>Courant</option>
					</select>
					<button
						className=''
						title='save'
					>
						<PiFloppyDiskBackBold />
					</button>
					<button
						className=''
						onClick={handleCancel}
					>
						<MdCancel />
					</button>
				</form>
			)}

			<div className=''>
				{langues &&
					langues.map((item) => (
						<div
							className='Language'
							key={item._id}
						>
							<span className=' '>
								<strong>{item.name}</strong>: {item.level}
							</span>
							<button
								onClick={() => handleDelete(item._id)}
								className=''
							>
								<MdDelete />
							</button>
						</div>
					))}
			</div>
		</div>
	);
}
//
