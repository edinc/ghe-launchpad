/** A badge in shields.io's endpoint format: https://shields.io/badges/endpoint-badge */
export interface Badge {
	schemaVersion: 1;
	label: string;
	message: string;
	color: string;
}

const unknown = (label: string): Badge => ({ schemaVersion: 1, label, message: 'unknown', color: 'lightgrey' });

/** The oldest "last checked" date across all pages: the guide is only as current as its stalest page. */
export function docsCheckedBadge(dates: Date[]): Badge {
	const times = dates.map((date) => date.getTime()).filter((time) => !Number.isNaN(time));
	if (times.length === 0) return unknown('docs last checked');
	return {
		schemaVersion: 1,
		label: 'docs last checked',
		message: new Date(Math.min(...times)).toISOString().slice(0, 10),
		color: 'blue',
	};
}

/** Unit test line coverage, colored against the 70% gate. Rounded down, so 69.9% never shows as 70%. */
export function coverageBadge(percent: number | undefined): Badge {
	if (percent === undefined || !Number.isFinite(percent)) return unknown('coverage');
	const color = percent >= 90 ? 'brightgreen' : percent >= 80 ? 'green' : percent >= 70 ? 'yellowgreen' : 'red';
	return { schemaVersion: 1, label: 'coverage', message: `${Math.floor(percent)}%`, color };
}

/** Line coverage from Vitest's json-summary report (`coverage/coverage-summary.json`), if it can be read. */
export function readLineCoverage(json: string): number | undefined {
	try {
		const pct = JSON.parse(json)?.total?.lines?.pct;
		return typeof pct === 'number' ? pct : undefined;
	} catch {
		return undefined;
	}
}
