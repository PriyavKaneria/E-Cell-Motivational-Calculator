// imports
import React, { Component } from "react"
import * as math from "mathjs"
// styles
import "./index.css"
// components
import Button from "./components/button"
import Input from "./components/input"
import ClearBtn from "./components/clear"

// main class default export
class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			calc: "",
			ops: [
				//defined the number pad as state
				["7", "8", "9", "/"],
				["4", "5", "6", "*"],
				["1", "2", "3", "+"],
				[" ", "0", ".", "-"],
			],
			quote: "", // state for quote
			author: "", // state for author
		}
	}
	componentDidMount() {
		// get quote on load
		fetch("https://favqs.com/api/qotd")
			.then((res) => res.json())
			.then((data) => {
				this.setState({
					quote: data.quote.body,
					author: data.quote.author,
				})
			})
	}
	// function to get a new quote on demand
	getQuote = async () => {
		await fetch("https://favqs.com/api/qotd")
			.then((res) => res.json())
			.then((data) => {
				this.setState({
					quote: data.quote.body,
					author: data.quote.author,
				})
			})
	}
	// add value to calc state
	addToCalc = (val) => {
		this.setState({
			calc: this.state.calc + val,
		})
	}
	// evaluate expression
	handleEqual = () => {
		this.setState({
			calc: math.evaluate(this.state.calc),
		})
	}
	// render buttons on screen
	renderButtons = () => {
		return this.state.ops.map((row) => {
			return (
				<div className='row'>
					{row.map((digit) => {
						return <Button handleClick={this.addToCalc}>{digit}</Button>
					})}
				</div>
			)
		})
	}

	render() {
		return (
			<div className='app'>
				<div className='calculator'>
					<Input problem={this.state.calc} />
					{this.renderButtons()} {/* buttons rendered here */}
					<div className='row'>
						<ClearBtn handleClick={() => this.setState({ calc: "" })}>
							AC
						</ClearBtn>
						<Button handleClick={() => this.handleEqual()}>=</Button>
					</div>{" "}
					{/* clear and = button rendered here */}
				</div>
				<div className='quote'>
					{/* quote rendered here */}
					<h1>“{this.state.quote}”</h1>
					<h2>- {this.state.author}</h2>
					<button
						className='refresh'
						onClick={async () => {
							await this.getQuote()
						}}>
						Not motivated yet? Get a new quote
					</button>
				</div>
			</div>
		)
	}
}

export default App
