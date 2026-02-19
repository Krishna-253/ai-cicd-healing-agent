export type TestFramework = 'jest' | 'mocha' | 'pytest' | 'junit' | 'unknown';

export type TestResult = {
  total: number;
  passed: number;
  failed: number;
  framework: TestFramework;
};

export type LogEntry = {
  timestamp: string;
  level: 'info' | 'error' | 'success' | 'warn';
  message: string;
};

export type FixIteration = {
  id: string;
  timestamp: string;
  file: string;
  branch: string;
  status: 'pending' | 'success' | 'failed';
  errorMessage?: string;
  patch?: string;
};

export type AgentStatus = 'idle' | 'cloning' | 'analyzing' | 'testing' | 'fixing' | 'monitoring' | 'completed' | 'failed';

export type RepositorySummary = {
  url: string;
  branch: string;
  owner: string;
  name: string;
  files: string[];
};

export type AgentState = {
  status: AgentStatus;
  repo?: RepositorySummary;
  tests?: TestResult;
  logs: LogEntry[];
  history: FixIteration[];
  progress: number;
};
