import moment from "moment";

export const datetimeFormatter = (data: Date) => {
    const datetime = moment(data).format("DD-MM-YYYY");
    const now = moment(new Date()).format("DD-MM-YYYY");
    const time_milsec = Math.abs(
        new Date().getTime() - new Date(data).getTime()
    );
    const time_sec = Math.floor(time_milsec / 1000);
    const hr = Math.floor(time_sec / 3600);
    const check_hr = hr <= 1 ? hr + " hr" : hr + " hrs"
    const min = Math.floor(time_sec / 60);
    const check_min = min <= 1 ? min + " min" : min + " mins"
    // > 3600 = hr , <= 3600 mins
    const check_time = time_sec > 3600 ? check_hr : check_min;
    const check_date = Math.abs(
        new Date().getDate() - new Date(data).getDate()
    );
    // < 24 --> hr | >= 24 --> d 
    return hr < 24 ? check_time : check_date + " d";
}