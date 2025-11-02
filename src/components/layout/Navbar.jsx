import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Gamepad2, Trophy, User, Settings } from 'lucide-react'
import { cn } from '@utils/cn'
import usePlayerStore from '@store/playerStore'
import Avatar from '@components/common/Avatar'
import Button from '@components/common/Button'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { player } = usePlayerStore()

  const navLinks = [
    { to: '/', label: 'Home', icon: Gamepad2 },
    { to: '/games', label: 'Games', icon: Gamepad2 },
    { to: '/arena', label: 'Arena', icon: Trophy },
    { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="sticky top-0 z-40 glass-effect border-b border-white/10">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-arena-accent to-primary-500 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform">
              <Gamepad2 className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">
              Game Arena
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300',
                  'hover:bg-white/5',
                  isActive(link.to) && 'bg-arena-accent/20 text-arena-accent'
                )}
              >
                <link.icon size={18} />
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/profile" className="flex items-center gap-3 hover:bg-white/5 px-3 py-2 rounded-lg transition-all">
              <Avatar alt={player.username} size="sm" />
              <div className="text-left">
                <p className="text-sm font-semibold">{player.username}</p>
                <p className="text-xs text-white/60">Level {player.level}</p>
              </div>
            </Link>
            <Link to="/settings">
              <Button variant="ghost" size="sm">
                <Settings size={20} />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-white/5 rounded-lg"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 animate-slide-down">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 rounded-lg transition-all',
                    'hover:bg-white/5',
                    isActive(link.to) && 'bg-arena-accent/20 text-arena-accent'
                  )}
                >
                  <link.icon size={18} />
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}
              <hr className="border-white/10 my-2" />
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg"
              >
                <Avatar alt={player.username} size="sm" />
                <div>
                  <p className="text-sm font-semibold">{player.username}</p>
                  <p className="text-xs text-white/60">Level {player.level}</p>
                </div>
              </Link>
              <Link
                to="/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-3 hover:bg-white/5 rounded-lg"
              >
                <Settings size={18} />
                <span className="font-medium">Settings</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar