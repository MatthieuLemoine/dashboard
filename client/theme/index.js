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
