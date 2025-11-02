import { createBrowserRouter } from 'react-router-dom'
import Layout from '@components/layout/Layout'
import Home from '@pages/Home'
import Games from '@pages/Games'
import GamePlay from '@pages/GamePlay'
import Arena from '@pages/Arena'
import Profile from '@pages/Profile'
import Leaderboard from '@pages/Leaderboard'
import Settings from '@pages/Settings'
import NotFound from '@pages/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'games',
        element: <Games />,
      },
      {
        path: 'games/:gameId',
        element: <GamePlay />,
      },
      {
        path: 'arena',
        element: <Arena />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'leaderboard',
        element: <Leaderboard />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
])

export default router