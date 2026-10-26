// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/** Records what the draw-in observer watches and lets tests fire intersections. */
class FakeObserver {
	static last: FakeObserver | undefined;
	observed: Element[] = [];
	unobserved: Element[] = [];
	constructor(public callback: (entries: Partial<IntersectionObserverEntry>[]) => void) {
		FakeObserver.last = this;
	}
	observe(el: Element) {
		this.observed.push(el);
	}
	unobserve(el: Element) {
		this.unobserved.push(el);
	}
	disconnect() {}
}

const sketch = (drawable = true) =>
	`<figure class="sk-figure"><svg>${drawable ? '<path class="sk-draw"/>' : '<path/>'}</svg></figure>`;

async function loadSite({ reduceMotion = false, inView = false } = {}) {
	vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: reduceMotion })));
	if (inView) {
		vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({ top: 10, bottom: 200 } as DOMRect);
	}
	vi.resetModules();
	await import('../../src/scripts/site');
}

beforeEach(() => {
	FakeObserver.last = undefined;
	vi.stubGlobal('IntersectionObserver', FakeObserver);
});

afterEach(() => {
	vi.unstubAllGlobals();
	vi.restoreAllMocks();
	document.body.innerHTML = '';
});

describe('click-to-load videos', () => {
	beforeEach(() => {
		document.body.innerHTML = `
			<figure class="video" data-video-embed="https://www.youtube-nocookie.com/embed/abc?autoplay=1" data-video-title="Demo">
				<div class="video__frame"><button class="video__play">Play</button></div>
			</figure>`;
	});

	it('loads nothing from YouTube before the reader presses play', async () => {
		await loadSite();
		expect(document.querySelector('iframe')).toBeNull();
	});

	it('swaps the play button for the YouTube player on click', async () => {
		await loadSite();
		(document.querySelector('.video__play') as HTMLButtonElement).click();
		const iframe = document.querySelector('iframe')!;
		expect(iframe.src).toBe('https://www.youtube-nocookie.com/embed/abc?autoplay=1');
		expect(iframe.title).toBe('Demo');
		expect(iframe.getAttribute('allow')).toContain('autoplay');
		expect(document.querySelector('.video')!.classList.contains('is-playing')).toBe(true);
		expect(document.querySelector('.video__play')).toBeNull();
	});
});

describe('print buttons', () => {
	it('open the print dialog', async () => {
		document.body.innerHTML = '<button data-print>Print</button>';
		const print = vi.fn();
		vi.stubGlobal('print', print);
		await loadSite();
		(document.querySelector('[data-print]') as HTMLButtonElement).click();
		expect(print).toHaveBeenCalledOnce();
	});
});

describe('sketch draw-in', () => {
	it('waits for sketches below the fold and draws them once they scroll into view', async () => {
		document.body.innerHTML = sketch();
		await loadSite();
		const svg = document.querySelector('svg')!;
		const observer = FakeObserver.last!;
		expect(svg.classList.contains('will-draw')).toBe(true);
		expect(observer.observed).toEqual([svg]);

		observer.callback([{ isIntersecting: false, target: svg }]);
		expect(svg.classList.contains('is-drawn')).toBe(false);

		observer.callback([{ isIntersecting: true, target: svg }]);
		expect(svg.classList.contains('is-drawn')).toBe(true);
		expect(observer.unobserved).toEqual([svg]);
	});

	it('leaves sketches without animated strokes alone', async () => {
		document.body.innerHTML = sketch(false);
		await loadSite();
		expect(FakeObserver.last!.observed).toEqual([]);
	});

	it('does not hide sketches that are already on screen', async () => {
		document.body.innerHTML = sketch();
		await loadSite({ inView: true });
		expect(document.querySelector('svg')!.classList.contains('will-draw')).toBe(false);
	});

	it('respects reduced motion', async () => {
		document.body.innerHTML = sketch();
		await loadSite({ reduceMotion: true });
		expect(FakeObserver.last).toBeUndefined();
		expect(document.querySelector('svg')!.classList.contains('will-draw')).toBe(false);
	});

	it('does nothing in browsers without IntersectionObserver', async () => {
		document.body.innerHTML = sketch();
		vi.stubGlobal('IntersectionObserver', undefined);
		delete (window as { IntersectionObserver?: unknown }).IntersectionObserver;
		await loadSite();
		expect(document.querySelector('svg')!.classList.contains('will-draw')).toBe(false);
	});
});
