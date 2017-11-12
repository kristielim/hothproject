
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
	const activityTags = ['explore', 'day'];
	if(isGoodActivity(userTags,activityTags)){
		alert("Good activity");
	}

}

$('document').ready(function() {

	attachEventHandlers();

});

function isGoodActivity(userTags, activityTags){
	var count = 0;

for(var i = 0; i < userTags.length; i++){
	for(var k = 0; k < activityTags.length; k++){
		if(userTags[i].toLowerCase() == activityTags[k].toLowerCase()){
			count++;
		}
	}
}

	if(count == userTags.length) {
	return true;
}
else{
return false;
	}
}
