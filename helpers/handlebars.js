import Handlebars from 'handlebars'
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access';
import moment from 'moment'

import helpers from 'handlebars-helpers'
const helpers1=helpers({
    handlebars: Handlebars
});

var customHelper = {
    dateFormatter(date) {
        return moment(date).format('YYYY-MM-DD')
    },
    section: function(name, options){
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
    }
}

export default {
    defaultLayout: 'default',
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        ...helpers1,
        ...customHelper
    }
}