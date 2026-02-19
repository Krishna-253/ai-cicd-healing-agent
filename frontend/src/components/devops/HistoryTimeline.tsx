import { Clock, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { FixIteration } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface HistoryTimelineProps {
  history: FixIteration[];
}

export function HistoryTimeline({ history }: HistoryTimelineProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-semibold">Patch History</h3>
      </div>
      
      {history.length === 0 && (
        <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg bg-muted/10">
          No patches generated yet.
        </div>
      )}

      <div className="relative space-y-4">
        {history.map((fix, i) => (
          <div key={fix.id} className="relative pl-8 pb-4 last:pb-0">
            {/* Connector Line */}
            {i < history.length - 1 && (
              <div className="absolute left-[11px] top-6 bottom-0 w-[2px] bg-border" />
            )}
            
            {/* Status Icon */}
            <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center bg-background border-2 ${
              fix.status === 'success' ? 'border-emerald-500' : 
              fix.status === 'failed' ? 'border-destructive' : 'border-primary'
            }`}>
              {fix.status === 'success' ? (
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              ) : fix.status === 'failed' ? (
                <XCircle className="w-3.5 h-3.5 text-destructive" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              )}
            </div>

            <div className="bg-card/30 rounded-lg p-4 border border-border/50 hover:bg-card/50 transition-colors">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="font-medium text-sm">Iteration {history.length - i}</div>
                <Badge variant={fix.status === 'success' ? 'secondary' : 'outline'} className="text-[10px]">
                  {fix.status.toUpperCase()}
                </Badge>
              </div>
              
              <div className="text-xs font-code text-accent mb-2">
                {fix.file}
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="bg-muted px-1.5 py-0.5 rounded">{fix.branch}</span>
                <ArrowRight className="w-3 h-3" />
                <span>{new Date(fix.timestamp).toLocaleTimeString()}</span>
              </div>

              {fix.patch && (
                <div className="mt-3 bg-black/60 p-3 rounded text-[11px] font-code overflow-x-auto whitespace-pre border border-border/30">
                  {fix.patch}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
