
import { userAlertStore } from "@/stores/alert";

/* eslint-disable */

export function showPassword(ele_id: string, ele2_id: string = 'toggleLoginPassword') {
    const togglePassword = document.querySelector('#' + ele2_id);
    const passWord = document.querySelector('#' + ele_id)!;
    const type = passWord.getAttribute('type') === 'password' ? 'text' : 'password';
    passWord.setAttribute('type', type);
    togglePassword?.classList.toggle('bi-eye');

}

export const decodeJwtResponse = (token: string) => {
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    let jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
    console.log(JSON.parse(jsonPayload));
    return JSON.parse(jsonPayload);
}

export const isUserNameValid = (username: string) => {
    /* 
      Usernames can only have: 
      - Lowercase Letters (a-z) 
      - Numbers (0-9)
      - Dots (.)
      - Underscores (_)
    */
    const res = /^[a-z0-9_\.]+$/.exec(username);
    const valid = !!res;
    return valid;
}
export const greet = () => {
    let curHr = new Date().getHours();
    const conds = [
        { cond: curHr < 12, icon: "coffee", time: "Morning" },
        { cond: curHr < 18, icon: "sun-o", time: "Afternoon" },
        { cond: true, icon: "moon-o", time: "Evening" }
    ]
    let { time, icon }: any = conds.find(x => x.cond);

    return `Good ${time} <i class="fa fa-${icon}"></i>`

}
export function clone(obj: any): object {
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        let copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        let copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        let copy: any = {};
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}



export const show_add_entry = (id: string) => {
    let element = (<HTMLInputElement>document.getElementById(id));
    element.style.display = "";

}

export const hide_add_entry = (id: string) => {
    let element = (<HTMLInputElement>document.getElementById(id));
    element.style.display = "none";
}

export function is_valid_Email(email: string) {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function isValidTel(tel: string) {
    // check for allowed characters using a regular expression
    const re = /^[0-9()+\-\s]*$/
    return re.test(tel);
}

export const is_Input_Error = (name: string, email: string, password: string, password_: string, tel: string) => {
    const alertStore = userAlertStore();
    if (name.length == 0) {
        alertStore.error("Empty username!");

    }
    // check for valid letters
    else if (name.length < 5 || !isUserNameValid(name)) {
        alertStore.error(" Invalid Username!");
    }
    else if (email.length == 0) {
        alertStore.error("Empty email field!");

    }
    // check for valid email
    else if (email.length > 0 && !is_valid_Email(email)) {

        alertStore.error("Invalid email address!");
    }
    else if (password.length == 0) {
        alertStore.error("Empty Password Field!");
    }
    else if (password.length < 5 || password !== password_) {
        alertStore.error("Invalid Credentials or Password mismatch!");
    }
    else if (tel.length == 0) {
        alertStore.error("Empty Telephone field!");
    }
    // check for valid telephone
    else if (tel.length > 0 && !isValidTel(tel)) {
        alertStore.error("Invalid letters for telephone!");
    }
    // no error
    else {

        return false;
    }

    return true;
}

/* Search functions */
function checkString(str: string, ele_txt: string) {
    str = str.toLowerCase();
    return (ele_txt.toLowerCase().indexOf(str) > -1);
}


export const filterEntries = () => {
    let strSearch = (<HTMLInputElement>document.getElementById("search-icon")).value;
    document.querySelectorAll("article.framed").forEach(
        function (article_ele) {
            let art = (<HTMLInputElement>document.getElementById(article_ele.id));
            let h = article_ele.querySelectorAll("h3,h4");
            if (strSearch.length > 0 && !checkString(strSearch, h[0].innerHTML) && !checkString(strSearch, h[1].innerHTML)) {
                art.style.display = "none";
            } else if (strSearch == "") {
                art.style.display = "";
            } else {
                art.style.display = "";

            }
        })

}
/* End Search functions */

export function getGitHubUrl(from: string) {
    const rootURl = 'https://github.com/login/oauth/authorize';

    const options: any = {
        client_id: process.env.VUE_GITHUB_OAUTH_CLIENT_ID,
        redirect_uri: process.env.VUE_GITHUB_OAUTH_REDIRECT_URL,
        scope: 'user:email',
        state: from,
    };

    const qs = new URLSearchParams(options);

    return `${rootURl}?${qs.toString()}`;
}
