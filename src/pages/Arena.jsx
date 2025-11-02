import React, { useState, useEffect } from 'react'
import { Users, Plus, RefreshCw, Crown, Swords } from 'lucide-react'
import Button from '@components/common/Button'
import Card from '@components/common/Card'
import Badge from '@components/common/Badge'
import Avatar from '@components/common/Avatar'
import Modal from '@components/common/Modal'
import Input from '@components/common/Input'
import useArenaStore from '@store/arenaStore'
import usePlayerStore from '@store/playerStore'
import { generateId } from '@utils/helpers'
import toast from 'react-hot-toast'

const Arena = () => {
  const { rooms, currentRoom, joinRoom, leaveRoom, addRoom, setRooms } = useArenaStore()
  const { player } = usePlayerStore()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [maxPlayers, setMaxPlayers] = useState(2)

  useEffect(() => {
    // Simulate fetching rooms
    if (rooms.length === 0) {
      const mockRooms = [
        {
          id: generateId(),
          name: 'Pro Players Only',
          host: 'MasterGamer',
          players: 3,
          maxPlayers: 4,
          game: 'tic-tac-toe',
          status: 'waiting',
        },
        {
          id: generateId(),
          name: 'Casual Fun',
          host: 'ChillPlayer',
          players: 1,
          maxPlayers: 2,
          game: 'snake',
          status: 'waiting',
        },
        {
          id: generateId(),
          name: 'Tournament',
          host: 'ProGamer123',
          players: 7,
          maxPlayers: 8,
          game: 'memory',
          status: 'in_game',
        },
      ]
      setRooms(mockRooms)
    }
  }, [rooms, setRooms])

  const handleCreateRoom = () => {
    if (!roomName.trim()) {
      toast.error('Please enter a room name')
      return
    }

    const newRoom = {
      id: generateId(),
      name: roomName,
      host: player.username,
      players: 1,
      maxPlayers,
      game: 'tic-tac-toe',
      status: 'waiting',
    }

    addRoom(newRoom)
    joinRoom(newRoom.id)
    setShowCreateModal(false)
    setRoomName('')
    toast.success('Room created successfully!')
  }

  const handleJoinRoom = (roomId) => {
    const room = rooms.find(r => r.id === roomId)
    if (!room) return

    if (room.players >= room.maxPlayers) {
      toast.error('Room is full!')
      return
    }

    if (room.status === 'in_game') {
      toast.error('Game already in progress!')
      return
    }

    joinRoom(roomId)
    toast.success(`Joined ${room.name}!`)
  }

  const handleLeaveRoom = () => {
    leaveRoom()
    toast.success('Left the room')
  }

  return (
    <div className="container-custom py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 animate-float">
          <Swords size={40} className="text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Game <span className="gradient-text">Arena</span>
        </h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto">
          Join a room or create your own to compete with players worldwide
        </p>
      </div>

      {currentRoom ? (
        /* Current Room View */
        <div className="max-w-4xl mx-auto">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{currentRoom.name}</h2>
                <p className="text-white/60">Hosted by {currentRoom.host}</p>
              </div>
              <Button variant="danger" onClick={handleLeaveRoom}>
                Leave Room
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-white/60 mb-2">Players</p>
                <p className="text-2xl font-bold">
                  {currentRoom.players} / {currentRoom.maxPlayers}
                </p>
              </div>
              <div>
                <p className="text-sm text-white/60 mb-2">Game</p>
                <p className="text-2xl font-bold capitalize">{currentRoom.game}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold">Players in Room</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: currentRoom.players }).map((_, i) => (
                  <Card key={i}>
                    <div className="flex items-center gap-3">
                      <Avatar alt={i === 0 ? currentRoom.host : `Player ${i + 1}`} size="md" />
                      <div>
                        <p className="font-semibold">
                          {i === 0 ? currentRoom.host : `Player ${i + 1}`}
                        </p>
                        <p className="text-xs text-white/60">
                          {i === 0 && <Badge variant="warning" className="text-xs">Host</Badge>}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {currentRoom.players >= 2 && (
              <div className="mt-6 text-center">
                <Button size="lg">
                  <Swords className="mr-2" />
                  Start Game
                </Button>
              </div>
            )}
          </Card>
        </div>
      ) : (
        /* Room List View */
        <>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold">Available Rooms</h2>
              <Badge variant="primary">{rooms.length} Active</Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" onClick={() => setRooms([...rooms])}>
                <RefreshCw size={18} className="mr-2" />
                Refresh
              </Button>
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus size={18} className="mr-2" />
                Create Room
              </Button>
            </div>
          </div>

          {rooms.length === 0 ? (
            <Card className="text-center py-20">
              <Users size={64} className="mx-auto mb-4 text-white/20" />
              <h3 className="text-2xl font-bold mb-2">No Active Rooms</h3>
              <p className="text-white/60 mb-6">Be the first to create a room!</p>
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus className="mr-2" />
                Create Room
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <Card key={room.id} hover>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{room.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <Crown size={14} />
                        <span>{room.host}</span>
                      </div>
                    </div>
                    <Badge 
                      variant={room.status === 'waiting' ? 'success' : 'warning'}
                      className="capitalize"
                    >
                      {room.status === 'waiting' ? 'Open' : 'Playing'}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Players</span>
                      <span className="font-semibold">
                        {room.players} / {room.maxPlayers}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Game</span>
                      <span className="font-semibold capitalize">{room.game}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full"
                    disabled={room.players >= room.maxPlayers || room.status === 'in_game'}
                    onClick={() => handleJoinRoom(room.id)}
                  >
                    {room.players >= room.maxPlayers ? 'Full' : 'Join Room'}
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </>
      )}

      {/* Create Room Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Room"
      >
        <div className="space-y-4">
          <Input
            label="Room Name"
            placeholder="Enter room name..."
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium mb-2">Max Players</label>
            <div className="flex gap-2">
              {[2, 4, 6, 8].map((num) => (
                <Button
                  key={num}
                  variant={maxPlayers === num ? 'primary' : 'secondary'}
                  onClick={() => setMaxPlayers(num)}
                  className="flex-1"
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button className="flex-1" onClick={handleCreateRoom}>
              Create Room
            </Button>
            <Button 
              className="flex-1" 
              variant="secondary" 
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Arena