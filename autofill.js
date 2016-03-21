
var window = window || {};

window.eika = window.eika || {};

(function (eika, angular, localStorage) {

  var validationKeys = ["fornavn", "etternavn", "epost", "mobil", "fnr"];
  var KEY = "EIKA_AUTOPHILL";

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
      var personalia= validationKeys.map(function (key) {return user[key];});
      model.sporsmalList
        .forEach(function(e, i) {e.svar = personalia[i];})
    });
  }

  function autofill(click) {
    var element = angular.element(document.querySelectorAll('.eika [ui-view="main"]')),
        scope = element.scope(),
        model = scope.model,
        skjema = scope.model.skjema || scope.skjema;

    setPersonalia(model);
    setAhvSkjema(skjema);
    scope.$apply();

    if(click) {
      element.find("button.btn-primary" ).click()
    }
  }

  eika.getUser = getUser;
  eika.setUser = function (user) {
    saveUser(user);
    eika.autoPhill();
  };
  eika.autoPhill = autofill;
  return eika;

}(window.eika, window.angular, window.localStorage));
