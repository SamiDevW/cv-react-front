export default function AdminProfile({ firstname, lastname, status }) {
	return (
		<div>
			<img
				id='profileImg'
				src='./images/Screenshot 2024-06-24 133634.png'
				alt=''
			/>
			<div className=''>
				<h2 className=''>
					{lastname} {firstname}
				</h2>
				<h1 className=''>{status}</h1>
			</div>
		</div>
	);
}
