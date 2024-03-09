
import { userAlertStore } from "@/stores/alert";
import type { Product } from "./my-types";


/* eslint-disable */

export function showPassword(ele_id: string, ele2_id: string = 'toggleLoginPassword') {
    const togglePassword = document.querySelector('#' + ele2_id);
    const passWord = document.querySelector('#' + ele_id)!;
    const type = passWord.getAttribute('type') === 'password' ? 'text' : 'password';
    passWord.setAttribute('type', type);
    togglePassword?.classList.toggle('bi-eye');

}
export function getRandomItem(arr: Array<Product>) {
    // get random index value
    let randomIndex = Math.floor(Math.random() * arr.length)
    // get random item
    const item:Product = arr[randomIndex]

    return item
}

export function getRandomIndex(length:number) {
    // get random index value
    let randomIndex = Math.floor(Math.random() * length)
    return randomIndex
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

export const isUserNameValid = (username: string | null) => {
    /* 
      Usernames can only have: 
      - Lowercase Letters (a-z) 
      - Numbers (0-9)
      - Dots (.)
      - Underscores (_)
    */
    const res = /^[a-z0-9_\.]+$/.exec(username as string);
    const valid = !!res;
    return valid;
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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
export function isObjEmpty(obj: object) {
    for (let property in obj) {
        if (obj.hasOwnProperty(property)) {
            return false;
        }
    }
    return true;
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

export function is_valid_Email(email: string | null) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).trim().toLowerCase());
}

export function isValidTel(tel: string | null) {
    // check for allowed characters using a regular expression
    const re = /^[0-9()+\-\s]*$/
    return re.test(tel as string);
}

export function validateFullName(fullName: string | null) {
    let regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    return regName.test(fullName as string);

}
export function hasOnlyDigits(str: string | null,) {
    const regName = /^-?\d+$/;
    return regName.test(str as string);
}

