import React, { useState, useEffect} from 'react'
import { View,Text , TouchableOpacity, StyleSheet, ScrollView, Alert} from 'react-native';
import { ActivityIndicator, Button, useTheme } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import XLSX from 'xlsx'
import RNFS from 'react-native-fs';
import Feather from 'react-native-vector-icons/Feather'
import FirebaseUtil from '../../../../utils/FirebaseUtils';
import { scale, fontScale } from 'react-native-utils-scale'

export default function Excel({ hideModal, id }) {
    const [doc, setDoc] = useState([])
    const [docName, setDocName ] = useState('יבא קובץ אקסל')
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)
    const { colors } = useTheme()

    const submitDocAlert = () =>{
        setLoading(true)
        Alert.alert('הוסף אנשי קשר', 'תהליך זה עלול לקחת מספר דקות', [
        {text: 'המשך', onPress: () => {submitDoc()}}, {text: 'בטל', onPress: () => setLoading(false)}
        ])
    }

    const submitDoc = async () =>{
        await FirebaseUtil.AddContacts(id,doc)
        hideModal(); 
    }

    const transformDoc = (oJS) => {
        const contacts = []
        const contact = oJS[0]
        if (contact['מצב הגעה'] !=undefined && contact['טלפון'] != undefined && contact['כמות אורחים'] != undefined&& contact['שם מלא'] != undefined&& contact['מספר שולחן'] != undefined) {
            for (let index = 0; index < oJS.length; index++) {
                const contact = oJS[index];
                const status = contact['מצב הגעה']
                if (status != 'מגיע' && status != 'לא מגיע' && status != 'לא ענה' && status != 'אולי מגיע') {
                    contact['מצב הגעה'] = 'לא הופץ'
                }
                contacts.push({
                    name: contact['שם מלא'] !== undefined ? contact['שם מלא'] : "", 
                    phone: contact['טלפון'] !== undefined ? contact['טלפון'].toString(): "", 
                    status: contact['מצב הגעה'],
                    guests: contact['כמות אורחים'] !== undefined ? contact['כמות אורחים']: 1, 
                    table: contact['מספר שולחן'] !== undefined ? contact['מספר שולחן']: 0, 
                }) 
            }
            return contacts

        } else {
            alert('טבלה לא מתאימה להנחיות')
            return []
        }   
    }

    const getDoc = async () => {
        try {
            await DocumentPicker.pick({
                type: [DocumentPicker.types.xlsx],
            })
            .then((res1) => {
                const res = res1[0]
                setDocName(res.name)
                RNFS.readFile(res.uri , 'base64')
                .then(file => {
                    const wb = XLSX.read(file, { type: 'base64' })
                    wb.SheetNames.forEach(function(sheetName) {
                        var oJS = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
                        oJS = transformDoc(oJS)
                        setDoc(oJS)
                    });
                })
            })
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                console.log('canceld')
            } else {
                console.log(err);
            }
        }
    }
    

    const signIn = async () => {
        GoogleSignin.configure();
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setUser(userInfo)
          } catch (error) {
            console.log(error)
          }
    }

    useEffect(() => {
        const fetch = async () => {
            const isSignedIn = await GoogleSignin.isSignedIn();
            if (isSignedIn) {     
                const currentUser = await GoogleSignin.getCurrentUser();
                setUser(currentUser)
            }
            else {
                signIn()
            }
        }
        fetch()
        return () => {   
        }
    }, [])

    return (
        loading ? <ActivityIndicator size={'large'}/> :
        <ScrollView >
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{ fontSize: fontScale(22), borderBottomWidth: 2, margin: 13}}>הנחיות ליבוא טבלת אקסל</Text>
                <TouchableOpacity onPress={() => hideModal()}>
                    <Feather name={'x-square'} size={35} color={colors.primary} />
                </TouchableOpacity>
            </View>
            <View style={{marginHorizontal: 20}}>
                
                <Text style={styles.text}>המערכת יכולה לעבוד עם קובץ אקסל בתבנית מסויימת</Text>
                <Text style={styles.text}>להלן החוקים למילוי קובץ:</Text>
                <Text style={styles.text}>- הקובץ מסוג XLSX בלבד</Text>
                <Text style={styles.text}>- בקובץ חמש כותרות ראשיות בלבד:</Text>
                <Text style={styles.text}>   1. שם מלא</Text>
                <Text style={styles.text}>   2. טלפון (ישראלי בלבד)</Text>
                <Text style={styles.text}>   3. מצב הגעה</Text>
                <Text style={{...styles.text, fontWeight: 'bold'}}>       באופן הבא בלבד: מגיע, לא מגיע, לא הופץ, לא ענו</Text>
                <Text style={styles.text}>   4. כמות אורחים (מספר בלבד, אם רק אחד מוזמן אז 1)</Text>
                <Text style={styles.text}>   5. מספר שולחן (מספר בלבד,  שאין שולחן, 0)</Text>
                <Text style={styles.text}>- יבוא הטבלה יעבוד רק אם כל שמות הכותרות והנותנים בטבלה זהים לחלוטין לדרך שהוצגה לעיל</Text>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => getDoc()} style={{...styles.getDoc,  borderColor: colors.primary, }}>
                        <Text style={{textAlign: 'center'}}>{docName}</Text>
                    </TouchableOpacity>
                    <Button mode="contained" style={{marginBottom: 10}}onPress={() => {submitDocAlert()}}>
                        <Text>הוסף מוזמנים מאקסל</Text>
                    </Button>
                </View>
            </View>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    getDoc: {
        marginBottom: 10,
        padding: 8,
        borderStyle: 'dashed',
        borderWidth: 3, 
        borderRadius: 20,
        width: 250,
    },
    text: {
        fontSize: fontScale(17), 
        paddingVertical: 3,
        writingDirection: 'rtl',
    }
})



