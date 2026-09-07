// Builds the search query used for scan gating.
//
// The scan-scope predicate is combined with the user-supplied vulnerability
// query. The InsightAppSec search grammar binds && (AND) tighter than || (OR),
// so a raw concatenation like
//     vulnerability.scans.id='X' && severity='High' || severity='Critical'
// parses as  (scans.id='X' AND High) OR Critical  — meaning any Critical
// finding anywhere in the org matches, regardless of the scan being gated
// (APPSI-4142). Parenthesising the user's query preserves the intended
// scan scope: scans.id='X' AND (High OR Critical).
export function buildScanGatingQuery(scanScopeQuery: string, vulnQuery: string): string {
    return scanScopeQuery + " && (" + vulnQuery + ")";
}
