constructor(props){
    super(props)

       this.state = {
        users:[]
            }
        }

componentDidMount()
{
    this.getUserDetails()
}

getUserDetails()
{
    axios.get("http://videhjaiswal.pythonanywhere.com/customer/customer_api/customers/").then(response=>{
        this.setState({
            users:response.data
        })
            //console.log(this.state.users[0].name)
    }).catch(error =>{
        alert(error)
    })
}

update = (getUser) => {

    this.setState((state)=>(
        {
            getId:getUser.id,
            name:getUser.name,
            gender:getUser.gender,
            account_no:getUser.account_no,
            balance:getUser.balance,
            accounttype:getUser.accounttype,
            email:getUser.email
        }
    ))
}

onDeleteCusRecord(cusID) {
    alert(cusID);
    axios.delete('http://videhjaiswal.pythonanywhere.com/customer/customer_api/customers/' + cusID + '/', { cusId: cusID,}).then(response => {
        console.log("Data:", response);
       this.getCusList()
    })
        .catch(error => {
            console.log("Error:", error)
        })
}

render() {
    if(this.state.name !== "" && this.state.email !== "")
    {
    //    console.log(this.state.name);
        return <Redirect
        to={{
        pathname: "/update",
        state: { 
            getId:this.state.getId,
            name: this.state.name ,
            gender:this.state.gender,
            account_no:this.state.account_no,
            balance:this.state.balance,
            accounttype:this.state.accounttype,
            email:this.state.email,
        }
      }}
    />
    }

    return (
        <div>
            <h1>Customers List</h1>
            <Table responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Account No</th>
                        <th>Balance</th>
                        <th>Account type</th>
                        <th>Pub Date</th>
                        <th>Email</th>
                      {/* <th>Password</th> */}
                      <th colSpan="2"></th>
                       
                    </tr>
                </thead>
                <tbody>
                        {this.state.users.map((user)=>
                           <tr key={user.id}>
                                <td>{user.id}</td>    
                                <td>{user.name}</td>
                                <td>{user.gender}</td>
                                <td>{user.account_no}</td>
                                <td>{user.balance}</td>
                                <td>{user.accounttype}</td>
                                <td>{user.pub_date}</td>
                                <td>{user.email}</td>
                              {/* <td>{user.password}</td> */}
                             
                              <td><Button variant="danger"
                                onClick={() => this.onDeleteCusRecord(user.id)}>Delete</Button></td>
                            
                     <td> <Button variant="info"
                           onClick={()=> this.update(user)}>Update</Button></td>
                       
                              
                           </tr>
                        )}
                    
                </tbody>
            </Table>
        </div>
    )
}

}



/////////////


constructor(props) {
    super(props)

    this.initialise = {
        "id":"" ,
        "name": "",
        "gender": "",
        "account_no":"",
        "balance":"",
        "email": "",
        "accounttype": "",
        "pub_date": "",
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
        id:this.state.id,
        name:this.state.name,
        gender:this.state.gender,
        account_no:this.state.account_no,
        balance:this.state.balance,
        email:this.state.email,
        accounttype:this.state.accounttype,
        pub_date:this.state.pub_date,
    }
   
 axios.put("http://videhjaiswal.pythonanywhere.com/customer/customer_api/customers/17/",cusrecord).then(response =>{
console.log(response)
}).catch(error =>{
    alert("Error:", error)
})
    this.setState(this.initialise)
}

render(){
return(
 <div>

<Link to='/CustomerList' style={{backgroundColor:'#ffc107',margin:'1rem',marginTop:'1rem',padding:'7px',borderRadius:'5px', fontSize:'1.5rem',color:'black' }}>
            Back
        </Link>
    <h1><marquee style={{backgroundColor:'blue',color:'white',}}>Update Customer Record</marquee></h1>
    <form onSubmit={this.handleSubmit}>
     <Table responsive>
     <tbody>
     <tr>
        <th><h3>ID:</h3></th>
        <td><input type="text" name="id" value={this.state.id} onChange={this.onhandleChange} placeholder="Enter Id"></input></td>
    </tr>
    <tr>
        <th><h3>Name:</h3></th>
        <td><input type="text" name="name" value={this.state.name} onChange={this.onhandleChange} placeholder="Enter Name"></input></td>
    </tr>
   
     <tr>
        <th><h3>Gender:</h3></th>
        <td><input type="text" name="gender" value={this.state.gender} onChange={this.onhandleChange} placeholder="Gender"></input></td>
    </tr>
    <tr>
        <th><h3>Account No:</h3></th>
        <td><input type="text" name="account_no" value={this.state.account_no} onChange={this.onhandleChange} placeholder="Account No"></input></td>
    </tr>
    <tr>
        <th><h3>Balance:</h3></th>
        <td><input type="text" name="balance" value={this.state.balance} onChange={this.onhandleChange} placeholder="Balance"></input></td>
    </tr>
    <tr>
        <th><h3>Email:</h3></th>
        <td><input type="email" name="email" value={this.state.email} onChange={this.onhandleChange} placeholder="Enter Email"></input></td>
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
        <th><h3>Pub_date:</h3></th>
        <td><input type="text" name="pub_date" value={this.state.pub_date} onChange={this.onhandleChange} placeholder="Pub_date"></input></td>
    </tr>
    <tr>
        <th></th>
      <td><Button variant="primary" type="submit">Register</Button></td>
   </tr>
   <tr>
      { <td colSpan="2"> <Button type="button" variant="warning" onClick={()=> this.update(this.state.id)} >Update</Button>
              </td>}
        </tr>


     </tbody>
      </Table>
     </form>
 </div>
)  

}
}