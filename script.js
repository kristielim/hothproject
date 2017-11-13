var activities = [];
var matchesList = [];
var data = 'Activity,Type,Time,Transport,Budget^ Diddy Riese,Eat ,less-than-an-hour,walk,$^ Fox Theater,Explore,a-few-hours,walk,$$^ Hammer Museum,Learn,a-few-hours, day,walk, bus,FREE^ Fowler Museum,Learn,a-few-hours,walk,FREE^ M E M Botanical Garden,Explore,less-than-an-hour,walk,FREE^ Santa Monica Pier,Explore,day, a-few-hours,bus,$^ Getty Center,Learn,day, a-few-hours,bike, bus,FREE^ Sculpture Garden,Explore,less-than-an-hour,walk,FREE^ Fat Sal\'s ,Eat,less-than-an-hour,walk,$^ Disneyland,Explore,day,bus,$$$^ In n Out,Eat,less-than-an-hour,walk,$^ Bella Pita,Eat,a-few-hours,walk,$^ Little Tokyo,Explore,day, a-few-hours,bus,$$, $^ Griffith Observatory,Learn,day,bus,FREE^ Universal Studios,Explore,day,bus,$$$^ Venice Beach,Explore,day,bus,$^ Walk of Fame+Chinese Theater,Explore,a-few-hours,bus,FREE^ LACMA,Explore,day, a-few-hours,bike, bus,$^ La Brea Tar Pits,Learn,day,bus,$$^ Pink\'s Hot Dogs,Eat,a-few-hours,bike,$$^ Howlin\' Ray\'s ,Eat,a-few-hours,bus,$$^ Westfield Century City,Explore,a-few-hours,bike, bus,$$^ The Grove,Explore,day,bus,$$^ Original Farmer\'s Market,Eat,a-few-hours,bus,$$^ la zoo,Explore,day,bus,$$^ Natural History Museum,Learn,day,bus,$^ Petersen Auto Museum,Learn,day,bike,$$^ WB Studio Tour,Explore,day,bus,$$$^ Museum of Death ,Learn,day,bus,$$^ Holocaust Museum,Learn,day,bus,FREE^ Museum of Tolerance,Learn,day,bus,$^ Koreatown Plaza,Explore,day, a-few-hours,bus,$$^ Getty Villa,Learn,day,bus,FREE^ Philippe\'s the Original ,Eat,a-few-hours,bus,$$^ California Science Center,Learn,day,bus,FREE^ UCLA Athletics Hall of Fame,Explore,less-than-an-hour,walk,FREE^ Rodeo Drive at Beverly Hills,Explore,a-few-hours,bike, bus,$$$^ Amoeba Music ,Explore,a-few-hours,bus,$$^ Dockweiler Beach ,Explore,a-few-hours,bus,FREE^ The Broad,Learn,a day,bus,$$^ Kleinrock Center for Internet Studies,Learn,less-than-an-hour,walk,FREE^ Bruxie\'s,Eat,a-few-hours,bus,$$^ 85 degrees,Eat,a-few-hours,bus,$^ Stan\'s Donuts,Eat,less-than-an-hour,walk, bus,$^Poke Me,Eat,a-few-hours,less-than-an-hour,walk,$$,$^'

function attachEventHandlers() {
	$('.button').on('click', handleImageClick);
}

function handleImageClick(event) {
	const userTags = [];
	const menuIDs = ['category','time','transport','budget']
	for (let menuID of menuIDs) {
 		const element = document.getElementById(menuID);
		const tag = element.options[element.selectedIndex].value;
		if(tag != "any")
			userTags.push(tag);
	}
	matchesList = [];
	compareAll(userTags,activities); // populates matchesList
	findSuggestion();

}

$('document').ready(function() {

	attachEventHandlers();
	processData(data);

});

function isGoodActivity(userTags, activityTags){
	let count = 0;

	for(let i = 0; i < userTags.length; i++){
		for(let k = 0; k < activityTags.length; k++){
			if(userTags[i].toLowerCase() == activityTags[k].toLowerCase()){
				count++;
			}
		}
	}

	if(count == userTags.length) {
		return true;
	}
	else {
		return false;
	}
}

function processData(allText) {
    var allTextLines = allText.split('^');

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        var tarr = [];
        tarr.push(data[0].trim());
        var tags = [];
        for (var j=1; j<data.length; j++) {
            tags.push(data[j].trim());
        }
        tarr.push(tags);
        activities.push(tarr);
        console.log(tarr);
    }
    console.log(activities[0]);
}

// adds activity names to matchesList
function compareAll(userTags, activityList){
	for(let i = 0; i < activityList.length; i++){
		if(isGoodActivity(userTags, activityList[i][1])){
			console.log('pushed '+activityList[i][0])
			matchesList.push(activityList[i][0]);
		}
	}
}

function findSuggestion(){
	if(matchesList == 0) {
		alert('No suggestions found, sorry :(');
	} else {
		var randomNum = Math.floor(Math.random() * matchesList.length);
		console.log(randomNum);
		alert("How about " + matchesList[randomNum] + "?");
	}	
}