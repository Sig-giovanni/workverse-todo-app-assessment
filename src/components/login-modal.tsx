import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const userSchema = z.object({
  username: z
    .string({
      invalid_type_error: "Username must be greater than 6 characters!",
    })
    .min(6),
});

type UserFormData = z.infer<typeof userSchema>;

interface LoginProps {
  handleLogin: (value: User) => void;
}

const LoginModal: React.FC<{
  loginProps: LoginProps;
}> = ({ loginProps }) => {
  const { handleLogin } = loginProps;
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
    },
  });

  const { handleSubmit, control, reset } = form;
  const onSubmit = (data: UserFormData) => {
    console.log(data);
    handleLogin({
      name: data.username,
      avatar: "https://github.com/shadcn.png",
    });
  };
  return (
    <div className="flex min-h-screen bg-primary flex-1 flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm border px-4 lg:px-10 py-5 bg-white rounded-md">
        <div className="w- bg-white flex justify-center mb-10">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Input something epic..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-4 btn btn-primary w-full">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginModal;
