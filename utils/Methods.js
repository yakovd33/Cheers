import { Linking, Alert, Platform } from 'react-native';

export const callNumber = (phone) => {
  console.log('callNumber ----> ', phone);
  let phoneNumber = phone;
  if (Platform.OS !== 'android') {
    phoneNumber = `telprompt:${phone}`;
  }
  else  {
    phoneNumber = `tel:${phone}`;
  }
  Linking.canOpenURL(phoneNumber)
  .then(supported => {
    if (!supported) {
      Alert.alert('טלפון לא כביל', 'לא ניתן להתקשר למספר טלפון שהתקבל', [{text: 'המשך'}]);
    } else {
      return Linking.openURL(phoneNumber);
    }
  })
  .catch(err => console.log(err));
};

export const sendWhatsAppMessage = link => {
    Linking.canOpenURL(link)
      .then(supported => {
        if (!supported) {
            console.log(supported)
            Alert.alert(
            'אנא הורד וואצאפ על מנת להמשיך'
            );
        } else {
            return Linking.openURL(link);
        }
    })
    .catch(err => console.error('An error occurred', err))
}

export const dateToString = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return day + '/' + month + '/' + year 
}

export const dateToTimeString = (date) => {
    const hours = date.getHours() < 10 ? '0' + date.getHours() :  date.getHours()
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() :  date.getMinutes()
    return hours + ':' + minutes
}

export const getDate = (secs) => {
    var d = new Date(1970, 1, 1);
    d.setSeconds(secs);
    return d;
}

export const createCheckList = () => {return [{
    title: 'רגע אחרי שאמרת i Do',
    backgroundColor: '#afeecf',
    list: [{
        text: 'רשימת מוזמנים ראשונית',
        done: false,
        key: 1,
    },{
        text: 'חשיבה על תאריכים ראשוניים',
        done: false,
        key: 2,
    },{
        text: 'פגישות עם מקומות אירועים',
        done: false,
        key: 3,
    },],
    key: 1,
},{
    title: 'כשנה עד חצי שנה לפני החתונה',
    backgroundColor: '#90ee90',
    list: [{
        text: 'חתימת חוזה עם מקום האירוע',
        done: false,
        key: 1,
    },{
        text: 'צלמי סטילס',
        done: false,
        key: 2,
    },{
        text: "דיג'יי",
        done: false,
        key: 3,
    },{
        text: "קייטרינג",
        done: false,
        key: 4,
    },{
        text: "בר",
        done: false,
        key: 5,
    },{
        text: "עיצוב",
        done: false,
        key: 6,
    },],
    key: 2,
},{
    title: 'כחצי שנה עד שלושה חודשים',
    backgroundColor: '#eeafaf',
    list: [{
        text: 'מאפרת',
        done: false,
        key: 1,
    },{
        text: 'מעצבת שיער',
        done: false,
        key: 2,
    },{
        text: "תכשיטים",
        done: false,
        key: 3,
    },{
        text: "שמלת כלה",
        done: false,
        key: 4,
    },{
        text: "נעליים",
        done: false,
        key: 5,
    },{
        text: "חליפת חתן",
        done: false,
        key: 6,
    },{
        text: "עיצוב הזמנות",
        done: false,
        key: 7,
    },{
        text: "בחירת מנהל חתונות",
        done: false,
        key: 8,
    },],
    key: 3,
},{
    title: 'כחודש לפני החתונה',
    backgroundColor: '#afeecf',
    list: [{
        text: 'חלוקת הזמנות',
        done: false,
        key: 1,
    },{
        text: 'טעימות',
        done: false,
        key: 2,
    },{
        text: "פגישה מוסיקלית עם הדי",
        done: false,
        key: 3,
    },{
        text: "שמלת כלה",
        done: false,
        key: 4,
    },{
        text: "נעליים",
        done: false,
        key: 5,
    },{
        text: "חליפת חתן",
        done: false,
        key: 6,
    },{
        text: "עיצוב הזמנות",
        done: false,
        key: 7,
    },{
        text: "בחירת מנהל חתונות",
        done: false,
        key: 8,
    },],
    key: 4,
},{
    title: 'כשבועיים עד שבוע לפני החתונה',
    backgroundColor: '#90ee90',
    list: [{
        text: 'אישורי הגעה',
        done: false,
        key: 1,
    },{
        text: 'מדידה אחרונה לשמלת כלה',
        done: false,
        key: 2,
    },{
        text: 'רכישת אלכוהול',
        done: false,
        key: 3,
    },{
        text: "ממתקים וגומי",
        done: false,
        key: 4,
    },],
    key: 5,
},{
    title: 'רגע אחרי',
    backgroundColor: '#eeafaf',
    list: [{
        text: 'האנימון',
        done: false,
        key: 1,
    },{
        text: "הפקדת צ'קים",
        done: false,
        key: 2,
    },{
        text: 'תשלומים אחרונים לספקים',
        done: false,
        key: 3,
    },{
        text: "פתיחת חשבון משותף",
        done: false,
        key: 4,
    },],
    key: 6,
},]}

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

export const getDaysDiff = (a, b) => {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

export const getHoursDiff = (a, b) => {
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / 1000/60/60);
}

export const isInGuests = (item, contacts) => {
    const phone = item.phone
    for (let index = 0; index < contacts.length; index++) {
        const element = contacts[index];
        if (fixPhone(element.phone) == fixPhone(phone))
            return true;
    }
    return false;
}

export const fixPhone = (phone) => {
    phone = phone.split('-').join('');
    phone = phone.split(' ').join('');
    phone = phone.split('+972').join('');
    phone = phone.split('+').join('');
    return phone
}

export const contactsStatus = (contacts) => {
    const count = {
        'מגיע': 0,
        'לא מגיע': 0,
        'אולי מגיע': 0,
        'לא ענה': 0,
        'מוזמנים': 0,
        'לא הופץ': 0
    }
    for (let index = 0; index < contacts.length; index++) {
        const contact = contacts[index];
        count[contact.status] += contact.guests;
        count['מוזמנים'] += contact.guests;
    }
    return count;
}

export const tablesStatus = (tables) => {
    const status = {
        'full': 0,
        'total': tables.length,
        'free': 0,
        'taken': 0,
    }
    for (let index = 0; index < tables.length; index++) {
        const table = tables[index];
        const num = table.numGuests
        if (table.size <= num){
            status['full']++;
        } else {
            status['free'] += table.size - num
        }
        status['taken']+= num
    }
    return status;
}

export const numGuests = (contacts) => {
    let count = 0
    contacts.forEach((contact) => count+= contact.guests)
    return count
}
