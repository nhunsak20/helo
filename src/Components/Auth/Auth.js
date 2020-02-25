import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from '../../ducks/reducer'
import axios from 'axios'
import icon from '../../assets/helo_logo.png'

import './Auth.css'

class Auth extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            img: '',
        }
        this.loginClick = this.loginClick.bind(this)
        this.register = this.register.bind(this)
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    loginClick() {
        const { username, password } = this.state

        axios.post('/api/auth/login', {username, password}).then(res => {
            this.props.getUser(res.data)
            this.props.history.push('/dashboard')
        }).catch(err => {
            alert(err.request.response)
        })
    }

    register() {
        const { username, password } = this.state

        axios.post('/api/auth/register', { username, password }).then(res => {
            this.props.getUser(res.data)
            this.props.history.push('/dashboard')
        }).catch(err => {
            alert(err.request.response)
        })
    }


    render(){
        return (
            <div className='auth'>
                <div className='auth-box'>
                    <div className='auth-header'>
                        <img className='auth-icon' src={icon} alt='' />
                        <h1>Helo</h1>
                    </div>
                    <div className='auth-inputs'>
                        <div className='auth-input-row'>
                            <label>Username:</label>
                            <input type='text' name='username' onChange={ this.handleInputChange }/>
                        </div>
                        <div className='auth-input-row'>
                            <label>Password:</label>
                            <input type='password' placeholder='' name='password' onChange={ this.handleInputChange }/>
                        </div>

                    </div>
                    <div className='auth-buttons'>
                        <button onClick={this.loginClick}>Login</button>
                        <button onClick={this.register}>Register</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, { getUser })(Auth)