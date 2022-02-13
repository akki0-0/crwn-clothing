import React, { Component } from 'react'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, createUserProfileDocument } from '../../firebase/firebase.util'
import './sign-up.styles.scss'

/*
Sign Up k liye form create krna h, handleChange me simply state set kr deni h sbhi fields ki.
handleSubmit me->
(1) Check krna ki password and confirmPassword match hore h ya nhi.
(2) User create karenge using Email and Password [createUserWithEmailAndPassword()]
(3) Jo user details create hui unhe firestore database me store kr denge [createUserProfileDocument]
(4) Fields ko clear kr denge
*/

export class SignUp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password, displayName, confirmPassword } = this.state

        if (password !== confirmPassword) {
            alert("Password don't match");
            return;
        }

        try {
            await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(email, { displayName });
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        }
        catch (error) {
            console.error(error)
        }
    }

    handleChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have a account!</h2>
                <span>Enter your Email and Password to register</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        name='displayName'
                        type='text'
                        value={this.state.displayName}
                        required
                        label='Name'
                        handleChange={this.handleChange} />
                    <FormInput
                        name='email'
                        type='email'
                        value={this.state.email}
                        required
                        label='Email'
                        handleChange={this.handleChange} />
                    <FormInput
                        name='password'
                        type='password'
                        value={this.state.password}
                        required
                        label='Password'
                        handleChange={this.handleChange} />
                    <FormInput
                        name='confirmPassword'
                        type='password'
                        value={this.state.confirmPassword}
                        required
                        label='Confirm Password'
                        handleChange={this.handleChange} />
                    <CustomButton type='Submit'>Register</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp