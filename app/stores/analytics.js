/**
 * Created by arjun on 10/06/17.
 */

var Fabric = require('react-native-fabric');
var {Answers} = Fabric;

/**
 * Send data to analytics systems
 */
class Analytics {

    logEvent(name, attrObj) {
        console.log("logEvent", name, attrObj);
        Answers.logCustom(name, attrObj);
    }

}

export default analytics = new Analytics