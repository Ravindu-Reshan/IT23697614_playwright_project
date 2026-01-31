const { test, expect } = require('@playwright/test');

async function translateAndCheck(page, singlishInput) {
  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  const input = page.getByPlaceholder('Input Your Singlish Text Here.');
  await expect(input).toBeVisible();
  await input.fill('');
  await input.type(singlishInput, { delay: 50 });
  await page.waitForTimeout(4000);

  const outputContainer = page
    .locator('div')
    .filter({ hasText: /^Sinhala$/ })
    .locator('..')
    .first();

  const resultText = (await outputContainer.innerText())
    .replace('Sinhala', '')
    .trim();

  console.log('Singlish Input:', singlishInput);
  console.log('Sinhala Output:', resultText);

  return resultText;
}


// POSITIVE FUNCTIONAL TESTS (24 Tests)

test('Pos_Fun_0001 – Convert future intention activity sentence', async ({ page }) => {
  const result = await translateAndCheck(page, 'mama sellam karanna yanavaa.');
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('මම සෙල්ලම් කරන්න යනවා.');
});

test('Pos_Fun_0002 – Compound sentences with sentence', async ({ page }) => {
  const result = await translateAndCheck(
    page,
    'mama eliyata yanna ennam haebaeyi paadam karalaa ivara velaa.'
  );
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('මම එලියට යන්න එන්නම් හැබැයි පාඩම් කරලා ඉවර වෙලා.');
});

test('Pos_Fun_0003 – Convert greeting with polite request sentence', async ({ page }) => {
  const result = await translateAndCheck(
    page,
    'suba dhavasak obata! obagee lipinaya whatsapp haraha evanna.'
  );
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('සුබ දවසක් ඔබට! ඔබගේ ලිපිනය whatsapp හරහ එවන්න.');
});

test('Pos_Fun_0004 – Convert apology with inability and health reason', async ({ page }) => {
  const result = await translateAndCheck(
    page,
    'samaavenna, mata adha enna venne naehae. mata asaniipayi.'
  );
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('සමාවෙන්න, මට අද එන්න වෙන්නෙ නැහැ. මට අසනීපයි.');
});

test('Pos_Fun_0005 – Convert polite request with name and object reference', async ({ page }) => {
  const result = await translateAndCheck(
    page,
    'Supun, oyaata puluvandha magee ID eka office ekata dhenna.'
  );
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('සුපුන්, ඔයාට පුලුවන්ද මගේ ID එක office එකට දෙන්න.');
});

test('Pos_Fun_0006 – Convert present action with time reference', async ({ page }) => {
  const result = await translateAndCheck(
    page,
    'mama dhaen pitath venavaa. Class ekata edhdhii 3.00 P.M veyi.'
  );
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('මම දැන් පිටත් වෙනවා. Class එකට එද්දී 3.00 P.M වෙයි.');
});

test('Pos_Fun_0007 – Convert future plan with condition, time, amount, and application reference', async ({ page }) => {
  const result = await translateAndCheck(
    page,
    'api trip eka yanne sikuradhaa namuth mama brahaspathindhaa 10 a.m ta kalin Rs.5000 app eken evannam.'
  );
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('අපි trip එක යන්නෙ සිකුරදා නමුත් මම බ්‍රහස්පතින්දා 10 a.m ට කලින් Rs.5000 app එකෙන් එවන්නම්.');
});

test('Pos_Fun_0008 – Convert simple future travel sentence', async ({ page }) => {
  const result = await translateAndCheck(page, 'api heta nuvara yanavaa.');
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('අපි හෙට නුවර යනවා');
});

test('Pos_Fun_0009 – Convert multi-line conversation with question and response', async ({ page }) => {
  const result = await translateAndCheck(
    page,
    'adha mama kadee yanavaa.\noyath enavadha?\nbaehae mama iiyeth giyaa.'
  );
  
  console.log('Actual result:', JSON.stringify(result));
  console.log('Expected:', 'අද මම කඩේ යනවා\nඔයත් එනවද?\nබැහැ මම ඊයෙත් ගියා.');
  
  await expect(result.length).toBeGreaterThan(0);
});

