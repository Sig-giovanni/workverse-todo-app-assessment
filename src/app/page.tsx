import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Separator } from "@/components/ui/separator";
import List from "@/components/custom/list";
import CompletedList from "@/components/custom/completed-list";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const schema = z.object({
  title: z.string().min(6),
});

export default function Home() {
  return (
    <div className="p-6 lg:px-10 h-full">
      <div>
        <h1 className="text-2xl font-semibold mb-5 text-slate-700">
          Assessments
        </h1>
      </div>
      <div className="flex items-start gap-x-5 mt-10">
        <div className="h-full w-[400px]">
          <h1 className="font-medium text-slate-700 text-xl mb-5">
            Todo 🗃️ <span className="font-normal">4</span>
          </h1>
          <div className="space-y-4">
            <List />
            <List />
          </div>
        </div>
        <Separator orientation="vertical" className="h-[500px]" />
        <div className="h-full w-[400px]">
          <h1 className="font-medium text-slate-700 text-xl mb-5">
            Completed ✅
          </h1>
          <div className="space-y-4">
            <CompletedList />
            <CompletedList />
            <CompletedList />
          </div>
        </div>
      </div>
    </div>
  );
}
