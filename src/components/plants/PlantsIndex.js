import { useState,useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllPlants } from '../../api/plants'
import messages from '../shared/AutoDismissAlert/messages'


// PlantsIndex should make a request to the api
// To get all plants
// Then display them when it gets them

// style for our card container
const cardContainerStyle = {
display: 'flex',
flexFlow: 'row wrap',
justifyContent: 'center'
}

const PlantsIndex = (props) => {
const [plants, setPlants] = useState(null)
const [error, setError] = useState(false)

const { msgAlert } = props

console.log('Props in PlantsIndex', props)

useEffect(() => {
    console.log(props)
    getAllPlants()
        .then(res => setPlants(res.data.plants))
        .catch(err => {
            msgAlert({
                heading: 'Error Getting Plants',
                message: messages.getPlantsFailure,
                variant: 'danger',
            })
            setError(true)
        })    
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    // If plants haven't been loaded yet, show a loading message
    if (!plants) {
        return <LoadingScreen />
    } else if (plants.length === 0) {
        return <p>No plants yet. Better add some.</p>
    }

    const plantCards = plants.map(plant => (
        <Card style={{ width: '30%', margin: 5}} key={ plant.id }>
            <Card.Header><Link to={`/greenhome/${plant.id}`}> { plant.name }</Link></Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/greenhome/${plant.id}`}> <img src={`${plant.image}`} height="200" width="auto" /></Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div style={ cardContainerStyle }>
            { plantCards }
        </div>
    )
}

export default PlantsIndex