// ============================================================
//  Google Apps Script – Telegram Proxy for Unnikrishnan V C
//  Deploy as: Web App → Anyone → Execute as: Me
// ============================================================

const BOT_TOKEN = 'PASTE_YOUR_NEW_BOT_TOKEN_HERE';  // ← from @BotFather
const CHAT_ID   = '1776805886';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const msg  = buildMessage(data);

    UrlFetchApp.fetch(
      'https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage',
      {
        method:      'post',
        contentType: 'application/json',
        payload:     JSON.stringify({
          chat_id:    CHAT_ID,
          text:       msg,
          parse_mode: 'Markdown'
        })
      }
    );

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function buildMessage(d) {
  const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  return (
    '\uD83C\uDF34 *New Booking Request \u2013 Unnikrishnan V C*\n\n' +
    '\uD83D\uDC64 *Name:* '    + (d.name     || '\u2013') + '\n' +
    '\uD83D\uDCDE *Phone:* '   + (d.phone    || '\u2013') + '\n' +
    '\uD83D\uDD27 *Service:* ' + (d.service  || '\u2013') + '\n' +
    '\uD83D\uDCCD *Location:* '+ (d.location || '\u2013') + '\n' +
    (d.date    ? '\uD83D\uDCC5 *Preferred Date:* ' + d.date    + '\n' : '') +
    (d.message ? '\uD83D\uDCDD *Details:* '        + d.message + '\n' : '') +
    '\n\u23F0 Submitted: ' + now
  );
}

// Quick test – run this function manually to verify the bot works
function testBot() {
  UrlFetchApp.fetch(
    'https://api.telegram.org/bot' + BOT_TOKEN + '/sendMessage',
    {
      method:      'post',
      contentType: 'application/json',
      payload:     JSON.stringify({
        chat_id:    CHAT_ID,
        text:       '\u2705 Apps Script proxy is working!',
        parse_mode: 'Markdown'
      })
    }
  );
  Logger.log('Test message sent!');
}
