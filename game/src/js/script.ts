import '../css/fonts.css';
import '../css/style.css';

import './cards';
import './level_pick';
import './game';
import './game_end';
import * as _ from 'lodash';

export {};
declare global {
    interface window {
        application: any;
    }
}
