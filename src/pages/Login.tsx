
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Lock, User } from 'lucide-react';
import { toast } from 'sonner';

// Demo credentials - In a real app, these would be stored securely
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple authentication
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Set logged in state in localStorage
        localStorage.setItem('isAdminLoggedIn', 'true');
        toast.success('Login successful!');
        navigate('/admin');
      } else {
        toast.error('Invalid username or password');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="container flex items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-sage">
                <div className="px-3 py-2 border-r">
                  <User className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-sage">
                <div className="px-3 py-2 border-r">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              className="w-full bg-sage hover:bg-sage/90" 
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
