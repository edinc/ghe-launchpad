import { describe, expect, it } from 'vitest';
import Video from '../../../src/components/Video.astro';
import BillingFlow from '../../../src/components/diagrams/BillingFlow.astro';
import DeveloperFlow from '../../../src/components/diagrams/DeveloperFlow.astro';
import IdentityFlow from '../../../src/components/diagrams/IdentityFlow.astro';
import PathsCompare from '../../../src/components/diagrams/PathsCompare.astro';
import SystemMap from '../../../src/components/diagrams/SystemMap.astro';
import { videos } from '../../../src/data/videos';
import { render, renderDom } from '../render';

describe('Video', () => {
	it('renders a click-to-load card without contacting YouTube', async () => {
		const html = await render(Video, { props: { id: 'licenses' } });
		expect(html).not.toContain('<iframe');
		const doc = await renderDom(Video, { props: { id: 'licenses' } });
		const figure = doc.querySelector('figure.video')!;
		expect(figure.getAttribute('data-video-embed')).toBe(`https://www.youtube-nocookie.com/embed/${videos.licenses.youtubeId}?autoplay=1&rel=0`);
		expect(doc.querySelector('.video__play')!.getAttribute('aria-label')).toBeNull();
		expect(doc.querySelector('.video__play')!.textContent!.replace(/\s+/g, ' ').trim()).toBe(`Play video: ${videos.licenses.title} 8 min`);
		expect(doc.querySelector('.video__len')!.textContent).toBe('8 min');
		expect(doc.querySelector('.video__note a')!.getAttribute('href')).toBe(`https://www.youtube.com/watch?v=${videos.licenses.youtubeId}`);
	});

	it('labels GitHub videos and leaves out unknown running times', async () => {
		const doc = await renderDom(Video, { props: { id: 'azureBilling' } });
		expect(doc.querySelector('.video__len')).toBeNull();
		expect(doc.querySelector('.video__note')!.textContent).toContain('Official GitHub video');
	});

	it('explains in German that the video was recorded in English', async () => {
		const doc = await renderDom(Video, { lang: 'de', props: { id: 'sso' } });
		expect(doc.querySelector('.video__caption')!.textContent).toContain(videos.sso.summary.de);
		expect(doc.querySelector('.video__note')!.textContent).toContain('auf Englisch');
		expect(doc.querySelector('.video__len')!.textContent).toBe('15 Min.');
	});
});

describe('SystemMap', () => {
	it('shows the whole setup with an accessible title and description', async () => {
		const doc = await renderDom(SystemMap);
		const svg = doc.querySelector('svg')!;
		expect(svg.getAttribute('role')).toBe('img');
		expect(svg.getAttribute('aria-labelledby')).toBe('sysmap-full-all-title sysmap-full-all-desc');
		expect(doc.getElementById('sysmap-full-all-title')!.textContent).toBe('Your setup, sketched');
		expect(svg.innerHTML).toContain('Microsoft Entra ID');
		// Only the Path A box (organizations + repositories) is always faded.
		expect(svg.innerHTML.match(/sk-text--muted/g)).toHaveLength(1);
	});

	it('fades everything outside the focus of a step', async () => {
		const full = await render(SystemMap, { props: { focus: ['azure', 'billing'] } });
		expect(full.match(/sk-text--muted/g)!.length).toBeGreaterThan(1);
		expect(full).toContain('sysmap-full-azure-billing-title');
		const mini = await render(SystemMap, { props: { variant: 'mini', focus: ['entra'] } });
		expect(mini).toContain('sk-s-soft');
		expect(mini).toContain('system-map--mini');
	});

	it('is translated', async () => {
		const doc = await renderDom(SystemMap, { lang: 'de', props: { variant: 'mini', class: 'extra' } });
		expect(doc.querySelector('title')!.textContent).toBe('Ihr Setup als Skizze');
		expect(doc.querySelector('figure')!.classList.contains('extra')).toBe(true);
	});
});

describe.each([
	['IdentityFlow', IdentityFlow, 'From Entra ID to a Copilot license', 'Von Entra ID bis zur Copilot-Lizenz'],
	['BillingFlow', BillingFlow, 'How GitHub ends up on your Azure invoice', 'So landet GitHub auf Ihrer Azure-Rechnung'],
	['DeveloperFlow', DeveloperFlow, 'From the IDE to Copilot', 'Von der IDE zu Copilot'],
	['PathsCompare', PathsCompare, 'Path A and Path B compared', 'Variante A und B im Vergleich'],
])('%s', (_, component, en, de) => {
	it('is a labelled, scrollable sketch in English', async () => {
		const doc = await renderDom(component);
		const svg = doc.querySelector('svg')!;
		expect(svg.getAttribute('role')).toBe('img');
		expect(doc.querySelector('title')!.textContent).toBe(en);
		for (const id of (svg.getAttribute('aria-labelledby') ?? svg.getAttribute('aria-describedby') ?? '').split(' ')) {
			if (id) expect(doc.getElementById(id), id).not.toBeNull();
		}
		expect(doc.querySelector('.sk-scroll')!.getAttribute('tabindex')).toBe('0');
		expect(svg.querySelectorAll('path.sk').length).toBeGreaterThan(5);
	});

	it('is translated to German', async () => {
		const doc = await renderDom(component, { lang: 'de' });
		expect(doc.querySelector('title')!.textContent).toBe(de);
	});
});
