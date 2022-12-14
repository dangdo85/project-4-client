import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'


const linkStyle = {
    color: 'white',
	fontFamily: 'Bubblegum Sans'
}
const authenticatedOptions = (
	<>
		<Nav.Item className='m-2'>
            <Link to="/greenhome/myplants" style={ linkStyle }>
                My Garden
            </Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='/greenhome/addplant' style={linkStyle}>
				Create A Plant 
			</Link>
        </Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>
		<Nav.Item className='m-2'>
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item className='m-2'>
			<Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item className='m-2'>
			<Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Item className='m-2'>
		{/* <Nav.Link> */}
			<Link to='/greenhome' style={linkStyle}>
				Popular House Plants
			</Link>
		{/* </Nav.Link> */}
		</Nav.Item>
	</>
)

const Header = ({ user }) => (
	<Navbar bg='success' variant='dark' expand='md'>
		<Navbar.Brand>
            <Link to='/' style={linkStyle}>
               <h2>Green Home</h2>
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, {user.email}</span>
				)}
				{alwaysOptions}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
		
	</Navbar>
)

export default Header
