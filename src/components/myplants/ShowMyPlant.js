import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page
import { Container, Card, Button } from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
import { getOneMyPlant, updatePlant, removePlant } from '../../api/myplants'
import messages from '../shared/AutoDismissAlert/messages'
import EditPlantModal from './EditMyPlantModal'


// We need to get the plant's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component
const ShowMyPlant = (props) => {
    const [plant, setPlant] = useState(null)
    const [ editModalShow, setEditModalShow ] = useState(false)
    const { plantid } = useParams()
    const [ updated, setUpdated ] = useState(false)
    
    console.log("This is the IDDDDDDD", plantid)
    console.log("what is this?", useParams())
    // console.log("here are the props", props)
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to
    const { msgAlert, user } = props
    // console.log('user in props', user)
    // console.log('the plant in showPlant', plant)
    // destructuring to get the id value from our route parameters
    // console.log("-----------------------", res.data.plant)
    useEffect(() => {
        getOneMyPlant(user, plantid)
            .then(res => setPlant(res.data.plant))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting plant',
                    message: messages.getPlantsFailure,
                    variant: 'danger'
                })
                // navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [updated])

    // here we'll declare a function that runs which will remove the plant
    // this function's promise chain should send a message, and then go somewhere
    const removeThePlant = () => {
        removePlant(user, plant._id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removePlantSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/greenhome/myplants')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing plant',
                    message: messages.removePlantFailure,
                    variant: 'danger'
                })
            })
    }

    if (!plant) {
        return <LoadingScreen />
    }
    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{ plant.name }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small><img src={`${plant.image}`}></img></small></div>
                            <div><small>Description: { plant.description }</small></div>
                            <div><small>Light: { plant.light }</small></div>
                            <div><small>Water: { plant.water }</small></div>
                            <div><small>Temperature: { plant.temperature }</small></div>
                            <div><small>Poisonous: { plant.poisonous }</small></div>
                        </Card.Text>

                    </Card.Body>    
                    <Card.Footer>                      
                        {
                            plant.owner && user && plant.owner._id === user._id 
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)} 
                                    className="m-2" 
                                    variant="warning"
                                >
                                    Edit Plant
                                </Button>
                                <Button onClick={() => removeThePlant()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Delete {plant.name}
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <EditPlantModal 
                user={user}
                plant={plant} 
                show={editModalShow} 
                updatePlant={updatePlant}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
        </>
    )
}
export default ShowMyPlant