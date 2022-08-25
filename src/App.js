// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from 'react'
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
import CreateMyPlant from './components/myplants/CreateMyPlant'
import MyPlantsIndex from './components/myplants/MyPlantsIndex'
import PlantForm from './components/shared/PlantForm'
import ShowMyPlant from './components/myplants/ShowMyPlant'
import EditMyPlantModal from './components/myplants/EditMyPlantModal'

const App = () => {
const [user, setUser] = useState(null)
const [msgAlerts, setMsgAlerts] = useState([])
const [myPlants, setMyPlants] = useState([])
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
    return (
        <Fragment>
            <Header user={user} />
            <Routes>
                <Route
                    path='/' element={<Home msgAlert={msgAlert} user={user} />}
                />
                <Route
                    path='/greenhome' element={<Home msgAlert={msgAlert} user={user} />}
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
                        <SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
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
                    path="/greenhome/:id"
                    element={ <ShowPlant user={ user } msgAlert={ msgAlert } />}
                />
                <Route
                    path="/greenhome/myplants"
                    element={
                        <RequireAuth user={ user }>
                            <MyPlantsIndex msgAlert={msgAlert} user={user} myPlants={myPlants}/>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/greenhome/myplants/:myplantid"
                    element={
                        <RequireAuth user={ user }>
                            <ShowMyPlant msgAlert={msgAlert} user={user} myPlants={myPlants}/>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/greenhome/addplant"
                    element={
                        <RequireAuth user={ user }>
                            <CreateMyPlant msgAlert={msgAlert} user={user} myPlants={myPlants}/>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/greenhome/myplants/:myplantid"
                    element={
                        <RequireAuth user={ user }>
                            <EditMyPlantModal msgAlert={msgAlert} user={user} myPlants={myPlants}/>
                        </RequireAuth>
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