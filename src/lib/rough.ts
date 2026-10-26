import rough from 'roughjs';

/** Theme-aware tones; each maps to CSS classes (`sk-s-*` for strokes, `sk-f-*` for fills). */
export type Tone = 'ink' | 'soft' | 'muted' | 'paper' | 'yellow' | 'pink' | 'teal';

export interface ShapeOptions {
	stroke?: Tone;
	fill?: Tone;
	fillStyle?: 'hachure' | 'solid' | 'zigzag' | 'cross-hatch' | 'dots';
	strokeWidth?: number;
	roughness?: number;
	bowing?: number;
	hachureGap?: number;
	hachureAngle?: number;
	fillWeight?: number;
	dashed?: boolean;
	/** Animate the stroke drawing on when scrolled into view. */
	draw?: boolean;
	class?: string;
}

type Point = [number, number];

const round = (d: string) => d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n) * 10) / 10));

/**
 * Build-time sketch renderer. Seeds increment per shape so every build emits identical SVG.
 */
export function createSketch(seed = 1) {
	const gen = rough.generator();
	let nextSeed = seed;
	const out: string[] = [];

	const options = (o: ShapeOptions) => ({
		seed: nextSeed++,
		stroke: o.stroke ?? 'ink',
		strokeWidth: o.strokeWidth ?? 2,
		roughness: o.roughness ?? 1.3,
		bowing: o.bowing ?? 0.9,
		fill: o.fill,
		fillStyle: o.fillStyle ?? 'hachure',
		hachureGap: o.hachureGap ?? 6,
		hachureAngle: o.hachureAngle ?? -41,
		fillWeight: o.fillWeight ?? 1.4,
		strokeLineDash: o.dashed ? [7, 7] : undefined,
	});

	function emit(drawable: ReturnType<typeof gen.rectangle>, o: ShapeOptions) {
		const outline = o.stroke ?? 'ink';
		for (const p of gen.toPaths(drawable)) {
			const stroke = p.stroke && p.stroke !== 'none' ? `sk-s-${p.stroke}` : 'sk-s-none';
			const fill = p.fill && p.fill !== 'none' ? `sk-f-${p.fill}` : 'sk-f-none';
			const isOutline = p.stroke === outline;
			const hatch = !isOutline && p.stroke && p.stroke !== 'none' ? ' sk-hatch' : '';
			const draw = o.draw && isOutline ? ' sk-draw' : '';
			const dash = o.dashed && isOutline ? ' stroke-dasharray="7 7"' : '';
			const len = o.draw && isOutline ? ' pathLength="1"' : '';
			out.push(
				`<path d="${round(p.d)}" class="sk ${stroke} ${fill}${hatch}${draw}${o.class ? ` ${o.class}` : ''}" stroke-width="${p.strokeWidth}"${dash}${len}/>`
			);
		}
	}

	function arrowHead(from: Point, to: Point, o: ShapeOptions, size = 13) {
		const angle = Math.atan2(to[1] - from[1], to[0] - from[0]);
		const head: ShapeOptions = { ...o, dashed: false, draw: false, class: o.draw ? 'sk-head' : o.class };
		for (const spread of [0.48, -0.48]) {
			const x = to[0] - size * Math.cos(angle + spread);
			const y = to[1] - size * Math.sin(angle + spread);
			emit(gen.line(to[0], to[1], x, y, { ...options(head), roughness: 0.7 }), head);
		}
	}

	return {
		rect(x: number, y: number, w: number, h: number, o: ShapeOptions = {}) {
			emit(gen.rectangle(x, y, w, h, options(o)), o);
		},
		ellipse(cx: number, cy: number, w: number, h: number, o: ShapeOptions = {}) {
			emit(gen.ellipse(cx, cy, w, h, options(o)), o);
		},
		line(x1: number, y1: number, x2: number, y2: number, o: ShapeOptions = {}) {
			emit(gen.line(x1, y1, x2, y2, options(o)), o);
		},
		/** A curved arrow through the given points (2+). `heads` controls arrowheads. */
		arrow(points: Point[], o: ShapeOptions = {}, heads: 'end' | 'both' = 'end') {
			const drawable =
				points.length === 2
					? gen.line(points[0][0], points[0][1], points[1][0], points[1][1], options(o))
					: gen.curve(points, options(o));
			emit(drawable, o);
			const n = points.length;
			arrowHead(points[n - 2], points[n - 1], o);
			if (heads === 'both') arrowHead(points[1], points[0], o);
		},
		toString() {
			return out.join('');
		},
	};
}

/** Escape text for safe use inside generated SVG markup. */
export function esc(text: string) {
	return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** One or more lines of hand-lettered text, centered on x by default. */
export function label(
	x: number,
	y: number,
	lines: string | string[],
	{ size = 19, cls = '', anchor = 'middle', lineHeight = 1.15 }: { size?: number; cls?: string; anchor?: 'start' | 'middle' | 'end'; lineHeight?: number } = {}
) {
	const list = Array.isArray(lines) ? lines : [lines];
	const tspans = list
		.map((line, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : size * lineHeight}">${esc(line)}</tspan>`)
		.join('');
	return `<text x="${x}" y="${y}" class="sk-text ${cls}" font-size="${size}" text-anchor="${anchor}">${tspans}</text>`;
}
