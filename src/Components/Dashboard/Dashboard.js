import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            search: '',
            userposts: true
        }
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if(this.state.userposts !== prevState.userposts) {
    //         this.getPosts()
    //     }
    // }

    componentDidMount() {
        this.getPosts()
    }

    getAllPosts() {
        
    }

    getPosts() {
        if(this.state.userposts){
            axios.get(`/api/posts/${this.props.user.id}`).then(res => {
                this.setState({
                    posts: res.data
                })
            })
        } else {
            axios.get('/api/posts').then(res => {
                this.setState({
                    posts: res.data
                })
            })
        }
    }

    handleSearchChange = event => {
        this.setState({
            search: event.target.value
        })
    }

    checked = event => {
        this.setState({
            userposts: !this.state.userposts
        })
        if(this.state.userposts){
            console.log('true')
            this.getPosts()
        }
        else{
            console.log('false')
            this.getAllPosts()
        }
    }

    resetSearch=() => {
        this.setState({
            search: ''
        })
    }

    render(){
        var postList = null

        console.log(this.state.posts)
        // if(this.state.userposts){
        //     // if(this.state.search){
        //     //     postList = this.state.posts.filter(post => post.title.included(this.state.search))
        //     // }else{
        //     //     postList = this.state.posts.map(post => {
        //     //         console.log(post)
        //     //         return <div key={post.id} >{post.title}</div>
        //     //     })
        //     // }
        // }else {
        //     // this.getAllPosts()
        //     if(this.state.search){
        //         postList = this.state.posts.filter(post => post.title.included(this.state.search))
        //     }else{
        //         console.log(this.state.posts)
        //         // postList = this.state.posts.map(post => <></>)
        //     }
        // }

        return (
            <section className='dash'>
                <div>
                    <div>
                        <input type='textarea' placeholder='Search by Title' value={this.state.search} onChange={this.handleSearchChange}/>
                        <img src='' alt=''/>
                        <button onClick={() => this.resetSearch()}>Reset</button>
                    </div>
                    <div>
                        <label>My Posts</label>
                        <input type='checkbox' value={this.state.userposts} onChange={this.checked} defaultChecked={this.state.userposts}/>
                    </div>
                </div>
                <div>
                    <div>
                        {postList}
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
export default connect(mapStateToProps)(Dashboard)