import SortingVisualizer from "./SortingVisualizer";

async function bubbleSortAlgorithm(sortingVisualizer: SortingVisualizer) {
	const { nums, amountNums } = sortingVisualizer.state;

	for (let i = 0; i < amountNums - 1; i++) {
		for (let j = 0; j < amountNums - i; j++) {
			if (nums[j] > nums[j + 1]) {
				let x = nums[j];
				nums[j] = nums[j + 1];
				nums[j + 1] = x;

				sortingVisualizer.setState({
					nums: nums,
				})
				await delay(1000);
			}
		}
	}
}

async function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export { bubbleSortAlgorithm }