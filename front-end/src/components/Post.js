import React from 'react'

class Post extends React.Component {
    constructor(props) {
        super(props)
        this.deletePost = this.deletePost.bind(this)
    }

    async deletePost(post) {
        await this.props.deleteOnePost(post);
        this.props.fetchPosts();
      }

    render() {
        return (
            <div key={this.props.post.id} className="post white">
                <h1>{this.props.post.title}</h1>
                <h3>{this.props.post.date}</h3>
                <p>{this.props.post.entry}</p>
                <button className="edit blue" onClick={e => this.props.setEditing(this.props.post)}>Edit</button>
                <button className="delete blue" onClick={e => this.deletePost(this.props.post)}>Delete</button>
            </div>
        )
    }
}

export default Post
