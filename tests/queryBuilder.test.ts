import { buildScanGatingQuery } from '../tasks/InsightAppSec/helpers/queryBuilder';

// Regression tests for APPSI-4142: the scan-gating query must keep the
// user's vulnerability query scoped to the gated scan. Because && binds
// tighter than || in the InsightAppSec search grammar, the user's query
// must be parenthesised, otherwise an OR term escapes the scan scope and
// matches findings from any scan/app in the org.
describe("buildScanGatingQuery", () => {
    const scanScope = "vulnerability.scans.id='40495626-1620-41c2-8663-bfe946828605'";

    it("parenthesises the vulnerability query so an OR term stays scan-scoped", () => {
        const vulnQuery = "vulnerability.severity='HIGH'||vulnerability.severity='CRITICAL'";
        const result = buildScanGatingQuery(scanScope, vulnQuery);

        expect(result).toBe(scanScope + " && (" + vulnQuery + ")");
        // The whole vulnerability query is wrapped, so precedence is
        // scans.id AND (HIGH OR CRITICAL) — not (scans.id AND HIGH) OR CRITICAL.
        expect(result).toContain("&& (" + vulnQuery + ")");
    });

    it("does NOT emit the ambiguous un-parenthesised form that caused APPSI-4142", () => {
        const vulnQuery = "vulnerability.severity='HIGH'||vulnerability.severity='CRITICAL'";
        const result = buildScanGatingQuery(scanScope, vulnQuery);

        // The old bug produced exactly this string, where the trailing OR term
        // is no longer constrained by the scan-id predicate.
        expect(result).not.toBe(scanScope + "&&" + vulnQuery);
        expect(result.endsWith(")")).toBe(true);
    });

    it("still wraps a single-term query (harmless, keeps behaviour uniform)", () => {
        const vulnQuery = "vulnerability.severity='CRITICAL'";
        expect(buildScanGatingQuery(scanScope, vulnQuery))
            .toBe(scanScope + " && (" + vulnQuery + ")");
    });
});
