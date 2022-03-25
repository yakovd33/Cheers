const functions = require("firebase-functions");
const request = require('request');
const convert = require('xml-js');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const fixPhone = (phone) => {
  phone = phone.split('-').join('');
  phone = phone.split(' ').join('');
  phone = phone.split('+972').join('');
  phone = phone.split('+').join('');
  return phone
}

exports.getBalance = functions.https.onCall((data,context) => {
    var options = {
        'method': 'POST',
        'url': 'https://www.019sms.co.il:8090/api/',
        'headers': {
          'Content-Type': 'application/xml',
          'Cookie': 'incap_ses_1051_1323479=vDXtfSFvbH0V1KJD8+eVDtfJd2EAAAAA9n9y2Ks0dJdM4aHb7WygHA==; visid_incap_1323479=PBri+QpuTDW2Eunw/+X4DVow3GAAAAAAQUIPAAAAAAAg1OsT1O1OXavxL7+5SEiW; ci_session=a%3A5%3A%7Bs%3A10%3A%22session_id%22%3Bs%3A32%3A%224141371412b5993df680b10f51634373%22%3Bs%3A10%3A%22ip_address%22%3Bs%3A7%3A%220.0.0.0%22%3Bs%3A10%3A%22user_agent%22%3Bs%3A21%3A%22PostmanRuntime%2F7.28.4%22%3Bs%3A13%3A%22last_activity%22%3Bi%3A1635240761%3Bs%3A9%3A%22user_data%22%3Bs%3A0%3A%22%22%3B%7De20fce3c1eab88437ad8b736f5a4e890'
        },
        body: '<?xml version="1.0" encoding="UTF-8"?>\r\n<balance>\r\n<user>\r\n<username>cheers22400</username>\r\n<password>Cheers22400@gmail.com</password>\r\n</user>\r\n</balance>\r\n'
      };
    
    request(options, function (error, response) {
        if (error) throw new Error(error);
            const balanceObj = convert.xml2js(response.body, {compact: true})
            balance = balanceObj.balance.balance._text
            db.collection('general').doc('balance').update({'balance': balance})
    });
})

exports.send = functions.https.onCall(async(data, context) => {
    const message = data.message
    const phone = data.phone
    const id = data.id
    const contactId = data.contactId
    let body = '<?xml version="1.0" encoding="UTF-8"?> \r\n<sms>\r\n<user> \r\n<username>cheers22400</username>\r\n<password>Cheers22400@gmail.com</password>\r\n</user> \r\n<source>Cheers</source>\r\n<destinations>\r\n<phone>'
    body += fixPhone(phone)
    body += '</phone> \r\n</destinations>\r\n<message>'
    body += message
    body += '</message>\r\n<add_dynamic>0</add_dynamic>  \r\n<add_unsubscribe>0</add_unsubscribe>\r\n<response>0</response>\r\n</sms>'
    
    const docRef = db.collection('contacts').doc(id).collection('contacts').doc(contactId)
    const contact = await docRef.get()
    if (contact.data().status === 'לא הופץ') {
        docRef.update({status: 'נשלחה הודעה'})
    }

    const options = {
        'method': 'POST',
        'url': 'https://www.019sms.co.il/api',
        'headers': {
            'Content-Type': 'application/xml',
            'Cookie': 'incap_ses_1051_1323479=vDXtfSFvbH0V1KJD8+eVDtfJd2EAAAAA9n9y2Ks0dJdM4aHb7WygHA==; visid_incap_1323479=PBri+QpuTDW2Eunw/+X4DVow3GAAAAAAQUIPAAAAAAAg1OsT1O1OXavxL7+5SEiW; ci_session=a%3A5%3A%7Bs%3A10%3A%22session_id%22%3Bs%3A32%3A%2270d18df0219b55772f39e89fe71e29df%22%3Bs%3A10%3A%22ip_address%22%3Bs%3A7%3A%220.0.0.0%22%3Bs%3A10%3A%22user_agent%22%3Bs%3A21%3A%22PostmanRuntime%2F7.28.4%22%3Bs%3A13%3A%22last_activity%22%3Bi%3A1635241199%3Bs%3A9%3A%22user_data%22%3Bs%3A0%3A%22%22%3B%7Dc4b217c4a5a1a725598195adc73e7127'
        },
        body: body
    };

    request(options,async function(error, response) {
        if (error) console.log(error);
        const status = convert.xml2js(response.body, {compact: true})
        if (status.sms.status._text !== '0') {
            db.collection('contacts').doc(id).collection('contacts').doc(contactId).update({status: 'תקלה'})
        }
  });
})
exports.maybe = functions.https.onCall(async(context) => {
    const query = await db.collection('schedules').get()
   console.log(query);
})
exports.checkId = functions.https.onCall(async (data, context) => {
    const doc = await db.collection('events').doc(data.id).get()
    if (doc.exists) {
        return !doc.data().blocked
    }
    return false
})

