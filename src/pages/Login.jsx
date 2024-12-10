import React from "react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

export default function Login({
	username,
	password,
	setUsername,
	setPassword,
	handleSubmit,
}) {
	return (
		<>
			<Navbar />
			<div className='Login'>
				<div className='LoginContainer'>
					<h2>LOGIN</h2>
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							placeholder='username'
							onChange={setUsername}
							value={username}
							name='username'
						/>
						<input
							name='password'
							type='password'
							onChange={setPassword}
							value={password}
							placeholder='password'
						/>
						<button>Login</button>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
}
