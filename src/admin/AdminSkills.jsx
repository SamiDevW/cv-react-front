import { useEffect, useState } from "react";
import { PiFloppyDiskBackBold } from "react-icons/pi";
import { MdDelete, MdCancel } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { enqueueSnackbar } from "notistack";
import { url, successSnackbar, warningSnackbar } from "../config/config";
// GET Data :
export default function AdminSkills() {
	const [skills, setSkills] = useState("");
	const [skill, setSkill] = useState("");
	const [isAdd, setIsAdd] = useState(false);
	async function fetchSkills() {
		try {
			const response = await fetch(url + "competence");
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
	// POST
	async function handleSave() {
		try {
			if (skill !== "") {
				console.log(skill);
				const response = await fetch(url + "competence", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ skill }),
				});
				if (response.ok) {
					const data = await response.json();
					setSkill("");
					enqueueSnackbar(data.message, successSnackbar);
				}
			}
		} catch (error) {
			console.log(error.message);
		}
	}
	// Delete
	async function handleDelete(id) {
		const response = await fetch(url + "competence" + `/${id}`, {
			method: "DELETE",
		});
		if (response.ok) {
			const data = await response.json();
			enqueueSnackbar(data.message, warningSnackbar);
			fetchSkills();
		}
	}

	function addSkill() {
		setIsAdd(true);
	}
	function handleCancel() {
		setIsAdd(false);
	}
	return (
		<div>
			<div>
				<h2 className=''>Skills</h2>
				{!isAdd && (
					<button
						className=''
						onClick={addSkill}
					>
						<CiCirclePlus size={24} />
					</button>
				)}
				{isAdd && (
					<div>
						<div className=''>
							<input
								className=''
								type='text'
								value={skill}
								onChange={(e) => setSkill(e.target.value)}
							/>

							<button onClick={handleSave}>
								<PiFloppyDiskBackBold />
							</button>
							<button
								className=''
								onClick={handleCancel}
							>
								<MdCancel />
							</button>
						</div>
					</div>
				)}
			</div>

			<div>
				{skills &&
					skills.map((item) => (
						<div
							className='Skill'
							key={item._id}
						>
							<span>{item.skill} </span>
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
		</div>
	);
}
