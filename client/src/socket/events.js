const SOCKET_EVENTS = Object.freeze({
    JOIN: 'join',
    CODE_CHANGE: 'code-change',
    DISCONNECT: 'disconnect',
    ROLE: 'role',
    REMOTE_CODE: 'remote-code',
    STUDENT_COUNT: 'student-count',
    END_SESSION: 'end-session',
    CONNECTION: 'connection'
});

export default SOCKET_EVENTS;
