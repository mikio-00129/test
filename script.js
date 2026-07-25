// CDN経由でFirebaseの機能を読み込む
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 1. Firebaseの設定情報（ご自身のFirebase Consoleで取得したキーに差し替えてください）
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDo-Cvu4ZdCajrPW8DvNIg6lt0DqOfI5jM",
  authDomain: "first-project-4d524.firebaseapp.com",
  projectId: "first-project-4d524",
  storageBucket: "first-project-4d524.firebasestorage.app",
  messagingSenderId: "1087921962274",
  appId: "1:1087921962274:web:48bfb3247822118bb1797b",
  measurementId: "G-SYXT7G3T8Y"
};

// 2. Firebaseの初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// DOM要素（ボタンや表示エリア）の取得
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const authSection = document.getElementById("auth-section");
const userInfo = document.getElementById("user-info");
const userName = document.getElementById("user-name");

// 3. ログインボタンを押したとき
loginBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("ログイン成功!", result.user);
    })
    .catch((error) => {
      console.error("ログインエラー:", error);
      alert("ログインに失敗しました: " + error.message);
    });
});

// 4. ログアウトボタンを押したとき
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    console.log("ログアウトしました");
  });
});

// 5. ログイン状態の自動チェック（ページを開いた時やログイン状態が変わった時に動く）
onAuthStateChanged(auth, (user) => {
  if (user) {
    // ログイン状態：名前を表示してログアウトボタンを出す
    userName.textContent = user.displayName;
    authSection.style.display = "none";
    userInfo.style.display = "block";
  } else {
    // ログアウト状態：ログインボタンを出す
    authSection.style.display = "block";
    userInfo.style.display = "none";
  }
});