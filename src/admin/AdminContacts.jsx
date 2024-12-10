import { useEffect, useState } from "react";
import { PiFloppyDiskBackBold } from "react-icons/pi";
import AdminProfile from "./AdminProfile";
import { url } from "../config/config";
import { enqueueSnackbar } from "notistack";
import { FaEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
export default function AdminContact() {
	const initialObject = {
		tel: "",
		email: "",
		adress: "",
		lastname: "",
		firstname: "",
		status: "",
	};
	const [contacts, setContacts] = useState(initialObject);
	const [isEdit, setIsEdit] = useState(false);
	// GET DATA
	async function fetchContact() {
		try {
			const response = await fetch(url + "contact");
			if (response.ok) {
				const data = await response.json();
				setContacts(data[0] || initialObject);
			}
		} catch (error) {
			console.log(error.message);
		}
	}
	useEffect(() => {
		fetchContact();
	}, []);
	// Handle live change :
	const handleChange = (evt) => {
		const { name, value } = evt.target;
		setContacts((oldContacts) => {
			return { ...oldContacts, [name]: value };
		});
	};
	// Handle POST
	async function handleSumbit(e) {
		e.preventDefault();
		try {
			const response = await fetch(url + "contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(contacts),
			});
			if (response.ok) {
				const data = await response.json();
				enqueueSnackbar(data.message, {
					variant: "success",
					autoHideDuration: 2000,
					anchorOrigin: {
						horizontal: "center",
						vertical: "top",
					},
				});
			}
		} catch (error) {
			console.log(error.message);
		}
	}
	function handleIsEdit(e) {
		e.preventDefault();
		setIsEdit(false);
	}
	return (
		<div className='AdminContacts'>
			<AdminProfile
				lastname={contacts.lastname}
				firstname={contacts.firstname}
			/>
			{isEdit ? (
				<form
					className=''
					onSubmit={handleSumbit}
				>
					<div>
						<label htmlFor='tel'>Tel</label>
						<input
							className=''
							type='text'
							name='tel'
							id='tel'
							value={contacts.tel}
							onChange={handleChange}
						/>
					</div>
					<div className=''>
						<label htmlFor='email'>Email</label>
						<input
							className=''
							type='text'
							name='email'
							id='email'
							value={contacts.email}
							onChange={handleChange}
						/>
					</div>
					<div className=''>
						<label htmlFor='adress'>Adress</label>
						<input
							className=''
							type='text'
							name='adresse'
							id='adress'
							value={contacts.adress}
							onChange={handleChange}
						/>
					</div>
					<div className=''>
						<label htmlFor='status'>Status</label>
						<input
							className=''
							type='text'
							name='status'
							id='status'
							value={contacts.status}
							onChange={handleChange}
						/>
					</div>
					<button>
						<PiFloppyDiskBackBold />
					</button>
					<button onClick={handleIsEdit}>
						<MdCancel />
					</button>
				</form>
			) : (
				<div>
					
					<p>
						<span>Tel : </span>
						{contacts.tel}
					</p>
					<p>
						<span>Email : </span>
						{contacts.email}
					</p>
					<p>
						<span>Adress : </span>
						{contacts.adress}
					</p>
					<p>{contacts.status}</p>
					<button onClick={() => setIsEdit(true)}>
						<FaEdit />
					</button>
				</div>
			)}
		</div>
	);
}
