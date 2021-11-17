function createEmployeeRecord(array){
	const eObj = {};

	eObj.firstName = array[0];
	eObj.familyName = array[1];
	eObj.title = array[2];
	eObj.payPerHour = array[3];
	eObj.timeInEvents = [];
	eObj.timeOutEvents = [];

	return eObj;
}

function createEmployeeRecords(nestedArray) {
	return nestedArray.map(array => createEmployeeRecord(array));
} 

function createTimeInEvent(eObj, timeStamp) {
	const eventArray = eObj.timeInEvents;
	const newTimeObj = {};
	const timeArray = timeStamp.split("");

	newTimeObj.type = "TimeIn";
	newTimeObj.hour = parseInt(timeArray.slice(11).join(""));
	newTimeObj.date = timeArray.slice(0, 10).join("");



	eventArray.push(newTimeObj)

	return eObj
}


function createTimeOutEvent(eObj, timeStamp) {
	const eventArray = eObj.timeOutEvents;
	const timeOutObj = {};
	const timeArray = timeStamp.split("");

	timeOutObj.type = "TimeOut";
	timeOutObj.hour = parseInt(timeArray.slice(11).join(""));
	timeOutObj.date = timeArray.slice(0, 10).join("")

	eventArray.push(timeOutObj)

	return eObj;
}
function hoursWorkedOnDate(eObj, inputDate) {
	const timeInArray = eObj.timeInEvents;
	const timeOutArray = eObj.timeOutEvents;

	debugger;

	function matchDate(array) {
		for(const obj of array) {
			if (obj.date === inputDate) {
				return obj.hour;
			}
		}
	}
	debugger;

	const hourIn = matchDate(timeInArray)/100;
	const hourOut = matchDate(timeOutArray)/100;

	debugger;

	return hourOut - hourIn;

}

function wagesEarnedOnDate(eObj, inputDate){
	return eObj.payPerHour * hoursWorkedOnDate(eObj, inputDate)
}

function allWagesFor(eObj) {
	const timeOutArray = eObj.timeOutEvents;
	const datesArray = timeOutArray.map((obj) => obj.date);

	const wagesArray = datesArray.map((date) => wagesEarnedOnDate(eObj, date));

	return wagesArray.reduce(((accum, event) => accum += event), 0);


}

function calculatePayroll(array) {
	const wagesArray = array.map(eObj => allWagesFor(eObj));
	return wagesArray.reduce(((accum, event) => accum += event), 0);

}
