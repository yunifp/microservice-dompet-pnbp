import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Wallet } from 'lucide-react'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(username, password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-sky-400 px-4">
      <Card className="w-full max-w-sm rounded-xl shadow-2xl">
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-3 mb-6">
            <div className="h-12 w-12 rounded-md bg-blue-50 flex items-center justify-center">
              <Wallet className="h-6 w-6 text-blue-600" />
            </div>


            <h1 className="text-xl font-bold text-blue-600">
              DOMPET PNBP
            </h1>
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              Digital Online Management & Payment Electronic Transaction
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-600 text-center">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm text-gray-600">
                Username
              </label>
              <Input
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm text-gray-600">
                Password
              </label>
              <Input
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              {isLoading ? 'Memproses...' : 'Masuk'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
