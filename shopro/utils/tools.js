export default {

	/**
	 * 数据分组
	 * @param {Array} oArr - 原数组列表
	 * @param {Number} length - 单个数组长度
	 * @return {Array}  arr - 分组后的新数组
	 */
	splitData(oArr = [], length = 1) {
		let arr = [];
		let minArr = [];
		oArr.forEach(c => {
			if (minArr.length === length) {
				minArr = [];
			}
			if (minArr.length === 0) {
				arr.push(minArr);
			}
			minArr.push(c);
		});

		return arr;
	},
	
}