const removeKeys = (obj = {}, keysToRemove = []) =>
	Object.fromEntries(
		Object.entries(obj).filter(([key]) => !keysToRemove.includes(key))
	)

export default removeKeys
