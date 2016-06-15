var window = window|| {};
window.eika = window.eika || {};
(function (eika, angular, localStorage) {

  var apiTemplate = "/dagligbank-bli_kunde-domene-ws/rest/admin/resource/configs/XXX/value";

  function getApiUrl(json) {
    return apiTemplate.replace("XXX", json.property);

  }

  function post(json) {
    var newName = 'John Smith',
        xhr = new XMLHttpRequest();

    xhr.open('POST',encodeURI(getApiUrl(json)), true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onload = function() {
      if (xhr.status !== 204) {
        console.error('Request failed.  Returned status of ' + xhr.status, xhr);
      } else {
        console.log("Successfully update " +  json.property + " to new value: " + json.newValue);
      }
    };
    xhr.send(JSON.stringify(json));
  }



  function setDomeneWsValues(bool) {
    ["USE_SDC_KERNE_BACKEND", "USE_AHVRISK_BACKEND", "USE_DSF_BACKEND", "USE_KREDITTSCORING_BACKEND",
     "USE_CRM_WHITELIST_BACKEND", "USE_GEOGRAFI_DB", "USE_SAMTYKKE_BACKEND"]
      .map(function (prop) {
        post({"property": prop,"newValue": bool});
      });
  }


eika.setDomeneWsValuesFalse = function () {
  setDomeneWsValues(false);
}

  eika.setDomeneWsValuesTrue = function () {
    setDomeneWsValues(true);
  }

return eika;
}(window.eika, window.angular, window.localStorage));
