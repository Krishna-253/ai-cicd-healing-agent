import { Folder, FileCode, Github } from 'lucide-react';
import { RepositorySummary } from '@/lib/types';

interface RepoTreeViewProps {
  repo?: RepositorySummary;
}

export function RepoTreeView({ repo }: RepoTreeViewProps) {
  if (!repo) return (
    <div className="h-full flex items-center justify-center text-muted-foreground italic text-sm border rounded-lg bg-muted/5 p-8">
      Enter a repository URL to explore structure.
    </div>
  );

  return (
    <div className="p-4 bg-muted/10 rounded-lg border border-border h-full overflow-y-auto">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border/50">
        <Github className="w-4 h-4" />
        <span className="font-semibold text-sm truncate">{repo.name}</span>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-center gap-2 py-1 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
          <Folder className="w-4 h-4 text-primary" />
          <span>src</span>
        </div>
        <div className="pl-4 space-y-1">
          {repo.files.filter(f => f.startsWith('src')).map(file => (
            <div key={file} className="flex items-center gap-2 py-1 text-sm hover:text-accent cursor-pointer transition-colors">
              <FileCode className="w-3.5 h-3.5 text-muted-foreground" />
              <span>{file.split('/').pop()}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-2 py-1 text-sm text-muted-foreground hover:text-foreground cursor-pointer">
          <Folder className="w-4 h-4 text-primary" />
          <span>tests</span>
        </div>
        <div className="pl-4 space-y-1">
          <div className="flex items-center gap-2 py-1 text-sm hover:text-accent cursor-pointer transition-colors">
            <FileCode className="w-3.5 h-3.5 text-muted-foreground" />
            <span>core.test.ts</span>
          </div>
        </div>

        <div className="flex items-center gap-2 py-1 text-sm hover:text-accent cursor-pointer transition-colors mt-2 pt-2 border-t border-border/30">
          <FileCode className="w-3.5 h-3.5 text-muted-foreground" />
          <span>package.json</span>
        </div>
        <div className="flex items-center gap-2 py-1 text-sm hover:text-accent cursor-pointer transition-colors">
          <FileCode className="w-3.5 h-3.5 text-muted-foreground" />
          <span>README.md</span>
        </div>
      </div>
    </div>
  );
}
