import React, { Component } from 'react'
import {Link} from 'react-router-dom';

export default class CustomerLogout extends Component {
    
    constructor(props) {
        super(props)
        localStorage.removeItem("token")
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div>
                <Link to='/login'>Login Again</Link>
            </div>
        )
    }
}