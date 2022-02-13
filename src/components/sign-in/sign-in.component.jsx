import React, { Component } from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss'
import CustomButton from '../custom-button/custom-button.component'
import { auth, signInWithGoogle } from '../../firebase/firebase.util';

/* 
Sign in krne k liye from create krna h fir handleChange me to simply state set kr deni h.
handleSumit me->
(1)sign in krne k liye email aur password chahiye hota h to auth.signInWithEmailAndPassword() use krke 
sign in kr dena h
(2) fields ko clear kr dena.
*/

export class SignIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { email, password } = this.state
        try {
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({ email: '', password: '' })
        }
        catch (error) {
            alert("Incorrect Email or Password")
            console.log(error)
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
            <div className='sign-in'>
                <h1>I already have an account</h1>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>

                    <FormInput
                        name='email'
                        type='email'
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label='Email'
                        required
                    />

                    <FormInput
                        name='password'
                        type='password'
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label='Password'
                        required
                    />

                    {/*Sign In typed within CustomButton is the children*/}
                    {/*isGoogleSign will pass true since we haven't provided any value*, make sure to give type='button' to google button or clicking it will automatically submit the form since the default type is submit.*/}
                    <div className='buttons'>
                        <CustomButton type='submit'>Sign In</CustomButton>
                        <CustomButton type='button' isGoogleSignIn onClick={signInWithGoogle}>Sign In with Google</CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;
