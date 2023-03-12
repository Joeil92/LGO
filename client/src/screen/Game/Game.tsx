import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Role from '../../component/Role';
import {socketContext, ExtendedSocket} from '../../context/socket';
import './Game.css';

type Params = {
    id: string
}

export interface roles {
    name: string,
    description: string,
    side: string,
    max: number
}

export interface room {
    status?: string,
    author?: string,
    players?: string[],
    roles?: string[],
    votes?: string[]
}

function Game() {

    const { id } = useParams<Params>();
    const [roles, setRoles] = useState<roles[] | null>(null);
    const [room, setRoom] = useState<room | null>(null);
    const socket = useContext<ExtendedSocket>(socketContext);

    socket.on('getRoom', room => {
        setRoom(room);
        console.log(room);
    })
    
    socket.on('getRoles', (roles) => {
        setRoles(roles);
        console.log(roles);
    })

    useEffect(() => {
        if (!roles) {
            socket.emit('getRoles');
        }

        if (!room) {
            socket.emit('getRoom');
        }
    }, [socket, roles, room])

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-2 d-none d-md-block bg-light sidebar">
                </div>
                <div className="col">
                    <div className="card bg-light container m-auto my-5">
                        <div className="card-body text-center">
                            <div className="row my-5">
                                <h2 className='my-3'>Choissisez les rôles</h2>
                                {roles?.map((role: roles, index: number) => (
                                    <Role 
                                    name={role.name} 
                                    description={role.description} 
                                    side={role.side} 
                                    max={role.max}
                                    roleArray={room?.roles}
                                    key={index} />
                                ))}
                            </div>
                            <button className="btn btn-success btn-lg">Lancer la partie</button>
                        </div>
                    </div>
                    <div className="card container bg-light p-3 text-center">Identifiant : {id}</div>
                </div>
            </div>
        </div>
    )
}

export default Game;