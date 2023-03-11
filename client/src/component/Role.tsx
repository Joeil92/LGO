import {roles} from "../screen/Game/Game";
import {socketContext, ExtendedSocket} from "../context/socket";
import { useContext } from "react";

function Role({name, description, side, max}: roles) {

    const socket = useContext<ExtendedSocket>(socketContext);

    function addRole(name: string) {
        socket.emit('addRole', name);
    }

    function deleteRole(name: string) {
        socket.emit('deleteRole', name);
    }
    
    return (
        <div className="col-sm-2">
            <p data-bs-toggle="tooltip" data-bs-placement="top" title={description}>
            {name}
            </p>
            <div className="d-flex">
                <button className="btn btn-danger mx-1" onClick={() => {deleteRole(name)}}>-</button>
                <button className="btn btn-success mx-1" onClick={() => {addRole(name)}}>+</button>            
            </div>
        </div>
    )
}

export default Role;