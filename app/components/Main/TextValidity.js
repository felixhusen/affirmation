function checkValidity(str){
	if (str == null || str.trim() === '') {
		return false;
	} else {
		return true;
	}
}

export { checkValidity }