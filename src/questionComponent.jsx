import React, { Component } from 'react';

class questionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {TestID: this.props.TestID, questionID: this.props.questionTD, promt: this.props.promt, answer: this.props.answer, key: this.props.testID, input:"", correction:[{result: false, correctAnswer: "I am 24 years old."}]}
        this.handleInput = this.handleInput.bind(this)
        this.getAnswer = this.getAnswer.bind(this)
    }

    render (){
        return(
            <React.Fragment>
                <p key={this.state.questionID}>{this.state.promt}</p><input key={this.state.testID} type="text" value={this.state.input} onChange={this.handleInput} placeholder="Enter your answer here"></input>
                <input type="submit" value="Submit" onClick={this.getAnswer}/>
            </React.Fragment>
        )
    }
    handleInput(event){
        this.setState({
            input: event.target.value
          });
    }
    getAnswer(){
        //let URL = "http://localhost:3000/getAnswer/" + this.testID + "/" + this.questionID
        //axios.get(URL)
        //    .then(result => this.setState({
        //        correction: result.data
        //    }))
        //    .catch(error => this.setState({correction: []}))
        this.props.onResult(this.state.correction[0])
    }
}

export default questionComponent;