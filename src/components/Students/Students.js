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

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await axios.get(
				"https://api.hatchways.io/assessment/students"
			);
			setStudents(response.data.students);
			listForSearch = response.data.students.map((student) => ({
				...student,
				tags: [],
			}));
		} catch (error) {
			console.error(error);
		}
	};

	const getSearchResult = (studentList) => {
		setStudents([...studentList]);
	};

	const addTagToStudent = (studentList) => {
		setStudents([...studentList]);
	};

	return (
		<Card className={classes.card}>
			<Inputs studentList={listForSearch} searchResult={getSearchResult} />

			<ul>
				{students.map((student) => (
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
						addTag={addTagToStudent}
					/>
				))}
			</ul>
		</Card>
	);
};

export default Students;
