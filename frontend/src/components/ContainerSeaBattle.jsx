import Sidebar from "./Sidebar";
import SeaBattle from "./SeaBattle";
import {Authenticatedpls} from "./Authenticatedpls";

let ContainerSeaBattle = (props) => {
    return (
        <div style={{display: "flex"}}>
            {props.loading ? <></> : props.isAuthenticated ? (
                <>
                    <Sidebar/>
                    <SeaBattle/>
                </>
            ) : (
                <>
                    <Sidebar/>
                    <SeaBattle/>
                    {props.isGuest ? <></> : <Authenticatedpls isOpen={props.isModalOpen} onClose={props.closeModal}/>}
                </>
            )}
        </div>
    )
}

export default ContainerSeaBattle;