import { describe, expect, it } from 'vitest';
import { inline, roleOrder, stepById, steps, type Focus } from '../../src/data/steps';

const focusParts: Focus[] = ['entra', 'ghe', 'azure', 'ide', 'copilot', 'sso', 'scim', 'billing', 'signin'];
const both = (value: { en: string; de: string } | undefined) => Boolean(value?.en.trim() && value.de.trim());

describe('steps', () => {
	it('are the 11 steps 0–10, in order', () => {
		expect(steps.map((s) => s.num)).toEqual([...Array(11).keys()]);
	});

	it('have unique ids', () => {
		expect(new Set(steps.map((s) => s.id)).size).toBe(steps.length);
	});

	it.each(steps)('step $num ($id) is complete in English and German', (step) => {
		expect(both(step.title)).toBe(true);
		expect(both(step.short)).toBe(true);
		expect(both(step.time)).toBe(true);
		if (step.wait) expect(both(step.wait)).toBe(true);
		expect(step.checks.length).toBeGreaterThan(0);
		for (const check of step.checks) expect(both(check.text)).toBe(true);
	});

	it.each(steps)('step $num ($id) only depends on earlier steps', (step) => {
		for (const id of step.needs) expect(stepById(id).num).toBeLessThan(step.num);
	});

	it.each(steps)('step $num ($id) has known, unique roles and focus parts', (step) => {
		expect(step.roles.length).toBeGreaterThan(0);
		expect(new Set(step.roles).size).toBe(step.roles.length);
		for (const role of step.roles) expect(roleOrder).toContain(role);
		for (const part of step.focus) expect(focusParts).toContain(part);
	});

	it('lets single sign-on, provisioning and teams run while waiting on steps 3–5', () => {
		expect(steps.filter((s) => s.parallel).map((s) => s.num)).toEqual([6, 7, 8]);
	});

	it('marks path-specific checkpoints as Path A or B only', () => {
		for (const check of steps.flatMap((s) => s.checks)) {
			if (check.path) expect(['a', 'b']).toContain(check.path);
		}
	});

	it('hands Copilot enablement to the Microsoft or GitHub contact', () => {
		expect(stepById('enable-copilot').roles).toContain('contact');
	});

	it('requires the enterprise owner to have a personal github.com account before starting the trial', () => {
		expect(stepById('prepare').checks).toContainEqual({
			text: {
				en: 'The enterprise owner can sign in to github.com with a personal account, not a managed one.',
				de: 'Der Enterprise-Owner kann sich mit einem persönlichen Konto bei github.com anmelden, nicht mit einem Managed-User-Konto.',
			},
		});
	});
});

describe('stepById', () => {
	it('finds a step', () => {
		expect(stepById('configure-sso').num).toBe(6);
	});

	it('fails loudly for typos', () => {
		expect(() => stepById('configure-ssso')).toThrow('Unknown step "configure-ssso"');
	});
});

describe('roleOrder', () => {
	it('lists every role once', () => {
		expect(roleOrder).toEqual(['lead', 'owner', 'entra', 'azure', 'contact', 'dev']);
	});
});

describe('inline', () => {
	it('formats `code` and **strong**', () => {
		expect(inline('Open **Settings** at `SUBDOMAIN.ghe.com`')).toBe('Open <strong>Settings</strong> at <code>SUBDOMAIN.ghe.com</code>');
	});

	it('escapes HTML before formatting', () => {
		expect(inline('<script>alert(1)</script> & `<b>`')).toBe('&lt;script&gt;alert(1)&lt;/script&gt; &amp; <code>&lt;b&gt;</code>');
	});

	it('leaves plain text alone', () => {
		expect(inline('Nothing to format')).toBe('Nothing to format');
	});
});
