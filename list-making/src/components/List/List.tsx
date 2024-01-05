import ListItem from "./ListItem/ListItem";
import useLocalStorage from "../../utils/useLocalStorage";
import styles from "./List.module.css";
import { ChangeEvent, KeyboardEvent, FocusEvent, useRef, useEffect, useState } from "react";

export default function List({ index }: { index: number }) {
  const [items, setItems] = useLocalStorage(index.toString(), ["1", "2", "3"])
  console.log(items)

  const itemsRef = useRef<HTMLInputElement[] | null>(null);

  function getRef() {
    if (!itemsRef.current) {
      itemsRef.current = [];
    }
    return itemsRef.current;
  }

  const [focus, setFocus] = useState<number|null>(null);

  function focusElement(index: number) {
    const arr = getRef();
    const node = arr[index];
    console.log(node);
    if (node) {
      node.focus()
      setFocus(null);
    } else {
      setFocus(index);
    }
  }

  // there's probably a deeper reason why some elements don't render in time to be focused but this works for now - just focuses them after rendering if initial focus failed
  useEffect(() => {
    if (focus) {
      const arr = getRef();
      const node = arr[focus];
      node.focus();
      setFocus(null);
    }
  }, [focus])

  return (
    <ul className={styles.list}>
      {items.map((_el, i) =>
        <li className={styles.listItem} key={i}>
          <ListItem
            index={i}
            value={items[i]}
            ref={(node: HTMLInputElement) => {
              const arr = getRef();
              if (node) {
                arr[i] = node;
              } else {
                delete arr[i];
              }
            }}
            handleChange={(ev) => {
              handleChange(ev, i)
            }}
            handleKeyDown={(ev) => {
              handleKeyDown(ev, i)
            }}
            handleBlur={(ev) => {
              handleBlur(ev, i)
            }}
          />
        </li>
      )}
      <code>
        {items}
      </code>
    </ul>
  )

  function handleChange(event: ChangeEvent<HTMLInputElement>, index: number) {
    const target = event.target;
    const newItems = items.map((el, i) => {
      if (index === i) {
        return target.value;
      } else {
        return el;
      }
    })
    setItems(newItems);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>, index: number) {
    switch (e.key) {
      case "Enter":
        e.preventDefault()
        if (e.currentTarget.value.trim() != "") {
          const newItems = items.slice();
          newItems.splice(index + 1, 0, "");
          setItems(newItems);
          focusElement(index + 1);
        }
        //may have to be a useEffect 
        break;

      case "Backspace":
        if (e.currentTarget.value.trim() == "") {
          deleteNode(index);
          index != 0 && focusElement(index - 1);
        }
        break;
    }
  }

  function handleBlur(e: FocusEvent<HTMLInputElement>, index: number) {
    if (e.currentTarget.value.trim() == "") {
      deleteNode(index);
    }
  }

  function deleteNode(index: number) {
    if (items.filter(n => n).length > 0) {
      let newItems = items.slice();
      delete newItems[index];
      setItems(newItems);
    }
  }
}



