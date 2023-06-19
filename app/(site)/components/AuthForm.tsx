"use client";

import Button from "@/app/common/Button";
import Input from "@/app/common/Input";
import { useCallback, useEffect, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Variant = "LOGIN" | "REGISTER";

function AuthForm() {
	const session = useSession();
	const router = useRouter();
	const [variant, setVariant] = useState<Variant>("LOGIN");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (session?.status === "authenticated") {
			router.push("/users");
		}
	}, [session?.status, router]);

	const toggleVariant = useCallback(() => {
		if (variant === "LOGIN") {
			setVariant("REGISTER");
		} else {
			setVariant("LOGIN");
		}
	}, [variant]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		if (variant === "REGISTER") {
			axios
				.post("/api/register", data)
				.then(() => signIn("credentials", data))
				.catch(() => toast.error("Something went wrong!"))
				.finally(() => setIsLoading(false));
		} else if (variant === "LOGIN") {
			signIn("credentials", { ...data, redirect: false })
				.then((callback) => {
					if (callback?.error) toast.error("Invalid credentials");
					if (callback?.ok && !callback?.error)
						toast.success("Successfully logged in");
					router.push("/users");
				})
				.finally(() => setIsLoading(false));
		}
	};

	const socialAction = (action: string) => {
		setIsLoading(true);

		signIn(action, { redirect: false })
			.then((callback) => {
				if (callback?.error) toast.error("Invalid credentials");
				if (callback?.ok && !callback?.error)
					toast.success("Successfully logged in");
				router.push("/users");
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<section className="mt-8 sm:mx-auto sm:max-w-md sm:w-full">
			<div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
				<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
					{variant === "REGISTER" && (
						<Input
							id="name"
							errors={errors}
							label="Name"
							register={register}
							placeholder="What should we call you?"
							disabled={isLoading}
						/>
					)}
					<Input
						id="email"
						errors={errors}
						label="Email"
						type="email"
						register={register}
						placeholder="example@email.com"
						disabled={isLoading}
					/>
					<Input
						id="password"
						errors={errors}
						label="Password"
						type="password"
						register={register}
						placeholder="Enter a safe password"
						disabled={isLoading}
					/>
					<div>
						<Button type="submit" disabled={isLoading} fullWidth>
							{variant === "LOGIN" ? "Login" : "Sign up"}
						</Button>
					</div>
				</form>
				<div className="mt-8">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t bg-gray-300" />
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="bg-white px-2 text-gray-500">
								Or continue with
							</span>
						</div>
					</div>
					<div className="flex mt-6 gap-2">
						<AuthSocialButton
							onClick={() => socialAction("github")}
							icon={BsGithub}
						/>
						<AuthSocialButton
							onClick={() => socialAction("google")}
							icon={BsGoogle}
						/>
					</div>
				</div>
				<div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
					<div>
						{variant === "REGISTER"
							? "Already have an account?"
							: "New to messenger?"}
					</div>
					<div
						className="underline cursor-pointer"
						onClick={toggleVariant}
					>
						{variant === "REGISTER" ? "Login" : "Sign up"}
					</div>
				</div>
			</div>
		</section>
	);
}

export default AuthForm;
