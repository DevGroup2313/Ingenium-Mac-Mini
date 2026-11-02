const { start } = require('./lib.js');
(async () => {
  const { browser, page } = await start();
  const r = await page.evaluate(() => {
    const q = 'Change the date in the subtitle to 15 October 2026 and rename section 3 to "Research questions".';
    const U = IngR101.unasked;
    return [
      U(q, 'Prepared for the Oxford Internet Institute, 3 October 2026', 'Prepared for the Oxford Internet Institute, 15 October 2026', 'set'),
      U(q, '## 3. Proposed project', '## 3. Research questions', 'set'),
      U(q, "I propose to measure whether local language models can match cloud models for everyday academic writing tasks, while keeping every document on the student's own device.", "I am proposing an evaluation of whether local language models can match cloud models for everyday academic writing tasks, while keeping every document on the student's own device. I propose this assessment to clarify if privacy-preserving AI solutions exist for student work environments.", 'set'),
      U('Improve the wording of my statement', 'a', 'b c', 'set'),
      U('Add a sentence about privacy at the end', '', 'Privacy matters to every student.', 'add'),
      U('Fix the typo in section 2', 'Carpe Diem is a stduy planner.', 'Carpe Diem is a study planner.', 'set')];
  });
  console.log(JSON.stringify(r));
  await browser.close();
})();
