import React, { Component } from 'react'
import axios from 'axios';
import { Container,Col,Row, Button, Form, Table} from 'react-bootstrap';
import { Redirect,Link } from 'react-router-dom';

export default class CustomerLoginP extends Component {
 
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")
        let loggedIn = true
        if (token ==  null)
        {
            loggedIn = false
        }
        else
        {
            console.log(token)
        }
        this.initialState = {
            email:"",
            password:"",
            loggedIn
        }
        this.state=this.initialState;
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    handleChange(c)
    {
        const name = c.target.name;
        const value = c.target.value;

        this.setState({
            [name]:value
        })
    }

    handleSubmit(c)
    {
        c.preventDefault()
        console.log(this.state)
        const {email,password}=this.state;
        let cus = {
            email:this.state.email,
            password:this.state.password
        }

        axios.post("http://videhjaiswal.pythonanywhere.com/customer/customer_api/customers/login",cus).then(response => {
            console.log(response.data.result)
            let result =response.data.result
            if (result === "FAIL")
            {
                alert(response.data.message)
                return
            } 
            let dict=response.data.data
             console.log(response)
           // localStorage.setItem("cusID",dict["cusId"]);

            if (email === this.state.email && password === this.state.password )
            {
                localStorage.setItem("token","logincheck")
                this.setState({
                    loggedIn:true
                })
            }
        }).catch(error =>{
            console.log(error)
        }) 
    }
    
    render() {

        if(this.state.loggedIn)
        {
            return <Redirect to='/home' />
        }

        return (
            <div style={{backgroundcolor:"red"}}>
                <h1>Customer Login</h1>
                
                <Form onSubmit={this.handleSubmit}>
    <Form.Row>
    <Form.Group as={Col} controlId="formGridEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="text" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email" />
    </Form.Group>
    </Form.Row>

    <Form.Row>
    <Form.Group as={Col} controlId="formGridPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter password" />
    </Form.Group>
  </Form.Row>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
<Link to='/register' style={{float:'right',marginRight: '40px'}}>
                    Register
                </Link>
            </div>
        )
    }
}