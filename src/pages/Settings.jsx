import React, { useState } from 'react'
import { Volume2, VolumeX, Monitor, Moon, Sun, Bell, BellOff, Save } from 'lucide-react'
import Card from '@components/common/Card'
import Button from '@components/common/Button'
import { useLocalStorage } from '@hooks/useLocalStorage'
import { LOCAL_STORAGE_KEYS } from '@utils/constants'
import toast from 'react-hot-toast'

const Settings = () => {
  const [settings, setSettings] = useLocalStorage(LOCAL_STORAGE_KEYS.SETTINGS, {
    sound: true,
    music: true,
    notifications: true,
    theme: 'dark',
    autoSave: true,
  })

  const [localSettings, setLocalSettings] = useState(settings)

  const handleSave = () => {
    setSettings(localSettings)
    toast.success('Settings saved successfully!')
  }

  const handleReset = () => {
    const defaultSettings = {
      sound: true,
      music: true,
      notifications: true,
      theme: 'dark',
      autoSave: true,
    }
    setLocalSettings(defaultSettings)
    setSettings(defaultSettings)
    toast.success('Settings reset to default')
  }

  const toggleSetting = (key) => {
    setLocalSettings({ ...localSettings, [key]: !localSettings[key] })
  }

  const settingsOptions = [
    {
      id: 'sound',
      title: 'Sound Effects',
      description: 'Play sound effects during gameplay',
      icon: localSettings.sound ? Volume2 : VolumeX,
      value: localSettings.sound,
    },
    {
      id: 'music',
      title: 'Background Music',
      description: 'Play background music',
      icon: localSettings.music ? Volume2 : VolumeX,
      value: localSettings.music,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'Receive game notifications',
      icon: localSettings.notifications ? Bell : BellOff,
      value: localSettings.notifications,
    },
    {
      id: 'autoSave',
      title: 'Auto Save',
      description: 'Automatically save game progress',
      icon: Save,
      value: localSettings.autoSave,
    },
  ]

  return (
    <div className="container-custom py-12">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-white/60">Customize your gaming experience</p>
        </div>

        {/* Settings */}
        <div className="space-y-4 mb-8">
          {settingsOptions.map((option) => (
            <Card key={option.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    option.value ? 'bg-arena-accent' : 'bg-arena-light'
                  }`}>
                    <option.icon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{option.title}</h3>
                    <p className="text-sm text-white/60">{option.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting(option.id)}
                  className={`relative w-14 h-8 rounded-full transition-colors ${
                    option.value ? 'bg-arena-accent' : 'bg-arena-light'
                  }`}
                >
                  <div
                    className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                      option.value ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </Card>
          ))}

          {/* Theme Selection */}
          <Card>
            <div className="mb-4">
              <h3 className="font-bold mb-1">Theme</h3>
              <p className="text-sm text-white/60">Choose your preferred theme</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 'dark', label: 'Dark', icon: Moon },
                { id: 'light', label: 'Light', icon: Sun },
                { id: 'auto', label: 'Auto', icon: Monitor },
              ].map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setLocalSettings({ ...localSettings, theme: theme.id })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    localSettings.theme === theme.id
                      ? 'border-arena-accent bg-arena-accent/20'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <theme.icon size={24} className="mx-auto mb-2" />
                  <p className="text-sm font-medium">{theme.label}</p>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button className="flex-1" onClick={handleSave}>
            <Save className="mr-2" />
            Save Settings
          </Button>
          <Button className="flex-1" variant="secondary" onClick={handleReset}>
            Reset to Default
          </Button>
        </div>

        {/* About */}
        <Card className="mt-8">
          <h3 className="font-bold mb-4">About Game Arena</h3>
          <div className="space-y-2 text-sm text-white/60">
            <p>Version: 1.0.0</p>
            <p>Created by: Prince Kothari (@princekotharii)</p>
            <p>© 2025 Game Arena. All rights reserved.</p>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Settings