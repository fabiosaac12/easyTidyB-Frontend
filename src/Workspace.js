import Form from "./components/Form";
import PopUpDiv from "./components/PopUpDiv";
import Table from "./components/Table";
import React, { useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { setResetAllFunction, resetAditionalForms, resetConsultSelectsData, hidePopUpDiv, changeSection, setPopUpDivContent } from "./store/actions";
import { backToRegisterMode } from "./components/ActionsButtons";
import { resetInputs, resetCorrectionPs } from "./helpers/functions";
import ChargingImage from "./components/ChargingImage";
import translations from "./helpers/translations";

const Workspace = ({ setResetAllFunction, resetAditionalForms, resetConsultSelectsData, doTableSearch, hidePopUpDiv, changeSection, accessToken, setPopUpDivContent }) => {
    const { section } = useParams();
    const lang = useSelector(state => state.language)

    try {
        document.getElementById("formTitle").innerHTML = translations[lang].form[`add${section}`];
    } catch {}

    useEffect(() => {
        changeSection({ section: section });
        setResetAllFunction({
            resetAll: async (changeSection = true) => {
                try {
                    const registerButton = document.getElementById(
                        "registerButton"
                    );
                    if (registerButton)
                        if (
                            registerButton.innerHTML ===
                            translations[lang].words.modify
                        ) {
                            backToRegisterMode(section, false, lang);
                        }

                    resetAditionalForms({ aditionalForms: [] });

                    resetInputs(changeSection);
                    resetCorrectionPs();

                    hidePopUpDiv({ hidePopUpDiv: true });
		    setPopUpDivContent({ popUpDivContent: <div></div> });


                    if (changeSection) {
                        resetConsultSelectsData();
                        if (document.getElementById("searcher"))
                            doTableSearch({
                                target: document.getElementById("searcher"),
                            });
                    }
                } catch (e) {

                }
            },
        });
    }, [ setResetAllFunction, resetAditionalForms, resetConsultSelectsData, doTableSearch, hidePopUpDiv, section, changeSection, lang, setPopUpDivContent ]);
    if (accessToken) {
        if (["Sales", "Clients", "Products", "Orders", "Suppliers"].includes(section)) {
            return (
                <div>
                    <div id="bodyDiv" className="container-md">
                        <Form />
                        <Table />
                    </div>
                    <ChargingImage />
                    <PopUpDiv />
                </div>
            );
        } else {
            return <Redirect to={{ pathname: "/workspace/Sales" }} />;
        }
    } else {
        return <Redirect to={{ pathname: "/login" }} />;
    }
};

const mapStateToProps = (state) => ({
    doTableSearch: state.doTableSearch,
    accessToken: state.accessToken,
});
const mapDispatchToProps = {
    setResetAllFunction,
    resetAditionalForms,
    resetConsultSelectsData,
    hidePopUpDiv,
    changeSection,
    setPopUpDivContent
};

export default connect(mapStateToProps, mapDispatchToProps)(Workspace);
