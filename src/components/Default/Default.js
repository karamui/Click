import React, { Component } from "react";
import Card from "../Card";
import Header from "../Header";
import corgis from "../../corgis.json";
import "./Default.css";

class Default extends Component {
    // sets the state variables
    state = {
        corgis: corgis,
        clicked: [],
        score: 0,
        topscore: 0,
        message: "Click on a corgi to begin the game!"
    };

    // initiates game logic upon clicking a corgi
    handleOnClick = event => {
        // gets id of clicked corgi
        let id = event.target.id;

        // flag for game logic
        let flag = false;

        // checking if the corgi has been clicked before
        for (let i = 0; i < this.state.clicked.length; i++) {
            if (id === this.state.clicked[i]) {
                flag = true;
            }
        }

        // game logic
        if (flag === true) {
            // if the corgi has already been clicked, reset score
            this.setState({
                clicked: [], 
                score: 0, 
                message: "You have already clicked this corgi! Game over!"
            });
        } else {
            // if the corgi has not been clicked yet, add it to the array of clicked corgis
            this.state.clicked.push(id);

            // updates the top score if the current score exceeds archived top score
            if (this.state.score + 1 > this.state.topscore) {
                this.setState({topscore: this.state.score + 1});
            }

            if (this.state.score === 11) {
                // resets game
                this.setState({
                    clicked: [],
                    score: 12, 
                    topscore: 12,
                    message: "Congratulations! You clicked all of the corgis!"
                });
            } else {
                // updates score and message
                this.setState({
                    score: this.state.score + 1, 
                    message: "Ooh, you have clicked a new corgi!"
                });
            }

            // shuffles the array of corgis
            this.shuffleArray(this.state.corgis);
        }
    };

    // shuffles the array of corgis
    // REFERENCE: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    shuffleArray = (a) => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }

        this.setState({corgis: a});
    };

    // shuffles the array of corgis once component has mounted
    componentDidMount = () => {
        console.log("Assembling the corgis!");
        this.shuffleArray(this.state.corgis);
    };

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 ml-auto mr-auto">
                        <Header 
                            message={this.state.message}
                            score={this.state.score}
                            topscore={this.state.topscore}
                        />
                    </div>
                
                    <div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7 ml-auto mr-auto kennel">
                        {this.state.corgis.map(corgi => (
                            <Card
                                id={corgi.id}
                                key={corgi.id}
                                name={corgi.name}
                                image={corgi.image}
                                handleOnClick={this.handleOnClick}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default Default;