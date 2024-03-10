export const isSameDate = (lastDate) => {
	lastDate = new Date(lastDate);
	const today = new Date();

	const isSameDate =
		lastDate.getFullYear() === today.getFullYear() &&
		lastDate.getMonth() === today.getMonth() &&
		lastDate.getDate() === today.getDate();

	return isSameDate;
};
