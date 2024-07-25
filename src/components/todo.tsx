"use client";
import React, { useState, useEffect, useRef } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { env } from "@/env";
import { Separator } from "@/components/ui/separator";
import List from "@/components/custom/list";
import CompletedList from "@/components/custom/completed-list";
import Collaborator from "@/components/custom/collaborator";

import { defaultTasks } from "@/lib/data";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const taskSchema = z.object({
  text: z.string().min(6, "Text must be greater than 6 characters!"),
});

type TaskFormData = z.infer<typeof taskSchema>;

interface TodoProps {
  user: User;
}
const Todo: React.FC<{
  todoProps: TodoProps;
}> = ({ todoProps: { user } }) => {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [newTask, setNewTask] = useState<string>("");
  const [onlineUsersCount, setOnlineUsersCount] = useState<number>(0);
  const [onlineUsers, setOnlineUsers] = useState<Users>({
    defaultUser: {
      name: "Loading...",
      avatar: "https://github.com/shadcn.png",
    },
  });
  const isMounted = useRef(false);

  const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
    authEndpoint: "/api/pusher/auth",
    auth: {
      headers: {
        "Content-Type": "application/json",
      },
      params: { username: user.name, avatar: user.avatar },
    },
  });

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!isMounted.current) return;

    const channel = pusher.subscribe("presence-task");

    console.log(channel);

    // When a user subscribes to channel
    channel.bind("pusher:subscription_succeeded", (members: Members) => {
      setOnlineUsersCount(members.count);
      setOnlineUsers(members.members);
    });

    channel.bind("pusher:member_added", (members: Members) => {
      console.log(members, "member added");
      setOnlineUsersCount(members.count);
    });

    channel.bind("tasks-updated", (data: any) => {
      console.log(data);
      setTasks(data.tasks);
    });

    return () => {
      pusher.unsubscribe("presence-task");
    };
  }, []);

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      text: "",
    },
  });

  const completedTask = tasks.filter((t) => t.done === true);
  const todoTask = tasks.filter((t) => t.done === false);

  const addTask = async (task: Task) => {
    const updatedTasks = [...tasks, { ...task }];
    setTasks(updatedTasks);
    setNewTask("");
    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tasks: updatedTasks }),
    });
  };

  const toggleTask = async (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tasks: updatedTasks }),
    });
  };

  const deleteTask = async (id: string) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tasks: updatedTasks }),
    });
  };

  const { handleSubmit, control, reset } = form;
  const onSubmit = (data: TaskFormData) => {
    const task = {
      id: Math.random().toString(10).slice(2),
      text: data.text,
      done: false,
      actionParty: user,
    };

    addTask(task);
    reset();
  };

  return (
    <>
      <div className="bg-primary p-6 lg:px-8 flex justify-between w-full">
        <h1 className="text-white font-bold text-lg">WKVRSE</h1>
      </div>
      <div className="p-2 lg:px-10 h-full">
        <div>
          <h1 className="text-2xl font-semibold mb-5 text-slate-700">
            Assessments
          </h1>
        </div>
        <div className="flex justify-between items-start mt-10 flex-wrap md:flex-nowrap">
          <div className="flex items-start gap-x-5 flex-wrap md:flex-nowrap">
            <div className="h-full w-[400px] px-4 mb-3">
              <h1 className="font-medium text-slate-700 text-xl mb-5">
                Todo 🗃️ <span className="font-normal">{todoTask.length}</span>
              </h1>
              <div className="space-y-4">
                {todoTask.map((task, i) => (
                  <List
                    key={i}
                    task={task}
                    toggleTask={toggleTask}
                    deleteTask={deleteTask}
                  />
                ))}
              </div>
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex gap-3 mb-3 items-baseline justify-between mt-3">
                    <FormField
                      control={control}
                      name="text"
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              className="bg-white border-l-0 border-e-0 border-t-0 border-b-1 border-primary w-full rounded-none"
                              placeholder="Add new task..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="mt-4 btn btn-primary">
                      Add
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
            <div className="h-full w-[400px] px-4 mb-5">
              <h1 className="font-medium text-slate-700 text-xl mb-5">
                Completed ✅{" "}
                <span className="font-normal">{completedTask.length}</span>
              </h1>

              <div className="space-y-4">
                {completedTask.map((task, i) => (
                  <CompletedList
                    task={task}
                    key={i}
                    toggleTask={toggleTask}
                    deleteTask={deleteTask}
                  />
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="h-full w-[400px] px-4">
              <h1 className="font-medium text-slate-700 text-xl mb-5">
                Collaborators 🥷{" "}
                <span className="font-normal">{onlineUsersCount}</span>
              </h1>
              <Collaborator collaboratorProps={{ users: onlineUsers }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
