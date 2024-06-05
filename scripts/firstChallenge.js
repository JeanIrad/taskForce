function hasSubArrayWithSum(arr, target) {
  arr = arr.filter((num) => num <= target);
  let left = 0;
  let sum = 0;

  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];

    while (sum > target) {
      sum -= arr[left];
      left++;
    }

    if (sum === target) {
      return true;
    }
  }

  return false;
}
