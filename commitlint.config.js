// Conventional Commits, enforced at commit time.
//
// release-please computes the next version and the CHANGELOG from these
// subjects, so a malformed one silently produces no release. Failing here makes
// that mistake loud and local instead of invisible in CI.
export default {
    extends: ["@commitlint/config-conventional"],
    rules: {
        // The repo writing style bans em dashes and AI tells in commit messages.
        "subject-case": [2, "never", ["pascal-case", "upper-case"]],
        "header-max-length": [2, "always", 72],
    },
};
