import { describe, expect, it } from 'vitest';
import { coverageBadge, docsCheckedBadge, readLineCoverage } from '../../src/lib/badges';

describe('docsCheckedBadge', () => {
	it('shows the oldest "last checked" date', () => {
		const badge = docsCheckedBadge([new Date('2026-10-23'), new Date('2026-09-01'), new Date('2026-10-20')]);
		expect(badge).toEqual({ schemaVersion: 1, label: 'docs last checked', message: '2026-09-01', color: 'blue' });
	});

	it('says "unknown" without usable dates', () => {
		expect(docsCheckedBadge([]).message).toBe('unknown');
		expect(docsCheckedBadge([new Date('not a date')])).toMatchObject({ message: 'unknown', color: 'lightgrey' });
	});
});

describe('coverageBadge', () => {
	it.each([
		[100, '100%', 'brightgreen'],
		[90, '90%', 'brightgreen'],
		[85.5, '85%', 'green'],
		[70, '70%', 'yellowgreen'],
		[69.9, '69%', 'red'],
	])('%s%% reads %s in %s', (percent, message, color) => {
		expect(coverageBadge(percent)).toEqual({ schemaVersion: 1, label: 'coverage', message, color });
	});

	it('says "unknown" without a report', () => {
		expect(coverageBadge(undefined)).toMatchObject({ message: 'unknown', color: 'lightgrey' });
		expect(coverageBadge(Number.NaN).message).toBe('unknown');
	});
});

describe('readLineCoverage', () => {
	it('reads the total line coverage from a Vitest summary', () => {
		expect(readLineCoverage(JSON.stringify({ total: { lines: { pct: 98.5 } } }))).toBe(98.5);
	});

	it('copes with broken or unexpected reports', () => {
		expect(readLineCoverage('not json')).toBeUndefined();
		expect(readLineCoverage(JSON.stringify({ total: {} }))).toBeUndefined();
		expect(readLineCoverage('null')).toBeUndefined();
	});
});
