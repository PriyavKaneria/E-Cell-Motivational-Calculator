import React, { Component } from "react"
import * as math from "mathjs"

import "./index.css"

import Button from "./components/button"
import Input from "./components/input"
import ClearBtn from "./components/clear"

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			calc: "",
			ops: [
				["7", "8", "9", "/"],
				["4", "5", "6", "*"],
				["1", "2", "3", "+"],
				[" ", "0", ".", "-"],
			],
			quote: "",
			author: "",
		}
	}
	componentDidMount() {
		fetch("https://favqs.com/api/qotd")
			.then((res) => res.json())
			.then((data) => {
				this.setState({
					quote: data.quote.body,
					author: data.quote.author,
				})
			})
	}
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

	addToCalc = (val) => {
		this.setState({
			calc: this.state.calc + val,
		})
	}

	handleEqual = () => {
		this.setState({
			calc: math.evaluate(this.state.calc),
		})
	}

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
					{this.renderButtons()}
					<div className='row'>
						<ClearBtn handleClick={() => this.setState({ calc: "" })}>
							AC
						</ClearBtn>
						<Button handleClick={() => this.handleEqual()}>=</Button>
					</div>
				</div>
				<div className='quote'>
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
