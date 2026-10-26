/**
 * The GHE Launchpad rocket: the logo, and the doodle that marks notes, tips, cautions, waits and the finish.
 * Drawn once here; components render it inline with theme-aware CSS classes (see `.rocket` in custom.css).
 */
export type RocketMood = 'launch' | 'note' | 'tip' | 'caution' | 'danger' | 'wait' | 'done';

const flame =
	'<path class="r-flame" d="M-6 17 C -5.5 27 -2 33 0 38 C 2 33 5.5 27 6 17 Z"/>' +
	'<path class="r-flame-core" d="M-3 18 C -2.5 24 -1 28 0 31 C 1 28 2.5 24 3 18 Z"/>';
const smallFlame =
	'<path class="r-flame" d="M-5 17 C -4.5 23 -1.5 27 0 30 C 1.5 27 4.5 23 5 17 Z"/>' +
	'<path class="r-flame-core" d="M-2.5 18 C -2 21.5 -0.8 24 0 25.5 C 0.8 24 2 21.5 2.5 18 Z"/>';
const hull =
	'<path class="r-fins" d="M-9.5 5 C -17 9 -19 17 -17 25 L -9.5 16.5 M9.5 5 C 17 9 19 17 17 25 L 9.5 16.5"/>' +
	'<path class="r-body" d="M0 -31 C 11 -21 13 -2 9.5 17 L -9.5 17 C -13 -2 -11 -21 0 -31 Z"/>' +
	'<path class="r-window" d="M-6.5 -8 C -6.5 -12 -3 -15 0.5 -14.6 C 4 -14.2 6.8 -11 6.4 -7.4 C 6 -3.8 3 -1.2 -0.6 -1.6 C -4.2 -2 -6.8 -5 -6.4 -8.6"/>';

const rocket = (x: number, y: number, scale: number, rotate = 0, fire: 'full' | 'small' | 'none' = 'full') =>
	`<g transform="translate(${x} ${y}) rotate(${rotate}) scale(${scale})">${fire === 'full' ? flame : fire === 'small' ? smallFlame : ''}${hull}</g>`;

const pad =
	'<path class="r-ink" d="M24 106.5 C 46 105.5 74 107.5 96 106"/>' + '<path class="r-ink r-thin" d="M36 107 L 31 116 M84 106.5 L 89 115.5"/>';
const smoke =
	'<path class="r-smoke" d="M14 101 C 10 95 16 88 23 91 C 25 84 35 84 37 90 C 43 88 48.5 93 45.5 99 C 43 103.5 18 104.5 14 101 Z"/>' +
	'<path class="r-smoke" d="M106 101 C 110 95 104 88 97 91 C 95 84 85 84 83 90 C 77 88 71.5 93 74.5 99 C 77 103.5 102 104.5 106 101 Z"/>';
const ticks = '<path class="r-ink r-thin" d="M26 64 L 18 63 M24 74 L 15 75 M94 64 L 102 63 M96 74 L 105 75"/>';
const asterisk = (x: number, y: number, cls = 'r-pink') =>
	`<path class="${cls}" d="M${x} ${y - 8} L ${x} ${y + 8} M${x - 7} ${y - 4} L ${x + 7} ${y + 4} M${x - 7} ${y + 4} L ${x + 7} ${y - 4}"/>`;
const sparkle = (x: number, y: number) =>
	`<path class="r-spark" d="M${x} ${y - 11} C ${x + 1} ${y - 3} ${x + 3} ${y - 1} ${x + 11} ${y} C ${x + 3} ${y + 1} ${x + 1} ${y + 3} ${x} ${y + 11} C ${x - 1} ${y + 3} ${x - 3} ${y + 1} ${x - 11} ${y} C ${x - 3} ${y - 1} ${x - 1} ${y - 3} ${x} ${y - 11} Z"/>`;
const warning = (fill: 'r-warn' | 'r-warn-pink', marks: string) =>
	`<path class="${fill}" d="M91 9 C 97 19 103 29 108.5 39.5 C 97 40.5 86 40 73.5 39.8 C 79 29 84.5 19 91 9 Z"/>` +
	`<path class="r-ink r-thin" d="${marks}"/>`;

const art: Record<RocketMood, string> = {
	launch: pad + rocket(60, 46, 1.2) + smoke + ticks + asterisk(96, 20),
	wait:
		pad +
		rocket(60, 76, 1.1, 0, 'none') +
		'<path class="r-ink r-thin" d="M80 24 L 92 24 L 80 36 L 92 36 M98 8 L 106 8 L 98 16 L 106 16"/>',
	note:
		rocket(54, 62, 1.15, -8, 'small') +
		'<path class="r-info" d="M93 9 C 103 9 108 16 107.5 24 C 107 32 101 38 93 37.5 C 85 37 79.5 31 80 23 C 80.5 15 86 9.5 93 9 Z"/>' +
		'<path class="r-ink r-thin" d="M93.5 22 L 93.5 31 M93.5 15.5 L 93.5 16"/>',
	tip: rocket(52, 62, 1.15, 14) + sparkle(94, 22) + asterisk(104, 52, 'r-pink r-thin'),
	caution: rocket(48, 64, 1.12, -12, 'small') + warning('r-warn', 'M91 19 L 91 30 M91 35 L 91 35.5'),
	danger: rocket(48, 64, 1.12, -12, 'small') + warning('r-warn-pink', 'M87.5 19 L 87.5 30 M87.5 35 L 87.5 35.5 M94.5 19 L 94.5 30 M94.5 35 L 94.5 35.5'),
	done:
		'<path class="r-ink r-trail" d="M58 60 C 44 74 30 88 12 106"/>' + rocket(76, 42, 1.08, 45) + asterisk(102, 14) + sparkle(30, 30),
};

export function rocketArt(mood: RocketMood) {
	return art[mood];
}
