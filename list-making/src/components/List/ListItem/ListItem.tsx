import styles from "./ListItem.module.css";
import {ListItemType} from "../List.tsx"

export default function ListItem({
  index,
  value,
  handleChange
}: ListItemType) {
  // const [text, setText] = useLocalStorage(index.toString(), "");

  return(
    <li>
      <input 
        className={styles.listItem}
        value={value}
        onChange={(ev) => {
          handleChange(ev, index)
        }}
      />
    </li>
  )
}