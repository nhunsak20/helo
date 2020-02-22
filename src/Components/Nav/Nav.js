import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import home_icon from '../../assets/home_logo.png'
import new_icon from '../../assets/new_logo.png'
import logout_icon from '../../assets/shut_down.png'

import './Nav.css'

class Nav extends Component {

    render(){
        console.log(this.props)
        return (
            <nav className='nav'>
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
                    <Link to='/'>
                        <img className='nav-icon' src={logout_icon} alt='logout-icon' />
                    </Link>    
                </div>
            </nav>
        )
    }
}

const mapStateToProps = reduxState => {
    const { user } = reduxState
    return {
        user
    }
}

export default connect(mapStateToProps)(Nav)