exports.sendCode = functions.https.onCall(async (data, context) => {
    let body = '<?xml version="1.0" encoding="UTF-8"?> \r\n<sms>\r\n<user> \r\n<username>cheers22400</username>\r\n<password>Cheers22400@gmail.com</password>\r\n</user> \r\n<source>Cheers</source>\r\n<destinations>\r\n<phone>'
    body += fixPhone(data.phone)
    body += '</phone> \r\n</destinations>\r\n<message>'
    body += data.message
    body += '</message>\r\n<add_dynamic>0</add_dynamic>  \r\n<add_unsubscribe>0</add_unsubscribe>\r\n<response>0</response>\r\n</sms>'
    const options = {
      'method': 'POST',
      'url': 'https://www.019sms.co.il/api',
      'headers': {
        'Content-Type': 'application/xml',
        // 'Cookie': 'visid_incap_1323479=PBri+QpuTDW2Eunw/+X4DVow3GAAAAAAQUIPAAAAAAAg1OsT1O1OXavxL7+5SEiW; ci_session=a%3A5%3A%7Bs%3A10%3A%22session_id%22%3Bs%3A32%3A%222a31b3728614b2a8dff565a0bbf1744f%22%3Bs%3A10%3A%22ip_address%22%3Bs%3A7%3A%220.0.0.0%22%3Bs%3A10%3A%22user_agent%22%3Bs%3A21%3A%22PostmanRuntime%2F7.28.1%22%3Bs%3A13%3A%22last_activity%22%3Bi%3A1625237080%3Bs%3A9%3A%22user_data%22%3Bs%3A0%3A%22%22%3B%7D699410e98ab84e22ff9d453b3b70cf1f'
    },
      body: body
    };
    request(options, function (error, response) {
      if (error) console.log(error);
      console.log(response.statusCode)
    });
})

const sendInvite = async (message, phone, id, contactId) => {
    
}

const isTimeEqual = (date1, date2) => {
  if (date1 !== undefined) {
      date1 = date1.toDate()
      if (date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate() &&  
      date1.getHours() === date2.getHours() && 
      date1.getMinutes() === date2.getMinutes()) {
          return true;
      }
  }
  return false;
}

const getContacts = async (time,date,id, status) => {
  if (isTimeEqual(time,date)) {
    return await db
    .collection('contacts')
    .doc(id)
    .collection('contacts')
    .where('status', '==', status)
    .get()  
  }
}

const dateToString = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return day + '/' + month + '/' + year 
}

const buildMessageXml = (message, phone) => {
    const xml = "<sms><source>Cheers</source><destinations><phone>" + phone + "</phone></destinations><message>" + message + "</message></sms>"
    return xml
}

