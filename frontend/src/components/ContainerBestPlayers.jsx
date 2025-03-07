import React, {useEffect} from "react";
import Cookies from "js-cookie";
import Sidebar from "./Sidebar";
import BestPlayers from "./BestPlayers";
import {PermissionDenied} from "./PermissionDenied";
import {Authenticatedpls} from "./Authenticatedpls";

let ContainerBestPlayers = (props) => {

    return (
        <div style={{display: "flex"}}>
            <>
                {props.loading ? <></> : props.isAuthenticated ? (
                    <>
                        <Sidebar/>
                        <BestPlayers/>
                    </>
                ) : (
                    <>
                        <Sidebar/>
                        {props.isGuest ? <><PermissionDenied context={"Топ Лучших игроков"}/></> : <>
                            <Authenticatedpls
                                isOpen={props.isModalOpen} onClose={props.closeModal}/><PermissionDenied
                            context={"Топ Лучших игроков"}/></>}
                    </>
                )}
            </>
        </div>
    )
}

export default ContainerBestPlayers;