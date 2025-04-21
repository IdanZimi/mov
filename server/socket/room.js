import SOCKET_EVENTS from "./enum/events.js";

const ROLES = Object.freeze({
    MENTOR: 'Mentor',
    STUDENT: 'Student'
})

export default class Room {
    #io;
    #id;
    #mentor = null;
    #students = new Set();
    #code = null;

    constructor(id, io) {
        this.#id = id;
        this.#io = io;
    }

    join(socket) {
        socket.join(this.#id);

        if (!this.#mentor) {
            this.#mentor = socket.id;
            socket.emit(SOCKET_EVENTS.ROLE, ROLES.MENTOR);
        } else {
            this.#students.add(socket.id);
            socket.emit(SOCKET_EVENTS.ROLE, ROLES.STUDENT);
        }

        if (this.#code) {
            socket.emit(SOCKET_EVENTS.REMOTE_CODE, this.#code);
        }

        this.#broadcastCount();
    }

    changeCode(socket, newCode) {
        if (!this.#owns(socket)) return;

        this.#code = newCode;
        socket.to(this.#id).emit(SOCKET_EVENTS.REMOTE_CODE, newCode);
    }

    leave(socket) {
        const isMentor = this.isMentor(socket.id);
        if (isMentor) {
            this.#io.in(this.#id).emit(SOCKET_EVENTS.END_SESSION);
            return;
        }

        this.#students.delete(socket.id);
        this.#broadcastCount();
    }

    #broadcastCount() {
        const count = this.#students.size;
        this.#io.in(this.#id).emit('student-count', count);
    }

    #owns(socket) {
        return this.#students.has(socket.id);
    }

    isMentor(socketId){
        return this.#mentor === socketId;
    }
}
