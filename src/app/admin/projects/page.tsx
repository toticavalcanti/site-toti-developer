'use client';

import Button from '@/components/Button';
import { Plus } from 'lucide-react';

export default function AdminProjectsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          <span className="gradient-text">Gerenciar Projetos</span>
        </h1>
        <Button>
          <Plus size={20} className="mr-2" />
          Novo Projeto
        </Button>
      </div>

      <div className="bg-background-secondary border border-border rounded-lg p-6">
        <p className="text-foreground-secondary">
          Área administrativa em desenvolvimento.
        </p>
      </div>
    </div>
  );
}
