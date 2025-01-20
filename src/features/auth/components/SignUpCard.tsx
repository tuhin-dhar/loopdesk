"use client";

import DottedSeparator from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useRegister } from "../api/use-register";
import { Loader2 } from "lucide-react";

const formSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z
      .string()
      .email({ message: "Email is not valid" })
      .min(1, { message: "Required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string({ required_error: "This field is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords don't match",
      });
    }
  });

const SignUpCard = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { mutate, isPending } = useRegister();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({
      json: {
        email: values.email,
        name: values.name,
        password: values.password,
      },
    });
  };

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="fles items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Get Started Today!</CardTitle>
        <CardDescription>
          By signing up, you agree to our{" "}
          <Link href={"/privacy-policy"}>
            <span className="text-blue-700">Privacy Policy</span>
          </Link>{" "}
          and{" "}
          <Link href={"/terms-and-conditions"}>
            <span className="text-blue-700">Terms & Conditions</span>
          </Link>
        </CardDescription>
      </CardHeader>
      <div className="px-7 mb-2">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            action=""
            className="space-y-4"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="text"
                      placeholder="Enter your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      disabled={isPending}
                      type="password"
                      placeholder="Enter Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      disabled={isPending}
                      type="password"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={false}
              size={"lg"}
              className="w-full"
            >
              {isPending ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="size-9 animate-spin" />
                </div>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          variant={"ghost"}
          size={"lg"}
          className="w-full border border-primary/115"
          disabled={false}
        >
          <FcGoogle className="mr-2 size-5" />
          Log in with Google
        </Button>
        <Button
          variant={"ghost"}
          size={"lg"}
          className="w-full border border-primary/115"
          disabled={false}
        >
          <FaGithub className="mr-2 size-5" />
          Log in with Github
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex items-center justify-center">
        <p>
          Already have an account?{" "}
          <Link href={"/sign-in"} className="text-blue-700 underline">
            Sign In
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
