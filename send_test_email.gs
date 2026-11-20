// Sends confirmation-email.html to yourself as a real email.
// Setup: script.google.com → New project → paste this into Code.gs →
//        File + → HTML → name it "email" → paste the whole email HTML into it → Run sendTest.
function sendTest() {
  const html = HtmlService.createTemplateFromFile('email').getRawContent();
  MailApp.sendEmail({
    to: Session.getActiveUser().getEmail(),
    subject: 'Acme Internship: Application Received ✓',
    htmlBody: html,
  });
}
