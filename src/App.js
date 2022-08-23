// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import ShowPlant from './components/plants/ShowPlant'
import PlantForm from './components/shared/PlantForm'
import CreatePlant from './components/plants/CreatePlant'
import MyPlantsIndex from './components/my_plants/MyPlantsIndex'

const App = () => {

const [user, setUser] = useState(null)
const [msgAlerts, setMsgAlerts] = useState([])
const [my_plants, setMyPlants] = useState([])

console.log('user in app', user)
console.log('message alerts', msgAlerts)
const clearUser = () => {
console.log('clear user ran')
setUser(null)
}

const deleteAlert = (id) => {
	setMsgAlerts((prevState) => {
		return (prevState.filter((msg) => msg.id !== id) )
	})
}

const msgAlert = ({ heading, message, variant }) => {
	const id = uuid()
	setMsgAlerts(() => {
		return (
			[{ heading, message, variant, id }]
	)
	})
}

useEffect(() => {
	const myPlantList = JSON.parse(
		localStorage.getItem('My-Plant-List')
	);

	if (myPlantList) {
		setMyPlants(myPlantList);
	}
}, []);

const saveToLocalStorage = (items) => {
	localStorage.setItem('My-Plant-List', JSON.stringify(items));
};

const handleMyPlantClick = (plant) => {
	if (!plant.userId) {
		plant.userId = user._id
	}
	// console.log(favorites)
	let status = false
	// console.log(status)

	function containsPlant(obj) {
		for (let i = 0; i<my_plants.length; i++) {
			// console.log('my_plants id', my_plants[i]._id)
			// console.log('obj id', obj._id)
			// console.log('user id', user._id)
			// console.log('plant user id', plant.userId)
			if(my_plants[i]._id === obj._id && user._id === my_plants[i].userId) {
				return status = true
			}
		}
		// console.log(status)
		return
	}
	containsPlant(plant, my_plants)
	console.log('status', status)
	if (!status && user) {
		const newMyPlantList = [...my_plants, plant]
		// console.log('working')
		setMyPlants(newMyPlantList);
		saveToLocalStorage(newMyPlantList);
	}
};

const handleRemoveClick = (plant) => {
	const findPlant = my_plants.findIndex(
		(myPlant) => myPlant._id === plant._id && myPlant.userId === user._id
	);
	
	// console.log('locate plant', findPlant)
	const updateMyPlantList = my_plants.filter(
		(_, i) => i != findPlant
	)
	
	let status = false
	// console.log(status)

	function containsUser(obj) {
		for (let i = 0; i<my_plants.length; i++) {
			// console.log('favorites id', favorites[i]._id)
			// console.log('obj id', obj._id)
			// console.log('user id', user._id)
			// console.log('plant user id', plant.userId)
			if(my_plants[i]._id === obj._id && user._id === my_plants[i].userId) {
				return status = true
			}
		}
		// console.log(status)
		return
	}
	containsUser(plant)

	console.log('clicked')
	console.log('plant user id', plant.userId)
	
	if (status) {
		// console.log('current user', user._id)
		// console.log('plant user', plant.userId)
		setMyPlants(updateMyPlantList);
		saveToLocalStorage(updateMyPlantList);
	}
};

	return (
		<Fragment>
			<Header user={user} />
			<Routes>
				<Route 
					path='/' element={<Home msgAlert={msgAlert} user={user} />} 
				/>
				<Route
					path='/sign-up'
					element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-in'
					element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-out'
					element={
						<RequireAuth user={user}>
						<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} setMyPlants={setMyPlants}/>
						</RequireAuth>}
				/>
				<Route
					path='/change-password'
					element={
						<RequireAuth user={user}>
						<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
				/>
				<Route 
					path='/greenhome' element={<Home msgAlert={msgAlert} user={user} handleMyPlantClick={handleMyPlantClick} my_plants={ my_plants } 
					handleRemoveClick={handleRemoveClick}/>} 
				/>
				<Route
					path="/greenhome/:id"
					element={ <ShowPlant user={ user } msgAlert={ msgAlert } />}				
				/>
				<Route
					path="/greenhome/addplant"
					element={
						<RequireAuth user={ user }>
							<CreatePlant msgAlert={msgAlert} user={user} />
						</RequireAuth>  
					}
				/>
				<Route
					path='/greenhome/myplants'
					element={
						<MyPlantsIndex 
						msgAlert={msgAlert} clearUser={clearUser} user={user} 
						handleMyPlantClick={handleMyPlantClick} my_plants={ my_plants } 
						handleRemoveClick={handleRemoveClick}/>							
					}
				/>
				</Routes>
					{msgAlerts.map((msgAlert) => (
						<AutoDismissAlert
							key={msgAlert.id}
							heading={msgAlert.heading}
							variant={msgAlert.variant}
							message={msgAlert.message}
							id={msgAlert.id}
							deleteAlert={deleteAlert}
				/>
			))}
		</Fragment>
	)
}

export default App