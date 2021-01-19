import React, { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import translations from "../../helpers/translations";
import {useSelector} from "react-redux";

const OrdersGraph = ({ data }) => {
    const lang = useSelector(state => state.language)
    const [activeData, setActiveData] = useState(data[0]);

    const handleClick = (e) => {
        setActiveData(data[e.target.value]);
    };

    const chartData = [
        {
            name: translations[lang].graph.obtained,
            y: activeData.obtained,
            color: "#dbb82a",
        },
        {
            name: activeData.profit > 0 ? translations[lang].graph.profit : translations[lang].graph.negativeProfit,
            y: Math.abs(activeData.profit),
            color: activeData.profit > 0 ? "#168f14" : "#8a0101",
	    sliced: true,
	    selected: true
        },
    ];

    if (activeData.toGoal > 0) {
        chartData.push({
            name: translations[lang].graph.missing,
            y: activeData.toGoal,
            color: "#2e2d29",
        });
    }

    const options = {
        chart: {
            type: "pie",
        },
        title: {
            text: translations[lang].graph.Orders.title,
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
		name: translations[lang].graph.quantity,
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
	<select className="fsControl" style={{marginBottom: '1rem'}} onChange={handleClick}>
            {selectOptions}
        </select>
    </div>
};

export default OrdersGraph;
