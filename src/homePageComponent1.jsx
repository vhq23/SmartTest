import React, { Component } from 'react';
import './homePageComponent.css';
import axios from 'axios';
import QuestionComponent from './questionComponent'

class homePage extends Component {
    constructor(props){
        super(props);
        this.state = {showTest: false, createTest: false, testList: [],
             getTest: false, test: [], answerList: [], correction: [], currentQuestion: {}};
        this.choice = this.choice.bind(this);   
        this.showResult = this.showResult.bind(this)
        this.handleCorrection = this.handleCorrection.bind(this)
        this.renderQuestionList = this.renderQuestionList.bind(this)
    }
    render() {
        if (this.state.createTest === false && this.state.showTest === false && this.state.getTest === false)
            return(
                <React.Fragment>
                    <header className="homePage-header">
                        <h1 style={{fontSize: 70}}>Welcome to SmartTest!!!</h1>
                        <p style={{fontSize: 45}}>Let's ace some tests.</p>
                        <div>
                        <button className="button" onClick={this.choice}>Go to Test Library</button>
                        <button className="button">Create a new test</button>
                        </div>
                    </header>
                </React.Fragment>
            )
        else if (this.state.showTest === true)
            return(
                this.renderTestList()
            )
        else if(this.state.getTest === true)
            return(
                this.renderQuestionList()
            )
    }
    renderTestList(){
        if(this.state.showTest === true)
            return(
                <React.Fragment>
                    <header className="testList-header">
                        <h1 style={{fontSize: 70}}>SmartTest</h1>
                        <div className="container">
                            { this.state.testList.map(test => 
                            <button key={test.id} className="card" onClick={() => this.getQuestionList(test.id)}>{test.testName}</button>)}
                        </div>
                    </header>
                </React.Fragment>
            )
    }
    getSingleQuestion(){
        if(this.state.test.length !== 0)
            this.setState({currentQuestion : test[0]})
            var newArray = this.state.test.slice(1)
            this.setState({test: newArray})
            this.setState({getTest: false})
        else
            this.setState({done: true})
    }
    renderQuestionList(){
        if (this.state.test.length === 0)
            return(
                <p>You have completed the test.</p>
            )
        var currentQuestion =  this.state.test[0]
        var newArray = this.state.test.slice(1)
        this.setState({test: newArray})
        this.setState({getTest: false})
        console.log(currentQuestion)
        console.log(this.state.test)
        return(
            <React.Fragment>
                <header className="testList-header">
                    <h1 style={{fontSize: 70}}>SmartTest</h1>
                        <div className="container">
                             { this.state.test.map(question => <QuestionComponent key={question.questionID} 
                             questionID={question.questionID} TestID={question.TestID} promt={question.promt} 
                             answer={question.answer} onCorrection={this.handleCorrection}/>)}
                        </div>
                            <input type="submit" value="Submit" onClick={this.showResult}/>
                    </header> 
                </React.Fragment> 
            )
        
    }
    choice = () => {
        this.setState({showTest: true})
        this.getAllTest()
    }
    getAllTest = () =>{
        axios.get("http://localhost:3000/api/test")
            .then(result => this.setState({
                testList: result.data
            }))
            .catch(error => this.setState({testList: []}));
    }
    getQuestionList = (testID) =>{
        this.setState({getTest: true})
        this.setState({showTest: false})
        this.setState({test: [{'promt':'How old are you?','answer':'I am 19 years old','TestID':1,'questionID':1},{'promt':'How are you?','answer':'I am fine','TestID':2,'questionID':2}]})
        //let URL = "http://localhost:3000/getATest/" + testID
        //axios.get(URL)
        //    .then(result => this.setState({
        //        test: result.data
        //    }))
        //    .catch(error => this.setState({test: []}))
    }
    handleCorrection(result){
        var newArray = this.state.correction.slice()
        newArray.push({result: false, correctAnswer: "I am 24."})
        this.setState({correction : newArray})
    }
    showResult(){
        console.log(this.state.correction)
    }

}
export default homePage;
