/* eslint-disable no-undef */
window.onload = function () {
  document.getElementById('fuck-google').addEventListener('click', function () {
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
      console.log('auoth token ',token);
    });
  });
};
/* eslint-enable no-undef */
