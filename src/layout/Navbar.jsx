import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import './navbar.css'

function Navbar() {
  const routes = [
    {
      text: 'Transactions',
      url: '/transaction',
    }
  ]
  const links = routes.map((route, index) => (
    <NavLink to={route.url} key={index} className="btn btn-ghost btn-sm">
      {route.text}
    </NavLink>
  ))
  return (
    <nav className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
      <div className="navbar-start px-2 mx-2">
        <Link to="/" className="inline-block text-lg font-bold text-primary">
          <span>Transaction </span>
        </Link>
      </div>
      <div className="navbar-center px-2 mx-2 hidden md:flex">
        <div className="flex items-stretch space-x-2">
          <NavLink to="/" className="btn btn-ghost btn-sm" exact>
            Home
          </NavLink>
          {links}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
