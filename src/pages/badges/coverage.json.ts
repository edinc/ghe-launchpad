import { existsSync, readFileSync } from 'node:fs';
import { coverageBadge, readLineCoverage } from '../../lib/badges';

/**
 * shields.io endpoint badge for the README: unit test line coverage. The deploy workflow runs
 * `npm run test:coverage` right before the build; without a report the badge says "unknown".
 */
export function GET() {
	const report = 'coverage/coverage-summary.json';
	const percent = existsSync(report) ? readLineCoverage(readFileSync(report, 'utf8')) : undefined;
	return Response.json(coverageBadge(percent));
}
