import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: "pt", // Idioma padrão
        lng: "pt", // Idioma atual
        resources: {
            pt: {
                translation: {
                    signIn: "Entrar na sua conta",
                    email: "Email",
                    password: "Senha",
                    rememberMe: "Lembrar-me",
                    signInButton: "Entrar"
                }
            },
            en: {
                translation: {
                    signIn: "Sign in to your account",
                    email: "Email",
                    password: "Password",
                    rememberMe: "Remember me",
                    signInButton: "Sign in"
                }
            }
        }
    });

export default i18n;
