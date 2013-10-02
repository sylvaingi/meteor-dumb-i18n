i18n = {
    _locales: {}
};

var navigatorLocale = localStorage.getItem("i18n.locale") || navigator.language.split("-")[0];

var currentLocale;
var currentLocaleDep = new Deps.Dependency();

i18n.addLocale = function (locale, dict) {
    if (!currentLocale) {
        currentLocale = locale;
    }

    if (locale === navigatorLocale) {
        currentLocale = locale;
    }

    i18n._locales[locale] = dict;
};

i18n.setLocale = function (locale) {
    if (!i18n._locales[locale]){
        throw new Error("undefined locale " + locale);
    }

    currentLocale = locale;

    localStorage.setItem("i18n.locale", locale);

    currentLocaleDep.changed();
};

i18n.locale = function () {
    if (!currentLocale) {
        throw new Error("No locale defined, please add one using i18n.addLocale(locale, dictionary)");
    }

    currentLocaleDep.depend()

    return currentLocale;
};

i18n.stringFor = function(key){
    return i18n._locales[i18n.locale()][key] || "!!"+key+"!!";
};

Handlebars.registerHelper("__", function(context, options){
    return i18n.stringFor(context);
});