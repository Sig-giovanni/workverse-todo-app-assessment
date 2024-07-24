"use client";

import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { TrashIcon } from "../icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckedState } from "@radix-ui/react-checkbox";

interface ListProps {
  task: Task;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

const List: React.FC<ListProps> = ({ task, toggleTask, deleteTask }) => {
  const [isChecked, setIsChecked] = useState<CheckedState>(false);
  const handleToggleTask = (id: string) => {
    toggleTask(id);
  };
  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };
  return (
    <div className="flex items-center justify-between bg-white border-2 border-gray-300 shadow-md rounded-md px-4 py-2">
      <div>
        <div className="flex items-center">
          <Checkbox
            id="todo-1"
            className="mr-2"
            checked={isChecked}
            onClick={(e) => {
              handleToggleTask(task.id);
            }}
          />
          <label htmlFor="todo-1" className="text-slate-600 font-medium">
            {task.text}
          </label>
        </div>
        <div className="flex ml-6 gap-2 item-center">
          <p className="text-sm text-slate">created by:</p>
          <p className="text-sm font-medium">{task.actionParty.name}</p>
          <Avatar className="w-5 h-5">
            <AvatarImage src={task.actionParty.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:bg-primary hover:text-white"
        onClick={(e) => {
          handleDeleteTask(task.id);
        }}
      >
        <TrashIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default List;
