import React, { Component } from "react";
import {
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";
import classes from "./registration.css";
import axios from "axios/index";
import {Redirect} from 'react-router'

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isRegistered: false,
            name: "",
            second_name: "",
            email: "",
            password: "",
            password2: "",
            confirmationCode: "",
            newUser: null,
            university_id: "",
            errors: [],
            errState: false,
            cancelBut: false
        };
    }

    validateForm() {
        return (
            this.state.name.length > 0 &&
            this.state.second_name.length > 0 &&
            this.state.university_id.length > 0 &&
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.password2
        );
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit =(event)=>{
        if(this.validateForm()){
            console.log("TRUE")
        }
        else{
            console.log("FALSE")
        }
        event.preventDefault();
        console.log("clicked")
        console.log(this.props.username)
        var dataForm = {
            "email": this.state.email,
            "username": this.props.username,
            "name": this.state.name,
            "second_name": this.state.second_name,
            "university_id": this.state.university_id,
            "password": this.state.password,
            "password2": this.state.password2
        }
        axios({
            method: "post",
            url: '/user/register',
            data: dataForm
        }).then(res=>{
            console.log(res)
            this.setState({isRegistered: true})
            this.setState({errState: false})
        }).catch(err=>{
            console.log("Errors: ", err.response.data);
            this.setState({errors: err.response.data})
            this.setState({errState: true})
            console.log("errors 0: ", this.state.errors.errors[0])
        })
    }


    renderForm() {
        return (
            <form className={classes.signup} onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup controlId="name" bsSize="large" className={classes.label}>
                    <ControlLabel>First name</ControlLabel>
                    <br/>
                    <FormControl
                        placeholder="First Name"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <p className={classes.errorText}>{this.state.errState ? this.state.errors.errors[1]:""}</p>
                <FormGroup controlId="second_name" bsSize="large" className={classes.label}>
                    <ControlLabel>Second Name</ControlLabel>
                    <br/>
                    <FormControl
                        placeholder="Second Name"
                        type="text"
                        value={this.state.second_name}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <p className={classes.errorText}>{this.state.errState ? this.state.errors.errors[2]:""}</p>
                <FormGroup controlId="university_id" bsSize="large" className={classes.label}>
                    <ControlLabel>ID</ControlLabel>
                    <br/>
                    <FormControl
                        placeholder="Personal ID"
                        type="id"
                        value={this.state.university_id}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="email" bsSize="large" className={classes.label}>
                    <ControlLabel>Email</ControlLabel>
                    <br/>
                    <FormControl
                        placeholder="Email Address"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <p className={classes.errorText}>{this.state.errState ? this.state.errors.errors[0]:""}</p>
                <FormGroup controlId="password" bsSize="large" className={classes.label}>
                    <ControlLabel>Password</ControlLabel>
                    <br/>
                    <FormControl
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <p className={classes.errorText}>{this.state.errState ? this.state.errors.errors[4]:""}</p>
                <FormGroup controlId="password2" bsSize="large" className={classes.label}>
                    <ControlLabel>Confirm Password</ControlLabel>
                    <br/>
                    <FormControl
                        placeholder="Confirm Password"
                        value={this.state.password2}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <p className={classes.errorText}>{this.state.errState ? this.state.errors.errors[3]:""}</p>
                <button className={classes.button} onClick={e=>this.setState({cancelBut:true})}>Cancel</button>
                <button className={classes.button} type="submit">Register</button>
            </form>
        );
    }

    render() {
        if((this.state.isRegistered)||(this.state.cancelBut)){
            return <Redirect to = "/"/>
        }
        else {
            return (
                <div>
                    {this.state.newUser === null}
                    {this.renderForm()}
                </div>
            );
        }
    }
}

export default Registration