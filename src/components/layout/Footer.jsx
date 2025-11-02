import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Twitter, Heart, Gamepad2 } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="glass-effect border-t border-white/10 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-arena-accent to-primary-500 rounded-lg flex items-center justify-center">
                <Gamepad2 className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold gradient-text">Game Arena</span>
            </div>
            <p className="text-white/60 mb-4 max-w-md">
              The ultimate online gaming platform. Play, compete, and connect with players from around the world.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/princekotharii" target="_blank" rel="noopener noreferrer" 
                className="p-2 hover:bg-white/5 rounded-lg transition-all hover:text-arena-accent">
                <Github size={20} />
              </a>
              <a href="#" className="p-2 hover:bg-white/5 rounded-lg transition-all hover:text-arena-accent">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/games" className="text-white/60 hover:text-white transition-colors">Browse Games</Link></li>
              <li><Link to="/arena" className="text-white/60 hover:text-white transition-colors">Arena</Link></li>
              <li><Link to="/leaderboard" className="text-white/60 hover:text-white transition-colors">Leaderboard</Link></li>
              <li><Link to="/profile" className="text-white/60 hover:text-white transition-colors">Profile</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Rules</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <hr className="border-white/10 my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            © 2025 Game Arena. All rights reserved.
          </p>
          <p className="text-white/60 text-sm flex items-center gap-1">
            Made with <Heart size={16} className="text-red-500" /> by Prince Kothari
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer