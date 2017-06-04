import {TabNavigator} from 'react-navigation';
import {
    ACTIVE_BACKGROUND_COLOR,
    INACTIVE_BACKGROUND_COLOR,
    ACTIVE_TINT_COLOR,
    INACTIVE_TINT_COLOR
} from '@theme/light';
import TechScreen from '@scene/tech';
import GamesScreen from '@scene/games';
import BooksScreen from '@scene/books';
import AboutScreen from '@scene/about';

const App = TabNavigator({
    Tech: {
        screen: TechScreen,
    },
    Games: {
        screen: GamesScreen,
    },
    Books: {
        screen: BooksScreen,
    },
    About: {
        screen: AboutScreen,
    }
}, {
    tabBarOptions: {
        scrollEnabled: true,
        activeBackgroundColor: ACTIVE_BACKGROUND_COLOR,
        inactiveBackgroundColor: INACTIVE_BACKGROUND_COLOR,
        inactiveTintColor: INACTIVE_TINT_COLOR,
        activeTintColor: ACTIVE_TINT_COLOR,
        labelStyle: {
            fontSize: 12,
            fontFamily: 'Raleway-Medium'
        },
        tabStyle: {
            width: 120,
            height: 40
        },
        style: {
            backgroundColor: ACTIVE_BACKGROUND_COLOR
        },
        indicatorStyle: {
            backgroundColor: ACTIVE_TINT_COLOR
        }
    },
});

export default App;