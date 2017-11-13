var activities = [];
var matchesList = [];

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
	const activityTags = activities[0][1];
	compareAll(userTags,activities); // populates matchesList
	findSuggestion();

}

$('document').ready(function() {

	attachEventHandlers();
	$.ajax({
        type: "GET",
        url: "data:application/vnd.ms-excel;base64,QWN0aXZpdHksVHlwZSxUaW1lLFRyYW5zcG9ydCxCdWRnZXQNCkRpZGR5IFJpZXNlLEVhdCAsbGVzcy10aGFuLWFuLWhvdXIsd2FsaywkDQpGb3ggVGhlYXRlcixFeHBsb3JlLGEtZmV3LWhvdXJzLHdhbGssJCQNCkhhbW1lciBNdXNldW0sTGVhcm4sYS1mZXctaG91cnMsd2FsayAsRlJFRQ0KRm93bGVyIE11c2V1bSxMZWFybixhLWZldy1ob3Vycyx3YWxrLEZSRUUNCk0gRSBNIEJvdGFuaWNhbCBHYXJkZW4sRXhwbG9yZSxsZXNzLXRoYW4tYW4taG91cix3YWxrLEZSRUUNClNhbnRhIE1vbmljYSBQaWVyLEV4cGxvcmUsZGF5ICxidXMsJA0KR2V0dHkgQ2VudGVyLExlYXJuLGRheSxiaWtlLEZSRUUNClNjdWxwdHVyZSBHYXJkZW4sRXhwbG9yZSxsZXNzLXRoYW4tYW4taG91cix3YWxrLEZSRUUNCkZhdCBTYWwncyAsRWF0LGxlc3MtdGhhbi1hbi1ob3VyLHdhbGssJA0KRGlzbmV5bGFuZCxFeHBsb3JlLGRheSxidXMsJCQkDQpJbiBuIE91dCxFYXQsbGVzcy10aGFuLWFuLWhvdXIsd2FsaywkDQpCZWxsYSBQaXRhLEVhdCxhLWZldy1ob3Vycyx3YWxrLCQNCkxpdHRsZSBUb2t5byxFeHBsb3JlLGRheSxidXMsJCQNCkdyaWZmaXRoIE9ic2VydmF0b3J5LExlYXJuLGRheSxidXMsRlJFRQ0KVW5pdmVyc2FsIFN0dWRpb3MsRXhwbG9yZSxkYXksYnVzLCQkJA0KVmVuaWNlIEJlYWNoLEV4cGxvcmUsZGF5LGJ1cywkDQpXYWxrIG9mIEZhbWUrQ2hpbmVzZSBUaGVhdGVyLEV4cGxvcmUsYS1mZXctaG91cnMsYnVzLEZSRUUNCkxBQ01BLEV4cGxvcmUsZGF5LGJpa2UsJA0KTGEgQnJlYSBUYXIgUGl0cyxMZWFybixkYXksYnVzLCQkDQpQaW5rJ3MgSG90IERvZ3MsRWF0LGEtZmV3LWhvdXJzLGJpa2UsJCQNCkhvd2xpbicgUmF5J3MgLEVhdCxhLWZldy1ob3VycyxidXMsJCQNCldlc3RmaWVsZCBDZW50dXJ5IENpdHksRXhwbG9yZSxhLWZldy1ob3VycyxiaWtlLCQkDQpUaGUgR3JvdmUsRXhwbG9yZSxkYXksYnVzLCQkDQpPcmlnaW5hbCBGYXJtZXIncyBNYXJrZXQsRWF0LGEtZmV3LWhvdXJzLGJ1cywkJA0KbGEgem9vLEV4cGxvcmUsZGF5LGJ1cywkJA0KTmF0dXJhbCBIaXN0b3J5IE11c2V1bSxMZWFybixkYXksYnVzLCQNClBldGVyc2VuIEF1dG8gTXVzZXVtLExlYXJuLGRheSxiaWtlLCQkDQpXQiBTdHVkaW8gVG91cixFeHBsb3JlLGRheSxidXMsJCQkDQpNdXNldW0gb2YgRGVhdGggLExlYXJuLGRheSxidXMsJCQNCkhvbG9jYXVzdCBNdXN1ZW0sTGVhcm4sZGF5LGJ1cyxGUkVFDQpNdXNldW0gb2YgVG9sZXJhbmNlLExlYXJuLGRheSxidXMsJA0KS29yZWF0b3duIFBsYXphLEV4cGxvcmUsZGF5LGJ1cywkJA0KR2V0dHkgVmlsbGEsTGVhcm4sZGF5LGJ1cyxGUkVFDQpQaGlsaXBwZSdzIHRoZSBPcmlnaW5hbCAsRWF0LGEtZmV3LWhvdXJzLGJ1cywkJA0KQ2FsaWZvcm5pYSBTY2llbmNlIENlbnRlcixMZWFybixkYXksYnVzLEZSRUUNClVDTEEgQXRobGV0aWNzIEhhbGwgb2YgRmFtZSxFeHBsb3JlLGxlc3MtdGhhbi1hbi1ob3VyLHdhbGssRlJFRQ0KUm9kZW8gRHJpdmUgYXQgQmV2ZXJseSBIaWxscyxFeHBsb3JlLGEtZmV3LWhvdXJzLGJpa2UsJCQkDQpBbW9lYmEgTXVzaWMgLEV4cGxvcmUsYS1mZXctaG91cnMsYnVzLCQkDQpEb2Nrd2VpbGVyIEJlYWNoICxFeHBsb3JlLGEtZmV3LWhvdXJzLGJ1cyxGUkVFDQpUaGUgQnJvYWQsTGVhcm4sYSBkYXksYnVzLCQkDQpLbGVpbnJvY2sgQ2VudGVyIGZvciBJbnRlcm5ldCBTdHVkaWVzLExlYXJuLGxlc3MtdGhhbi1hbi1ob3VyLHdhbGssRlJFRQ0KQnJ1eGllJ3MsRWF0LGEtZmV3LWhvdXJzLGJ1cywkJA0KODUgZGVncmVlcyxFYXQsYS1mZXctaG91cnMsYnVzLCQNClN0YW4ncyBEb251dHMsRWF0LGxlc3MtdGhhbi1hbi1ob3VyLHdhbGsgLCQNCg==",
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
		var randomNum = Math.floor(Math.random() * (matchesList.length+1));
		alert("How about " + matchesList[randomNum] + "?");
	}	
}