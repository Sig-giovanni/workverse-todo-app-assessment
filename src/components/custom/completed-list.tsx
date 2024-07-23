import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { TrashIcon } from "../icons";

const CompletedList = () => {
  return (
    <div className="flex items-center justify-between bg-white border-2 border-gray-300 shadow-md rounded-md px-4 py-2">
      <div className="flex items-center">
        <Checkbox id="todo-1" className="mr-2" />
        <label htmlFor="todo-1" className="text-slate-600 font-medium">
          Buy groceries
        </label>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:bg-primary hover:text-white"
      >
        <TrashIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default CompletedList;
