import { AppBar, Toolbar, Typography } from "@mui/material"
import styles from "./style.module.css"
import { IconButton } from "rsuite"

export default function Header() {

	return (
		<AppBar position="static">
			<Toolbar >
				<Typography variant="h6" noWrap component="div">
					School Tech
				</Typography>
			</Toolbar>
		</AppBar>
	)
}