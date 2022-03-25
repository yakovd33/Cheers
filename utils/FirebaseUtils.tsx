import auth from '@react-native-firebase/auth';
import {Image, Alert} from 'react-native';
import firebase from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import functions from '@react-native-firebase/functions';
import {isEmpty} from './ValidationMethods';
import {fixPhone, numGuests} from './Methods';

const events = firebase().collection('events');
const tables = firebase().collection('tables');
const contacts = firebase().collection('contacts');
const invitations = firebase().collection('invitations');
const schedules = firebase().collection('schedules');
const live = firebase().collection('live');

export const getBackgroundImage = async bg => {
  const ext =
    bg.includes('-') || bg === 'pink'
      ? 'jpg'
      : bg === 'goldDots'
      ? 'jpeg'
      : 'png';
  try {
    // Image.prefetch(await storage().ref(`invatations-background/${bg}.${ext}`).getDownloadURL());
    return await storage()
      .ref(`invatations-background/${bg}.${ext}`)
      .getDownloadURL();
  } catch (e) {
    console.log('error getting image ' + bg + ' error: ', e);
  }
};

export default class FirebaseUtil {
  public static signIn = (email: string, password: string) => {
    return auth().signInWithEmailAndPassword(email, password);
  };

  public static signUp = (email: string, password: string) => {
    return auth().createUserWithEmailAndPassword(email, password);
  };

  public static resetPassword = (email: string) => {
    return auth().sendPasswordResetEmail(email);
  };

  public static signOut = () => {
    auth().signOut();
  };

  public static AddEvent = async (event, navigation) => {
    if (
      isEmpty(event.firstN) &&
      isEmpty(event.lastN) &&
      isEmpty(event.address) &&
      isEmpty(event.phone) &&
      isEmpty(event.date) &&
      isEmpty(event.hall)
    ) {
      if (event.mail) {
        let snapshot = await events.where('phone', '==', event.phone).get();
        if (snapshot.docs.length > 0) {
          alert('מספר טלפון נמצא במערכת');
        } else {
          snapshot = await events.where('mail', '==', event.mail).get();
          if (snapshot.docs.length > 0) {
            alert('מייל נמצא במערכת');
          } else {
            events.add({...event}).then(docRef => {
              this.CreateAllCollection(docRef.id, event.date, event.type);
              functions().httpsCallable('sendCode')({
                message: docRef.id,
                phone: event.phone,
              });
              alert('אירוע נוסף');
              navigation.navigate('Events');
            });
          }
        }
      }
    }
  };

  private static CreateAllCollection = async (id, date, type) => {
    contacts.doc(id).collection('contacts').add({
      name: 'אורח לדוגמא',
      status: 'מגיע',
      guests: 1,
      phone: '0599999999',
      table: 1,
      ride: false,
      dish: false,
      arrived: false,
    });
    tables
      .doc(id)
      .collection('tables')
      .doc('1')
      .set({key: 1, size: 15, type: 'אבירים', numGuests: 1});
    const hoopa = type == 'חתונה' ? true : false;
    const text =
      type == 'חתונה'
        ? 'אנו שמחים ונרגשים להזמין אתכם לחגוג עמנו את יום נישואינו'
        : 'אנו שמחים ונרגשים להזמין אתכם לחגוג את בר/ת המצווה';
    const icon = type == 'חתונה' ? 'rings1' : 'rings2';
    const topIcons = type == 'חתונה' ? true : false;
    invitations.doc(id).set({
      background: 'flowers',
      primary: '#FF5487',
      secondary: '#330066',
      ride: true,
      hoopa: hoopa,
      confetti: true,
      declaration: true,
      dish: false,
      icon: icon,
      text: text,
      topIcons: topIcons,
      brothers: false,
      printed:true
    });
    const first = new Date(date);
    first.setDate(first.getDate() - 14);
    first.setHours(12, 0, 0);
    const second = new Date(date);
    second.setDate(second.getDate() - 10);
    second.setHours(12, 0, 0);
    const reminder = new Date(date);
    reminder.setHours(12, 0, 0);
    const thanks = new Date(date);
    thanks.setDate(thanks.getDate() + 1);
    thanks.setHours(9, 0, 0);
    schedules.doc(id).set({
      first: first,
      second: second,
      reminder: reminder,
      thanks: thanks,
    });
    live.doc(id).set({count: 0});
  };

  public static UpdateEvent = (event, id, navigation) => {
    if (
      isEmpty(event.firstN) &&
      isEmpty(event.lastN) &&
      isEmpty(event.address) &&
      isEmpty(event.phone)
    ) {
      events
        .doc(id)
        .set(event)
        .then(() => {
          alert('עודכן פרטי לקוח');
          invitations.doc(id).update({topIcons: false});
          navigation.navigate('EventScreen');
        });
    }
  };

  public static UpdateBlocked = (id, blocked) => {
    events.doc(id).update({blocked: blocked});
  };

  public static GetContacts = async id => {
    const docs = await contacts.doc(id).collection('contacts').get();
    const newContacts = [];
    docs.forEach(doc => {
      newContacts.push({...doc.data(), id: doc.id});
    });
    return newContacts;
  };

  public static GetTables = id => {
    tables
      .doc(id)
      .get()
      .then(tables => {
        return tables;
      });
  };

  public static UpdateCheckList = (id, checkList, navigation) => {
    events.doc(id).update({
      checkList: checkList,
    });
  };

  public static UpdateContact = (id, contactId, contacts1) => {
    contacts.doc(id).collection('contacts').doc(contactId).update(contacts1);
  };

  public static DeleteContact = (id, contactId) => {
    contacts.doc(id).collection('contacts').doc(contactId).delete();
  };

