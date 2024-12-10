import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { RiLoginBoxLine } from "react-icons/ri";
import LoginIcon from "@mui/icons-material/Login";
export default function NavBar() {
	return (
		<Box sx={{ flexGrow: 1, paddingBottom: 2 }}>
			<AppBar position='static'>
				<Toolbar>
					<Typography
						variant='h6'
						component='div'
						sx={{ flexGrow: 1 }}
					>
						<a
							style={{ textDecoration: "none", color: "white" }}
							href='/'
						>
							CV-REACT
						</a>
					</Typography>
					<Button color='inherit'>
						<a
							style={{ textDecoration: "none", color: "white" }}
							href='/admin'
						>
							<LoginIcon />
						</a>
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
