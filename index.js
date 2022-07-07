function createEmployeeRecord(array){
    const firstName = array[0]
    const familyName = array[1]
    const title = array[2]
    const payPerHour = array[3]
    const timeInEvents = []
    const timeOutEvents = []
    const employeeRecord = {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents,
        timeOutEvents
    }
    return employeeRecord
}

function createEmployeeRecords(arrays){
    const employeeRecords = arrays.map((array) => createEmployeeRecord(array))
    return employeeRecords
}

function createTimeInEvent(record, timestamp){
    const timeArray = timestamp.split(' ')
    const date = timeArray[0]
    const time = timeArray[1]
    const hour = parseInt(time, 10)
    
    record.timeInEvents.push(
        {
            type: 'TimeIn',
            hour: hour,
            date: date
        }
    )
    return record
}

function createTimeOutEvent(record, timestamp){
    const timeArray = timestamp.split(' ')
    const date = timeArray[0]
    const time = timeArray[1]
    const hour = parseInt(time, 10)
    
    record.timeOutEvents.push(
        {
            type: 'TimeOut',
            hour: hour,
            date: date
        }
    )
    return record
}

function hoursWorkedOnDate(record, date){
    const targetInObj = record.timeInEvents.find(obj => obj.date === date)
    const timeIn = targetInObj.hour

    const targetOutObj = record.timeOutEvents.find(obj => obj.date === date)
    const timeOut = targetOutObj.hour

    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(record, date){
    const hoursWorked = hoursWorkedOnDate(record, date)
    return hoursWorked * record.payPerHour
}

function allWagesFor(record){
    // pull all dates from the employee record, add them to an array
    const timeStampObjs = record.timeInEvents
    const timeStampDates = timeStampObjs.map(obj => obj.date)

    // call wagesEarnedOnDate for each item in the array, resulting in a new array with all wages
    const allWages = timeStampDates.map(date => wagesEarnedOnDate(record, date))

    // call reduce on the new array to add the wages together
    const finalWages = allWages.reduce((total, num) => total + num, 0)
    return finalWages
}

function calculatePayroll(array){
    // use map to iterate through each record in the array
    const allRecordWages = array.map(
        function(record){

            // pulled this logic from the previous function, will output an array with final wages for each record
            const timeStampDates = record.timeInEvents.map(obj => obj.date)
            const allWages = timeStampDates.map(date => wagesEarnedOnDate(record, date))
            const finalWages = allWages.reduce((total, num) => total + num, 0)
            return finalWages
        }
    )

    // call reduce on the array to add the final wages from all records together
    return allRecordWages.reduce((total, num) => total + num, 0)
}