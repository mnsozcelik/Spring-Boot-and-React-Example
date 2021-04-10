import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { register } from "timeago.js";

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
        Logout: "Logout",
        Users: "Users",
        Next: "Next >",
        Previous: "< Previous",
        "Load Failure": "Load Failure",
        "User Not Found!": "User Not Found!",
        Edit: "Edit",
        "Change Display Name": "Change Display Name",
        Save: "Save",
        Cancel: "Cancel",
        "My Profile": "My Profile",
        "There are no hoaxes.": "There are no hoaxes.",
        "Load More..": "Load More..",
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
        Logout: "Çıkış",
        Users: "Kullanıcılar",
        Next: "İleri >",
        Previous: "< Geri",
        "Load Failure": "Yükleme Hatası",
        "User Not Found!": "Kullanıcı Bulunamadı!",
        Edit: "Düzenle",
        "Change Display Name": "Görüntülenen İsmi Düzenle",
        Save: "Kaydet",
        Cancel: "İptal",
        "My Profile": "Hesabım",
        "There are no hoaxes.": "Hoax bulunamadı.",
        "Load More..": "Daha Fazla..",
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

const timeagoTR = (number, index) => {
  return [
    ["az önce", "şimdi"],
    ["%s saniye önce", "%s saniye içinde"],
    ["1 dakika önce", "1 dakika içinde"],
    ["%s dakika önce", "%s dakika içinde"],
    ["1 saat önce", "1 saat içinde"],
    ["%s saat önce", "%s saat içinde"],
    ["1 gün önce", "1 gün içinde"],
    ["%s gün önce", "%s gün içinde"],
    ["1 hafta önce", "1 hafta içinde"],
    ["%s hafta önce", "%s hafta içinde"],
    ["1 ay önce", "1 ay içinde"],
    ["%s ay önce", "%s ay içinde"],
    ["1 yıl önce", "1 yıl içinde"],
    ["%s yıl önce", "%s yıl içinde"],
  ][index];
};
register("tr", timeagoTR);

export default i18n;
