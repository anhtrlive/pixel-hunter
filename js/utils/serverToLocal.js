const newLevelsData = (arr) => {
	const serverToLocal = (obj) => {
		return {
			type: (obj.type === "two-of-two") ? "GameTypeOne" : (obj.type ===
				"tinder-like") ? "GameTypeTwo" : "GameTypeThree",
			task: obj.question,
			options: obj.answers.map((element) => {
				return {
					src: element.image.url,
					height: element.image.height,
					width: element.image.width,
					answer: (element.type === "painting") ? "paint" : "photo"
				}
			}),
		}
	}
	return arr.map((el) => serverToLocal(el));
}

export {newLevelsData};
