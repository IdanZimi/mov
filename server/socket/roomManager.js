import Room from './room.js';
import SOCKET_EVENTS from "./enum/events.js";

class RoomManager {
    io;
    rooms = new Map();

    constructor(io) {
        this.io = io;
        this.io.on(SOCKET_EVENTS.CONNECTION, socket => this.#onConnection(socket));
    }

    #onConnection(socket) {
        let currentRoomId = null;

        socket.on(SOCKET_EVENTS.JOIN, ({ blockId }) => {
            currentRoomId = blockId;
            if (!this.rooms.has(blockId)) {
                this.rooms.set(blockId, new Room(blockId, this.io));
            }
            this.rooms.get(blockId).join(socket);
        });

        socket.on(SOCKET_EVENTS.CODE_CHANGE, code => {
            if (!currentRoomId) return;

            this.rooms.get(currentRoomId)?.changeCode(socket, code);
        });

        socket.on(SOCKET_EVENTS.DISCONNECT, () => {
            if (!currentRoomId) return;

            const room = this.rooms.get(currentRoomId);
            const isMentor = room?.isMentor(socket.id)
            room?.leave(socket);
            if (isMentor) {
                this.rooms.delete(currentRoomId);
            }
        });
    }

}

export default RoomManager
