import React from 'react'

class EditPostForm extends React.Component {
    constructor(props) {
        super(props)
        this.titleChanged = this.titleChanged.bind(this)
        this.dateChanged = this.dateChanged.bind(this)
        this.entryChanged = this.entryChanged.bind(this)
    }
    
    async titleChanged(value) {
        this.props.setEditing({title: value, date: this.props.editing.date, entry: this.props.editing.entry, id: this.props.editing.id})
    }
    
    async dateChanged(value) {
        this.props.setEditing({title: this.props.editing.title, date: value, entry: this.props.editing.entry, id: this.props.editing.id})
    }
    
    async entryChanged(value) {
        this.props.setEditing({title: this.props.editing.title, date: this.props.editing.date, entry: value, id: this.props.editing.id})
    }

    render() {
        return (
            <form onSubmit={this.props.editPost} className="top-content">
                <div>
                    <input type="text" placeholder="Entry Title" value={this.props.editing.title} 
                    onChange={e => this.titleChanged(e.target.value)} className="titleEdit top-edit"/>
                    <input type="date" value={this.props.editing.date} onChange={e => this.dateChanged(e.target.value)} className="top-edit"/>
                </div>
                <div>
                    <textarea placeholder="Begin your journal entry here..." rows="10" columns="60" value={this.props.editing.entry}
                    onChange={e => this.entryChanged(e.target.value)} />
                </div>
                <input type="submit" value="Update" className="white"/>
                <button onClick={e => this.props.setEntry(undefined)} className="white">Cancel</button>
            </form>
        )
    }
}

export default EditPostForm
