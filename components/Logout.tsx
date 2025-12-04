'use client';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

function Logout() {
    function handleLogout() {
        signOut();
    }

  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
      onClick={handleLogout}
    >
      <LogOut className="h-4 w-4" />
      Sign Out
    </Button>
  );
}

export default Logout;