import { FolderOpen, FileText, Eye, TrendingUp } from 'lucide-react';

const stats = [
  { icon: FolderOpen, label: 'Total de Projetos', value: '6', color: 'from-primary to-primary-light' },
  { icon: FileText, label: 'Posts Publicados', value: '3', color: 'from-secondary to-secondary-light' },
  { icon: Eye, label: 'Visualizações', value: '1.2k', color: 'from-accent to-warning' },
  { icon: TrendingUp, label: 'Taxa de Conversão', value: '12%', color: 'from-success to-primary' },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        <span className="gradient-text">Dashboard</span>
      </h1>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-background-secondary border border-border rounded-lg p-6 hover:border-primary transition-colors"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <Icon size={24} className="text-white" />
              </div>
              <p className="text-foreground-secondary text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-background-secondary border border-border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Atividade Recente</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-border">
            <div className="w-2 h-2 rounded-full bg-success" />
            <div className="flex-1">
              <p className="font-medium">Novo projeto adicionado</p>
              <p className="text-sm text-foreground-secondary">SICOSI - Extensão de Sustentabilidade</p>
            </div>
            <span className="text-sm text-foreground-secondary">2h atrás</span>
          </div>
          <div className="flex items-center gap-4 pb-4 border-b border-border">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="flex-1">
              <p className="font-medium">Post publicado</p>
              <p className="text-sm text-foreground-secondary">Next.js 15: Novidades e melhores práticas</p>
            </div>
            <span className="text-sm text-foreground-secondary">1d atrás</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-secondary" />
            <div className="flex-1">
              <p className="font-medium">Projeto atualizado</p>
              <p className="text-sm text-foreground-secondary">Zé Ramalho - Clipe Musical com IA</p>
            </div>
            <span className="text-sm text-foreground-secondary">3d atrás</span>
          </div>
        </div>
      </div>
    </div>
  );
}
