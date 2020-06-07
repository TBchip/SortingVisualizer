import SortingVisualizer from "./SortingVisualizer";

async function bubbleSortAlgorithm(sortingVisualizer: SortingVisualizer) {
	const { nums, msBetweenSwaps } = sortingVisualizer.state;

	for (let i = 0; i < nums.length - 1; i++) {
		for (let j = 0; j < nums.length - i; j++) {
			if (nums[j] > nums[j + 1]) {
				let x = nums[j];
				nums[j] = nums[j + 1];
				nums[j + 1] = x;

				sortingVisualizer.setState({
					nums: nums,
				});
				await delay(msBetweenSwaps);
			}
		}
	}
}

async function mergeSortAlgorithm(sortingVisualizer: SortingVisualizer) {
	const { nums } = sortingVisualizer.state;

	mergeSortAlgorithmHelper(nums, sortingVisualizer, [0, nums.length]);
}
async function mergeSortAlgorithmHelper(nums: number[], sortingVisualizer: SortingVisualizer, currentBatch: number[]) {
	if (nums.length === 1) return nums;

	let divisionPoint = Math.ceil(nums.length / 2);
	let sorted1 = await mergeSortAlgorithmHelper(nums.slice(0, divisionPoint), sortingVisualizer, [currentBatch[0], currentBatch[0] + divisionPoint]);
	let sorted2 = await mergeSortAlgorithmHelper(nums.slice(divisionPoint, nums.length), sortingVisualizer, [currentBatch[0] + divisionPoint, currentBatch[1]]);

	let newNums: number[] = [];
	let index1 = 0;
	let index2 = 0;
	while (index1 < sorted1.length || index2 < sorted2.length) {
		if (index1 >= sorted1.length) {
			newNums.push(sorted2[index2]);
			index2++;
		} else if (index2 >= sorted2.length) {
			newNums.push(sorted1[index1]);
			index1++;
		} else if (sorted1[index1] < sorted2[index2]) {
			newNums.push(sorted1[index1]);
			index1++;
		} else {
			newNums.push(sorted2[index2]);
			index2++;
		}

		let newStateNums: number[] = sortingVisualizer.state.nums;
		console.log(newStateNums);
		newStateNums.splice(currentBatch[0], newNums.length, ...newNums);
		await sortingVisualizer.setState({
			nums: newStateNums,
		});

		await delay(sortingVisualizer.state.msBetweenSwaps);
	}

	return newNums;
}

async function quickSortAlgorithm(sortingVisualizer: SortingVisualizer) {
	const { nums } = sortingVisualizer.state;

	let newNums: number[] = await quickSortAlgorithmHelper(sortingVisualizer, nums, [0, nums.length]);
}
async function quickSortAlgorithmHelper(sortingVisualizer: SortingVisualizer, nums: number[], currentBatch: number[]) {
	if (currentBatch[0] + 1 >= currentBatch[1]) return nums;

	let i = currentBatch[0] + 1;
	let j = currentBatch[1] - 1;
	let pivot = currentBatch[0];

	while (true) {
		while (!isNaN(nums[i]) && nums[i] <= nums[pivot]) i++;
		while (!isNaN(nums[j]) && nums[j] > nums[pivot]) j--;

		if (j < i) break;

		let x = nums[i];
		nums[i] = nums[j];
		nums[j] = x;

		await sortingVisualizer.setState({
			nums: nums,
		});
		await delay(sortingVisualizer.state.msBetweenSwaps);
	}

	let x = nums[j];
	nums[j] = nums[pivot];
	nums[pivot] = x;

	await sortingVisualizer.setState({
		nums: nums,
	});
	await delay(sortingVisualizer.state.msBetweenSwaps);

	let newNums: number[] = await quickSortAlgorithmHelper(sortingVisualizer, nums, [currentBatch[0], j]);
	newNums = await quickSortAlgorithmHelper(sortingVisualizer, newNums, [j + 1, currentBatch[1]]);

	return newNums;
}

async function selectionSortAlgorithm(sortingVisualizer: SortingVisualizer) {
	const { nums, msBetweenSwaps } = sortingVisualizer.state;

	for (let i = 0; i < nums.length; i++) {
		let lowestIndex = i;
		for (let j = 0; j < nums.length - i; j++)
			if (nums[i + j] < nums[lowestIndex]) lowestIndex = i + j;

		let x = nums[i];
		nums[i] = nums[lowestIndex];
		nums[lowestIndex] = x;

		await sortingVisualizer.setState({
			nums: nums,
		});
		await delay(msBetweenSwaps);
	}
}

async function bogoSortAlgorithm(sortingVisualizer: SortingVisualizer) {
	const { nums, msBetweenSwaps } = sortingVisualizer.state;

	let sorted = false;
	while (!sorted) {
		sorted = true;
		for (let i = 0; i < nums.length - 1; i++) {
			if (nums[i] > nums[i + 1]) {
				sorted = false;
				await sortingVisualizer.randomizeNums();

				await delay(msBetweenSwaps);

				break;
			}
		}
	}
}

async function delay(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export { bubbleSortAlgorithm, mergeSortAlgorithm, quickSortAlgorithm, selectionSortAlgorithm, bogoSortAlgorithm }