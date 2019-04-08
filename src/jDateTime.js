/*
    ELI DateTime Plugins
    created by Gojecks Joseph
    can be injected to Project as a required Module

    @Function Type :  Object Prototype
    @Return Type : Object
    
    Updated October 04,2015 7:10:24 pm

    added a new function format(date)(format)

*/

'use strict';


var module = jeli('jeli.date.time', {})
    .value('dateTimeMonthHalf', new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'))
    .value('dateTimeMonthFull', new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'))
    .value('dateTimeDayHalf', new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'))
    .value('dateTimeDayFull', new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'))
    .service('dateTime', ['dateTimeFactory', dateTimeFilterFN])
    .service('timeAgo', ['dateTimeFactory', timeAgoFilterFn])
    .element({
        selector: 'calendar',
        DI: ['dateTimeFactory'],
        props: [{
            name: 'config',
            value: 'config'
        }]
    }, calendarFN);

function dateTimeFilterFN(dateTimeFactory) {
    this.compile = function(text, replacer) {
        return dateTimeFactory.format(dateTimeFactory.$dateTime(text))(replacer);
    };
}

//timeAgoFilterFn
//@result converts date to timeago
function timeAgoFilterFn(dateTimeFactory) {
    this.compile = function(text) {
        return dateTimeFactory.$timeConverter(text).timeago;
    };
}

function calendarFN($dateTimeFactory) {
    var defaultConfig = {
        fullYear: !1,
        year: new Date().getFullYear()
    };
    this.config = '';
    this.didInit = function() {
        var config = jeli.$extend(defaultConfig, this.config);
        this.calendar = $dateTimeFactory.buildFullCalendar(config);
    };
}