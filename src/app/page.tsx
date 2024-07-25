"use client";
import React, { useState, useEffect, useRef } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { env } from "@/env";
import { Separator } from "@/components/ui/separator";
import List from "@/components/custom/list";
import CompletedList from "@/components/custom/completed-list";
import LoginModal from "@/components/login-modal";
import Collaborator from "@/components/custom/collaborator";

import { defaultTasks } from "@/lib/data";
import Todo from "@/components/todo";

export default function Home() {
  console.log(env);
  const [user, setUser] = useState<User>({
    name: "",
    avatar: "",
  });

  return (
    <div className="w-full">
      {user.name === "" ? (
        <LoginModal loginProps={{ handleLogin: setUser }} />
      ) : (
        <Todo todoProps={{ user }} />
      )}
    </div>
  );
}
