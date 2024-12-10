export default function Profile({ firstname, lastname, status }) {
	return (
		<div>
			<div id='imageContainer'>
				<img
					id='profileImg'
					src='./images/CV_2024-06-25_Sami_BENSEGHIR.jpg'
					alt=''
				/>
			</div>

			<div className=''>
				<h2 className=''>
					{lastname} {firstname}
				</h2>
				<h1 className=''>{status}</h1>
			</div>
		</div>
	);
}
