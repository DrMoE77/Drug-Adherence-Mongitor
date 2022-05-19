// to be connected with the database 
//sms reminders to the patients to take their medicines
function sendSMS(phone) {
  var account_sid, auth_token, client, content, message, text_to_send;

  if (frequency !== null) {
    content = "Did you take your medicine? Reply y or n to confirm: ";
  }

  account_sid = ******************************;
  auth_token = ******************************;
  client = new twilio(account_sid, auth_token);
  text_to_send = content;
  message = client.messages.create({
    "body": text_to_send,
     "from_": +**********,
    "to": phone
  });
  return message.sid;
}
