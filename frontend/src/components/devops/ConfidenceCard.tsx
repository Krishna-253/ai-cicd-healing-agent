import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ShieldCheck } from 'lucide-react';

interface ConfidenceCardProps {
  confidence?: number;
}

export function ConfidenceCard({ confidence = 0 }: ConfidenceCardProps) {
  const getColor = () => {
    if (confidence > 80) return 'text-emerald-400';
    if (confidence > 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <Card className="bg-card/50 border-primary/20">
      <CardContent className="pt-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            AI Confidence Score
          </span>
          <ShieldCheck className="w-4 h-4 text-primary" />
        </div>

        <div className={`text-3xl font-bold ${getColor()}`}>
          {confidence}%
        </div>

        <Progress value={confidence} className="h-2 bg-muted/30" />

        <p className="text-xs text-muted-foreground">
          Deterministic reliability score based on test success ratio,
          patch quality, and retry efficiency.
        </p>
      </CardContent>
    </Card>
  );
}