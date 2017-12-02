import { observable } from "mobx";
import {
    AsyncStorage
} from "react-native";

/**
 * Store for theme data
 */
class Store {

    @observable current_theme = 'light';
    @observable colors = {
        ACTIVE_BACKGROUND_COLOR: '#ffffff',
        INACTIVE_BACKGROUND_COLOR: '#ffffff',
        ACTIVE_TINT_COLOR: '#212121',
        INACTIVE_TINT_COLOR: '#e3e3e3',
        GREY_LIGHT: '#f5f5f5',
        GREY_MED_LIGHT: '#bdbdbd',
        GREY: '#9e9e9e',
        PH_ORANGE: '#3F51B5',
        MAIN_TEXT: '#212121',
        MAIN_TEXT_LIGHT: '#9e9e9e',
        MAIN_BG: '#ffffff',
        BUTTON_TEXT: '#3F51B5',
        SECONDARY_BG: '#f5f5f5'
    };

    constructor() {
        var self = this;
        AsyncStorage
            .getItem('theme', (err, theme) => {
                console.log("theme", theme);
                if (!theme) {
                    this.toggleDark(false);
                } else {
                    switch (theme) {
                        case 'dark':
                            this.toggleDark(true);
                            break;
                        case 'light':
                            this.toggleDark(false);
                            break;
                    }
                }
            });
    }

    toggleDark(value) {
        var self = this;
        if (value) {
            this.current_theme = 'dark';
            self.colors = {
                ACTIVE_BACKGROUND_COLOR: '#333333',
                INACTIVE_BACKGROUND_COLOR: '#4d4d4d',
                ACTIVE_TINT_COLOR: '#212121',
                INACTIVE_TINT_COLOR: '#424242',
                GREY_LIGHT: '#f5f5f5',
                GREY_MED_LIGHT: '#bdbdbd',
                GREY: '#9e9e9e',
                PH_ORANGE: '#3F51B5',
                MAIN_TEXT: '#ffffff',
                MAIN_TEXT_LIGHT: '#f2f2f2',
                MAIN_BG: '#1a1a1a',
                BUTTON_TEXT: '#B71C1C',
                SECONDARY_BG: '#4e4e4e'
            };
            AsyncStorage
                .setItem('theme', 'dark');
        } else {
            this.current_theme = 'light';
            self.colors = {
                ACTIVE_BACKGROUND_COLOR: '#ffffff',
                INACTIVE_BACKGROUND_COLOR: '#ffffff',
                ACTIVE_TINT_COLOR: '#212121',
                INACTIVE_TINT_COLOR: '#e3e3e3',
                GREY_LIGHT: '#f5f5f5',
                GREY_MED_LIGHT: '#bdbdbd',
                GREY: '#9e9e9e',
                PH_ORANGE: '#3F51B5',
                MAIN_TEXT: '#212121',
                MAIN_TEXT_LIGHT: '#9e9e9e',
                MAIN_BG: '#ffffff',
                BUTTON_TEXT: '#3F51B5',
                SECONDARY_BG: '#f5f5f5'
            };
            AsyncStorage
                .setItem('theme', 'light');
        }
    }

}

export default new Store
