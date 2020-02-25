import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import no_img from '../../assets/no_image.jpg'

import './Form.css'

class Form extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            img: '',
            content: '',
            isLoaded: false
        }

        this.submitClick = this.submitClick.bind(this)
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitClick() {
        const { title, img, content } = this.state

        if (title && content) {
            axios.post(`/api/posts/${this.props.user.user_id}`,{
                title: title,
                img: img,
                content: content
            }).then(() => {
                this.props.history.push('/dashboard')
            }).catch(err => {
                alert(err.request.response)
            })
        } else {
            alert('Please filled it out')
        }
    }   

    onError(event) {
        event.target.onerror = null
        event.target.src = no_img
    }

    render(){
        return (
            <section className='form'>
                <div className='form-box shadow'>
                    <h1>New Post</h1>
                    <div className='form-content'>
                        <div className='form-input-content'>
                            <span className='form-title'>Title:</span>
                            <input type='text' name='title' onChange={this.handleInputChange} />
                        </div>
                        <div className='form-img-content shadow'>
                            <img className='form-img' src={this.state.img} onLoad={() => this.setState({isLoaded: true})} onError={e => this.onError(e)} style={this.state.isLoaded ? {} : {display: 'none'}} alt=''/>
                        </div>
                        <div className='form-input-content'>
                            <span className='form-title'>Image URL:</span>
                            <input type='text' name='img' onChange={this.handleInputChange} />
                        </div>
                        <div className='form-input-content'>
                            <span className='form-title'>Content:</span>
                            <textarea type='textarea' rows='5' column='100' name='content' onChange={this.handleInputChange} />
                        </div>
                    </div>
                    <button onClick={this.submitClick}>Post</button>
                </div>
            </section>
        )
    }
}

const mapStateToProps = reduxState => {
    const { user } = reduxState
    return {
        user
    }
}

export default connect(mapStateToProps)(Form)