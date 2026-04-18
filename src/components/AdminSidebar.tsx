'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils';
import { LayoutDashboard, FolderOpen, FileText, Settings } from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: FolderOpen, label: 'Projetos', href: '/admin/projects' },
  { icon: FileText, label: 'Posts', href: '/admin/posts' },
  { icon: Settings, label: 'Configurações', href: '/admin/settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-background-secondary border-r border-border min-h-screen p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold gradient-text">Admin Panel</h2>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-foreground-secondary hover:bg-background-tertiary hover:text-foreground'
              )}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
