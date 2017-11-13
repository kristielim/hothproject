var userTags;
var activityList;
var matchesList;
Random rand;

function compareAll(userTags, activityList){
	for(var i = 0; i < activityList.length; i++){
		if(isGoodActivity(userTags[i], activityList[i][1])){
			matchesList.push(activityNameList[i][0]);
		}
	}
	function findSuggestion(){
	var randomNum = rand.nextInt(matchesList.length+1);
	var k = matchesList.length;
	while(k > 0){
		console.log("How about " + matchesList[randomNum] + " ?");
		if(isOk == false){
			matchesList.splice(randomNumber, 0);
			k--;
		}
	}
	console.log("Sorry, no more recommendations are available");
}
}
