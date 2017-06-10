/**
 * Created by arjun on 10/06/17.
 */

var Fabric = require('react-native-fabric');
var {Answers} = Fabric;

class Analytics {

    logEvent(name, attrObj) {
        Answers.logCustom(name);
    }

}

export default analytics = new Analytics