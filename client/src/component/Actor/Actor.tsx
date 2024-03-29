import { roles } from "../../screen/Game/Game_old";
import { socketContext, } from "../../context/socket"
import { useContext } from "react"
import "./Actor.css";


interface props {
    role: roles
}

function Actor({role}: props) {

    const socket = useContext(socketContext);

    function sendRole(role: roles) {
        socket.emit('setActor', role);
    }

    return (
        <div className="col actor-role" onClick={() => sendRole(role)}>
            <h3>{role.name}</h3>
            <p>{role.description}</p>
        </div>
    )
}

export default Actor;