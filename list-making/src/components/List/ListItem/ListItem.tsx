import styles from "./ListItem.module.css";
import { ChangeEvent, KeyboardEvent, FocusEvent, SyntheticEvent, forwardRef, LegacyRef} from "react";

type handleEvent<T extends SyntheticEvent> = (
  arg0: T,
  arg1: number ) => void;

interface ListItemType {
  index: number
  value: string,
  handleChange: handleEvent<ChangeEvent<HTMLInputElement>>
  handleKeyDown: handleEvent<KeyboardEvent<HTMLInputElement>>
  handleBlur: handleEvent<FocusEvent<HTMLInputElement>>
}

export default forwardRef(function ListItem({
  index,
  value,
  handleChange,
  handleKeyDown,
  handleBlur,
}: ListItemType, ref:LegacyRef<HTMLInputElement>) {

  return (
    <input
      className={styles.listItem}
      value={value}
      ref={ref}
      maxLength={50}
      onChange={(ev) => {
        handleChange(ev, index)
      }}
      onKeyDown={(ev) => {
        handleKeyDown(ev, index)
      }}
      onBlur={(ev) => {
        handleBlur(ev, index);
      }}

    />
  )
})