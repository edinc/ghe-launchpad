import { describe, expect, it } from 'vitest';
import { createSketch, esc, label } from '../../src/lib/rough';

const paths = (svg: string) => svg.match(/<path [^>]*\/>/g) ?? [];

describe('createSketch', () => {
	const draw = (seed: number) => {
		const sk = createSketch(seed);
		sk.rect(10, 10, 120, 60, { fill: 'yellow' });
		sk.arrow([
			[0, 0],
			[60, 30],
			[120, 0],
		]);
		return sk.toString();
	};

	it('emits identical SVG for the same seed, so builds are reproducible', () => {
		expect(draw(7)).toBe(draw(7));
	});

	it('emits a different wobble for a different seed', () => {
		expect(draw(7)).not.toBe(draw(8));
	});

	it('rounds coordinates to one decimal', () => {
		const sk = createSketch(3);
		sk.ellipse(50, 50, 80, 40);
		expect(sk.toString()).not.toMatch(/\d\.\d{2,}/);
	});

	it('draws outlines in ink by default and hachure fills as lighter strokes', () => {
		const sk = createSketch(4);
		sk.rect(0, 0, 100, 50, { fill: 'pink' });
		const svg = sk.toString();
		expect(svg).toContain('sk-s-ink');
		expect(svg).toMatch(/class="sk sk-s-pink sk-f-none sk-hatch"/);
	});

	it('uses fill classes for solid fills', () => {
		const sk = createSketch(5);
		sk.rect(0, 0, 100, 50, { fill: 'paper', fillStyle: 'solid', stroke: 'teal' });
		const svg = sk.toString();
		expect(svg).toContain('sk-f-paper');
		expect(svg).toContain('sk-s-teal');
		expect(svg).not.toContain('sk-hatch');
	});

	it('marks dashed outlines and adds custom classes', () => {
		const sk = createSketch(6);
		sk.line(0, 0, 100, 0, { dashed: true, class: 'my-line' });
		const svg = sk.toString();
		expect(svg).toContain('stroke-dasharray="7 7"');
		expect(svg).toContain('my-line');
	});

	it('prepares draw-in animation for outlines and their arrowheads', () => {
		const sk = createSketch(9);
		sk.arrow(
			[
				[0, 0],
				[100, 0],
			],
			{ draw: true }
		);
		const svg = sk.toString();
		expect(svg).toContain('sk-draw');
		expect(svg).toContain('pathLength="1"');
		expect(svg).toContain('sk-head');
	});

	it('adds two strokes per arrowhead, at one or both ends', () => {
		const line: [number, number][] = [
			[0, 0],
			[100, 0],
		];
		const one = createSketch(2);
		one.arrow(line);
		const both = createSketch(2);
		both.arrow(line, {}, 'both');
		expect(paths(both.toString()).length - paths(one.toString()).length).toBe(2);
	});

	it('draws curves through three or more points', () => {
		const sk = createSketch(12);
		sk.arrow([
			[0, 0],
			[50, 40],
			[100, 0],
		]);
		expect(paths(sk.toString()).length).toBeGreaterThanOrEqual(3);
	});

	it('starts empty', () => {
		expect(createSketch().toString()).toBe('');
	});
});

describe('esc', () => {
	it('escapes markup characters', () => {
		expect(esc('a < b & c > d')).toBe('a &lt; b &amp; c &gt; d');
	});
});

describe('label', () => {
	it('renders one centered line by default', () => {
		const svg = label(10, 20, 'Entra ID');
		expect(svg).toBe('<text x="10" y="20" class="sk-text " font-size="19" text-anchor="middle"><tspan x="10" dy="0">Entra ID</tspan></text>');
	});

	it('stacks several lines with the line height', () => {
		const svg = label(0, 0, ['one', 'two', 'three'], { size: 10, lineHeight: 1.5 });
		expect(svg.match(/<tspan/g)).toHaveLength(3);
		expect(svg).toContain('dy="15"');
	});

	it('supports anchors, classes and escapes text', () => {
		const svg = label(0, 0, 'A & B', { anchor: 'start', cls: 'sk-text--title' });
		expect(svg).toContain('text-anchor="start"');
		expect(svg).toContain('class="sk-text sk-text--title"');
		expect(svg).toContain('A &amp; B');
	});
});
