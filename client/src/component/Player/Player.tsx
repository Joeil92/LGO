import { socketContext, ExtendedSocket} from "../../context/socket";
import { useContext } from 'react';
import './Player.css';

interface props {
    name: string,
    name_function: string | undefined,
    socket: string,
    isDead: boolean,
    isTurn: boolean,
    isPower: boolean,
    isCouple: boolean,
    night: boolean | undefined,
    action: boolean,
    vote: boolean,
    wolf: boolean,
    selfDead: boolean | undefined,
    selfVote: boolean | undefined
}

function Player(props: props) {
    const socket = useContext<ExtendedSocket>(socketContext);

    function action(target: string) {
        socket.emit('set' + props.name_function, target);
    }

    function wolf(target: string) {
        socket.emit('voteWolf', target);
    }

    function villager(target: string) {
        socket.emit('voteVillage', target);
    }

    return (
        <div>
            {!props.isDead &&
            <div className='card bg-dark p-5'>
                {props.name}
                {
                    props.vote && <button className='btn btn-success'>Voter pour {props.name}</button>
                }
                {
                    !props.night && !props.selfDead && props.selfVote && <button onClick={() => {villager(props.socket)}} className="btn btn-primary">Vote pour exclure du village</button>
                }
                {
                    props.action && <button onClick={() => {action(props.socket)}} className='btn btn-primary'>Selectionner</button>
                }
                {
                    props.wolf && <button onClick={() => {wolf(props.socket)}} className='btn btn-primary'>Selectionner</button>
                }
            </div>
            }

        </div>
    )
}

export default Player;