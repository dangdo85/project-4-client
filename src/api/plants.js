import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllPlants = () => {
    return axios(`${apiUrl}/greenhome`)
}

// READ => SHOW
export const getOnePlant = (id) => {
    console.log("plant id +++++++++++++", id)
    return axios(`${apiUrl}/greenhome/${id}`)
}

// CREATE
export const createPlant = (user, newPlant) => {
    // console.log('createPlant in api was hit')
    // in our createplant form, we're building an object
    // when we pass that object into the api createPlant function,
    // it's going to look like the plants in our database
    // we're going to refer to this as newPlant
    // console.log('this is user', user)
    // console.log('this is newPlant', newPlant)
	return axios({
		url: apiUrl + '/plants',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { plant: newPlant }
	})
}

// UPDATE
export const updatePlant = (user, updatedPlant) => {
    // console.log('createPlant in api was hit')
    // in our createplant form, we're building an object
    // when we pass that object into the api createPlant function,
    // it's going to look like the plants in our database
    // we're going to refer to this as newPlant
    // console.log('this is user', user)
    console.log('this is updatedPlant', updatedPlant)
	return axios({
		url: `${apiUrl}/plants/${updatedPlant._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { plant: updatedPlant }
	})
}

// DELETE
export const removePlant = (user, plantId) => {
    return axios({
        url: `${apiUrl}/plants/${plantId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}