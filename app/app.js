import {TabNavigator,StackNavigator} from 'react-navigation';
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
import PostScreen from '@scene/postPage';
import WebScreen from '@scene/webScreen';

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
        lazy: true,
        activeBackgroundColor: ACTIVE_BACKGROUND_COLOR,
        inactiveBackgroundColor: INACTIVE_BACKGROUND_COLOR,
        inactiveTintColor: INACTIVE_TINT_COLOR,
        activeTintColor: ACTIVE_TINT_COLOR,
        labelStyle: {
            fontSize: 12,
            fontFamily: 'SFBold'
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

const Stack = StackNavigator({
    Home: {
        screen: App,
    },
    Post: {
        path: 'post/:id',
        screen: PostScreen
    },
    WebView: {
        path: 'view/:url',
        screen: WebScreen
    },
}, {
    navigationOptions: {
        header: null
    }
});

export default Stack;