import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout, getUser } from '../../ducks/reducer'

import home_icon from '../../assets/home_logo.png'
import new_icon from '../../assets/new_logo.png'
import logout_icon from '../../assets/shut_down.png'

import './Nav.css'

class Nav extends Component {

    componentDidMount() {
        this.getUser()
    }

    logout = () => {
        axios.post('/api/auth/logout').then(() => {
            this.props.logout()
            this.props.history.push('/')
        })
    }

    getUser() {
        axios.get('/api/auth/me').then(res => {
            this.props.getUser(res.data)
        }).catch(err => {
            alert(err.request.response)
        })
    }

    render() {
        return (
            <>
            <div className='background-color' />
            <nav className='nav shadow'>
                <div className='nav-top'>
                    <div className='nav-top-content'>
                        <div className='nav-profile'>
                            {this.props.user.profile_pic ?
                                <img className='nav-profile-img shadow' src={this.props.user.profile_pic} alt='' />
                                :
                                <div className='nav-profile-img shadow'></div>
                            }
                            <label>{this.props.user.username}</label>
                        </div>
                        <div>
                            <Link to='/dashboard'>
                                <img className='nav-icon' src={home_icon} alt='home-icon'/>
                            </Link>
                            <Link to='/new'>
                                <img className='nav-icon' src={new_icon} alt='new-post-icon' />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='nav-bottom'>
                    <img className='nav-icon' src={logout_icon} alt='logout-icon' onClick={this.logout} /> 
                </div>
            </nav>
            
            </>
        )
    }
}

const mapStateToProps = reduxState => {
    const { user } = reduxState
    return {
        user
    }
}

export default connect(mapStateToProps, { logout, getUser })(withRouter(Nav))