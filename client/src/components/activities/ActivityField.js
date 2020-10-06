// Survey field contains logic to render a single label and text input

import React from 'react';

export default (props) => {
	return (
		<div>
			<label>{props.label}</label>
			<input {...props.input} />
		</div>
	);
};
