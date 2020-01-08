var i2c = new I2C();
i2c.setup({sda:D27,scl:D28}); // use the I2C pins you're using here
var sensor = require("https://github.com/allmackey/Espruino_measure/blob/master/APDS9960.js").connectI2C(i2c);


/*// Check for new gestures
setInterval(function() {
  var g = sensor.getGesture();
  if (g) console.log(g);
}, 1000);*/
