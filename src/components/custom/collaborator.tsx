import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { convertUsersObjectToArray } from "@/lib/utils";

interface CollaboratorProps {
  users: Users;
}

const Collaborator: React.FC<{
  collaboratorProps: CollaboratorProps;
}> = ({ collaboratorProps: { users } }) => {
  const usersArray = convertUsersObjectToArray(users);
  return (
    <div className="space-y-4">
      {usersArray.map((user, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-white border-2 border-gray-300 shadow-md rounded-md px-4 py-2"
        >
          <div className="flex items-center">
            <p className="text-slate-600 font-medium">{user.name}</p>
          </div>
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      ))}
    </div>
  );
};

export default Collaborator;
