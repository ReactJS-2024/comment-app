import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'

function NotFound() {
  return (
    <Card>
        <h1>This page does not exist!</h1>
        <Link
            to='/'
            className="back-to-home-link">
                Back to Home Page
        </Link>
    </Card>
  )
}

export default NotFound