  public static AddContact = (id, contact) => {
    contact.phone = fixPhone(contact.phone);
    contacts
      .doc(id)
      .collection('contacts')
      .where('phone', '==', contact.phone)
      .get()
      .then(snapshot => {
        if (snapshot.docs.length > 0) {
          alert('מספר טלפון קיים תחת השם ' + snapshot.docs[0].data().name);
        } else {
          if (contact.arrived == undefined) {
            contact.arrived = false;
          }
          if (contact.ride == undefined) {
            contact.ride = false;
          }
          if (contact.table == undefined) {
            contact.table = 0;
          }
          if (contact.dish == undefined) {
            contact.dish = 'ללא';
          }
          contacts
            .doc(id)
            .collection('contacts')
            .add(contact)
            .then(() => {
              Alert.alert('', 'מספר הטלפון נוסף בהצלחה');
            })
            .catch(e => {
              console.log('failed adding contact:', e);
            });
        }
      })
      .catch(e => {
        console.log('failed getting contacts :', e);
      });
  };

  public static AddContacts = async (id, contacts) => {
    const db = firebase();
    const batch = db.batch();
    const tabless = await tables.doc(id).collection('tables').get();
    const tablesKeys = tabless.docs.map(doc => parseInt(doc.id));
    contacts.forEach(contact => {
      if (contact.phone == '') {
        console.log(contact.phone);
      }
      var docRef = db
        .collection('contacts')
        .doc(id)
        .collection('contacts')
        .doc();

      if (contact.arrived == undefined) {
        contact.arrived = false;
      }
      if (contact.ride == undefined) {
        contact.ride = false;
      }
      if (contact.table == undefined) {
        contact.table = 0;
      } else {
        if (contact.table != 0 && !tablesKeys.includes(contact.table)) {
          tablesKeys.push(contact.table);
          this.AddTable(id, {
            numGuests: 0,
            type: 'מרובע',
            size: 15,
            key: contact.table,
          });
        }
      }
      if (contact.dish == undefined) {
        contact.dish = 'ללא';
      }
      batch.set(docRef, contact);
    });
    batch.commit();
  };

  public static DeleteContacts = async id => {
    const newCon = await contacts.doc(id).collection('contacts').get();
    this.deleteCollection(newCon);
  };

  public static UpdateTable = (id, key, change) => {
    tables.doc(id).collection('tables').doc(key.toString()).update(change);
  };

  public static GetTableGuests = async (id, tableId) => {
    const tableContacts = await contacts
      .doc(id)
      .collection('contacts')
      .where('table', '==', tableId)
      .get();
    return tableContacts.docs.map(doc => {
      return {id: doc.id, name: doc.data().name, guests: doc.data().guests};
    });
  };

  public static AddTable = (id, table) => {
    tables
      .doc(id)
      .collection('tables')
      .doc(table.key.toString())
      .set(table)
      .then(() => {
        Alert.alert('', 'השולחן נוסף בהצלחה');
      })
      .catch(e => {
        Alert.alert('שגיאה', 'קרתה תקלה בהוספת שולחן אנא נסו שנית');
        console.log('error adding table :', e);
      });
  };

  public static DeleteTable = async (id, tableId) => {
    tables.doc(id).collection('tables').doc(tableId.toString()).delete();
    const tableContacts = await contacts
      .doc(id)
      .collection('contacts')
      .where('table', '==', tableId)
      .get();
    tableContacts.docs.forEach(doc =>
      doc.ref.update({table: 0, arrived: false}),
    );
  };

  public static DeleteTables = async id => {
    const newCon = await tables.doc(id).collection('tables').get();
    this.deleteCollection(newCon);
  };

  private static deleteCollection = newCon => {
    var batch = firebase().batch();
    let count = 0;
    newCon.docs.map(newCon => {
      batch.delete(newCon.ref);
      count++;
      if (count == 500) {
        batch.commit();
        batch = firebase().batch();
      }
    });
    batch.commit();
  };

  public static UpdateInvitation = (id, invitation) => {
    invitations.doc(id).update(invitation);
  };

  public static UpdateSchedule = (id, schedule) => {
    schedules.doc(id).update(schedule);
  };

  public static DeleteEvent = id => {
    this.DeleteContacts(id);
    this.DeleteTables(id);
    events.doc(id).delete();
    live.doc(id).delete();
    invitations.doc(id).delete();
    schedules.doc(id).delete();
    try {
      storage().ref(id).delete();
    } catch (e) {
      console.log('Unable to delete');
    }
  };

  public static SetTableSizes = async id => {
    const tablesArr = await tables.doc(id).collection('tables').get();
    tablesArr.docs.forEach(async doc => {
      const contactsArr = await contacts
        .doc(id)
        .collection('contacts')
        .where('table', '==', doc.data().key)
        .get();
      doc.ref.update({
        numGuests: numGuests(contactsArr.docs.map(doc => doc.data())),
      });
    });
  };

  public static IsTableExist = (id, tableKey) => {
    const table = tables.doc(id).collection('tables').doc(tableKey.toString());
    table.get().then(snapshot => {
      if (!snapshot.exists) {
        table.set({
          numGuests: 0,
          type: 'ריבוע',
          size: 15,
          key: parseInt(tableKey),
        });
      }
    });
  };

  public static UpdateLiveCount = (id, count) => {
    live.doc(id).update({count: count});
  };

  public static setPrintedInvatation = (id, uri, front) => {
    invitations.doc(id).update({printed: front}).then((res)=>console.log(res))

    invitations
      .doc(id)
      .update(front ? {frontPrinted: uri} : {backPrinted: uri})
      .then(res => {
        console.log('updated image ', res);
      });
  };
}
