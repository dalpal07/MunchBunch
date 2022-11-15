import React from 'react'

class PostForm extends React.Component {
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
            <form onSubmit={this.props.addPost} className="top-content">
                <div>
                    <input type="text" placeholder="Entry Title" value={this.props.title}
                    onChange={e => this.props.setTitle(e.target.value)} className="titleEdit top-edit"/>
                    <input type="date" value={this.props.date} onChange={e => this.props.setDate(e.target.value)} className="top-edit"/>
                </div>
                <div>
                    <textarea placeholder="Begin your journal entry here..." rows="10" columns="60" value={this.props.entry}
                    onChange={e => this.props.setEntry(e.target.value)} />
                </div>
                <input type="submit" value="Submit" className="white"/>
                <button onClick={e => this.props.setAdding(false)} className="white">Cancel</button>
            </form>
        )
    }
}

export default PostForm
