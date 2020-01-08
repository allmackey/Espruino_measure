var REG = { 
  WHO_AM_I: 0x0F,
  OUTX_L: 0x06,
  OUTX_H: 0x07,
  OUTY_L: 0x08,
  OUTY_H: 0x09,
  OUTZ_L: 0x0A,
  OUTZ_H: 0x0B,
  CNTL1: 0x18,
  CNTL3: 0x1A,
  ODCNTL: 0x1B,
  SLAVE: 0x1E,
  WAI_VAL: 0x14,
  LP_CNTL: 0x35,
};

//tt
function APDS9960(options,r,w) {
  this.r = r;
  this.w = w;
  if (this.r(REG.WHO_AM_I,1)[0]!=20) throw new Error("WHO_AM_I incorrect");
  //this.w(REG.CNTL1, 0x50); //config 0 1 0 1 0 0 0 0 OLD
  //this.w(REG.CNTL1, 0x10); //config 0 0 0 1 0 0 0 0 NEW
  //this.w(REG.CNTL1, 0xD0); //OLD
  //this.w(REG.LP_CNTL, 0x0B); //NEW
  //this.w(REG.CNTL1, 0x90); //NEW config 10010000
  // low pass filter, ODR/4
  //this.w(REG.CFG_B, 0x01);
  // data ready irq, block data read
  //this.w(REG.CFG_C, 0x11);
}

//tt
APDS9960.prototype.init = function() {
  print("setting changes made (new0)");
  var res = new DataView(this.r(REG.CNTL1,1).buffer);
  this.w(REG.CNTL1, 0x00); //config 0 0 0 0 0 0 0 0
  res = new DataView(this.r(REG.CNTL1,1).buffer);
  print(res.getUint8(0,1));
  res = new DataView(this.r(REG.LP_CNTL,1).buffer);
  this.w(REG.LP_CNTL, 0x04); //NEW
  res = new DataView(this.r(REG.LP_CNTL,1).buffer);
  print(res.getUint8(0,1));
  res = new DataView(this.r(REG.CNTL1,1).buffer);
  this.w(REG.CNTL1, 0x80); //NEW config 10010000
  res = new DataView(this.r(REG.CNTL1,1).buffer);
  print(res.getUint8(0,1));
  //print("V4");
};

// Write to I2C
APDS9960.prototype.w = function (r, d) { ... }

// Read from I2C
APDS9960.prototype.r = function (r) { ... }

// Check if there has been a gesture recorded or not
APDS9960.prototype.hasGesture = function () { ... }

// Return the current gesture (left/right/up/down) or 'undefined' is none
APDS9960.prototype.getGesture = function () { ... }

// Given an array of UDLRUDLRUDLR... bytes, return a gesture as a string
APDS9960.prototype.decodeGesture = function (data) { ... }

// return a reading from the proximity sensor, 0..255
APDS9960.prototype.getProximity = function () { ... }

// red/green/blue/ambient returned as {r,g,b,a} in the range 0..65535
APDS9960.prototype.getRGBA = function () { ... }

function (i2c) { ... }

exports.connect = function (i2c) { ... }
