/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import Student from "./Student";
import Card from "../UI/Card";
import classes from "./Students.module.css";
import Inputs from "./Inputs";

var listForSearch = [];

const Students = () => {
	const [students, setStudents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		//This line of code only runs once since we will only be sending one request
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				"https://api.hatchways.io/assessment/students"
			);
			setIsLoading(false);
			setStudents(response.data.students);
			listForSearch = response.data.students.map((student) => ({
				...student,
				tags: [],
			}));
		} catch (error) {
			console.error(error);
		}
	};

	const modifyStudentList = (studentList) => {
		setStudents([...studentList]);
	};

	const listOfStudents =
		students.length === 0 ? (
			<h4 className={classes.h4}>No results were found</h4>
		) : (
			students.map((student) => (
				<Student
					key={student.id}
					id={student.id}
					firstName={student.firstName}
					lastName={student.lastName}
					pic={student.pic}
					email={student.email}
					company={student.company}
					skill={student.skill}
					grades={student.grades}
					tags={student.tags}
					studentList={listForSearch}
					addTag={modifyStudentList}
				/>
			))
		);

	return (
		<Card className={classes.card}>
			<Inputs studentList={listForSearch} searchResult={modifyStudentList} />
			{isLoading && <p className={classes.loading}>Loading...</p>}
			<ul>{listOfStudents}</ul>
		</Card>
	);
};

export default Students;
