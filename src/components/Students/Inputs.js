/** @format */
import Fuse from "fuse.js";
import React, { useState } from "react";
import classes from "./Inputs.module.css";

const Inputs = (props) => {
	const [isNameValid, setIsNameValid] = useState(true);
	let studentList = [...props.studentList];

	const fuse = new Fuse(studentList, {
		//Using fuse library we will search items in properties 'lastName' and 'firstName'
		keys: ["firstName", "lastName"],
		includeMatches: true,
	});

	const fuseTag = new Fuse(studentList, {
		/* Using fuse library we 
		will search items in the propery 'tags' */
		keys: ["tags"],
		includeMatches: true,
	});

	const onStudentSearchByName = (event) => {
		let result = [];

		const pattern = /^[a-zA-Z]+$/; /**This pattern will check whether
													the name is not empty or has numbers or unique chars. **/

		if (!pattern.test(event.target.value) && event.target.value.length !== 0) {
			//Using the pattern we validate for whether the entered name
			setIsNameValid(false);
			result = [];
		} else if (event.target.value.length === 0) {
			result = [...studentList];
			setIsNameValid(true);
		} else {
			result = fuse.search(event.target.value);
			result = result.map((student) => student.item);
			setIsNameValid(true);
		}
		props.searchResult(result);
	};

	const onStudentSearchByTag = (event) => {
		let result = [];

		if (event.target.value.length === 0) {
			result = [...studentList];
		} else {
			result = fuseTag.search(event.target.value);
			result = result.map((student) => student.item);
		}
		props.searchResult(result);
	};

	let validName = isNameValid ? "" : "error";

	return (
		<div className={classes.input}>
			<input
				className={classes[validName]}
				onChange={onStudentSearchByName}
				type="text"
				placeholder="Search by name"
			/>
			{validName && (
				<p className={classes.errorMessage}>
					Name must not contain numbers and unique characters
				</p>
			)}
			<input
				onChange={onStudentSearchByTag}
				type="text"
				placeholder="Search by tag"
			/>
		</div>
	);
};

export default Inputs;
