import React from 'react';
const { Component, PropTypes } = React;

class Form extends Component {
    constructor(props) {
        super(props);
        this.state ={...props};
    }

    render() {
        const {title, description, startDateUtc, endDateUtc, onSave} = this.state;
        return (
            <div className="Form">

                <label>
                    Title
                    <input type="text" value={title} onChange={e => this.setState({title: e.target.value})}/>
                </label>
                <br/>
                <label>
                    Description
                    <textarea cols="30" rows="10" value={description} onChange={e => this.setState({description: e.target.value})} />
                </label>
                <br/>
                <label>
                    Start Date (UTC)
                    <input type="text" value={startDateUtc} onChange={e => this.setState({startDateUtc: e.target.value})}/>
                </label>
                <br/>
                <label>
                    End Date (UTC)
                    <input type="text" value={endDateUtc} onChange={e => this.setState({endDateUtc: e.target.value})}/>
                </label>
                <br/>
                <button onClick={() => onSave(this.state)}>Save</button>

            </div>
        );
    }
}

export default Form