import React, {useState, useEffect, useContext} from 'react';
import { Alert, TextInput, View ,StyleSheet,Text ,TouchableOpacity, Image, PermissionsAndroid} from 'react-native';
import FirebaseUtil from '../utils/FirebaseUtils';
import logo from '../images/logo.png'
import { Button } from 'react-native-paper'
import { IdContext } from '../utils/IdContext';
import { firebase } from '@react-native-firebase/functions';
import { scale, fontScale } from 'react-native-utils-scale'


export default function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [reset, setReset] = useState(false)
    const { setId } = useContext(IdContext)
    const [admin, setAdmin] = useState(true)

    const signIn = () => {
        if (email.length > 0 && password.length > 0){
            FirebaseUtil.signIn(email,password).catch((e)=> {
                console.log(e)
                setEmail('')
                setPassword('')
                Alert.alert('התחברות', "אמייל או סיסמא לא נכונים", [{text: 'המשך'}])
            })
        }
    }
    
    const resetPassword = () => {
        if (email.length > 0){
            FirebaseUtil.resetPassword(email).
            then(() => {
                Alert.alert('נשלח איפוס סיסמא למייל', "איפוס סיסמא", [{text: 'המשך'}]) 
            }).catch((e)=> {
                Alert.alert('מייל לא קיים במערכת', "איפוס סיסמא", [{text: 'המשך'}]) 
            })
        }
    }
    
    const signInWithCode = async () => {
        const exists = await firebase.functions().httpsCallable('checkId')({id: email})
        if (exists.data) {
            setId(email)
        } else {
            Alert.alert('התחברות', "אין גישה לאירוע זה", [{text: 'המשך'}])
        }
    }
    useEffect(() => {
        if (Platform.OS=== 'android') {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
        }
    }, [])

    return (
        <View style={styles.pageContainer}>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Image source={logo} style={{width: 250, height: 180}}></Image>
            </View>
            {reset ? 
                <View style={styles.logInContainer}>
                    <TextInput
                        placeholder="מייל"
                        textAlign='right'
                        onChangeText={setEmail}
                        value={email}
                        style={styles.textInput}
                    />
                    <Button mode='contained' onPress={() => FirebaseUtil.resetPassword(email)}><Text style={{color: 'white'}}>אפס</Text></Button>
                    <TouchableOpacity onPress={() => {setReset(false); setAdmin(false)}}><Text style={styles.text}>החלף לחשבון רגיל</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => {setReset(false); setAdmin(true)}}><Text style={styles.text}>החלף לחשבון עסקי</Text></TouchableOpacity>      
                </View>
            : admin ?
                <View style={styles.logInContainer}>
                    <TextInput
                        placeholder="מייל"
                        textAlign='right'
                        onChangeText={setEmail}
                        value={email}
                        style={styles.textInput}
                    />
                    <TextInput
                    placeholder="סיסמא"
                    textAlign='right'
                    onChangeText={setPassword}
                    value={password}
                    style={styles.textInput}
                    secureTextEntry={true}
                    />
                    <Button mode='contained' onPress={() => signIn()}><Text style={{color: 'white'}}>התחבר</Text></Button>
                    <TouchableOpacity onPress={() => setAdmin(false)}><Text style={styles.text}>החלף לחשבון רגיל</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => setReset(true)}><Text style={styles.text}>איפוס סיסמא</Text></TouchableOpacity>
                </View> :                
                <View style={styles.logInContainer}>
                    <TextInput
                    placeholder="קוד משתמש"
                    textAlign='right'
                    onChangeText={setEmail}
                    value={email}
                    style={styles.textInput}
                    />
                    <Button mode='contained' onPress={() => signInWithCode()}><Text style={{color: 'white'}}>התחבר</Text></Button>
                    <TouchableOpacity onPress={() => setAdmin(true)}><Text style={styles.text}>החלף לחשבון עסקי</Text></TouchableOpacity>      
                </View>
            }
        </View>
        
    )
}
const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    logInContainer: {
        flex: 1,
        alignItems: 'center',
    },
    textInput: {
        borderColor: 'grey',
        borderRadius: 25,
        padding: 10,
        marginBottom: 20,
        width: 250,
        fontSize: fontScale(17),
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,   
    },
    text: {
        paddingTop: 15,
        color: '#FF66FF'
    }
})

