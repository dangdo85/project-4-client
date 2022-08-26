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
justifyContent: 'center',
backgroundImage: "url('https://t4.ftcdn.net/jpg/03/64/44/51/360_F_364445183_4sG0xrQiEA0OreDQkee3yLD1ak26CWL6.jpg')",
}
const PlantsIndex = (props) => {
const [plants, setPlants] = useState(null)
const [error, setError] = useState(false)
const { msgAlert } = props
// console.log('Props in PlantsIndex', props)
useEffect(() => {
    console.log('owner in useefect', plants)
    // console.log(props)
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
    // console.log('++++++', plants)
    if (error) {
        return <p>Error!</p>
    }
    // If plants haven't been loaded yet, show a loading message
    if (!plants) {
        return <LoadingScreen />
    } else if (plants.length === 0) {
        return <p>No plants yet. Better add some.</p>
    }

    const seededPlants = plants.filter(plants => plants.isSeeded === true)

    const plantCards = seededPlants.map(plant => (
        <Card style={{ width: '30%', margin: 5}} key={ plant._id }>
            <Card.Header><Link to={`/greenhome/${plant._id}`}> { plant.name }</Link></Card.Header>
            <Card.Body>
                <Card.Text>
                    <Link to={`/greenhome/${plant._id}`}> <img src={`${plant.image}`} height="200" width="auto" /></Link>
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