export const is_Input_Error = (name: string | null, email: string | null, password: string | null, password_: string | null, tel: string | null) => {
    const alertStore = userAlertStore();
    if (!name) {
        alertStore.error("Empty username!");

    }
    // check for valid letters
    else if (name.length < 5 || !isUserNameValid(name)) {
        alertStore.error("Invalid Username!");
    }
    else if (!email) {
        alertStore.error("Empty email field!");
    }
    // check for valid email
    else if (!is_valid_Email(email)) {

        alertStore.error("Invalid email address!");
    }
    else if (!password) {
        alertStore.error("Empty Password Field!");
    }
    else if (password.length < 5) {
        alertStore.error("Invalid password, must be more 5 or more characters!");
    }
    else if (password !== password_) {
        alertStore.error("Password mismatch!");
    }
    else if (!tel) {
        alertStore.error("Empty Telephone field!");
    }
    // check for valid telephone
    else if (!isValidTel(tel)) {
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

/* Mark terms functions */
function mark_text() {
    let strSearch = (<HTMLInputElement>document.getElementById("search-icon")).value;
    let patt = /"(.*?)"/gi;
    let matches = new Array();
    let match = null;
    while ((match = patt.exec(strSearch)) !== null) {
        matches.push(match[1]);
    }
    let txt = strSearch.replace(patt, "");
    matches = matches.concat(txt.trim().split(" "));
    matches.forEach(function (term) {
        let regex_text = new RegExp("\\b(" + term + ")\\b", "i"); // RegExp
        let headings = document.querySelectorAll(".prod_right h3,h4");
        headings.forEach(function (txt) {
            let instance = new Mark(txt);
            instance.markRegExp(regex_text, { className: "orange", accuracy: "exactly" });

        })
    });
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
                let instance = new Mark(document.querySelectorAll(".prod_right"));
                instance.unmark();
                art.style.display = "";
            } else {
                art.style.display = "";
                mark_text();

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

export const countries = [
    { "text": "Afghanistan", "value": "AF" },
    { "text": "Åland Islands", "value": "AX" },
    { "text": "Albania", "value": "AL" },
    { "text": "Algeria", "value": "DZ" },
    { "text": "American Samoa", "value": "AS" },
    { "text": "Andorra", "value": "AD" },
    { "text": "Angola", "value": "AO" },
    { "text": "Anguilla", "value": "AI" },
    { "text": "Antarctica", "value": "AQ" },
    { "text": "Antigua and Barbuda", "value": "AG" },
    { "text": "Argentina", "value": "AR" },
    { "text": "Armenia", "value": "AM" },
    { "text": "Aruba", "value": "AW" },
    { "text": "Australia", "value": "AU" },
    { "text": "Austria", "value": "AT" },
    { "text": "Azerbaijan", "value": "AZ" },
    { "text": "Bahamas", "value": "BS" },
    { "text": "Bahrain", "value": "BH" },
    { "text": "Bangladesh", "value": "BD" },
    { "text": "Barbados", "value": "BB" },
    { "text": "Belarus", "value": "BY" },
    { "text": "Belgium", "value": "BE" },
    { "text": "Belize", "value": "BZ" },
    { "text": "Benin", "value": "BJ" },
    { "text": "Bermuda", "value": "BM" },
    { "text": "Bhutan", "value": "BT" },
    { "text": "Bolivia", "value": "BO" },
    { "text": "Bosnia and Herzegovina", "value": "BA" },
    { "text": "Botswana", "value": "BW" },
    { "text": "Bouvet Island", "value": "BV" },
    { "text": "Brazil", "value": "BR" },
    { "text": "British Indian Ocean Territory", "value": "IO" },
    { "text": "Brunei Darussalam", "value": "BN" },
    { "text": "Bulgaria", "value": "BG" },
    { "text": "Burkina Faso", "value": "BF" },
    { "text": "Burundi", "value": "BI" },
    { "text": "Cambodia", "value": "KH" },
    { "text": "Cameroon", "value": "CM" },
    { "text": "Canada", "value": "CA" },
    { "text": "Cape Verde", "value": "CV" },
    { "text": "Cayman Islands", "value": "KY" },
    { "text": "Central African Republic", "value": "CF" },
    { "text": "Chad", "value": "TD" },
    { "text": "Chile", "value": "CL" },
    { "text": "China", "value": "CN" },
    { "text": "Christmas Island", "value": "CX" },
    { "text": "Cocos (Keeling) Islands", "value": "CC" },
    { "text": "Colombia", "value": "CO" },
    { "text": "Comoros", "value": "KM" },
    { "text": "Congo", "value": "CG" },
    { "text": "Congo, The Democratic Republic of the", "value": "CD" },
    { "text": "Cook Islands", "value": "CK" },
    { "text": "Costa Rica", "value": "CR" },
    { "text": "Cote D'Ivoire", "value": "CI" },
    { "text": "Croatia", "value": "HR" },
    { "text": "Cuba", "value": "CU" },
    { "text": "Cyprus", "value": "CY" },
    { "text": "Czech Republic", "value": "CZ" },
    { "text": "Denmark", "value": "DK" },
    { "text": "Djibouti", "value": "DJ" },
    { "text": "Dominica", "value": "DM" },
    { "text": "Dominican Republic", "value": "DO" },
    { "text": "Ecuador", "value": "EC" },
    { "text": "Egypt", "value": "EG" },
    { "text": "El Salvador", "value": "SV" },
    { "text": "Equatorial Guinea", "value": "GQ" },
    { "text": "Eritrea", "value": "ER" },
    { "text": "Estonia", "value": "EE" },
    { "text": "Ethiopia", "value": "ET" },
    { "text": "Falkland Islands (Malvinas)", "value": "FK" },
    { "text": "Faroe Islands", "value": "FO" },
    { "text": "Fiji", "value": "FJ" },
    { "text": "Finland", "value": "FI" },
    { "text": "France", "value": "FR" },
    { "text": "French Guiana", "value": "GF" },
    { "text": "French Polynesia", "value": "PF" },
    { "text": "French Southern Territories", "value": "TF" },
    { "text": "Gabon", "value": "GA" },
    { "text": "Gambia", "value": "GM" },
    { "text": "Georgia", "value": "GE" },
    { "text": "Germany", "value": "DE" },
    { "text": "Ghana", "value": "GH" },
    { "text": "Gibraltar", "value": "GI" },
    { "text": "Greece", "value": "GR" },
    { "text": "Greenland", "value": "GL" },
    { "text": "Grenada", "value": "GD" },
    { "text": "Guadeloupe", "value": "GP" },
    { "text": "Guam", "value": "GU" },
    { "text": "Guatemala", "value": "GT" },
    { "text": "Guernsey", "value": "GG" },
    { "text": "Guinea", "value": "GN" },
    { "text": "Guinea-Bissau", "value": "GW" },
    { "text": "Guyana", "value": "GY" },
    { "text": "Haiti", "value": "HT" },
    { "text": "Heard Island and Mcdonald Islands", "value": "HM" },
    { "text": "Holy See (Vatican City State)", "value": "VA" },
    { "text": "Honduras", "value": "HN" },
    { "text": "Hong Kong", "value": "HK" },
    { "text": "Hungary", "value": "HU" },
    { "text": "Iceland", "value": "IS" },
    { "text": "India", "value": "IN" },
    { "text": "Indonesia", "value": "ID" },
    { "text": "Iran, Islamic Republic Of", "value": "IR" },
    { "text": "Iraq", "value": "IQ" },
    { "text": "Ireland", "value": "IE" },
    { "text": "Isle of Man", "value": "IM" },
    { "text": "Israel", "value": "IL" },
    { "text": "Italy", "value": "IT" },
    { "text": "Jamaica", "value": "JM" },
    { "text": "Japan", "value": "JP" },
    { "text": "Jersey", "value": "JE" },
    { "text": "Jordan", "value": "JO" },
    { "text": "Kazakhstan", "value": "KZ" },
    { "text": "Kenya", "value": "KE" },
    { "text": "Kiribati", "value": "KI" },
    { "text": "Korea, Democratic People'S Republic of", "value": "KP" },
    { "text": "Korea, Republic of", "value": "KR" },
    { "text": "Kuwait", "value": "KW" },
    { "text": "Kyrgyzstan", "value": "KG" },
    { "text": "Lao People'S Democratic Republic", "value": "LA" },
    { "text": "Latvia", "value": "LV" },
    { "text": "Lebanon", "value": "LB" },
    { "text": "Lesotho", "value": "LS" },
    { "text": "Liberia", "value": "LR" },
    { "text": "Libyan Arab Jamahiriya", "value": "LY" },
    { "text": "Liechtenstein", "value": "LI" },
    { "text": "Lithuania", "value": "LT" },
    { "text": "Luxembourg", "value": "LU" },
    { "text": "Macao", "value": "MO" },
    { "text": "Macedonia, The Former Yugoslav Republic of", "value": "MK" },
    { "text": "Madagascar", "value": "MG" },
    { "text": "Malawi", "value": "MW" },
    { "text": "Malaysia", "value": "MY" },
    { "text": "Maldives", "value": "MV" },
    { "text": "Mali", "value": "ML" },
    { "text": "Malta", "value": "MT" },
    { "text": "Marshall Islands", "value": "MH" },
    { "text": "Martinique", "value": "MQ" },
    { "text": "Mauritania", "value": "MR" },
    { "text": "Mauritius", "value": "MU" },
    { "text": "Mayotte", "value": "YT" },
    { "text": "Mexico", "value": "MX" },
    { "text": "Micronesia, Federated States of", "value": "FM" },
    { "text": "Moldova, Republic of", "value": "MD" },
    { "text": "Monaco", "value": "MC" },
    { "text": "Mongolia", "value": "MN" },
    { "text": "Montserrat", "value": "MS" },
    { "text": "Morocco", "value": "MA" },
    { "text": "Mozambique", "value": "MZ" },
    { "text": "Myanmar", "value": "MM" },
    { "text": "Namibia", "value": "NA" },
    { "text": "Nauru", "value": "NR" },
    { "text": "Nepal", "value": "NP" },
    { "text": "Netherlands", "value": "NL" },
    { "text": "Netherlands Antilles", "value": "AN" },
    { "text": "New Caledonia", "value": "NC" },
    { "text": "New Zealand", "value": "NZ" },
    { "text": "Nicaragua", "value": "NI" },
    { "text": "Niger", "value": "NE" },
    { "text": "Nigeria", "value": "NG" },
    { "text": "Niue", "value": "NU" },
    { "text": "Norfolk Island", "value": "NF" },
    { "text": "Northern Mariana Islands", "value": "MP" },
    { "text": "Norway", "value": "NO" },
    { "text": "Oman", "value": "OM" },
    { "text": "Pakistan", "value": "PK" },
    { "text": "Palau", "value": "PW" },
    { "text": "Palestinian Territory, Occupied", "value": "PS" },
    { "text": "Panama", "value": "PA" },
    { "text": "Papua New Guinea", "value": "PG" },
    { "text": "Paraguay", "value": "PY" },
    { "text": "Peru", "value": "PE" },
    { "text": "Philippines", "value": "PH" },
    { "text": "Pitcairn", "value": "PN" },
    { "text": "Poland", "value": "PL" },
    { "text": "Portugal", "value": "PT" },
    { "text": "Puerto Rico", "value": "PR" },
    { "text": "Qatar", "value": "QA" },
    { "text": "Reunion", "value": "RE" },
    { "text": "Romania", "value": "RO" },
    { "text": "Russian Federation", "value": "RU" },
    { "text": "RWANDA", "value": "RW" },
    { "text": "Saint Helena", "value": "SH" },
    { "text": "Saint Kitts and Nevis", "value": "KN" },
    { "text": "Saint Lucia", "value": "LC" },
    { "text": "Saint Pierre and Miquelon", "value": "PM" },
    { "text": "Saint Vincent and the Grenadines", "value": "VC" },
    { "text": "Samoa", "value": "WS" },
    { "text": "San Marino", "value": "SM" },
    { "text": "Sao Tome and Principe", "value": "ST" },
    { "text": "Saudi Arabia", "value": "SA" },
    { "text": "Senegal", "value": "SN" },
    { "text": "Serbia and Montenegro", "value": "CS" },
    { "text": "Seychelles", "value": "SC" },
    { "text": "Sierra Leone", "value": "SL" },
    { "text": "Singapore", "value": "SG" },
    { "text": "Slovakia", "value": "SK" },
    { "text": "Slovenia", "value": "SI" },
    { "text": "Solomon Islands", "value": "SB" },
    { "text": "Somalia", "value": "SO" },
    { "text": "South Africa", "value": "ZA" },
    { "text": "South Georgia and the South Sandwich Islands", "value": "GS" },
    { "text": "Spain", "value": "ES" },
    { "text": "Sri Lanka", "value": "LK" },
    { "text": "Sudan", "value": "SD" },
    { "text": "Suriname", "value": "SR" },
    { "text": "Svalbard and Jan Mayen", "value": "SJ" },
    { "text": "Swaziland", "value": "SZ" },
    { "text": "Sweden", "value": "SE" },
    { "text": "Switzerland", "value": "CH" },
    { "text": "Syrian Arab Republic", "value": "SY" },
    { "text": "Taiwan, Province of China", "value": "TW" },
    { "text": "Tajikistan", "value": "TJ" },
    { "text": "Tanzania, United Republic of", "value": "TZ" },
    { "text": "Thailand", "value": "TH" },
    { "text": "Timor-Leste", "value": "TL" },
    { "text": "Togo", "value": "TG" },
    { "text": "Tokelau", "value": "TK" },
    { "text": "Tonga", "value": "TO" },
    { "text": "Trinidad and Tobago", "value": "TT" },
    { "text": "Tunisia", "value": "TN" },
    { "text": "Turkey", "value": "TR" },
    { "text": "Turkmenistan", "value": "TM" },
    { "text": "Turks and Caicos Islands", "value": "TC" },
    { "text": "Tuvalu", "value": "TV" },
    { "text": "Uganda", "value": "UG" },
    { "text": "Ukraine", "value": "UA" },
    { "text": "United Arab Emirates", "value": "AE" },
    { "text": "United Kingdom", "value": "GB" },
    { "text": "United States", "value": "US" },
    { "text": "United States Minor Outlying Islands", "value": "UM" },
    { "text": "Uruguay", "value": "UY" },
    { "text": "Uzbekistan", "value": "UZ" },
    { "text": "Vanuatu", "value": "VU" },
    { "text": "Venezuela", "value": "VE" },
    { "text": "Viet Nam", "value": "VN" },
    { "text": "Virgin Islands, British", "value": "VG" },
    { "text": "Virgin Islands, U.S.", "value": "VI" },
    { "text": "Wallis and Futuna", "value": "WF" },
    { "text": "Western Sahara", "value": "EH" },
    { "text": "Yemen", "value": "YE" },
    { "text": "Zambia", "value": "ZM" },
    { "text": "Zimbabwe", "value": "ZW" }
];