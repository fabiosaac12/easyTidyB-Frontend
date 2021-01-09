import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const OrdersGraph = ({ data }) => {
    const [activeData, setActiveData] = useState(data[0]);

    const handleClick = (e) => {
        setActiveData(data[e.target.value]);
    };

    const chartData = [
        {
            name: "Obtenido",
            y: activeData.obtained,
            color: "#dbb82a",
        },
        {
            name: activeData.profit > 0 ? "Ganancias" : "Ganancias negativas",
            y: Math.abs(activeData.profit),
            color: activeData.profit > 0 ? "#168f14" : "#8a0101",
	    sliced: true,
	    selected: true
        },
    ];

    if (activeData.toGoal > 0) {
        chartData.push({
            name: "Faltante para el esperado",
            y: activeData.toGoal,
            color: "#2e2d29",
        });
    }

    const options = {
        chart: {
            type: "pie",
        },
        title: {
            text: "Resumen de pedidos",
	    margin: 0,
	    style: {fontSize: "20px", fontWeight: '500', letterSpacing: '1px'}
        },
        tooltip: {
            valueSuffix: " $",
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: "pointer",
		dataLabels: {
		    enabled: false
		},
		showInLegend: true
            },
        },
        series: [
            {
		name: 'Cantidad',
		colorByPoint: true,
                data: chartData,
            },
        ],
    };


    let selectOptions = [];
    for (let ele in data) {
        selectOptions.push(
            <option key={ele} value={ele}>
                {data[ele].supplierName}
            </option>
        );
    }

    return <div>
	<HighchartsReact highcharts={Highcharts} options={options} />
	<select className="form-control" onChange={handleClick}>
            {selectOptions}
        </select>
    </div>
};

export default OrdersGraph;
