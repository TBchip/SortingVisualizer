import React, { Component } from 'react';
import { bubbleSortAlgorithm } from './SortingAlgorithms';
import './SortingVisualizer.css';


type SortingVisualizerState = {
	amountNums: number,
	nums: number[],
}

let sortingVisualizer: SortingVisualizer;
export default class SortingVisualizer extends Component<{}, SortingVisualizerState> {

	constructor(props: any) {
		super(props);
		sortingVisualizer = this;

		this.state = {
			amountNums: 100,
			nums: [],
		}
	}

	componentDidMount() {
		sortingVisualizer.randomizeNums();
	}

	async randomizeNums() {
		let headerHeightStr = window.getComputedStyle(document.documentElement).getPropertyValue("--menuBarHeight");
		let numContainerHeight: number = window.innerHeight * ((100 - +headerHeightStr.substring(0, headerHeightStr.length - 2)) / 100)

		let paddingStr = window.getComputedStyle(document.documentElement).getPropertyValue("--sortItemContainerPadding");
		let padding = +paddingStr.substring(0, paddingStr.length - 2)

		let minHeight = 5;
		let maxHeight = numContainerHeight - padding * 2 - minHeight;

		let newNums: number[] = [];
		for (let i = 0; i < sortingVisualizer.state.amountNums; i++) {
			newNums.push(Math.round(Math.random() * maxHeight + minHeight));
		}

		sortingVisualizer.setState({
			nums: newNums,
		});
	}
	numAmountSliderChange(event: any) {
		sortingVisualizer.changeNumAmount(+event.target.value);
	}
	async changeNumAmount(amount: number) {
		await sortingVisualizer.setState({
			amountNums: amount,
		})

		sortingVisualizer.randomizeNums();
	}

	async bubbleSort() {
		bubbleSortAlgorithm(sortingVisualizer);
	}

	render() {
		const { nums, amountNums } = sortingVisualizer.state;

		return (
			<>
				<div className="menuBar">
					<div className="menuBarSettingsContainer">
						<label className="menuBarSettingsLabel">size of array</label>
						<input type="range" min="10" max={Math.round(window.innerWidth / 5)} value={amountNums} step="1" onChange={sortingVisualizer.numAmountSliderChange} id="arraySizeSlider" />
					</div>
					<div className="menuBarSettingsContainer">
						<label className="menuBarSettingsLabel">ms between swaps</label>
						<input type="text" className="menuBarTextInput" id="msBetweenInput" />
					</div>
					<button className="menuBarBtn" onClick={sortingVisualizer.randomizeNums}>randomize array</button>
					<div className="menuBarItemDivider" />
					<button className="menuBarBtn" onClick={sortingVisualizer.bubbleSort}>bubble sort</button>
					<button className="menuBarBtn" >merge sort</button>
					<button className="menuBarBtn" >quick sort</button>
					<button className="menuBarBtn" >selection sort</button>
					<button className="menuBarBtn" >bogo sort</button>
				</div>
				<div className="sortItemContainer">
					{nums.map((value: number, key) => (
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