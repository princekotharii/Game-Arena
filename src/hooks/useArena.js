import { useEffect, useCallback } from 'react'
import useArenaStore from '@store/arenaStore'
import usePlayerStore from '@store/playerStore'
import arenaService from '@services/arenaService'
import toast from 'react-hot-toast'

export const useArena = () => {
  const { 
    rooms, 
    currentRoom, 
    players, 
    status,
    setRooms,
    setCurrentRoom,
    addRoom,
    removeRoom,
    setPlayers,
  } = useArenaStore()
  
  const { player } = usePlayerStore()

  // Simulate fetching rooms (in real app, use WebSocket or polling)
  useEffect(() => {
    const fetchRooms = () => {
      // This would be a real API call
      const mockRooms = arenaService.getMockRooms()
      if (rooms.length === 0) {
        setRooms(mockRooms)
      }
    }

    fetchRooms()
  }, [rooms, setRooms])

  const createRoom = useCallback((roomName, gameId, maxPlayers) => {
    try {
      const newRoom = arenaService.createRoom(player, gameId, maxPlayers, roomName)
      addRoom(newRoom)
      setCurrentRoom(newRoom)
      setPlayers([player])
      toast.success('Room created successfully!')
      return newRoom
    } catch (error) {
      toast.error(error.message)
      return null
    }
  }, [player, addRoom, setCurrentRoom, setPlayers])

  const joinRoom = useCallback((roomId) => {
    try {
      const room = rooms.find(r => r.id === roomId)
      if (!room) throw new Error('Room not found')

      const updatedRoom = arenaService.joinRoom(room, player)
      setCurrentRoom(updatedRoom)
      setPlayers(updatedRoom.players)
      toast.success(`Joined ${room.name}!`)
      return updatedRoom
    } catch (error) {
      toast.error(error.message)
      return null
    }
  }, [rooms, player, setCurrentRoom, setPlayers])

  const leaveRoom = useCallback(() => {
    if (!currentRoom) return

    try {
      const updatedRoom = arenaService.leaveRoom(currentRoom, player.id)
      
      if (!updatedRoom) {
        // Room should be deleted
        removeRoom(currentRoom.id)
      }
      
      setCurrentRoom(null)
      setPlayers([])
      toast.success('Left the room')
    } catch (error) {
      toast.error(error.message)
    }
  }, [currentRoom, player, removeRoom, setCurrentRoom, setPlayers])

  return {
    rooms,
    currentRoom,
    players,
    status,
    createRoom,
    joinRoom,
    leaveRoom,
  }
}