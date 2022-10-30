import $ from 'jquery';
import { $window } from './consts';
import { documentOnReadyInit } from './documentOnReady';
import { documentOnLoadInit } from './documentOnLoad';
import { documentOnResizeInit } from './documentOnResize';

export default () => {
  $(document).ready(documentOnReadyInit);
  $window.on('load', documentOnLoadInit);
  $window.on('resize', documentOnResizeInit);
};
