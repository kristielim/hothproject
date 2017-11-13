var activities = [];

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
	const activityTags = activities[0][1];
	console.log(activities[0][1]);
	if(isGoodActivity(userTags,activityTags)){
		alert("Good activity");
	}

}

$('document').ready(function() {

	attachEventHandlers();
	$.ajax({
        type: "GET",
        url: "data:application/vnd.ms-excel;base64,QWN0aXZpdHksRWF0L0V4cGxvcmUsVGltZSxUcmFuc3BvcnQsQnVkZ2V0DQpEaWRkeSBSaWVzZSxFYXQgLGxlc3MgdGhhbiBhbiBob3VyLHdhbGssJA0KRm94IFRoZWF0ZXIsRXhwbG9yZSxhIGZldyBob3Vycyx3YWxrLCQkDQpIYW1tZXIgTXVzZXVtLEV4cGxvcmUsZGF5LHdhbGsgLEZSRUUNCkZvd2xlciBNdXNldW0gLEV4cGxvcmUsZGF5LFdhbGssRlJFRQ0KTSBFIE0gQm90YW5pY2FsIEdhcmRlbixFeHBsb3JlLGRheSxXYWxrLEZSRUUNClNhbnRhIE1vbmljYSBQaWVyLEV4cGxvcmUsZGF5ICxCdXMsJA0KR2V0dHkgQ2VudGVyLEV4cGxvcmUsZGF5LEJpa2UsRlJFRQ0KU2N1bHB0dXJlIEdhcmRlbixFeHBsb3JlLGxlc3MgdGhhbiBhbiBob3VyLFdhbGssRlJFRQ0KRmF0IFNhbCdzICxFYXQsbGVzcyB0aGFuIGFuIGhvdXIsd2FsaywkDQpEaXNuZXlsYW5kLEV4cGxvcmUsZGF5LEJ1cywkJCQNCg==",
        dataType: "text",
        success: function(data) {processData(data);}
     });

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
    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            tarr.push(data[0].trim());
            var tags = [];
            for (var j=1; j<headers.length; j++) {
                tags.push(data[j].trim());
            }
            tarr.push(tags);
            activities.push(tarr);
        }
    }
    console.log(activities[0]);
}
