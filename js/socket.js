/*\
 *  ============  TODO  ============
 * - Chat
 * - Players being able to interact with each other, and levels not possible without help from someone
 * - Everyone should be able to see you, and you should be able to see everyone, including stats.
 *
 *  ===========  EVENTS  ===========
 * NOTE: Some events have "{lvlnum}" on them. These events are per level player updates,
 * as there isn't need to flood traffic for people not in your level, or for you to bother with people
 * not in yours either.
 * - "h{lvlnum}": when a player gets hurt, how much damage.
 *   - Type: number
 * - "p{lvlnum}": position update, in dx and dy
 *   - Type: UInt8Array[2], shouldn't move greater than 256 pixels anyways, and 0 = 1
 * - "f{lvlnum}": Full player object, probably synced every 5-10 secs
 *   - Format: "(x) (y) (health) (col) (vx) (vy)"
 * - "t{lvlnum}": Text message.
 *   - Format: "(username):(text)"
 * - "np": New player join message; global.
 *   - Type: string
\*/ /*
socket.on("np", id => {
	console.log("New player joined! ID:" + id);
});

socket.on("pog", ({ id , data }) => {
	
}); */