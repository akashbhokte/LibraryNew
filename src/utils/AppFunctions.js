import moment from "moment";

export const AppFunctions = {
    Datetoday: () => new Date().getFullYear().toString() + ("0" + (new Date().getMonth() + 1).toString()).slice(-2) + ("0" + new Date().getDate().toString()).slice(-2),
    now: () => { let now = new Date(); return ('0' + now.getHours()).slice(-2) + ('0' + now.getMinutes()).slice(-2) + ('0' + now.getSeconds()).slice(-2) },
    dateShowConvert: (dateInDBFormat) => {
        if (dateInDBFormat?.toString().length == 8) {
            return dateInDBFormat.toString().substr(6) + '/' + dateInDBFormat.toString().substring(4, 6) + '/' + dateInDBFormat.toString().substring(0, 4)
        } else {
            return "00/00/0000"
        }
    },
    endDateSendConvert: (dateInDBFormat) => {
        return moment(dateInDBFormat).format('YYYYMMDD');
    },
    convertToArray: (data) => Object.keys(data).map(key => {
        return data[key];
    })
}