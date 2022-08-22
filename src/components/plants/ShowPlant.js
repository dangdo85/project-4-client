import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page
import { Container, Card, Button } from 'react-bootstrap'
import LoadingScreen from '../shared/LoadingScreen'
import { getOnePlant, updatePlant, removePlant } from '../../api/plants'
import messages from '../shared/AutoDismissAlert/messages'
// import EditPlantModal from './EditPlantModal'
// import NewToyModal from '../toys/NewToyModal'
// import ShowToy from '../toys/ShowToy'
// We need to get the plant's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component
// we'll use a style object to lay out the toy cards
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}
const ShowPlant = (props) => {
    const [plant, setPlant] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    // const [toyModalShow, setToyModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)
    const { id } = useParams()
    console.log("here are the props", props)
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to
    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the plant in showPlant', plant)
    // destructuring to get the id value from our route parameters
    useEffect(() => {
        getOnePlant(id)
            .then(res => setPlant(res.data.plant))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting plant',
                    message: messages.getPlantsFailure,
                    variant: 'danger'
                })
                navigate('/')
                //navigate back to the home page if there's an error fetching
            })
    }, [updated])
    //****** WE DONT NEED THIS HERE MOVE TO MY SHOW PLANT ********///////
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
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {
                msgAlert({
                    heading: 'Error removing plant',
                    message: messages.removePlantFailure,
                    variant: 'danger'
                })
            })
    }
    // let toyCards
    // if (pet) {
    //     if (pet.toys.length > 0) {
    //         toyCards = pet.toys.map(toy => (
    //             <ShowToy
    //                 key={toy._id}
    //                 toy={toy}
    //                 pet={pet}
    //                 user={user}
    //                 msgAlert={msgAlert}
    //                 triggerRefresh={() => setUpdated(prev => !prev)}
    //             />
    //         ))
    //     }
    // }
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
                </Card>
            </Container>
                    {/* <Card.Footer>
                        {
                            pet.owner && user && pet.owner._id === user._id
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)}
                                    className="m-2"
                                    variant="warning"
                                >
                                    Edit Pet
                                </Button>
                                <Button onClick={() => removeThePet()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    Set {pet.name} Free
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer> */}
            {/* <Container style={cardContainerLayout}>
                {toyCards}
            </Container> */}
            {/* <EditPetModal
                user={user}
                pet={pet}
                show={editModalShow}
                updatePet={updatePet}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)}
            /> */}
            {/* <NewToyModal
                pet={pet}
                show={toyModalShow}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setToyModalShow(false)}
            /> */}
        </>
    )
}
export default ShowPlant