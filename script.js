
function attachEventHandlers() {
	$('.button').on('click', handleImageClick);
}

function handleImageClick(event) {
	const userTags = [];
	const menuIDs = ['category','time']
	for (let menuID of menuIDs) {
 		const element = document.getElementById(menuID);
		const tag = element.options[element.selectedIndex].value;
		if(tag != "any")
			userTags.push(tag);
	}
	console.log(userTags);
}

$('document').ready(function() {

	attachEventHandlers();

});