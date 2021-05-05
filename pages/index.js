import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import DB from "../firebase/firebase";

export default function Home() {
	const [data, setData] = useState([]);

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [pin, setPin] = useState("");

	const pincode = "201301";
	const qdate = "11-05-2021";

	const sendData = () => {
		console.log(name);
		console.log(email);
		console.log(pin);
		DB.ref("users/" + pin).push({
				name: name,
				email: email,
				pin: pin,
			})
			.then({
				name: setName(""),
				email: setEmail(""),
				pin: setPin(""),
			});
		console.log("DATA UPDATED");
	};

	// const apiURL = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode="+{pincode}+"&date="+{qdate}

	const fetchData = async () => {
		axios
			.get(
				"https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin",
				{
					params: {
						pincode: pincode,
						date: qdate,
					},
				}
			)
			.then((response) => {
				console.log(response.data.centers);
				setData(response.data.centers);
			})
			.catch((error) => {
				console.log("error");
			});
	};

	const check = () => {
		const array = [];
		for (var c = 0; c < data.length; c++) {
			array.push(data[c].sessions);
		}
		for (var i = 0; i < array.length; i++) {
			for (var j = 0; j < array[i].length; j++) {
				if (array[i][j].available_capacity > 0) {
					console.log(
						"available at: ",
						data[i].name,
						"\t",
						data[i].address,
						"\nDate: ",
						array[i][j].date
					);
				}
			}
		}
	};

	return (
		<div>
			SAJAL SPARSH
			<br />
			<button onClick={fetchData}>FETCH</button>
			<button onClick={check}>CHECK</button>
			<br />
			<div>
				<h1>name</h1>
				<input
					type="text"
					name="name"
					onChange={(e) => setName(e.target.value)}
					value={name}
				/>
				<br />
				<h1>email</h1>
				<input
					type="text"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				/>
				<br />
				<h1>pincode</h1>
				<input
					type="number"
					onChange={(e) => setPin(e.target.value)}
					value={pin}
				/>
				<br />
				<button onClick={sendData}>SEND</button>
			</div>
		</div>
	);
}

//for (var i in data[c].sessions) {
// 	setDate(data[c].sessions[i].date);
// 	setAge(data[c].sessions[i].min_age_limit);
// 	setCovid(data[c].sessions[i].available_capacity);
// }
