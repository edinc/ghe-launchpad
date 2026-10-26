import { describe, expect, it } from 'vitest';
import Callout from '../../../src/components/Callout.astro';
import ClickPath from '../../../src/components/ClickPath.astro';
import DocLinks from '../../../src/components/DocLinks.astro';
import Rocket from '../../../src/components/Rocket.astro';
import RoleTag from '../../../src/components/RoleTag.astro';
import Sticky from '../../../src/components/Sticky.astro';
import { render, renderDom } from '../render';

describe('ClickPath', () => {
	it('shows each menu item as a key, with arrows in between', async () => {
		const doc = await renderDom(ClickPath, { props: { path: 'Your enterprise > Settings >  Authentication security ' } });
		const keys = [...doc.querySelectorAll('.click-path__key')].map((k) => k.textContent);
		expect(keys).toEqual(['Your enterprise', 'Settings', 'Authentication security']);
		expect(doc.querySelectorAll('.click-path__arrow')).toHaveLength(2);
	});

	it('defaults to GitHub and reads well for screen readers', async () => {
		const doc = await renderDom(ClickPath, { props: { path: 'A > B' } });
		const group = doc.querySelector('.click-path')!;
		expect(group.classList.contains('click-path--github')).toBe(true);
		expect(group.getAttribute('role')).toBe('group');
		expect(group.getAttribute('aria-label')).toBe('In GitHub: A › B');
	});

	it('names the app in the page language', async () => {
		const doc = await renderDom(ClickPath, { lang: 'de', props: { path: 'Entra ID > Enterprise apps', app: 'entra' } });
		expect(doc.querySelector('.click-path--entra')).not.toBeNull();
		expect(doc.querySelector('.click-path__where')!.textContent).toBe('Im Entra Admin Center');
	});

	it('ignores empty segments', async () => {
		const doc = await renderDom(ClickPath, { props: { path: 'A >> B >', app: 'azure' } });
		expect(doc.querySelectorAll('.click-path__key')).toHaveLength(2);
	});
});

describe('RoleTag', () => {
	it('fills the sticker for the lead role', async () => {
		const doc = await renderDom(RoleTag, { props: { role: 'entra' } });
		const tag = doc.querySelector('.role-tag')!;
		expect(tag.classList.contains('role-tag--entra')).toBe(true);
		expect(tag.classList.contains('role-tag--helper')).toBe(false);
		expect(tag.textContent!.trim()).toBe('Entra admin');
	});

	it('outlines helpers and supports short labels in German', async () => {
		const doc = await renderDom(RoleTag, { lang: 'de', props: { role: 'azure', lead: false, short: true } });
		const tag = doc.querySelector('.role-tag')!;
		expect(tag.classList.contains('role-tag--helper')).toBe(true);
		expect(tag.textContent!.trim()).toBe('Azure-Besitzer');
	});
});

describe('Callout', () => {
	it.each([
		['note', 'Good to know', 'Gut zu wissen'],
		['tip', 'Tip', 'Tipp'],
		['caution', 'Careful', 'Vorsicht'],
		['danger', 'Stop and check', 'Erst prüfen'],
		['wait', 'Time to wait', 'Jetzt heißt es warten'],
	])('%s has a default title in both languages and its own rocket', async (type, en, de) => {
		const docEn = await renderDom(Callout, { props: { type }, slots: { default: '<p>Body</p>' } });
		const docDe = await renderDom(Callout, { lang: 'de', props: { type } });
		expect(docEn.querySelector('.callout__title')!.textContent).toBe(en);
		expect(docDe.querySelector('.callout__title')!.textContent).toBe(de);
		expect(docEn.querySelector(`.callout--${type} .rocket--${type}`)).not.toBeNull();
		expect(docEn.querySelector('aside')!.getAttribute('aria-label')).toBe(en);
		expect(docEn.querySelector('.callout__body')!.innerHTML).toContain('<p>Body</p>');
	});

	it('defaults to a note and accepts a custom title', async () => {
		const doc = await renderDom(Callout, { props: { title: 'Path B: keep people out of organizations' } });
		expect(doc.querySelector('.callout--note')).not.toBeNull();
		expect(doc.querySelector('.callout__title')!.textContent).toBe('Path B: keep people out of organizations');
	});
});

describe('Sticky', () => {
	it('is yellow by default and renders its note', async () => {
		const doc = await renderDom(Sticky, { props: { title: 'Billing' }, slots: { default: 'Monthly on the 1st.' } });
		expect(doc.querySelector('.sticky--yellow .sticky__title')!.textContent).toBe('Billing');
		expect(doc.querySelector('.sticky__body')!.textContent).toBe('Monthly on the 1st.');
	});

	it('takes another highlighter color', async () => {
		const doc = await renderDom(Sticky, { props: { title: 'Careful', color: 'pink' } });
		expect(doc.querySelector('.sticky--pink')).not.toBeNull();
	});
});

describe('DocLinks', () => {
	it('wraps the list of official links', async () => {
		const html = await render(DocLinks, { slots: { default: '<ul><li><a href="https://docs.github.com/en">Docs</a></li></ul>' } });
		expect(html).toMatch(/^<div class="doc-links">\s*<ul>/);
	});
});

describe('Rocket', () => {
	it('is decorative and launches by default', async () => {
		const svg = (await renderDom(Rocket)).querySelector('svg')!;
		expect(svg.classList.contains('rocket--launch')).toBe(true);
		expect(svg.getAttribute('aria-hidden')).toBe('true');
		expect(svg.getAttribute('role')).toBeNull();
		expect(svg.getAttribute('width')).toBe('3rem');
	});

	it('becomes an image when it has a label', async () => {
		const svg = (await renderDom(Rocket, { props: { mood: 'done', label: 'Finished', size: '5rem', class: 'big' } })).querySelector('svg')!;
		expect(svg.getAttribute('role')).toBe('img');
		expect(svg.getAttribute('aria-label')).toBe('Finished');
		expect(svg.getAttribute('aria-hidden')).toBeNull();
		expect(svg.classList.contains('big')).toBe(true);
		expect(svg.innerHTML).toContain('r-trail');
	});
});
