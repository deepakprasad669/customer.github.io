import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom';
import {Table} from 'react-bootstrap';

export default class CustomerHome extends Component {
    constructor(props) {
        super(props)

        const token = localStorage.getItem("token")
        let loggedIn = true
        if(token == null)
        {
            loggedIn = false
        }
        else
        {
            console.log(token)
        }
        this.state = {
            loggedIn
        }
    }
    
    render() {
        if(this.state.loggedIn === false)
        {
            console.log(this.state.loggedIn)
            return <Redirect to ='/home' />
        }
        return (
            <div>
                <h1>Home Page !!!</h1>
                <Link to='/list' style={{float:'left',marginLeft: '40px'}}>
                    CustomerList
                </Link>
                <Link to='/profile' style={{float:'left',marginLeft: '40px'}}>
                    CustomerProfile
                </Link>
                <Link to='/logout' style={{float:'right',marginRight: '40px'}}>
                    Logout
                </Link>
            </div>
        )
    }
}