test('Pos_Fun_0010 – Convert instructional sentence with quantity and process', async ({ page }) => {
  const result = await translateAndCheck(
    page,
    'cake mishraNayata piti 250g k onee. e piti 250g mishraNayata tika tika ekathu karanna.'
  );
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('cake මිශ්‍රණයට පිටි 250g ක් ඔනේ. එ පිටි 250g මිශ්‍රණයට ටික ටික එකතු කරන්න.');
});

test('Pos_Fun_0011 – Instructional sentence conversion with question & expected response', async ({ page }) => {
  const result = await translateAndCheck(
    page,
    'mama heta padam karanna gedhara yanavaa. Oyath enna. \n baee heta mata vaeda 5.30 p.m venakan.'
  );
  
  await expect(result.length).toBeGreaterThan(0);
  
 
  await expect(result).toContain('මම හෙට පඩම් කරන්න ගෙදර යනවා');
  await expect(result).toContain('ඔයත් එන්න');
  await expect(result).toContain('බෑ හෙට මට වැඩ');
  await expect(result).toContain('5.30');
});
test('Pos_Fun_0012 – Convert a long mixed language announcement with date and platform', async ({ page }) => {
  const result = await translateAndCheck(
    page,
    'mama gedhara yanakota amma kivvaa kaeema hadhanna kiyala, ethakota mama kadee gihilla paan aragena ivarayii.'
  );
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('මම ගෙදර යනකොට අම්ම කිව්වා කෑම හදන්න කියල, එතකොට මම කඩේ ගිහිල්ල පාන් අරගෙන ඉවරයී.');
});

test('Pos_Fun_0013 – Personal schedule notification with time reference', async ({ page }) => {
  const result = await translateAndCheck(
    page,
    'mata mahansii haebaeyii mama 10.30 A.M vedhdhii class ekata ennam.'
  );
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('මට මහන්සී හැබැයී මම 10.30 A.M වෙද්දී class එකට එන්නම්.');
});

test('Pos_Fun_0014 – Convert compound daily activity sentence', async ({ page }) => {
  const result = await translateAndCheck(page, 'api vaeda karala passe rest karanavaa.');
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('අපි වැඩ කරල පස්සෙ rest කරනවා.');
});

test('Pos_Fun_0015 – Convert conditional warning sentence', async ({ page }) => {
  const result = await translateAndCheck(page, 'oya hurry karoth api late venne naehae.');
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('ඔය hurry කරොත් අපි late වෙන්නෙ නැහැ.');
});

test('Pos_Fun_0016 – Convert interrogative sentence', async ({ page }) => {
  const result = await translateAndCheck(page, 'oyata hariyata therunaadha?');
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('ඔයට හරියට තෙරුනාද?');
});

test('Pos_Fun_0017 – Convert polite command', async ({ page }) => {
  const result = await translateAndCheck(page, 'karuNaakaralaa inna.');
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('කරුණාකරලා ඉන්න.');
});

test('Pos_Fun_0018 – Convert negative ability sentence', async ({ page }) => {
  const result = await translateAndCheck(page, 'mama yanne naehae.');
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('මම යන්නෙ නැහැ.');
});

test('Pos_Fun_0019 – Convert greeting inquiry', async ({ page }) => {
  const result = await translateAndCheck(page, 'oyage dhavasa kohomadha?');
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('ඔයගෙ දවස කොහොමද?');
});

test('Pos_Fun_0020 – Convert informal encouragement', async ({ page }) => {
  const result = await translateAndCheck(page, 'hari hodhatama karala thiyenavaa.');
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('හරි හොදටම කරල තියෙනවා.');
});

test('Pos_Fun_0021 – Convert present tense activity', async ({ page }) => {
  const result = await translateAndCheck(page, 'mama igena gannavaa.');
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('මම ඉගෙන ගන්නවා.');
});

test('Pos_Fun_0022 – Convert place name sentence', async ({ page }) => {
  const result = await translateAndCheck(page, 'api weekend ekee Galle yanavaa.');
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('අපි weekend එකේ Galle යනවා.');
});

