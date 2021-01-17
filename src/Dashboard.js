import React, { useEffect, useState, useCallback, useRef } from "react";
import { connect, useSelector } from "react-redux";
import { Redirect } from "react-router";
import ChargingImage from "./components/ChargingImage";
import ClientsGraph from "./components/graphs/ClientsGraph";
import OrdersGraph from "./components/graphs/OrdersGraph";
import SalesGraph from "./components/graphs/SalesGraph";
import { request } from "./helpers/functions";
import translations from "./helpers/translations";
import { changeSection, addCharge, removeCharge } from "./store/workspaceActions";

const Dashboard = ({ changeSection, userID, addCharge, removeCharge }) => {
    const mounted = useRef(true);
    const [salesData, setSalesData] = useState(false);
    const [ordersData, setOrdersData] = useState(false);
    const [clientsData, setClientsData] = useState(false);
    const [salesMessage, setSalesMessage] = useState(false);
    const [ordersMessage, setOrdersMessage] = useState(false);
    const [clientsMessage, setClientsMessage] = useState(false);

    const lang = useSelector(state => state.language)

    const consultData = useCallback(
        async (section) => {
            addCharge();
            let sectionData = await request(
                `${process.env.REACT_APP_API_URL}/graph/${section}/${userID}`
            );
            removeCharge();
            if (sectionData.length === 0) {
                switch (section) {
                    case "daySales":
                        sectionData = {
                            message: translations[lang].graph.noSales,
                        };
                        break;
                    case "orders":
                        sectionData = {
                            message: translations[lang].graph.noOrders,
                        };
                        break;
                    case "clients":
                        sectionData = {
                            message: translations[lang].graph.noClients,
                        };
                        break;
                    default:
                        break;
                }
            }
            if (sectionData.message) {
                switch (section) {
                    case "daySales":
                        setSalesMessage(sectionData.message);
                        break;
                    case "orders":
                        setOrdersMessage(sectionData.message);
                        break;
                    case "clients":
                        setClientsMessage(sectionData.message);
                        break;
                    default:
                        break;
                }
            }
            return sectionData;
        },
	[userID, addCharge, removeCharge, lang]
    );

    const setData = (section, newData) => {
        if (mounted.current) {
            switch (section) {
                case "daySales":
                    setSalesData(newData);
                    break;
                case "orders":
                    setOrdersData(newData);
                    break;
                case "clients":
                    setClientsData(newData);
                    break;
                default:
                    break;
            }
        }
    };

    useEffect(() => {
        if (!userID) return;
        changeSection({ section: "dashboard" });
        const sections = ["daySales", "orders", "clients"];
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            consultData(section).then((newData) => {
                setData(section, newData);
            });
        }
        return () => (mounted.current = false);
    }, [consultData, changeSection, userID]);

    const salesGraph =
        salesData.length > 0 ? (
            <SalesGraph data={salesData.slice(false).reverse()} />
        ) : (
            <div className="noGraphData verticalDivCenter">
                <p>{salesMessage}</p>
            </div>
        );

    const ordersGraph =
        ordersData.length > 0 ? (
            <OrdersGraph data={ordersData} />
        ) : (
            <div className="noGraphData verticalDivCenter">
                <p>{ordersMessage}</p>
            </div>
        );

    const clientsGraph =
        clientsData.length > 0 ? (
            <ClientsGraph data={clientsData.slice(false).reverse()} />
        ) : (
            <div className="noGraphData verticalDivCenter">
                <p>{clientsMessage}</p>
            </div>
        );

    if (userID) {
        return (
            <div className="graphContainer">
                <div className="row m-0">
                    <div className="col-md-12">{salesGraph}</div>
                </div>
                <ChargingImage />
                <div className="row m-0">
                    <div className="col-md-8">{clientsGraph}</div>
                    <div className="col-md-4">{ordersGraph}</div>
                </div>
            </div>
        );
    } else {
        return <Redirect to={{ pathname: "/login" }} />;
    }
};

const mapStateToProps = (state) => ({
    userID: state.userID,
});

const mapDispatchToProps = {
    changeSection,
    addCharge,
    removeCharge,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
