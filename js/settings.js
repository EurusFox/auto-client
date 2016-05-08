// localStorage["autoclient-settings"] = JSON.stringify({debug: true});
Object.defineProperty(Object.prototype, "addkeys", {
   value: function(other, replace, create) {
      if(typeof create=="undefined")
        create = true;
      if(typeof replace=="undefined")
        replace = true;
      for(var i in other) {
        var defined = this[i]!="undefined";
        if((defined && replace) || (!defined && create))
          this[i] = other[i];
      }
    },
    enumerable: false
});
var SETTINGS = {debug: false};

// localStorage["autoclient-settings"] = JSON.stringify({debug: true});
if(localStorage["autoclient-settings"]) {
  try {
    var saved_settings = JSON.parse(localStorage["autoclient-settings"]);
    SETTINGS.addkeys(saved_settings, true, true);
  }
  catch(e) {
    console.warn("Error parsing localStorage settings: ",e);
  }
}
/**
 * Settings from URL can only overwrite, not add. That prevents XSS hopefully.
**/ 
if(location.hash.length>1) {
  try {
    var user_settings = JSON.parse(decodeURIComponent(location.hash.substr(1)));
    console.log("User settings: ", user_settings);
    SETTINGS.addkeys(user_settings, true, false);
  }
  catch(e) {
    console.warn("Error parsing url settings: ",e);
  }
}