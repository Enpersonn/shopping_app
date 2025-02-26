import { cn } from "../utils/classes";

type InputProps = {
	label?: string;
	labelClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, ...props }: InputProps) => {
	return (
		<div className="flex flex-col w-full">
			{props.type === "hidden" ? (
				<></>
			) : (
				<label
					htmlFor={props.id}
					className={cn("text-sm text-gray-500 mb-0", props.labelClassName)}
				>
					{label}
				</label>
			)}
			<input
				{...props}
				className={cn(
					"border-b-2 p-2 outline-none focus-visible:outline-none focus-visible:border-[1px] focus:border-black",
					props.className,
				)}
			/>
		</div>
	);
};

export default Input;
