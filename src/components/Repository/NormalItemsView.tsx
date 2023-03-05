import IconFolder from "../../assets/images/icon-Folder.svg";
import IconFile from "../../assets/images/icon-file.svg";
import { Text, Tooltip } from '@mantine/core';
import classes from "./Repository.module.scss";
import { ItemRepository } from "../../classes/repository.classes";

const NormalItemsView = ({ items, onClick, selection }: {
    items: Array<ItemRepository>,
    selection: any,
    onClick: any
}) => {
    return <div className={classes["normal-items-container"]}>
        {items?.map((item) => {
            return (<div key={item.path}
                onClick={() => onClick(item)} className={selection == item ?
                    `${classes["item"]} ${classes["selected"]}`
                    : classes["item"]}>
                {item.isDir && <img src={IconFolder} alt={item.name} />}
                {!item.isDir && <img src={IconFile} alt={item.name} />}
                <Tooltip position="bottom" arrowPosition="center"
                    label={item.name}>
                    <Text className={classes["text"]} align="center" size="xs" lineClamp={2} w={120}>{item.name}</Text>
                </Tooltip>
            </div>)
        })}
    </div>
}

export default NormalItemsView
