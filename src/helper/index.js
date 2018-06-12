import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation'

export function resetScreen(navigation, screen){
    navigation.dispatch(NavigationActions.reset({
        index: 0,
        key: null,
        actions: [
            NavigationActions.navigate({ routeName: screen })
        ]
    }))
}

export function dotNumber(number) {
    if (number === 0) {
        return 0;
    }
    if (number) {
        return number.toString().replace(/\./g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}

export function maxArray(arr) {
    var max = -10000000;
    arr.forEach(function (item) {
        var data = parseInt(item);
        if (data > max) max = data;
    });
    return max;
}



export function formatPhone(phone) {
    if (phone.length === 10) {
        return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3');
    } else {
        return phone.replace(/(\d{4})(\d{3})(\d{4})/, '$1.$2.$3');
    }
}

export function typeConnect(type) {
    if (type.toLowerCase() === 'wifi') {
        return 'WIFI';
    }
    if (type.toLowerCase() === 'cellular') {
        return 'Điện thoại';
    }
    return '';

}




export function formatImageLink(url) {
    if (url == null) {
        return "http://"
    }
    else if (url.indexOf("http://") === -1 && url.split("://")[0] !== "https") {
        return "http://" + url
    }
    else {
        return url
    }
}
export function editName(name) {
    if (name != null || name) {
        let a = name.split(" ");
        if (a.length > 1) return (a[a.length - 2] + " " + a[a.length - 1]);
        else return (a[a.length - 1]);
    }
    else return "chưa có";
}

export async function uploadImage(file, completeHandler, progressHandler, error) {
    let url = ''
    await AsyncStorage.getItem('@UserToken').then((value) => {
        url = "http://colorme.vn" + "/manageapi/v3/file/upload?token=" + value;
    })
    console.log(url)
    
    let formData = new FormData();
    formData.append("file", file);
    console.log(file)
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", completeHandler, false);
    ajax.upload.onprogress = progressHandler;
    ajax.addEventListener("error", error, false);
    ajax.open("POST", url);
    console.log(url)
    ajax.send(formData);
}
export function isEmpty(obj) {
    let hasOwnProperty = Object.prototype.hasOwnProperty;
    if (obj == null) return true;
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;
    if (typeof obj !== "object") return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}