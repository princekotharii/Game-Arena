import { generateId } from '@utils/helpers'
import { ARENA_STATUS } from '@utils/constants'

class ArenaService {
  // Create a new room
  createRoom(hostPlayer, gameId, maxPlayers = 2, roomName = 'New Room') {
    return {
      id: generateId(),
      name: roomName,
      host: hostPlayer.username,
      hostId: hostPlayer.id,
      game: gameId,
      maxPlayers,
      players: [hostPlayer],
      status: ARENA_STATUS.WAITING,
      createdAt: Date.now(),
    }
  }

  // Join room
  joinRoom(room, player) {
    if (room.players.length >= room.maxPlayers) {
      throw new Error('Room is full')
    }

    if (room.status !== ARENA_STATUS.WAITING) {
      throw new Error('Game already started')
    }

    const isAlreadyInRoom = room.players.some(p => p.id === player.id)
    if (isAlreadyInRoom) {
      throw new Error('Already in room')
    }

    return {
      ...room,
      players: [...room.players, player],
      status: room.players.length + 1 >= 2 ? ARENA_STATUS.READY : ARENA_STATUS.WAITING,
    }
  }

  // Leave room
  leaveRoom(room, playerId) {
    const players = room.players.filter(p => p.id !== playerId)

    // If host leaves, assign new host or close room
    if (room.hostId === playerId) {
      if (players.length > 0) {
        return {
          ...room,
          players,
          hostId: players[0].id,
          host: players[0].username,
        }
      }
      return null // Room should be deleted
    }

    return {
      ...room,
      players,
      status: players.length >= 2 ? ARENA_STATUS.READY : ARENA_STATUS.WAITING,
    }
  }

  // Start game
  startGame(room) {
    if (room.players.length < 2) {
      throw new Error('Not enough players')
    }

    return {
      ...room,
      status: ARENA_STATUS.IN_GAME,
      startedAt: Date.now(),
    }
  }

  // End game
  endGame(room, results) {
    return {
      ...room,
      status: ARENA_STATUS.FINISHED,
      results,
      finishedAt: Date.now(),
    }
  }

  // Get mock rooms (in a real app, this would fetch from backend)
  getMockRooms() {
    return [
      {
        id: generateId(),
        name: 'Pro Players Only',
        host: 'MasterGamer',
        hostId: generateId(),
        game: 'tic-tac-toe',
        maxPlayers: 2,
        players: [],
        status: ARENA_STATUS.WAITING,
        createdAt: Date.now(),
      },
      {
        id: generateId(),
        name: 'Casual Fun',
        host: 'ChillPlayer',
        hostId: generateId(),
        game: 'snake',
        maxPlayers: 4,
        players: [],
        status: ARENA_STATUS.WAITING,
        createdAt: Date.now(),
      },
    ]
  }

  // Send chat message
  sendMessage(roomId, player, message) {
    return {
      id: generateId(),
      roomId,
      playerId: player.id,
      playerName: player.username,
      playerAvatar: player.avatar,
      message,
      timestamp: Date.now(),
    }
  }

  // Validate room name
  validateRoomName(name) {
    if (!name || name.trim().length < 3) {
      return 'Room name must be at least 3 characters'
    }
    if (name.length > 30) {
      return 'Room name must be less than 30 characters'
    }
    return null
  }
}

export default new ArenaService()