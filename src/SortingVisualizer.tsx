import React, { Component } from 'react';
import './SortingVisualizer.css';


type SortingVisualizerState = {
	nums: Number[],
}
class SortingVisualizer extends Component<{}, SortingVisualizerState> {
	constructor(props: any) {
		super(props);

		this.state = {
			nums: [],
		}
	}

	componentDidMount() {
		this.randomizeNums(50);
	}

	randomizeNums(length: Number) {
		let newNums: Number[] = [];
		for (let i = 0; i < length; i++) {
			newNums.push(Math.round(Math.random() * 300 + 5));
		}

		this.setState({
			nums: newNums,
		});
	}

	render() {
		const { nums } = this.state;

		return (
			<>
				<div className="menuBar">

				</div>
				<div className="sortItemContainer">
					{nums.map((value: Number, key) => (
						<div
							className="sortItem"
							key={key}
							style={{ height: `${value}px` }}
						/>
					))}
				</div>
			</>
		)

	}
}

export default SortingVisualizer;