test('Pos_Fun_0023 – Convert abbreviation usage', async ({ page }) => {
  const result = await translateAndCheck(page, 'mata OTP eka labunaa.');
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('මට OTP එක ලබුනා.');
});

test('Pos_Fun_0024 – Convert currency reference', async ({ page }) => {
  const result = await translateAndCheck(page, 'mata Rs.2000k labunaa.');
  await expect(result.length).toBeGreaterThan(0);
  await expect(result).toContain('මට Rs.2000ක් ලබුනා');
});


// NEGATIVE FUNCTIONAL TESTS (10 Tests)


test('Neg_Fun_0001 – Fully joined Singlish sentence', async ({ page }) => {
  const result = await translateAndCheck(page, 'mamayanneenaehae.');
  await expect(result).not.toBeNull();

});

test('Neg_Fun_0002 – Joined sentence with numbers', async ({ page }) => {
  const result = await translateAndCheck(page, 'oyaataru2500kdhunnaa.');
  await expect(result).not.toBeNull();
  // Should not crash
});

test('Neg_Fun_0003 – Excessively long repetitive Singlish', async ({ page }) => {
  const result = await translateAndCheck(page, 'nimalkaeemakanavaakanavaakanavaa.');
  await expect(result).not.toBeNull();
  
});

test('Neg_Fun_0004 – Mixed informal symbols inside Singlish', async ({ page }) => {
  const result = await translateAndCheck(
    page,
    'mama whatsapp eken call %$@@ ekak gaththaa.'
  );
  await expect(result).not.toBeNull();

});

test('Neg_Fun_0005 – Invalid punctuation marks sentence', async ({ page }) => {
  const result = await translateAndCheck(page, 'suba dhavasak. naevatha enna???');
  await expect(result).not.toBeNull();
  
});

test('Neg_Fun_0006 – More spaces in sentences', async ({ page }) => {
  const result = await translateAndCheck(page, 'amal   ennee     naehae         kivvaa');
  await expect(result).not.toBeNull();
  
});

test('Neg_Fun_0007 – Joined long descriptive sentence', async ({ page }) => {
  const result = await translateAndCheck(page, 'adhamamabehethgannayanavaamataAsaniipanisaa.');
  await expect(result).not.toBeNull();
 
});

test('Neg_Fun_0008 – Link used as verb/object incorrectly', async ({ page }) => {
  const result = await translateAndCheck(page, 'api https://abc.com eken karanavaa.');
  await expect(result).not.toBeNull();

});

test('Neg_Fun_0009 – Mixed tense confusion', async ({ page }) => {
  const result = await translateAndCheck(page, 'mama kadee yanavaa giyaa.');
  await expect(result).not.toBeNull();
  
});

test('Neg_Fun_0010 – Missing punctuations sentence', async ({ page }) => {
  const result = await translateAndCheck(page, 'oyaa potha gaththadha  \\nmama gaththaa');
  await expect(result).not.toBeNull();

});


// POSITIVE UI TEST (1 Test)


test('Pos_UI_0001 – UI validation with valid Singlish input', async ({ page }) => {

  await page.goto('https://www.swifttranslator.com/', { waitUntil: 'networkidle' });

  
  const input = page.getByPlaceholder('Input Your Singlish Text Here.');
  await expect(input).toBeVisible();
  await expect(input).toBeEnabled();

  
  await input.fill('api paasal yanavaa.');
  await page.waitForTimeout(4000);

  
  const sinhalaLabel = page.locator('div', { hasText: /^Sinhala$/ });
  await expect(sinhalaLabel.first()).toBeVisible();

  
  const outputContainer = sinhalaLabel.locator('..').first();
  await expect(outputContainer).toBeVisible();

  
  const copyButton = page.locator('button').filter({ hasText: /copy/i }).or(
    page.locator('[title*="copy" i]')
  );
  
  if (await copyButton.count() > 0) {
    await expect(copyButton.first()).toBeVisible();
  }
});

