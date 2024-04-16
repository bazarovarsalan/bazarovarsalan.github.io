import moment from "moment";
import {wordHelper} from "./wordHelper";

export function calculateDate(createTime: string) {
    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    const date1 = moment(createTime);
    const date2 = moment(now);

    const getDiff = (a: moment.Moment, b: moment.Moment) => {
        let difference: number;
        if (+b.diff(a, "years") >= 1) {
            difference = b.diff(a, "years");
            return date1.format("DD.MM.YYYY, HH:mm:ss");
        } else if (+b.diff(a, "months") >= 1) {
            difference = b.diff(a, "months");
            return date1.format("DD.MM.YYYY, HH:mm:ss");
        } else if (+b.diff(a, "days") >= 1) {
            difference = b.diff(a, "days");
            return date1.format("DD.MM.YYYY, HH:mm:ss");
        } else if (+b.diff(a, "hours") >= 1) {
            difference = b.diff(a, "hours");
            return wordHelper(difference, ["час", "часа", "часов"]) + " назад";
        } else if (+b.diff(a, "minutes") >= 1) {
            difference = b.diff(a, "minutes");
            return (
                wordHelper(difference, ["минута", "минуты", "минут"]) + " назад"
            );
        }
        return "now";
    };
    const diff = getDiff(date1, date2);
    return diff;
}

export function subtractHours(date: Date, numOfHours: number) {
    const dateCopy = new Date(date.getTime());

    dateCopy.setHours(dateCopy.getHours() - numOfHours);

    return dateCopy;
}
