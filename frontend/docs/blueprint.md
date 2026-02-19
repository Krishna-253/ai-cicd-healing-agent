# **App Name**: DevOps Autopilot

## Core Features:

- Repository Analysis: Analyze a given repository URL by cloning it, detecting the relevant build and test files (package.json, requirements.txt, pom.xml) and test frameworks (pytest, jest, mocha, junit).
- Automated Test Execution: Execute the tests of the analyzed repository automatically using the detected framework in an isolated environment. Provides output to the Failure Parser.
- AI-Powered Code Patching: The failing file and error message are sent to an LLM to generate a minimal, targeted patch that fixes the failing test while preserving the original architecture. The LLM is used as a tool to address isolated problems.
- CI/CD Monitoring and Re-Analysis: Monitor the CI/CD pipeline status via the GitHub Actions API. Re-analyze and attempt to fix the code again if the CI/CD pipeline fails after the first automated attempt, looping for a maximum of 5 iterations or until all tests pass.
- Interactive DevOps Dashboard: React-based frontend where users provide the repository URL and secure GitHub token; visualizes real-time logs, repository structure, test statuses, fix history, and CI/CD pipeline status.
- GitHub Integration: Integrates with GitHub using a provided token to clone repositories, create branches (ai-agent-fix-<timestamp>), commit messages ([AI-AGENT] Fix failing tests in <file>), and push the branch to the repository.
- Real-time Logging and Reporting: Stream logs from the backend to the frontend dashboard in real-time using WebSockets. Generate and provide a summary of the analysis.

## Style Guidelines:

- Primary color: Deep Indigo (#3F51B5), conveying stability, intelligence, and technical expertise, suitable for a DevOps tool.
- Background color: Dark gray (#263238) for a professional dark mode interface.
- Accent color: Cyan (#00BCD4) to highlight interactive elements and call-to-actions, ensuring good contrast and focus.
- Body and headline font: 'Inter', a grotesque-style sans-serif offering a neutral, modern appearance.
- Code font: 'Source Code Pro' for clear and distinct rendering of code snippets.
- Crisp, technical icons from a library like FontAwesome to represent various DevOps concepts and statuses.
- Subtle transitions and progress animations to provide visual feedback during repository analysis and test execution processes.