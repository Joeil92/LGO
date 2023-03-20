import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Chat from '../../component/Chat/Chat';
import Gameboard from '../../component/Gameboard/Gameboard';
import Role from '../../component/Role/Role';
import { socketContext, ExtendedSocket } from '../../context/socket';
import './Game.css';

type Params = {
    id: string
}

export interface roles {
    name: string,
    name_function: string,
    description: string,
    side: string,
    img: string,
    max: number
}

export interface player {
    name: string,
    socket: string,
    role: roles | null,
    isPlayed: boolean,
    isDead: boolean,
    isTurn: boolean,
    isPower: boolean,
    isCouple: boolean,
    isCharmed: boolean,
    isRaven: boolean,
    isProtected: boolean,
    isInfected: boolean,
    healthPotion: boolean,
    deathPotion: boolean
}

export interface message {
    socket: string | null,
    author: string | null,
    recipient: string | null,
    msg: string
}

export interface room {
    status: string,
    author: string,
    players: player[],
    roles: string[],
    votes: string[],
    messages: message[],
    night: boolean,
    nbTurn: number;
    voteWolf: string,
    inGame: boolean;
}

function Game() {

    const { id } = useParams<Params>();
    const [roles, setRoles] = useState<roles[] | null>(null);
    const [room, setRoom] = useState<room | null>(null);
    const [player, setPlayer] = useState<player>();
    const [roleScreen, setRoleScreen] = useState(false);
    const [inGame, setInGame] = useState<boolean>(false);
    const socket = useContext<ExtendedSocket>(socketContext);

    socket.on('getRoom', room => {
        setRoom(room);
        const player = room?.players.find((player: player) => {
            return player.socket === socket.id
        })
        setPlayer(player);
    })

    socket.on('getRoles', (roles) => {
        setRoles(roles);
    })

    socket.on('inGame', bool => {
        setInGame(bool)
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
        <div className='game screen container-fluid'>
            <div className="row">
                <div className="col-md-3 bg-dark sidebar">
                    <div className="my-3 d-flex justify-content-around">
                        <div className='user-role d-flex justify-content-around align-items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" height="17" width="17"><g><circle cx="7" cy="2.5" r="2" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"></circle><path d="M10.5,8a3.5,3.5,0,0,0-7,0V9.5H5l.5,4h3l.5-4h1.5Z" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
                            <div className='mx-2'>
                                {room?.roles?.length} / {room?.players?.length}
                            </div>
                        </div>
                        <div className="id-room d-flex justify-content-around align-item-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" height="17" width="17"><g><path d="M12.5,10a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V1.5a1,1,0,0,1,1-1H9.5l3,3Z" fill="none" stroke="#fefefe" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.5,13.5h-7a1,1,0,0,1-1-1v-9" fill="none" stroke="#fefefe" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
                            <span className='mx-2'>{id}</span>
                        </div>
                        <div>
                            {
                                roleScreen
                                    ? <button className='btn-home' onClick={() => (setRoleScreen(false))}>
                                        <div className='d-flex justify-content-around align-items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" height="17" width="17"><g><circle cx="5" cy="2.75" r="2.25" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"></circle><path d="M3.5,12.5H.5V11A4.51,4.51,0,0,1,7,7" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"></path><polygon points="13.5 8.5 8.79 13.21 6.66 13.5 6.96 11.37 11.66 6.66 13.5 8.5" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"></polygon></g></svg>
                                            <span className="mx-2">
                                                Rôles
                                            </span>
                                        </div>
                                    </button>
                                    : <button className='btn-home' onClick={() => (setRoleScreen(true))}>
                                        <div className='d-flex justify-content-around align-items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" height="17" width="17"><g><circle cx="3.5" cy="7" r="0.5" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"></circle><circle cx="6.75" cy="7" r="0.5" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"></circle><circle cx="10" cy="7" r="0.5" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"></circle><path d="M7,.5A6.5,6.5,0,0,0,1.59,10.6L.5,13.5l3.65-.66A6.5,6.5,0,1,0,7,.5Z" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"></path></g></svg>
                                            <span className="mx-2">
                                                Messages
                                            </span>
                                        </div>
                                    </button>
                            }
                        </div>
                    </div>
                    {
                        roleScreen
                            ? <div className="my-5 row container">
                                <h2 className='text-center'>Rôles</h2>
                                {roles?.map((role: roles, index: number) => (
                                    <Role
                                        name={role.name}
                                        description={role.description}
                                        side={role.side}
                                        max={role.max}
                                        img={role.img}
                                        roleArray={room?.roles}
                                        author={room?.author}
                                        inGame={inGame}
                                        key={index} />
                                ))}
                                {
                                    room?.players?.length === room?.roles?.length && inGame === false && socket.id === room?.author && <button className="my-5 btn btn-success btn-lg" onClick={() => { socket.emit('inGame', true) }}>Lancer la partie</button>
                                }
                            </div>
                            : <Chat messages={room?.messages} night={room?.night} />
                    }

                </div>
                <div className="col text-center my-5">

                    {
                        inGame && <Gameboard players={room?.players} nbTurn={room?.nbTurn} player={player} night={room?.night} victim={room?.voteWolf} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Game;