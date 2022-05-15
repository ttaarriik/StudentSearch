/** @format */
import Fuse from "fuse.js";

import classes from "./Inputs.module.css";

const Inputs = (props) => {
	let studentList = [...props.studentList];
	const fuse = new Fuse(studentList, {
		keys: ["firstName", "lastName"],
		includeMatches: true,
	});

	const fuseTag = new Fuse(studentList, {
		keys: ["tags"],
		includeMatches: true,
	});

	const onStudentSearch = (event) => {
		let result = [];

		if (event.target.value.length === 0) {
			result = [...studentList];
		} else {
			result = fuse.search(event.target.value);
			result = result.map((student) => student.item);
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

	return (
		<div className={classes.input}>
			<input
				onChange={onStudentSearch}
				type="text"
				placeholder="Search by name"
			/>
			<input
				onChange={onStudentSearchByTag}
				type="text"
				placeholder="Search by tag"
			/>
		</div>
	);
};

export default Inputs;
