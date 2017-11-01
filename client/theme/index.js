import { injectGlobal } from 'styled-components';
import fonts from 'theme/fonts';
import 'font-awesome/css/font-awesome.min.css';

injectGlobal`
  @font-face {
    font-family : FontAwesome;
    src         : url('${fonts.font_awesome}');
  }
  @font-face {
    font-family : "Open Sans";
    src         : url('${fonts.opensans_regular}');
    font-style  : normal;
    font-weight : 400;
  }
  @font-face {
    font-family : "Open Sans";
    src         : url('${fonts.opensans_semibold}');
    font-style  : normal;
    font-weight : 600;
  }
  @font-face {
    font-family : "Open Sans";
    src         : url('${fonts.opensans_extrabold}');
    font-style  : normal;
    font-weight : 800;
  }
  body {
    margin : 0;
  }
`;

export default {
  colors: {
    LIGHT_GREY: '#EEEEEE',
    MEDIUM_GREY: '#BDBDBD',
    GREY: '#757575',
    DARK_GREY: '#424242',
    RED: '#F44336',
    INDIGO: '#3F51B5',
    LIGHT_BLUE: '#03A9F4',
    GITHUB: '#282D31',
    GREEN: '#4CAF50',
  },
};
