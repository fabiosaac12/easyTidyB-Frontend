import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const SalesGraph = ({
    data
}) => {
    let currentDate = new Date();
    currentDate = [
        currentDate.getUTCFullYear(),
        (currentDate.getUTCMonth() + 1) < 10 ? "0" + (String(currentDate.getUTCMonth() + 1)) : (currentDate.getUTCMonth() + 1),
        currentDate.getUTCDate() < 10 ? "0" + String(currentDate.getUTCDate()) : currentDate.getUTCDate(),
    ].join("-");
    const currentDateExists = data.find((e) => e.date === currentDate)
    if (!currentDateExists) {
        data.push({
            date: currentDate,
            obtained: 0,
            profit: 0,
            salesQuantity: 0
        });
    }

    const options = {
        chart: {
            type: "line",
            zoomType: 'x',
            style: {
                fontFamily: 'Helvetica'
            }
        },
        title: {
            text: "Resumen de ventas",
	    margin: 0,
            style: {
                fontSize: "20px",
                fontWeight: '500',
                letterSpacing: '1px'
            }
        },
        tooltip: {
            shared: true
        },
        xAxis: {
            type: "datetime",
            dateTimeLabelFormats: {
                // don't display the dummy year
                month: "%e. %b",
                year: "%b",
            },
            title: false,
        },
        yAxis: {
            title: false,
            min: 0,
        },
        series: [{
                name: "Obtenido",
                data: data.map((e) => {
                    const dateSplitted = e.date.split("-");
                    const newDate = Date.UTC(
                        dateSplitted[0],
                        parseInt(dateSplitted[1]) - 1,
                        dateSplitted[2]
                    );
                    return [newDate, e.obtained];
                }),
		color: '#dbb82a',
                tooltip: {
                    valueSuffix: ' $'
                }
            },
            {
                name: "Ganancias",
                data: data.map((e) => {
                    const dateSplitted = e.date.split("-");
                    const newDate = Date.UTC(
                        dateSplitted[0],
                        parseInt(dateSplitted[1]) - 1,
                        dateSplitted[2]
                    );
                    return [newDate, e.profit];
                }),
		color: '#168f14',
                tooltip: {
                    valueSuffix: ' $'
                }
            },
            {
                name: "Cantidad de ventas",
                data: data.map((e) => {
                    const dateSplitted = e.date.split("-");
                    const newDate = Date.UTC(
                        dateSplitted[0],
                        parseInt(dateSplitted[1]) - 1,
                        dateSplitted[2]
                    );
                    return [newDate, e.salesQuantity];
                }),
		color: '#2e2d29',
            },
        ],
    };
    return <HighchartsReact highcharts = {
        Highcharts
    }
    options = {
        options
    }
    />;
};

export default SalesGraph
