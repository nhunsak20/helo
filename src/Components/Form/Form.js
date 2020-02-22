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
        axios.post(`/api/posts/${this.props.user.id}`,{
            title: this.state.title,
            img: this.state.img,
            content: this.state.content
        }).then(() => {
            this.props.history.push('/dashboard')
        }).catch(err => {
            alert(err.request.response)
        })
    }   

    onError(event) {
        event.target.onerror = null
        event.target.src = no_img
    }

    render(){
        console.log(this.props.user)
        return (
            <section className='form'>
                <div>
                    <h1>New Post</h1>
                    <div>
                        <div>
                            <span>Title:</span>
                            <input type='text' name='title' onChange={this.handleInputChange} />
                        </div>
                        <div>
                            <img clsasName='shadow' src={this.state.img} onLoad={() => this.setState({isLoaded: true})} onError={e => this.onError(e)} style={this.state.isLoaded ? {} : {display: 'none'}} alt=''/>
                        </div>
                        <div>
                            <span>Image URL:</span>
                            <input type='text' name='img' onChange={this.handleInputChange} />
                        </div>
                        <div>
                            <span>Content:</span>
                            <input type='text' name='content' onChange={this.handleInputChange} />
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