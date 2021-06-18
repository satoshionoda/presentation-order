import React, { DragEventHandler, FC } from "react";
import { ListData } from "../pages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock, faTrash } from "@fortawesome/free-solid-svg-icons";

export type ListItemProps = {
  index: number;
  onClickDelete: (i: number) => void;
  onClickLock: (i: number) => void;
  onDropReceive: (myIndex: number, targetIndex: number) => void;
} & ListData;

export const ListItem: FC<ListItemProps> = ({
  name,
  index,
  isLocked,
  onClickDelete,
  onClickLock,
  onDropReceive,
}) => {
  const dragStartHandler: DragEventHandler = (e) => {
    e.dataTransfer.setData("text/plain", `${index}`);
    e.dataTransfer.dropEffect = "move";
  };
  const dropHandler: DragEventHandler = (e) => {
    const num: number = parseFloat(e.dataTransfer.getData("text/plain"));
    if (isLocked || num === index) {
      return;
    }
    onDropReceive(index, num);
  };
  const dragOverHandler: DragEventHandler = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  return (
    <li
      className={`relative shadow mb-2 p-3 rounded flex items-center justify-between ${
        isLocked ? "bg-gray-200 cursor-default" : "bg-white cursor-move"
      }`}
      draggable={!isLocked}
      onDragStart={dragStartHandler}
      onDrop={dropHandler}
      onDragOver={dragOverHandler}
    >
      <div className="flex items-center ">
        <span className="block text-4xl text-yellow-500 ">{index + 1}</span>
        <span className="block text-2xl ml-5 tracking-wider">{name}</span>
      </div>
      <div className="flex gap-5">
        <FontAwesomeIcon
          icon={isLocked ? faLock : faUnlock}
          className="text-gray-700 w-4 cursor-pointer"
          onClick={() => {
            onClickLock(index);
          }}
        />
        <FontAwesomeIcon
          icon={faTrash}
          className="text-gray-700 w-4 cursor-pointer"
          onClick={() => {
            onClickDelete(index);
          }}
        />
      </div>
    </li>
  );
};
