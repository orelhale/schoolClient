import styles from "./style.module.css"
import MainRouts from "../../routes/MainRouts"
import PopupTemplate from "../../components/popups/PopupTemplate"
import DataContext from "../../context/DataContext"
import { useContext } from "react"

export default function Main() {
	let { popupBody } = useContext(DataContext)

	return (
		<div className={styles.Main}>
			<MainRouts />
			{popupBody && <PopupTemplate content={popupBody}/> }
		</div>
	)
}