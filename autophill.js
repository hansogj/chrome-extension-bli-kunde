
var window = window || {};

window.eika = window.eika || {};

(function (eika, angular, localStorage) {

  var validationKeys = ["fornavn", "etternavn", "epost", "mobil", "fnr"];
  var KEY = "EIKA_AUTOPHILL";
  var apiTemplate = "/dagligbank-bli_kunde-domene-ws/rest/admin/resource/configs/XXX/value";

function getApiUrl(json) {
  //http://localhost:8081/dagligbank-bli_kunde-domene-ws/rest/admin/resource/configs/USE_SDC_KERNE_BACKEND/value
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
    }
  };
  xhr.send(JSON.stringify(json));
}



function setDomeneWsFalseValues() {
  ["USE_SDC_KERNE_BACKEND", "USE_AHVRISK_BACKEND", "USE_DSF_BACKEND", "USE_KREDITTSCORING_BACKEND",
   "USE_CRM_WHITELIST_BACKEND", "USE_GEOGRAFI_DB", "USE_SAMTYKKE_BACKEND"]
  .map(function (prop) {
    post({"property": prop,"newValue":"false"});
  });
}

  function getUser(cb) {
    var storedObject = JSON.parse(localStorage.getItem(KEY)) || {};
    if (angular.isFunction(cb)) {
      cb(storedObject);
    } else {
      return storedObject
    }
  }

  function validateInput(newUser) {
    var errors =  Object.keys(newUser).filter(function (key) {return validationKeys.indexOf(key) === -1;});
    if (errors.length) {
      var exception =  new RangeError("Bruker passer ikke med domene model");
      exception.data = errors;
      console.error(exception, exception.data);
      console.log("Felter som må være med", validateInput);
      throw exception;
    }
    else {
      return newUser;
    };
  }

  function saveUser(newUser) {
    try {
      getUser(function (user) {
        localStorage.setItem(KEY, JSON.stringify(angular.extend(user, validateInput(newUser))));
      });

    } catch (e) {
      throw e;
    }
  }

  function setAhvSkjema(skjema) {
    if (skjema && skjema.sider) {
      skjema.sider.forEach(function(side) {
        side.seksjon.forEach(function(seksjon) {
          seksjon.sporsmalListe.sporsmal.forEach(function(spm) {
            if (spm.sporsmalsType === "radio") {
              spm.valgt = spm.muligeSvar[1].svarId
            }
            if (spm.sporsmalsType === "checkbox") {
              spm.muligeSvar[1].valgt = true;
            }
          });
        });
      });
    }
  }

  function setProduktPakker(model) {
    if(model.produktpakker) {
      model.produktpakker.valgt="Web Superkule pakka_4731"
    }
  }

  function setPersonalia (model ) {
    getUser(function (user) {
      var personalia= validationKeys
            .map(function (key) {return user[key];});

      if(model && model.sporsmalList) {
        model.sporsmalList
          .forEach(function(e, i) {
            var value = personalia[i];

            if(i === 3){
              value = value * 1
            };
            e.svar = value
          });
      }
    });
  }

  function autofill(click) {
    var element = angular.element(document.querySelectorAll('.eika [ui-view="main"]')),
        scope = element.scope(),
        model = scope.model,
        skjema = scope.skjema || scope.model.skjema;

    scope.$apply(setPersonalia.bind(this, model));
    scope.$apply(setAhvSkjema.bind(this, skjema));

    if(click) {
      element.find("button.btn-primary" ).click()
    }
  }

  eika.setDomeneWsFalseValues = setDomeneWsFalseValues;
  eika.getUser = getUser;
  eika.setUser = function (user) {
    saveUser(user);
    eika.autoPhill();
  };
  eika.autoPhill = autofill;
  return eika;

}(window.eika, window.angular, window.localStorage));