exports.scheduleSend = functions.pubsub.schedule('* * * * *').onRun(async (context) => {  
    const date = new Date()
    const query = await db.collection('schedules').get()
    let xmlBody = ""
    query.docs.forEach(async (doc) => {
        const event = await db.collection('events').doc(doc.id).get();
        console.log(event);
        let headerName = event.data().celebrator.name
        if (event.data().type == 'חתונה') {
            headerName += ' ו' + event.data().partner.name
        }
        
        let contacts = await getContacts(doc.data().first,date, doc.id,'לא הופץ')
        if (contacts) {
            db.collection('general').doc('round').update({id: event.id, time: new Date(), type: 'סבב ראשון'})
            contacts.forEach(doc => {
                doc.ref.update({status: 'נשלחה הודעה'})
                let message = 'שלום ' + doc.data().name + ' הנך מוזמנ/ת ל' + event.data().type + ' של ' + headerName 
                message += '. לאישור הגעה: https://cheersron-cb77b.web.app/?id=' + event.id + '&contactId=' + doc.id
                xmlBody += buildMessageXml(message, doc.data().phone)
            })
        }
        
        contacts = await getContacts(doc.data().second,date, doc.id,'נשלחה הודעה')
        if (contacts) {
            db.collection('general').doc('round').update({id: event.id, time: new Date(), type: 'סבב שני'})
            contacts.forEach(doc => {
                let message = 'טרם אישרת הגעה ל' + event.data().type + ' של ' + headerName + '.'
                message += ' לאישור הגעה: https://cheersron-cb77b.web.app/?id=' + event.id + '&contactId=' + doc.id
                xmlBody += buildMessageXml(message, doc.data().phone)
            })
        }

        contacts = await getContacts(doc.data().reminder,date, doc.id,'מגיע')         
        if (contacts) {
            db.collection('general').doc('round').update({id: event.id, time: new Date(), type: 'סבב תזכורות'})
            contacts.forEach(doc => {
                let message = 'תזכורת: ' + 'ה' + event.data().type + ' של ' + headerName + ' בתאריך ' + dateToString(event.data().date.toDate()) 
                xmlBody += buildMessageXml(message, doc.data().phone)
            })
        }

        contacts = await getContacts(doc.data().reminder,date, doc.id,'אולי מגיע')
        if (contacts) {
            db.collection('general').doc('round').update({id: event.id, time: new Date(), type: 'סבב תזכורות'})
            contacts.forEach(doc => {
                let message = 'תזכורת: ' + 'ה' + event.data().type + ' של ' + headerName + ' בתאריך ' + dateToString(event.data().date.toDate()) 
                xmlBody += buildMessageXml(message, doc.data().phone)
            })
        }

        contacts = await getContacts(doc.data().thanks,date, doc.id, 'מגיע')
        if (contacts) {
            db.collection('general').doc('round').update({id: event.id, time: new Date(), type: 'סבב תודות'})
            contacts.forEach(doc => {
                let message = doc.data().name + ', תודה רבה על שחגגת איתנו ב' + event.data().type
                xmlBody += buildMessageXml(message, doc.data().phone)
            })
        }

        contacts = await getContacts(doc.data().onTheWay,date, doc.id,'מגיע')
        if (contacts) {
            db.collection('general').doc('round').update({id: event.id, time: new Date(), type: 'סבב "בדרך"'})
            contacts.forEach(doc => {
                if (doc.data().table !== 0) {
                    let message = 'בדרך ל' + event.data().type + ' של ' + headerName +'?' + ' מספר שולחנך ' + doc.data().table
                    xmlBody = buildMessageXml(message, doc.data().phone)
                }
            })
        }
        contacts = await getContacts(doc.data().onTheWay,date, doc.id,'אולי מגיע')
        if (contacts) {
            db.collection('general').doc('round').update({id: event.id, time: new Date(), type: 'סבב "בדרך"'})
            contacts.forEach(doc => {
                if (doc.data().table !== 0) {
                    let message = 'בדרך ל' + event.data().type + ' של ' + headerName +'?' + ' מספר שולחנך ' + doc.data().table
                    xmlBody += buildMessageXml(message, doc.data().phone)
                }
            })
        }

        if (xmlBody !== "") {
            var request = require('request');
            var options = {
            'method': 'POST',
            'url': 'https://www.019sms.co.il:8090/api/',
            'headers': {
                'Content-Type': 'application/xml',
                'Cookie': 'incap_ses_7213_1323479=UPTOJe+s8lsP9C3JwbkZZFAApmEAAAAAd1omeOE5hZbS8p3/mw87Tw==; visid_incap_1323479=PBri+QpuTDW2Eunw/+X4DVow3GAAAAAAQUIPAAAAAAAg1OsT1O1OXavxL7+5SEiW; ci_session=a%3A5%3A%7Bs%3A10%3A%22session_id%22%3Bs%3A32%3A%22c51b7c4cca4da88357ebb07a4aa9057c%22%3Bs%3A10%3A%22ip_address%22%3Bs%3A7%3A%220.0.0.0%22%3Bs%3A10%3A%22user_agent%22%3Bs%3A21%3A%22PostmanRuntime%2F7.28.4%22%3Bs%3A13%3A%22last_activity%22%3Bi%3A1638269009%3Bs%3A9%3A%22user_data%22%3Bs%3A0%3A%22%22%3B%7D13f62207dff25943b5e6a4d75c2fee2f'
            },
            body: '<bulk>\r\n <user>\r\n<username>cheers22400</username>\r\n<password>Cheers22400@gmail.com</password>\r\n</user>\r\n<messages>' + xmlBody + '</messages><response>0</response>\r\n</bulk>'

            };
            request(options, function (error, response) {
                if (error) throw new Error(error);
                console.log(response.body);
            });
        }
    })
})

