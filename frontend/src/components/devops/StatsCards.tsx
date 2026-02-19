import { CheckCircle2, XCircle, Beaker, GitBranch } from 'lucide-react';
import { TestResult, RepositorySummary } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

interface StatsCardsProps {
  tests?: TestResult;
  repo?: RepositorySummary;
}

export function StatsCards({ tests, repo }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-card/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Target Branch</span>
            <GitBranch className="w-4 h-4 text-primary" />
          </div>
          <div className="text-lg font-bold">{repo?.branch || 'N/A'}</div>
          <div className="text-xs text-muted-foreground truncate">{repo?.owner}/{repo?.name}</div>
        </CardContent>
      </Card>

      <Card className="bg-card/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Total Tests</span>
            <Beaker className="w-4 h-4 text-accent" />
          </div>
          <div className="text-2xl font-bold">{tests?.total || 0}</div>
          <div className="text-xs text-muted-foreground capitalize">Engine: {tests?.framework || 'Detecting...'}</div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-emerald-500/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-emerald-500 font-medium uppercase tracking-wider">Passed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">{tests?.passed || 0}</div>
          <div className="text-xs text-muted-foreground">Successful Assertions</div>
        </CardContent>
      </Card>

      <Card className="bg-card/50 border-destructive/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-destructive font-medium uppercase tracking-wider">Failed</span>
            <XCircle className="w-4 h-4 text-destructive" />
          </div>
          <div className="text-2xl font-bold text-destructive">{tests?.failed || 0}</div>
          <div className="text-xs text-muted-foreground">Require AI Intervention</div>
        </CardContent>
      </Card>
    </div>
  );
}
