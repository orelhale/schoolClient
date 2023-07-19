
import { useContext } from "react"
import styles from "./style.module.css"
import DataContext from "../../../context/DataContext"

export default function PopupTemplate({ content }) {

   let { setPopupBody } = useContext(DataContext)

   return (
      <div className={styles.PopupTemplate} onClick={() => setPopupBody(null)}>
         <div className={styles.wropPopup} onClick={(e) => e.stopPropagation()}>
            {content && content.element}
         </div>
      </div>
   )
}
