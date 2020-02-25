import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import search_icon from '../../assets/search_logo.png'

import './Dashboard.css'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            search: '',
            userposts: true
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.userposts !== prevState.userposts || this.state.search !== prevState.search || this.props.user.user_id !== prevProps.user.user_id ) {
            this.getPosts()
        }
    }

    componentDidMount() {
        this.getPosts()
    }

    getPosts() {
        if(this.props.user.user_id){
            if(this.state.userposts){
                axios.get(`/api/posts/user/${this.props.user.user_id}?search=${this.state.search}`).then(res => {
                    this.setState({
                        posts: res.data
                    })
                })
            } else {
                axios.get(`/api/posts?search=${this.state.search}`).then(res => {
                    this.setState({
                        posts: res.data
                    })
                })
            }
        }

        // if(this.props.user.id){
        //     if(this.state.userposts){
        //         axios.get(`/api/posts/user/${this.props.user.id}`).then(res => {
        //             if(this.state.search){
        //                 this.setState({
        //                     posts: res.data.filter(elm => elm.title.toLowerCase().includes(this.state.search.toLowerCase()))
        //                 })
        //             }else {
        //                 this.setState({
        //                     posts: res.data
        //                 })
        //             }
        //         })
        //     } else {
        //         axios.get(`/api/posts`).then(res => {
        //             if(this.state.search){
        //                 this.setState({
        //                     posts: res.data.filter(elm => elm.title.toLowerCase().includes(this.state.search.toLowerCase()))
        //                 })
        //             }else {
        //                 this.setState({
        //                     posts: res.data
        //                 })
        //             }
        //         })
        //     }
        // }
    }

    handleSearchChange = event => {
        this.setState({
            search: event.target.value
        })
    }

    checked = () => {
        this.setState({
            userposts: !this.state.userposts
        })
    }

    // searchClick = () => {
    //     this.getPosts()
    // }

    resetSearch = () => {
        this.setState({
            search: ''
        })
    }

    render(){
        const postList = this.state.posts.map(post => {
            const { id, title, username, profile_pic } = post
            return (
                <Link className='dash-link' key={id} to={`/post/${id}`}>
                    <div className='post-item-box'>
                        <div className='post-item shadow'>
                            <div className='post-title'>
                                <h1>
                                    {title}
                                </h1>
                            </div>
                            <div className='post-profile'>
                                <span>{username}</span>
                                { profile_pic ? <img className='shadow'src={profile_pic} alt='' />
                                : <div className='profile-img-none shadow'></div>
                                }
                            
                            </div>
                        </div>
                    </div>
                </Link>
            )
        })

        return (
            <section className='dash'>
                <div className='dash-content'>
                    <div className='dash-search-content shadow'>
                        <div className='dash-search'>
                            <input type='textarea' placeholder='Search by Title' value={this.state.search} onChange={this.handleSearchChange}/>
                            <img className='search-icon' onClick={this.searchClick}src={search_icon} alt=''/>
                            <div className='search-reset-button' onClick={() => this.resetSearch()}>Reset</div>
                        </div>
                        <div>
                            <label>My Posts </label>
                            <input type='checkbox' value={this.state.userposts} onChange={this.checked} defaultChecked={this.state.userposts}/>
                        </div>
                    </div>
                    { this.state.posts.length !== 0 ? (
                        <div className='dash-post-list shadow'>
                            <div>
                                {postList}
                            </div>
                        </div> ) : null }
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
export default connect(mapStateToProps)(Dashboard)
