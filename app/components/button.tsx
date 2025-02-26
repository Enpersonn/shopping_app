import { cn } from "../utils/classes";
import React from "react";

const variants = {
	primary:
		"border-[1px] flex items-center justify-center text-nowrap text-black bg-white hover:bg-slate-50 rounded-md",
	ghost:
		" flex items-center justify-center text-nowrap text-black hover:bg-white/30  rounded-md",
} as const;

const sizes = {
	sm: "px-4 py-2",
	md: "px-6 py-2",
	lg: "px-8 py-3",
	icon: "size-10",
} as const;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: keyof typeof variants;
	size?: keyof typeof sizes;
	asChild?: boolean;
};

const Button = ({
	children,
	asChild,
	variant = "primary",
	size = "md",
	...props
}: ButtonProps) => {
	if (asChild) {
		const child = React.Children.only(children);
		return React.cloneElement(child as React.ReactElement, {
			...props,
			className: cn(
				variants[variant],
				sizes[size],
				props.className,
				(child as React.ReactElement).props.className,
			),
		});
	}

	return (
		<button
			{...props}
			className={cn(variants[variant], sizes[size], props.className)}
		>
			{children}
		</button>
	);
};

export default Button;
