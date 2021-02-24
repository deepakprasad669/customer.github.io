import React, { Component } from 'react'
import axios from 'axios';
import {Table, Button} from 'react-bootstrap';

export default class CustomerRegister extends Component{
        constructor(props) {
            super(props)
        
            this.initialise = {
                "name":"",
                "gender":"",
                "balance":"",
                "account_no":"",
                "accounttype":"",
                "email":"",
                "password":"",
            }   
            this.state=this.initialise;
            this.onhandleChange=this.onhandleChange.bind(this)
            this.handleSubmit=this.handleSubmit.bind(this)
        }
        onhandleChange(c)
        {
            const name=c.target.name
            const value=c.target.value

            this.setState({
                [name]:value
            })
        }

        handleSubmit(c)
        {
            c.preventDefault();
            console.log(this.state)
            let cusrecord={
                name:this.state.name,
                gender:this.state.gender,
                balance:this.state.balance,
                account_no:this.state.account_no,
                accounttype:this.state.accounttype,
                email:this.state.email,
                password:this.state.password,
                
            }
           
         axios.post("http://videhjaiswal.pythonanywhere.com/customer/customer_api/customers/register",cusrecord).then(response =>{
        console.log(response)
        }).catch(error =>{
            alert("Error:", error)
        })
            this.setState(this.initialise)
   }

   render(){
     return(
         <div>
            <h1><marquee style={{backgroundColor:'red',color:'white',}}>Customer Registration Form</marquee></h1>
            <form onSubmit={this.handleSubmit}>
             <Table responsive>
             <tbody>
             <tr>
                <th><h3>Name:</h3></th>
                <td><input type="text" name="name" value={this.state.name} onChange={this.onhandleChange} placeholder="Enter Name"></input></td>
            </tr>
            <tr>
                <th><h3>Gender:</h3></th>
                <td><input type="text" name="gender" value={this.state.gender} onChange={this.onhandleChange} placeholder="Gender"></input></td>
            </tr>
           
             <tr>
                <th><h3>Balance:</h3></th>
                <td><input type="text" name="balance" value={this.state.balance} onChange={this.onhandleChange} placeholder="Balance"></input></td>
            </tr>
            <tr>
                <th><h3>Account No:</h3></th>
                <td><input type="text" name="account_no" value={this.state.account_no} onChange={this.onhandleChange} placeholder="Account No"></input></td>
            </tr>

            <tr>
                 <th><h3>Bank Account Type:</h3></th>
                 <td>
                    <select name="accounttype" value={this.state.accounttype} onChange={this.onhandleChange}>
                    <option value="">Select Account Type</option>
                    <option value="Saving">Saving</option>
                    <option value="Current">Current</option>
                    <option value="Fixed">Fixed</option>
                    <option value="Joint">Joint</option>
                 </select>
                 </td>
                </tr>
            
             <tr>
                <th><h3>Email:</h3></th>
                <td><input type="email" name="email" value={this.state.email} onChange={this.onhandleChange} placeholder="Enter Email"></input></td>
            </tr>
            <tr>
                <th><h3>Password:</h3></th>
                <td><input type="password" name="password" value={this.state.password} onChange={this.onhandleChange} placeholder="Password"></input></td>
            </tr>
            <tr>
                <th></th>
              <td><Button variant="primary" type="submit">Register</Button></td>
           </tr>


             </tbody>
              </Table>
             </form>
         </div>
     )  

   }
}