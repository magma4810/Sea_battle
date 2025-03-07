import Sidebar from "./Sidebar";
import {Stats} from "./Stats";
import {PermissionDenied} from "./PermissionDenied";
import {Authenticatedpls} from "./Authenticatedpls";
import React from "react";

let ContainerStats = (props) => {

    return (
        <div style={{display: "flex"}}>
            <>
                {props.loading ? <></> : props.isAuthenticated ? (
                    <>
                        <Sidebar/>
                        <Stats/>
                    </>
                ) : (
                    <>
                        <Sidebar/>
                        <Stats/>
                        {props.isGuest ? <><PermissionDenied context={"своей Статистики"}/></> :
                            <Authenticatedpls isOpen={props.isModalOpen} onClose={props.closeModal}/>}
                    </>
                )}

            </>
        </div>
    )
}

export default ContainerStats