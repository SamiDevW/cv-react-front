import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { MdCancel, MdDelete } from "react-icons/md";
import { PiFloppyDiskBackBold } from "react-icons/pi";
import { url, successSnackbar, warningSnackbar } from "../config/config";
import { enqueueSnackbar } from "notistack";
export default function AdminActivities() {
	const [activity, setActivity] = useState("");
	const [activities, setActivities] = useState([]);
	const [isAdd, setIsAdd] = useState(false);
	// GET DATA :
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
	// UPDATE DATA :
	async function handleSave() {
		try {
			if (activity) {
				setActivity("");
				const response = await fetch(url + "interets", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ activity }),
				});
				if (response.ok) {
					const data = await response.json();
					enqueueSnackbar(data.message, successSnackbar);
					fetchInterets();
				}
			}
		} catch (error) {
			console.log(error.message);
		}
	}
	async function handleDelete(id) {
		const response = await fetch(url + "interets" + `/${id}`, {
			method: "DELETE",
		});
		if (response.ok) {
			const data = await response.json();
			enqueueSnackbar(data.message, warningSnackbar);
			fetchInterets();
		}
	}
	function addActivity() {
		setIsAdd(true);
	}
	function handleCancel() {
		setIsAdd(false);
	}
	return (
		<div>
			<h2 className=''>Activities</h2>
			{!isAdd && (
				<button
					className=''
					onClick={addActivity}
				>
					<CiCirclePlus size={24} />
				</button>
			)}
			{isAdd && (
				<div className=''>
					<input
						className=''
						type='text'
						value={activity}
						onChange={(e) => setActivity(e.target.value)}
					/>
					<button
						className=''
						onClick={handleSave}
					>
						<PiFloppyDiskBackBold />
					</button>
					<button
						className=''
						onClick={handleCancel}
					>
						<MdCancel />
					</button>
				</div>
			)}
			{activities &&
				activities.map((item) => (
					<div
						key={item._id}
						className='Activity'
					>
						<span>{item.activity} </span>
						<button
							onClick={() => {
								handleDelete(item._id);
							}}
							className=''
						>
							<MdDelete />
						</button>
					</div>
				))}
		</div>
	);
}
