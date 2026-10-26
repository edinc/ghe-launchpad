import { describe, expect, it } from 'vitest';
import { rocketArt, type RocketMood } from '../../src/lib/rocket';

const moods: RocketMood[] = ['launch', 'note', 'tip', 'caution', 'danger', 'wait', 'done'];

describe('rocketArt', () => {
	it.each(moods)('draws the rocket for "%s"', (mood) => {
		const art = rocketArt(mood);
		expect(art).toContain('class="r-body"');
		expect(art).toContain('class="r-window"');
	});

	it('gives every mood its own drawing', () => {
		expect(new Set(moods.map(rocketArt)).size).toBe(moods.length);
	});

	it('lifts off with a full flame from the pad', () => {
		const art = rocketArt('launch');
		expect(art).toContain('r-flame');
		expect(art).toContain('r-smoke');
	});

	it('waits on the pad with the engine off', () => {
		const art = rocketArt('wait');
		expect(art).not.toContain('r-flame');
		expect(art).toContain('r-ink');
	});

	it('marks each callout type with its own sign', () => {
		expect(rocketArt('note')).toContain('r-info');
		expect(rocketArt('tip')).toContain('r-spark');
		expect(rocketArt('caution')).toContain('class="r-warn"');
		expect(rocketArt('danger')).toContain('class="r-warn-pink"');
		expect(rocketArt('done')).toContain('r-trail');
	});
});
