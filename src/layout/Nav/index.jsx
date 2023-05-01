import styles from "./style.module.css"
import NavRouts from "../../routes/NavRouts"

export default function Nav() {

	return (
		<div className={styles.Nav}>
			<NavRouts />
		</div>
	)
}