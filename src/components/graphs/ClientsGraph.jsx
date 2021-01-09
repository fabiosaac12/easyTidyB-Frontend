import React from 'react';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ClientsGraph = ({ data }) => {
    const options = {
        chart: {
            type: "line",
	    zoomType: 'x',
	    style: {
		fontFamily: 'Helvetica'
	    }
        },
        title: {
            text: "Resumen de clientes",
	    margin: 0,
	    style: {fontSize: "20px", fontWeight: '500', letterSpacing: '1px'}
        },
	tooltip: {
	    shared: true
	},
        xAxis: {
	    categories: data.map(e => e.name),
            title: false
        },
        yAxis: {
            title: false, 
            min: 0,
        },
        series: [
            {
                name: "Comprado",
                data: data.map((e) => e.bought),
		tooltip: {
		    valueSuffix: ' $'
		},
		color: '#dbb82a'
            },
            {
                name: "Ganancias",
                data: data.map((e) => e.profit),
		tooltip: {
		    valueSuffix: ' $'
		},
		color: '#168f14'
            },
            {
                name: "Cantidad de compras",
                data: data.map((e) => e.purchases),
		color: '#2e2d29'
            },
        ],
    };
    return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default ClientsGraph
