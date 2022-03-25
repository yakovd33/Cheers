export const ValidateEmail = (mail) =>{
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return true;
    }
    alert("הכנסת מייל לא קביל")
    return false; 
}

export const isEmpty = (data) => {
    if (data !== '') {
        return true;
    }
    alert("אחד (או יותר) מהשדות ריקים")
    return false; 
}



