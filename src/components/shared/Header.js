import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}
const authenticatedOptions = (
	<>
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
		<Nav.Item className='m-2'>
<<<<<<< HEAD
            <Link to="/greenhome/myplants" style={ linkStyle }>
                My Plants
            </Link>
        </Nav.Item>
=======
			<Link to='/greenhome/addplant' style={linkStyle}>
				Create A Plant 
			</Link>
		</Nav.Item>
>>>>>>> 06dc16263ea82b96ed34bd8621e137daffee7f05
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
		<Nav.Link>
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Link>
	</>
)

const Header = ({ user }) => (
	<Navbar bg='success' variant='dark' expand='md'>
		<Navbar.Brand>
            <Link to='/' style={linkStyle}>
<<<<<<< HEAD
                Green Home
=======
                Welcome to Green Home
>>>>>>> 06dc16263ea82b96ed34bd8621e137daffee7f05
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
