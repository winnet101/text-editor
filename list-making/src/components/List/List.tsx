import ListItem from "./ListItem/ListItem";
import useLocalStorage from "../../utils/useLocalStorage";
import { ChangeEvent } from "react";

interface ListItemType extends Partial<HTMLInputElement>{
  index: number
  value: string,
  handleChange: (
    arg0: ChangeEvent<HTMLInputElement>, 
    arg1: number) => void
}

export type { ListItemType };

export default function List() {

  const [items, setItems] = useLocalStorage("List", ["1", "2", "3"])

  function handleChange(event: ChangeEvent<HTMLInputElement>, index: number) {
    const target = event.target;
    console.log("...changing...", index)
    const newItems = items.map((el, i) => {
      if (index === i) {
        console.log(target.value);
        return target.value;
      } else {
        return el;
      }
    })
    setItems(newItems)
  }

  const mappedList = items.map((_el, i) =>
    <ListItem
      key={i}
      index={i}
      value={items[i]}
      handleChange={(ev) => {
        handleChange(ev, i)
      }}
    />
  )

  return (
    <ul>
      {mappedList}
    </ul>

  )
}



