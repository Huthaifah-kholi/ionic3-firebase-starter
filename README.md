
<h1 align="center">
  <br>
  <a href="https://ionicframework.com" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Ionic_Logo.svg/2000px-Ionic_Logo.svg.png" alt="Ionic" width="200"></a> +
  <a href="https://firebase.google.com/" target="_blank"><img src="https://firebase.google.com/_static/images/firebase/touchicon-180.png" alt="Firebase" width="80"></a>

  <br>
  Ionic 3 + Firebase Starter
  <br>
</h1>

<h4 align="center">A minimal <a href="https://ionicframework.com" target="_blank">Ionic</a> app built on <a href="https://firebase.google.com/" target="_blank">Firebase</a> with the <a href="https://github.com/angular/angularfire2" target="_blank">angularfire2</a> wrapper.</h4>

<p align="center">
 <a href="https://app.buddy.works/blacksector/ionic3-firebase-starter/pipelines/pipeline/70216" target="_blank"><img src="https://app.buddy.works/blacksector/ionic3-firebase-starter/pipelines/pipeline/70216/badge.svg?token=af4d8667e92b34c324ca8837f78daa2d41315fa7f25dd2ce75f5729f167d36ac"></a>
  <a href="https://paypal.me/omarq" target="_blank">
    <img src="https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&amp;style=flat">
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#license">License</a>
</p>
<p align="center">
<img src="https://raw.githubusercontent.com/blacksector/ionic3-firebase-starter/master/screenshots/login.png" alt="Markdownify" width="200">
<img src="https://raw.githubusercontent.com/blacksector/ionic3-firebase-starter/master/screenshots/home.png" alt="Markdownify" width="200">
<img src="https://raw.githubusercontent.com/blacksector/ionic3-firebase-starter/master/screenshots/sideMenu.png" alt="Markdownify" width="200">
</p>

## Key Features

* Authentication
  - This template has authentication (sign up, login, forget password, etc.) built in
* Organized Code
  - Code has a auth provider to handle authentication, this way the logic is reusable.
* And more...

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. You will also need Cordova and Ionic, follow the <a href="https://ionicframework.com/getting-started">Ionic getting started</a> guide for more.

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/blacksector/ionic3-firebase-starter

# Go into the repository
$ cd ionic3-firebase-starter

# Install dependencies
$ npm install

# Run the app
$ ionic serve --lab
```

Note: If you're using Linux Bash for Windows, [see this guide](https://www.howtogeek.com/261575/how-to-run-graphical-linux-desktop-applications-from-windows-10s-bash-shell/) or use `node` from the command prompt.

After you have downloaded and run `ionic serve` you may notice a Invalid API key error. You must sign up for a Firebase Account and <a href="https://console.firebase.google.com/u/0/">create a project</a> and add your API keys for the Web SDK into the `src/app/app.module.ts` file.

Replace:
```javascript
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};
```
with your keys:
```javascript
export const firebaseConfig = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  storageBucket: "<BUCKET>.appspot.com",
  messagingSenderId: "<SENDER_ID>"
};
```

Re-run `ionic serve` and your app should be working now. Don't forget to enable the authentication methods (providers) you want to support from your firebase project panel: https\://console.firebase.google.com/u/0/project/<PROJECT_ID>/authentication/providers



## Credits

This template uses a lot of open source packages and implements third-party API(s)

- [Node.js](https://nodejs.org/)
- [Cordova](https://cordova.apache.org)
- [Ionic](https://ionicframework.com)
- [Firebase](https://firebase.google.com/)
- [AngularFire2](https://github.com/angular/angularfire2)

README inspired by: [Electron Markdownify](https://github.com/amitmerchant1990/electron-markdownify)

## License

MIT

---

> [quazi.co](https://quazi.co) &nbsp;&middot;&nbsp;
> GitHub [blacksector](https://github.com/blacksector) &nbsp;&middot;&nbsp;
> Instagram [@quaziomar](https://instagram.com/quaziomar)
