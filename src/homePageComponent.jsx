import React, { Component } from 'react';
import './homePageComponent.css';
import axios from 'axios';
import QuestionComponent from './questionComponent'

class homePage extends Component {
    constructor(props){
        super(props);
        this.state = {showTest: false, createTest: false, testList: [], showResult: false, questionList: [{'promt':'How old are you?','answer':'I am 19 years old','TestID':1,'questionID':1},{'promt':'How are you?','answer':'I am fine','TestID':2,'questionID':2}],
             showQuestion: false, currentQuestion: {}, inputAnswer:""};
        this.choice = this.choice.bind(this);   
        this.getTestList = this.getTestList.bind(this)
        this.getQuestionList = this.getQuestionList.bind(this)
        this.renderQuestion = this.renderQuestion.bind(this)
    }
    render() {
        console.log("im heer")
        if (this.state.createTest === false && this.state.showTest === false && this.state.showTest === false
            && this.state.showQuestion === false)
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
        else if(this.state.showQuestion === true)
            return(
                this.renderQuestion()
            )
        else if(this.state.showResult === true)
            return
    }
    initializeVar(){
        this.setState({showTest: false, createTest: false, testList: [], questionList: [],
        showQuestion: false, currentQuestion: {}, inputAnswer:"", correctAnswer:{}})
    }
    choice = () => {
        this.setState({showTest: true})
        this.getTestList()
    }
    getTestList = () =>{
        axios.get("http://localhost:3000/api/test")
            .then(result => this.setState({
                testList: result.data
            }))
            .catch(error => this.setState({testList: []}));
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
    getQuestionList = (testID) =>{
        this.setState({showQuestion: true})
        this.setState({showTest: false})
        this.setState({questionList: [{'promt':'How old are you?','answer':'I am 19 years old','TestID':1,'questionID':1},
        {'promt':'How are you?','answer':'I am fine','TestID':2,'questionID':2}]})
        //let URL = "http://localhost:3000/getATest/" + testID
        //axios.get(URL)
        //    .then(result => this.setState({
        //        test: result.data
        //    }))
        //    .catch(error => this.setState({test: []}))
        this.getNextQuestion()
        
    }
    getNextQuestion(){
        if(this.state.questionList.length !== 0){
            var question =  this.state.questionList[0]
            this.setState({currentQuestion: question})
            var newArray = this.state.questionList.slice(1)
            this.setState({questionList: newArray})
            this.setState({getTest: false})
        }
    }
    renderQuestion(){
        return(
                <React.Fragment>
                    <header className="testList-header">
                        <h1 style={{fontSize: 70}}>SmartTest</h1>
                            <div className="container">
                                 <QuestionComponent key={this.state.currentQuestion.questionID} 
                                 questionID={this.state.currentQuestion.questionID} TestID={this.state.currentQuestion.TestID} 
                                 promt={this.state.currentQuestion.promt} 
                                 answer={this.state.currentQuestion.answer}
                                 onResult={this.evaluateResult}/>
                            </div>
                        </header> 
                    </React.Fragment> 
        )
    }
    evaluateResult = resultData =>{
        this.setState({showResult: true})
        if(resultData.result === true && this.state.questionList.length > 0){
            console.log("1")
            this.getNextQuestion()
            return(
                <div>
                    <p>Correct</p>
                    <button value="Next" onClick={this.renderQuestion}></button>
                </div>
            )
        }
        if (resultData.result === true && this.state.questionList.length === 0){
            console.log("2")
                this.initializeVar()
                return(
                    <div>
                        <p>Correct</p>
                        <p>Congrats. You have finished the test.</p>
                        <butoon value="Done" onClick={this.render}></butoon>
                    </div>
                )
        }
        if (resultData.result === false && this.state.questionList.length > 0){
            console.log("3")
            this.getNextQuestion()
            return(
                <div>
                    <p>InCorrect</p>
                    <p>Correct Answer: {this.state.currentQuestion.answer}</p>
                    <button value="Next" onClick={this.renderQuestion}></button>
                </div>
            )
        }
        else{
            console.log("4")
            this.initializeVar()
            return(
                <div>
                    <p>InCorrect</p>
                    <p>Correct Answer: {this.state.currentQuestion.answer}</p>
                    <button value="Next" onClick={this.render}></button>
                </div>
            )
        }
            
    }
        
    

}
export default homePage;