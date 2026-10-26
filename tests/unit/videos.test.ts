import { describe, expect, it } from 'vitest';
import { videos } from '../../src/data/videos';

const list = Object.entries(videos);

describe('videos', () => {
	it.each(list)('%s has a valid YouTube id and both summaries', (_, video) => {
		expect(video.youtubeId).toMatch(/^[\w-]{11}$/);
		expect(video.title.trim()).not.toBe('');
		expect(video.summary.en.trim()).not.toBe('');
		expect(video.summary.de.trim()).not.toBe('');
	});

	it('uses every YouTube video once', () => {
		const ids = list.map(([, v]) => v.youtubeId);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it('gives the Microsoft series a running time', () => {
		for (const [name, video] of list) {
			if (video.source === 'adc') expect(video.minutes, name).toBeGreaterThan(0);
		}
	});
});
