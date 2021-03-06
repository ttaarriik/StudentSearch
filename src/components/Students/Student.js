/** @format */
import classes from "./Student.module.css";
import { ImPlus } from "react-icons/im";
import { FaMinus } from "react-icons/fa";
import { useState } from "react";

const Student = (props) => {
	const [showGrades, setShowGrades] = useState(false);
	const [isTagEmpty, setIsTagEmpty] = useState(false);

	const calculateAverageGrade = (grades) => {
		const stringToNumber = grades.map((grade) => parseFloat(grade));
		const sumOfGrades = stringToNumber.reduce((prev, sum) => prev + sum, 0);
		const averageGrade = (sumOfGrades / grades.length).toFixed(2);
		return averageGrade;
	};

	const onShowGradesHandler = () => {
		setShowGrades((prevState) => {
			return !prevState;
		});
	};

	const onEnterTag = (event) => {
		if (event.code === "Enter") {
			if (event.target.value.trim().length === 0) {
				setIsTagEmpty(true);
				return;
			}
			const studentList = [...props.studentList];
			const searchedStudent = studentList.find(
				(student) => student.id === props.id
			);
			const itemIndex = studentList.indexOf(searchedStudent);
			studentList[itemIndex].tags.push(event.target.value);
			props.addTag(studentList);
			event.target.value = "";
			setIsTagEmpty(false);
		}
	};

	const validTag = isTagEmpty ? "tagError" : "";

	return (
		<li className={classes.listItem}>
			<div className={classes.imageDiv}>
				<img className={classes.image} src={props.pic} alt="student " />
			</div>
			<div className={classes.infoDiv}>
				<h1>
					{props.firstName} {props.lastName}
				</h1>
				<div>Email: {props.email}</div>
				<div>Company: {props.company}</div>
				<div>Skill: {props.skill}</div>
				<div>Average: {calculateAverageGrade(props.grades)}%</div>
				{showGrades && (
					<div className={classes.grades}>
						{props.grades.map((grade, index) => (
							<div key={index}>{`Test ${index + 1}: ${grade}`}</div>
						))}
					</div>
				)}
				{props.tags && (
					<div>
						{props.tags.map((tag) => (
							<p key={tag} className={classes.tag}>
								{tag}
							</p>
						))}
					</div>
				)}

				<input
					className={`${classes.inputTag} ${classes[validTag]}`}
					onKeyDown={onEnterTag}
					type="text"
					placeholder="Add a tag"
				/>
				{isTagEmpty && (
					<p className={classes.tagErrorMessage}>Tag must not be empty</p>
				)}
			</div>
			{showGrades ? (
				<button className={classes.minus} onClick={onShowGradesHandler}>
					<FaMinus />
				</button>
			) : (
				<button className={classes.plus} onClick={onShowGradesHandler}>
					<ImPlus />
				</button>
			)}
		</li>
	);
};

export default Student;
