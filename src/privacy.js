import '@fontsource/lilita-one';
import '@fontsource-variable/nunito';
import './style.css';
import { SITE } from './data.js';

const a = document.getElementById('oldPolicy');
if (a) a.href = SITE.oldPrivacyUrl;
