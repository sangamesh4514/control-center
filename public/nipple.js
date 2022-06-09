
function createJoystick() {
  console.log("createJoystick", "called");
  var options = {
    zone: document.getElementById("zone_joystick"),
    threshold: 0.1,
    position: { left: 5 + "%", top: 64 + "%" },
    mode: "static",
    size: 100,
    color: "#111111",
  };
​
  var manager = nipplejs.create(options);
​
  linear_speed = 0;
  angular_speed = 0;
​
  manager.on("start", function (event, nipple) {
    console.log("Movement start");
    timer = setInterval(function () {
      move(linear_speed, angular_speed);
    }, 25);
  });
​
  manager.on("move", function (event, nipple) {
    console.log("Moving");
    max_linear = 5.0; // m/s
    max_angular = 2.0; // rad/s
    max_distance = 75.0; // pixels;
    linear_speed =
      (Math.sin(nipple.angle.radian) * max_linear * nipple.distance) /
      max_distance;
    angular_speed =
      (-Math.cos(nipple.angle.radian) * max_angular * nipple.distance) /
      max_distance;
  });
​
  manager.on("end", function () {
    console.log("Movement end");
    if (timer) {
      clearInterval(timer);
    }
    move(0, 0);
  });
};
window.onload = function () {
  createJoystick();
};