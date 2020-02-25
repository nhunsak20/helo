import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import no_img from '../../assets/no_image.jpg'

import './Post.css'

class Post extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            img: '',
            content: '',
            author: '',
            author_pic: '',
            author_id: '',
            isLoaded: false
        }
    }

    componentDidMount() {
        this.getPost()
    }

    getPost() {
        const { id } = this.props.match.params
        axios.get(`/api/posts/${id}`).then(res => {
            const{ title, img, content, username, author_id, profile_pic } = res.data
            this.setState({
                title: title,
                img: img,
                content: content,
                author: username,
                author_pic: profile_pic,
                author_id: author_id
            })
        })
    }

    deletePost = () => {
        const { id } = this.props.match.params
        axios.delete(`/api/posts/${id}`).then(() => {
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
        return (
            <section className='post-section'>
                <div className='post shadow'>
                    <div className='post-header'>
                        <h1>
                            {this.state.title}
                        </h1>
                        <div className='post-profile'>
                            <span>by {this.state.author}</span>
                            {this.state.author_pic ?
                                <img className='shadow' src={this.state.author_pic} alt=''/>
                                :
                                <div className='post-profile-none shadow' />
                            }
                        </div>
                    </div>
                    <div className='post-box-img-content'>
                        <div className='post-img-content shadow'>
                            <img className='post-img' src={this.state.img} onError={e => this.onError(e)} alt=''/>
                        </div>
                        <div className='post-content'>
                            <p>{this.state.content}</p>
                            {this.props.user.user_id === this.state.author_id ?
                                <button className='delete-button' onClick={this.deletePost}>Delete</button>
                                :
                                null
                            }
                        </div>
                    </div>
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
export default connect(mapStateToProps)(Post)