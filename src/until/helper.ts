import moment from "moment";

  const formatTime = (time: any) => {
    const d = moment(time).format("D");
    const m = moment(time).format("M");
    const y = moment(time).format("YYYY");
    return `${d} Tháng ${m}, ${y}`;
  };
  export {formatTime}