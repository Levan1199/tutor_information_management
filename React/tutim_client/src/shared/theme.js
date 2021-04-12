import {createMuiTheme} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
    palette:{
        primary: {
            main:'#67989d',
            dark:'#46696d',
            light:'#98b9bd'
        },
        secondary:{
            main:'#7db0c5',
            light:'#aed7e9',
            dark:'#6fa8bf'
        },
        warning:{
            main:'#f59346',
            light:'#f8b784',
            dark:'#f27716'
        },
       
    }
});

export default theme;