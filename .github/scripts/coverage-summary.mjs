// Prints the Vitest coverage totals as a Markdown table for the GitHub Actions job summary.
import { readFileSync } from 'node:fs';

let total;
try {
	({ total } = JSON.parse(readFileSync('coverage/coverage-summary.json', 'utf8')));
} catch {
	console.log('### 🧪 Unit test coverage\n\nNo coverage report was written.');
	process.exit(0);
}

const rows = ['statements', 'branches', 'functions', 'lines'].map(
	(key) => `| ${key[0].toUpperCase()}${key.slice(1)} | ${total[key].pct}% | ${total[key].covered} / ${total[key].total} |`
);
console.log(
	['### 🧪 Unit test coverage', '', '| | Coverage | Covered |', '| --- | ---: | ---: |', ...rows, '', 'Each must stay at 70% or more (`vitest.config.ts`).'].join('\n')
);
