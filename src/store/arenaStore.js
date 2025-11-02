import { create } from 'zustand'
import { ARENA_STATUS } from '@utils/constants'

const useArenaStore = create((set, get) => ({
  rooms: [],
  currentRoom: null,
  players: [],
  status: ARENA_STATUS.WAITING,
  messages: [],
  
  setRooms: (rooms) => set({ rooms }),
  
  addRoom: (room) => set((state) => ({
    rooms: [...state.rooms, room]
  })),
  
  removeRoom: (roomId) => set((state) => ({
    rooms: state.rooms.filter(r => r.id !== roomId)
  })),
  
  setCurrentRoom: (room) => set({ currentRoom: room }),
  
  joinRoom: (roomId) => {
    const room = get().rooms.find(r => r.id === roomId)
    if (room) {
      set({ currentRoom: room, status: ARENA_STATUS.READY })
    }
  },
  
  leaveRoom: () => set({
    currentRoom: null,
    status: ARENA_STATUS.WAITING,
    players: [],
  }),
  
  setPlayers: (players) => set({ players }),
  
  addPlayer: (player) => set((state) => ({
    players: [...state.players, player]
  })),
  
  removePlayer: (playerId) => set((state) => ({
    players: state.players.filter(p => p.id !== playerId)
  })),
  
  setStatus: (status) => set({ status }),
  
  addMessage: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
  
  clearMessages: () => set({ messages: [] }),
}))

export default useArenaStore