import React, { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';
import { LogEntry } from '@/lib/types';

interface LogViewerProps {
  logs: LogEntry[];
}

export function LogViewer({ logs }: LogViewerProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-[400px] bg-black/40 rounded-lg border border-border overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/30">
        <Terminal className="w-4 h-4 text-accent" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Execution Logs</span>
      </div>
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto font-code text-sm space-y-1 scrollbar-thin scrollbar-thumb-muted"
      >
        {logs.length === 0 && (
          <div className="text-muted-foreground italic">No logs available. Start analysis to see updates...</div>
        )}
        {logs.map((log, i) => (
          <div key={i} className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
            <span className="text-muted-foreground/50 shrink-0 select-none">[{log.timestamp}]</span>
            <span className={
              log.level === 'error' ? 'text-destructive' : 
              log.level === 'success' ? 'text-emerald-400' :
              log.level === 'warn' ? 'text-amber-400' :
              'text-blue-200'
            }>
              {log.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
