import { showFixes } from '../helpers/functions';

export const verifyResponse = (verifications, paragraphs) => {
    for (const key in verifications) {
        const ver = verifications[key];
        const p = paragraphs[key];
        showFixes(p, ver);
    };
};