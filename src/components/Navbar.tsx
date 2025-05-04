
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-30 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl text-sage hover:text-opacity-80 transition-colors">
          HomeGoods
        </Link>

        {/* Mobile Menu */}
        <div className="flex items-center lg:hidden">
          <Button 
            variant="outline" 
            size="icon" 
            className="relative mr-2"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <Link to="/" className="text-charcoal hover:text-sage transition-colors">Home</Link>
          <Link to="/about" className="text-charcoal hover:text-sage transition-colors">About</Link>
          {isLoggedIn ? (
            <>
              <Link to="/admin" className="text-charcoal hover:text-sage transition-colors">Admin</Link>
              <Button
                variant="ghost"
                className="text-charcoal hover:text-sage transition-colors"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login" className="text-charcoal hover:text-sage transition-colors">Admin Login</Link>
          )}
          <Button 
            variant="outline" 
            size="icon" 
            className="relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2 flex flex-col">
            <Link 
              to="/" 
              className="py-2 text-charcoal hover:text-sage transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="py-2 text-charcoal hover:text-sage transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {isLoggedIn ? (
              <>
                <Link 
                  to="/admin" 
                  className="py-2 text-charcoal hover:text-sage transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
                <Button
                  variant="ghost"
                  className="justify-start pl-0 py-2 text-charcoal hover:text-sage transition-colors"
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="py-2 text-charcoal hover:text-sage transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
