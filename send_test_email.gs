// Sends Rizurf_Confirmation_Email.html to yourself as a real email.
// Setup: script.google.com → New project → paste this into Code.gs →
//        File + → HTML → name it "email" → paste the whole email HTML into it → Run sendTest.
function sendTest() {
  // getRawContent, not getContent: HtmlService's processed output mangles the base64 logo.
  let html = HtmlService.createTemplateFromFile('email').getRawContent();
  // Gmail blocks embedded (data:) images, so send the logo as an inline attachment instead.
  const logo = html.match(/src="data:image\/png;base64,([^"]+)"/)[1];
  html = html.replace(/src="data:image\/png;base64,[^"]+"/, 'src="cid:logo"');
  MailApp.sendEmail({
    to: Session.getActiveUser().getEmail(),
    subject: 'Rizurf Internship: Application Received ✓',
    htmlBody: html,
    inlineImages: { logo: Utilities.newBlob(Utilities.base64Decode(logo), 'image/png', 'logo.png') },
  });
}
