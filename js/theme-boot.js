(function () {
  try {
    var t = localStorage.getItem("theme");
    document.documentElement.setAttribute(
      "data-theme",
      t === "light" || t === "dark" ? t : "dark"
    );
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
  var prefix = "./";
  var scripts = document.getElementsByTagName("script");
  for (var i = 0; i < scripts.length; i++) {
    var src = scripts[i].getAttribute("src") || "";
    var m = src.match(/^(.*)js\/theme-boot\.js(?:\?.*)?$/);
    if (m) {
      prefix = m[1] === "" ? "./" : m[1];
      break;
    }
  }
  var icons = [
    { rel: "icon", type: "image/svg+xml", href: prefix + "assets/brand/favicon.svg" },
    { rel: "icon", type: "image/png", sizes: "32x32", href: prefix + "assets/brand/favicon-32.png" },
    { rel: "icon", type: "image/png", sizes: "16x16", href: prefix + "assets/brand/favicon-16.png" },
    { rel: "apple-touch-icon", href: prefix + "assets/brand/apple-touch-180.png" }
  ];
  for (var j = 0; j < icons.length; j++) {
    var link = document.createElement("link");
    var attrs = icons[j];
    for (var k in attrs) {
      if (Object.prototype.hasOwnProperty.call(attrs, k)) link.setAttribute(k, attrs[k]);
    }
    document.head.appendChild(link);
  }
})();
