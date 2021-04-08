import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        "Sign Up": "Sign Up",
        Login: "Login",
        Username: "Username",
        "Display Name": "Display Name",
        Password: "Password",
        "Password Repeat": "Password Repeat",
        "Password mismatch": "Password mismatch",
        "Logout": "Logout", 
        "Users": "Users",
        "Next": "Next >",
        "Previous": "< Previous",
        "Load Failure": "Load Failure",
        "User Not Found!": "User Not Found!",
        "Edit": "Edit",
        "Change Display Name": "Change Display Name",
        "Save": "Save",
        "Cancel": "Cancel",
        "My Profile": "My Profile"
      },
    },
    tr: {
      translations: {
        "Sign Up": "Kayıt Ol",
        Login: "Giriş Yap",
        Username: "Kullanıcı Adı",
        "Display Name": "Görüntülenen Ad",
        Password: "Şifre",
        "Password Repeat": "Şifre Tekrarı",
        "Password mismatch": "Aynı şifreyi giriniz",
        "Logout": "Çıkış",
        "Users": "Kullanıcılar",
        "Next": "İleri >",
        "Previous": "< Geri",
        "Load Failure": "Yükleme Hatası",
        "User Not Found!": "Kullanıcı Bulunamadı!",
        "Edit": "Düzenle",
        "Change Display Name": "Görüntülenen İsmi Düzenle",
        "Save": "Kaydet",
        "Cancel": "İptal",
        "My Profile": "Hesabım"
      },
    },
  },
  fallbackLng: "en",
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
  react: {
    wait: true,
  },
});

export default i18n;
