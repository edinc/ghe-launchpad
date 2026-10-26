import { describe, expect, it } from 'vitest';
import JourneyMap from '../../../src/components/JourneyMap.astro';
import PathCards from '../../../src/components/PathCards.astro';
import RoleRoster from '../../../src/components/RoleRoster.astro';
import RouteMap from '../../../src/components/RouteMap.astro';
import { roleOrder, steps } from '../../../src/data/steps';
import { renderDom } from '../render';

describe('RouteMap', () => {
	it('links all 11 stops in order', async () => {
		const doc = await renderDom(RouteMap);
		const links = [...doc.querySelectorAll('.route-stop__link')].map((a) => a.getAttribute('href'));
		expect(links).toEqual(steps.map((s) => `/ghe-launchpad/steps/${s.id}/`));
	});

	it('marks parallel steps and waits', async () => {
		const doc = await renderDom(RouteMap);
		const stops = [...doc.querySelectorAll('.route-stop')];
		expect(stops.filter((s) => s.classList.contains('route-stop--parallel'))).toHaveLength(3);
		expect(stops.filter((s) => s.classList.contains('route-stop--wait'))).toHaveLength(steps.filter((s) => s.wait).length);
		expect(doc.querySelector('.route__parallel--inline')!.nextElementSibling!.textContent).toContain('6');
	});

	it('speaks German on German pages', async () => {
		const doc = await renderDom(RouteMap, { lang: 'de' });
		expect(doc.querySelector('.route__start')!.textContent).toBe('Hier starten');
		expect(doc.querySelector('.route-stop__link')!.getAttribute('href')).toBe('/ghe-launchpad/de/steps/prepare/');
		expect(doc.querySelector('.route-stop .sr-only')!.textContent).toContain('Schritt 0');
	});
});

describe('JourneyMap', () => {
	it('is a table of roles by steps', async () => {
		const doc = await renderDom(JourneyMap);
		expect(doc.querySelectorAll('thead .journey__step')).toHaveLength(11);
		expect(doc.querySelectorAll('tbody .journey__lane')).toHaveLength(roleOrder.length);
		expect(doc.querySelector('caption')!.textContent).toContain('Who is involved in which step');
		expect(doc.querySelector('.journey__scroll')!.getAttribute('tabindex')).toBe('0');
	});

	it('marks the steps that can run in parallel and links them in German', async () => {
		const doc = await renderDom(JourneyMap, { lang: 'de' });
		expect(doc.querySelectorAll('.journey__step--parallel')).toHaveLength(3);
		expect(doc.querySelector('.journey__step a')!.getAttribute('href')).toBe('/ghe-launchpad/de/steps/prepare/');
		expect(doc.querySelector('.journey__corner')!.textContent).toBe('Rolle');
	});
});

describe('RoleRoster', () => {
	it('describes every role and lists the steps it joins', async () => {
		const doc = await renderDom(RoleRoster);
		const rows = [...doc.querySelectorAll('.roster__row')];
		expect(rows).toHaveLength(roleOrder.length);
		const entraRow = rows.find((r) => r.querySelector('.role-tag--entra'))!;
		const listed = [...entraRow.querySelectorAll('.roster__num')].map((n) => Number(n.textContent));
		expect(listed).toEqual(steps.filter((s) => s.roles.includes('entra')).map((s) => s.num));
	});

	it('labels the step list for screen readers in German', async () => {
		const doc = await renderDom(RoleRoster, { lang: 'de' });
		expect(doc.querySelector('.roster__steps')!.getAttribute('aria-label')).toBe('Schritte');
	});
});

describe('PathCards', () => {
	it('presents both paths and starts at step 0', async () => {
		const doc = await renderDom(PathCards);
		expect([...doc.querySelectorAll('.path-card__name')].map((h) => h.textContent)).toEqual([
			'Path A · Full platform',
			'Path B · Copilot only',
		]);
		const card = doc.querySelector('.path-card--b')!;
		expect(card.getAttribute('aria-labelledby')).toBe('path-b');
		expect(doc.querySelector('.path-cards__go a')!.getAttribute('href')).toBe('/ghe-launchpad/steps/prepare/');
	});

	it('is translated', async () => {
		const doc = await renderDom(PathCards, { lang: 'de' });
		expect(doc.querySelector('.path-card__name')!.textContent).toBe('Variante A · Komplette Plattform');
		expect(doc.querySelector('.path-cards__go a')!.textContent).toContain('Mit Schritt 0 starten');
	});
});
