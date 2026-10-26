import { describe, expect, it } from 'vitest';
import Checklist from '../../../src/components/Checklist.astro';
import DoneWhen from '../../../src/components/DoneWhen.astro';
import StepIntro from '../../../src/components/StepIntro.astro';
import { stepById, steps } from '../../../src/data/steps';
import { renderDom } from '../render';

describe('StepIntro', () => {
	it('shows who, how long and what to wait for', async () => {
		const doc = await renderDom(StepIntro, { props: { step: 'prepare' } });
		expect(doc.querySelector('section')!.getAttribute('aria-label')).toBe('Step 0');
		expect(doc.querySelector('.fact--who .role-tag--lead')).not.toBeNull();
		expect(doc.querySelector('.fact__big')!.textContent).toBe('≈ 1–2 h');
		expect(doc.querySelector('.fact--wait dd')!.textContent!.trim()).toBe('Internal approvals');
		expect(doc.querySelector('.fact__none')!.textContent).toBe('Nothing before this');
	});

	it('marks helpers and links prerequisites in the page language', async () => {
		const doc = await renderDom(StepIntro, { lang: 'de', props: { step: 'connect-azure' } });
		const roles = [...doc.querySelectorAll('.fact--who .role-tag')];
		expect(roles[0].classList.contains('role-tag--helper')).toBe(false);
		expect(roles.slice(1).every((r) => r.classList.contains('role-tag--helper'))).toBe(true);
		const chips = [...doc.querySelectorAll('.step-chip')];
		expect(chips.map((c) => c.getAttribute('href'))).toEqual(
			stepById('connect-azure').needs.map((id) => `/ghe-launchpad/de/steps/${id}/`)
		);
		expect(doc.querySelector('.step-intro__map-caption')!.textContent).toBe('Dieser Teil Ihres Setups ist betroffen');
	});

	it('only shows "Have ready" when the page lists something', async () => {
		const without = await renderDom(StepIntro, { props: { step: 'activate-enterprise' } });
		expect(without.querySelector('.step-intro__ready')).toBeNull();
		const withList = await renderDom(StepIntro, {
			props: { step: 'activate-enterprise' },
			slots: { default: '<ul><li>A payment method</li></ul>' },
		});
		expect(withList.querySelector('.step-intro__ready-title')!.textContent).toBe('Have ready');
		expect(withList.querySelector('.step-intro__ready li')!.textContent).toBe('A payment method');
	});

	it('leaves out the wait when a step has none', async () => {
		const step = steps.find((s) => !s.wait)!;
		const doc = await renderDom(StepIntro, { props: { step: step.id } });
		expect(doc.querySelector('.fact--wait')).toBeNull();
	});

	it('highlights the parts of the system the step touches', async () => {
		const doc = await renderDom(StepIntro, { props: { step: 'configure-sso' } });
		expect(doc.querySelector('.system-map--mini')).not.toBeNull();
	});
});

describe('DoneWhen', () => {
	it('lists the checkpoints of the step with inline formatting', async () => {
		const doc = await renderDom(DoneWhen, { props: { step: 'developer-setup' } });
		const items = [...doc.querySelectorAll('.done-list__item')];
		expect(items).toHaveLength(stepById('developer-setup').checks.length);
		expect(items[0].querySelector('code')!.textContent).toBe('SUBDOMAIN.ghe.com');
	});

	it('tags path-specific checkpoints', async () => {
		const step = steps.find((s) => s.checks.some((c) => c.path))!;
		const doc = await renderDom(DoneWhen, { lang: 'de', props: { step: step.id } });
		const tags = [...doc.querySelectorAll('.path-tag')].map((t) => t.textContent);
		expect(tags.length).toBe(step.checks.filter((c) => c.path).length);
		expect(tags.every((t) => t === 'Variante A' || t === 'Variante B')).toBe(true);
	});

	it('links to the printable checklist in the page language', async () => {
		const doc = await renderDom(DoneWhen, { lang: 'de', props: { step: 'teams' } });
		expect(doc.querySelector('.done-when__more')!.getAttribute('href')).toBe('/ghe-launchpad/de/resources/checklist/');
	});
});

describe('Checklist', () => {
	it('lists every step with its checkpoints and a print button', async () => {
		const doc = await renderDom(Checklist);
		const titles = [...doc.querySelectorAll('.checklist__title a')];
		expect(titles).toHaveLength(11);
		expect(titles[0].getAttribute('href')).toBe('/ghe-launchpad/steps/prepare/');
		expect(doc.querySelectorAll('.checklist__step .done-list__item')).toHaveLength(steps.flatMap((s) => s.checks).length);
		expect(doc.querySelector('button[data-print]')!.textContent!.trim()).toBe('Print this checklist');
	});

	it('is fully German on German pages', async () => {
		const doc = await renderDom(Checklist, { lang: 'de' });
		expect(doc.querySelector('button[data-print]')!.textContent!.trim()).toBe('Checkliste drucken');
		expect(doc.querySelector('.checklist__title a')!.textContent).toBe(steps[0].title.de);
		expect(doc.querySelectorAll('.checklist__meta .role-tag').length).toBeGreaterThanOrEqual(11);
	});
});
