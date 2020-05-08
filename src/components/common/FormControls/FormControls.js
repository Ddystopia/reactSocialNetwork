import React from "react";
import classNames from "./FormControls.module.css";

const FormControl = ({ input, meta, element, className, ...props }) => {
	const hasError = meta.touched && meta.error;
	return (
		<div className={className}>
			{React.createElement(element, {
				...input,
				...props,
				className: hasError ? classNames.error : "",
			})}
			{hasError && <span>{meta.error}</span>}
		</div>
	);
};


const Textarea = (props) => {
	return <FormControl {...props} element="textarea" />
}

const Input = (props) => {
	return <FormControl {...props} element="input" />
};

export { Textarea, Input };
