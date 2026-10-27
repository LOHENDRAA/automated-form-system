// Run: node test_parse.js — checks the CV parser inside Rizurf_Internship_Form.html.
const assert = require('assert');
const src = require('fs').readFileSync(__dirname + '/Rizurf_Internship_Form.html', 'utf8').replace(/\r\n/g, '\n');
eval(src.match(/function normalizePhone[\s\S]*?\n}\n/)[0] + src.match(/function parseCV[\s\S]*?\n}\n/)[0]);

const r = parseCV(`CURRICULUM VITAE
Muhammad Aiman bin Rosli
aiman.rosli@gmail.com | 012-345 6789
linkedin.com/in/aiman-rosli · https://github.com/aimanr · www.aiman.dev
EDUCATION
Universiti Teknologi Malaysia (UTM)
Bachelor of Computer Science (Hons)
Diploma in Information Technology`);

assert.deepStrictEqual(r, {
  name: 'Muhammad Aiman bin Rosli',
  email: 'aiman.rosli@gmail.com',
  phone: '+60123456789',
  university: 'Universiti Teknologi Malaysia (UTM)',
  education: 'Degree',
  linkedin: 'https://linkedin.com/in/aiman-rosli',
  github: 'https://github.com/aimanr',
  portfolio: 'https://www.aiman.dev',
});
assert.equal(normalizePhone('+60 12-345 6789'), '+60123456789');
assert.equal(parseCV('nothing useful').email, undefined);

// Regression: PDF text has no spaces between items, and a profile line must not become the name.
const r2 = parseCV(`Hosam Najeeb
Asia Pacific University with a strong
hosamnajeeb1@gmail.comSelangor`);
assert.equal(r2.name, 'Hosam Najeeb');
assert.equal(r2.email, 'hosamnajeeb1@gmail.com');
assert.equal(parseCV('x@mail.co.uk').email, 'x@mail.co.uk');
assert.equal(parseCV(`powered applications. Experienced\nHosam Najeeb`).name, 'Hosam Najeeb');
console.log('ok');
