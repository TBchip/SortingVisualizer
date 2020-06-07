import React, { Component } from 'react';
import { bubbleSortAlgorithm, mergeSortAlgorithm, quickSortAlgorithm, selectionSortAlgorithm, bogoSortAlgorithm } from './SortingAlgorithms';
import './SortingVisualizer.css';


type SortingVisualizerState = {
	msBetweenSwaps: number,
	amountNums: number,
	nums: number[],
}

let sortingVisualizer: SortingVisualizer;
export default class SortingVisualizer extends Component<{}, SortingVisualizerState> {

	constructor(props: any) {
		super(props);
		sortingVisualizer = this;

		this.state = {
			msBetweenSwaps: 1,
			amountNums: 100,
			nums: [],
		}
	}

	componentDidMount() {
		sortingVisualizer.randomizeNums();
	}

	public async randomizeNums() {
		const { nums, amountNums } = sortingVisualizer.state;

		let headerHeightStr = window.getComputedStyle(document.documentElement).getPropertyValue("--menuBarHeight");
		let numContainerHeight: number = window.innerHeight * ((100 - +headerHeightStr.substring(0, headerHeightStr.length - 2)) / 100)

		let paddingStr = window.getComputedStyle(document.documentElement).getPropertyValue("--sortItemContainerPadding");
		let padding = +paddingStr.substring(0, paddingStr.length - 2)

		let minHeight = 5;
		let maxHeight = numContainerHeight - padding * 2 - minHeight;

		let newNums: number[] = [];
		// gen new array
		if (nums.length === amountNums)
			for (let i = 0; i < amountNums; i++)
				newNums.push(Math.round(Math.random() * maxHeight + minHeight));
		// shrink array
		else if (nums.length > amountNums)
			newNums = nums.slice(0, amountNums);
		// extend array
		else {
			let newNumsAmount = amountNums - nums.length;
			newNums = nums;

			for (let i = 0; i < newNumsAmount; i++)
				newNums.push(Math.round(Math.random() * maxHeight + minHeight));
		}

		sortingVisualizer.setState({
			nums: newNums,
		});
	}
	numAmountSliderChange(event: any) {
		sortingVisualizer.setNumAmount(+event.target.value);
	}
	async setNumAmount(amount: number) {
		await sortingVisualizer.setState({
			amountNums: amount,
		})

		sortingVisualizer.randomizeNums();
	}

	msBetweenInputChange(event: any) {
		let ms = +event.target.value;
		console.log(typeof ms);

		if (isNaN(ms)) return;

		sortingVisualizer.setMSBetween(ms);
	}
	setMSBetween(ms: number) {
		sortingVisualizer.setState({
			msBetweenSwaps: ms,
		})
	}


	async bubbleSort() {
		bubbleSortAlgorithm(sortingVisualizer);
	}
	async mergeSort() {
		mergeSortAlgorithm(sortingVisualizer);
	}
	async quickSort() {
		quickSortAlgorithm(sortingVisualizer);
	}
	async selectionSort() {
		selectionSortAlgorithm(sortingVisualizer);
	}
	async bogoSort() {
		bogoSortAlgorithm(sortingVisualizer);
	}

	render() {
		const { nums, amountNums, msBetweenSwaps } = sortingVisualizer.state;

		return (
			<>
				<div className="menuBar">
					<div className="menuBarSettingsContainer">
						<label className="menuBarSettingsLabel">size of array</label>
						<input type="range" min="10" max={Math.round(window.innerWidth / 5)} value={amountNums} step="1" onChange={sortingVisualizer.numAmountSliderChange} id="arraySizeSlider" />
					</div>
					<div className="menuBarSettingsContainer">
						<label className="menuBarSettingsLabel">ms between swaps</label>
						<input type="text" value={msBetweenSwaps} onChange={sortingVisualizer.msBetweenInputChange} className="menuBarTextInput" id="msBetweenInput" />
					</div>
					<button className="menuBarBtn" onClick={sortingVisualizer.randomizeNums}>randomize array</button>

					<div className="menuBarItemDivider" />

					<button className="menuBarBtn" onClick={sortingVisualizer.bubbleSort}>bubble sort</button>
					<button className="menuBarBtn" onClick={sortingVisualizer.mergeSort}>merge sort</button>
					<button className="menuBarBtn" onClick={sortingVisualizer.quickSort}>quick sort</button>
					<button className="menuBarBtn" onClick={sortingVisualizer.selectionSort}>selection sort</button>
					<button className="menuBarBtn" onClick={sortingVisualizer.bogoSort}>bogo sort</button>
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