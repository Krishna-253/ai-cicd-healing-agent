"use client";

import React, { useState, useEffect } from 'react';
import { Github, Play, Loader2, Search, ShieldCheck, AlertCircle } from 'lucide-react';
import { AgentState, LogEntry, TestResult, FixIteration, RepositorySummary, AgentStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogViewer } from './LogViewer';
import { StatsCards } from './StatsCards';
import { HistoryTimeline } from './HistoryTimeline';
import { RepoTreeView } from './RepoTreeView';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const [repoUrl, setRepoUrl] = useState('');
  const [token, setToken] = useState('');
  const [agentState, setAgentState] = useState<AgentState>({
    status: 'idle',
    logs: [],
    history: [],
    progress: 0
  });
  const [mounted, setMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
  }, []);

  const startAnalysis = async () => {
    if (!repoUrl || !token) {
      toast({ title: "Configuration Missing", description: "Please provide both Github URL and Personal Access Token.", variant: "destructive" });
      return;
    }

    setAgentState(prev => ({
      ...prev,
      status: 'cloning',
      logs: [],
      history: [],
      progress: 0,
      tests: undefined,
      repo: undefined
    }));

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl, token }),
      });

      if (!response.body) throw new Error('ReadableStream not supported');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.replace('data: ', ''));
              
              if (data.type === 'log') {
                setAgentState(prev => ({
                  ...prev,
                  logs: [...prev.logs, { 
                    timestamp: new Date().toLocaleTimeString(), 
                    level: data.level, 
                    message: data.message 
                  }]
                }));
              } else if (data.type === 'status') {
                setAgentState(prev => ({ ...prev, status: data.status, progress: data.progress }));
              } else if (data.type === 'repo') {
                setAgentState(prev => ({ ...prev, repo: data.repo }));
              } else if (data.type === 'tests') {
                setAgentState(prev => ({ ...prev, tests: data.tests }));
              } else if (data.type === 'history') {
                setAgentState(prev => ({ ...prev, history: [data.fix, ...prev.history] }));
              }
            } catch (e) {
              console.error("Error parsing stream chunk", e);
            }
          }
        }
      }
    } catch (error) {
      toast({ title: "Analysis Failed", description: (error as Error).message, variant: "destructive" });
      setAgentState(prev => ({ ...prev, status: 'failed', progress: 0 }));
    }
  };

  const getStatusBadge = (status: AgentStatus) => {
    switch (status) {
      case 'completed': return <Badge variant="secondary" className="bg-emerald-500 text-white">SUCCESS</Badge>;
      case 'failed': return <Badge variant="destructive">FAILED</Badge>;
      case 'idle': return <Badge variant="outline">IDLE</Badge>;
      default: return (
        <Badge variant="outline" className="animate-pulse bg-primary/10 text-primary border-primary">
          {status.toUpperCase()}
        </Badge>
      );
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/30 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <Github className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-headline font-bold text-xl tracking-tight">DevOps Autopilot</h1>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Autonomous Fix Agent v1.0</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs text-muted-foreground">System Status</span>
              <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                OPERATIONAL
              </span>
            </div>
            {getStatusBadge(agentState.status)}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 space-y-8">
        {/* Configuration Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-card/30 border border-border rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Search className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-semibold">Repository Configuration</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">GitHub Repository URL</label>
                  <Input 
                    placeholder="https://github.com/owner/repo"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    disabled={agentState.status !== 'idle' && agentState.status !== 'completed' && agentState.status !== 'failed'}
                    className="bg-muted/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Personal Access Token</label>
                  <div className="relative">
                    <Input 
                      type="password"
                      placeholder="ghp_xxxxxxxxxxxx"
                      value={token}
                      onChange={(e) => setToken(e.target.value)}
                      disabled={agentState.status !== 'idle' && agentState.status !== 'completed' && agentState.status !== 'failed'}
                      className="bg-muted/20 pr-10"
                    />
                    <ShieldCheck className="absolute right-3 top-2.5 w-5 h-5 text-muted-foreground/50" />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button 
                  size="lg" 
                  onClick={startAnalysis}
                  disabled={agentState.status !== 'idle' && agentState.status !== 'completed' && agentState.status !== 'failed'}
                  className="w-full md:w-auto px-8 gap-2 shadow-lg shadow-primary/20"
                >
                  {agentState.status === 'idle' || agentState.status === 'completed' || agentState.status === 'failed' ? (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      Start Analysis
                    </>
                  ) : (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Agent Active...
                    </>
                  )}
                </Button>
              </div>
            </section>

            {/* Dashboard Stats */}
            <StatsCards tests={agentState.tests} repo={agentState.repo} />

            {/* Execution Progress */}
            {agentState.status !== 'idle' && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-muted-foreground">Task: {agentState.status.replace(/^\w/, c => c.toUpperCase())}</span>
                  <span className="text-accent">{agentState.progress}%</span>
                </div>
                <Progress value={agentState.progress} className="h-2 bg-muted/30" />
              </div>
            )}

            {/* Logs Viewer */}
            <LogViewer logs={agentState.logs} />
          </div>

          <aside className="space-y-6">
            <section className="bg-card/30 border border-border rounded-xl p-6 h-[400px] flex flex-col shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Github className="w-5 h-5 text-accent" />
                <h2 className="text-lg font-semibold">Structure Viewer</h2>
              </div>
              <div className="flex-1 overflow-hidden">
                <RepoTreeView repo={agentState.repo} />
              </div>
            </section>

            <section className="bg-card/30 border border-border rounded-xl p-6 shadow-sm overflow-hidden">
              <HistoryTimeline history={agentState.history} />
            </section>
          </aside>
        </div>

        {/* Final Result Notification */}
        {agentState.status === 'completed' && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-6 flex items-start gap-4 animate-in fade-in zoom-in duration-500">
            <div className="bg-emerald-500 p-2 rounded-full">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-emerald-400">Analysis Successful</h3>
              <p className="text-sm text-emerald-100/70">
                Autonomous DevOps Agent has successfully identified, patched, and verified all failing tests. 
                The fixes have been pushed to a new branch for your review.
              </p>
              <div className="mt-4 flex gap-3">
                <Button variant="secondary" size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white border-0">View Branches</Button>
                <Button variant="outline" size="sm" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10">Download Report</Button>
              </div>
            </div>
          </div>
        )}

        {agentState.status === 'failed' && (
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 flex items-start gap-4 animate-in fade-in zoom-in duration-500">
            <div className="bg-destructive p-2 rounded-full">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-destructive">Agent Halt: Issues Encountered</h3>
              <p className="text-sm text-destructive-foreground/70">
                The autonomous loop was unable to resolve all test failures within the iteration limit. 
                Manual intervention is recommended for complex architectural discrepancies.
              </p>
              <div className="mt-4 flex gap-3">
                <Button variant="destructive" size="sm">Review Logs</Button>
                <Button variant="outline" size="sm" onClick={() => setAgentState(prev => ({ ...prev, status: 'idle' }))}>Reset Agent</Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border py-6 mt-12 bg-card/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {mounted ? new Date().getFullYear() : '...'} DevOps Autopilot - Production-Grade AI Operations. Securely handling {repoUrl || 'repositories'} with AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
