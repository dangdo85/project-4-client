import PlantsIndex from './plants/PlantsIndex'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const { msgAlert } = props

	return (
		<>
			{/* <h2>See the Plants</h2> */}
			<PlantsIndex msgAlert={ msgAlert }/>
		</>
	)
}

export default Home