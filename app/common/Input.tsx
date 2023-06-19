"use client";

import clsx from "clsx";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";

interface InputProps {
	label: string;
	id: string;
	type?: string;
	required?: boolean;
	register: UseFormRegister<FieldValues>;
	errors: FieldErrors;
	disabled?: boolean;
	placeholder?: string;
}

const Input: React.FC<InputProps> = ({
	label,
	id,
	type,
	required,
	register,
	errors,
	disabled,
	placeholder
}) => {
	return (
		<div>
			<label
				className="leading-6 block text-sm font-medium text-gray-900"
				htmlFor={id}
			>
				{label}
			</label>
			<div className="mt-2">
				<input
					id={id}
					className={clsx(
						`
                    form-input
                    block
                    w-full
                    rounded-md
                    py-1.5
                    text-gray-900
                    shadow-sm
                    border-0
                    ring-1
                    ring-inset
                    ring-gray-300
                    placeholder:text-gray-400
                    focus:ring-2
                    focus:ring-inset
                    focus:ring-sky-600
                    sm:text-sm
                    sm:leading-6
                    `,
                        errors[id] && "focus:ring-rose-500",
                        disabled && "cursor-default opacity-50"
					)}
					type={type}
					autoComplete={id}
					disabled={disabled}
					placeholder={placeholder}
					{...register(id, { required })}
				/>
			</div>
		</div>
	);
};

export default Input;
