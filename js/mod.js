let ShakeEffectOn =
    null === localStorage.getItem("ShakeEffectOn") ||
    "true" === localStorage.getItem("ShakeEffectOn"),
  LyricsOn =
    null === localStorage.getItem("LyricsOn") ||
    "true" === localStorage.getItem("LyricsOn"),
  BGorFadeOutsOn =
    null === localStorage.getItem("BGorFadeOutsOn") ||
    "true" === localStorage.getItem("BGorFadeOutsOn"),
  ModSoundsOn =
    null === localStorage.getItem("ModSoundsOn") ||
    "true" === localStorage.getItem("ModSoundsOn"),
  ConfettiEffectOn =
    null === localStorage.getItem("ConfettiEffectOn") ||
    "true" === localStorage.getItem("ConfettiEffectOn"),
  CustomCursorsOn =
    null === localStorage.getItem("CustomCursorsOn") ||
    "true" === localStorage.getItem("CustomCursorsOn");
null === localStorage.getItem("realEnding") &&
  localStorage.setItem("realEnding", "false");
let realEnding = "true" === localStorage.getItem("realEnding"),
  flipped = !1,
  achiNotificationDot =
    parseInt(localStorage.getItem("achiNotificationDot")) || 0,
  totalBonusesWatched =
    parseInt(localStorage.getItem("totalBonusesWatched")) || 0,
  totalVersionsOppened =
    parseInt(localStorage.getItem("totalVersionsOppened")) || 0,
  totalPolosUsed = parseInt(localStorage.getItem("totalPolosUsed")) || 0,
  totalTimeSpent = parseInt(localStorage.getItem("totalTimeSpent")) || 0,
  sessionStartTime = Date.now();
function getVersionFromURL() {
  return new URLSearchParams(window.location.search).get("v") || "Unknown";
}
setInterval(() => {
  let o = Date.now(),
    n = Math.floor((o - sessionStartTime) / 1e3);
  localStorage.setItem("totalTimeSpent", totalTimeSpent + n);
}, 1e3),
  window.addEventListener("beforeunload", () => {
    let o = Math.floor((Date.now() - sessionStartTime) / 1e3);
    localStorage.setItem("totalTimeSpent", totalTimeSpent + o);
  });
let activeTimeouts = [];
function OnDelayIn(o, n) {
  let e = setTimeout(() => {
    n(), (activeTimeouts = activeTimeouts.filter((o) => o !== e));
  }, o);
  activeTimeouts.push(e);
}
function clearAllDelays() {
  activeTimeouts.forEach(clearTimeout), (activeTimeouts = []);
}
function SomeTimes(o, n) {
  Math.random() < o && n();
}
function showNotification(o, n = "polo") {
  if (document.querySelector(`.notification[data-message="${o}"]`)) return;
  const e = document.createElement("div");
  e.classList.add("notification", n),
    e.setAttribute("data-message", o),
    (e.innerHTML = o),
    document.body.appendChild(e),
    (e.style.position = "fixed"),
    (e.style.left = "43%"),
    (e.style.padding = "10px"),
    (e.style.backgroundColor = "rgba(0, 0, 0, 0.8)"),
    (e.style.color = "white"),
    (e.style.borderRadius = "5px"),
    (e.style.fontFamily = "Arial, sans-serif"),
    (e.style.fontSize = "14px"),
    (e.style.zIndex = "9999");
  const t = "bonus" === n ? 60 : 20;
  (e.style.top = `-${t}px`),
    (e.style.transition = "top 0.5s ease-out, opacity 0.5s ease-in-out"),
    setTimeout(() => {
      (e.style.top = `${t}px`), (e.style.opacity = "1");
    }, 10),
    notificationCallbacks[o] && notificationCallbacks[o](),
    e.classList.add("notification-slide-in"),
    setTimeout(() => {
      (e.style.top = `-${t}px`),
        (e.style.opacity = "0"),
        setTimeout(() => {
          e.remove();
        }, 500);
    }, 1e3);
}
function FadeOut(o, n) {
  if (BGorFadeOutsOn) {
    const e = document.createElement("div");
    (e.style.position = "fixed"),
      (e.style.top = "0"),
      (e.style.left = "0"),
      (e.style.width = "100%"),
      (e.style.height = "100%"),
      (e.style.backgroundColor = o),
      (e.style.zIndex = "9999"),
      (e.style.transition = `opacity ${n}ms ease-out`),
      (e.style.opacity = "1"),
      (e.style.pointerEvents = "none"),
      document.body.appendChild(e),
      setTimeout(() => {
        e.style.opacity = "0";
      }, 10),
      setTimeout(() => {
        e.remove();
      }, n);
  }
}
function Shake(o, n) {
  if (ShakeEffectOn) {
    navigator.vibrate(200);
    const e = document.body,
      t = e.style.cssText;
    let i = null;
    const l = (s) => {
      i || (i = s);
      const c = s - i,
        f = (n - c) / n,
        u = (2 * Math.random() - 1) * o * f,
        a = (2 * Math.random() - 1) * o * f;
      (e.style.transform = `translate(${u}px, ${a}px)`),
        c < n ? requestAnimationFrame(l) : (e.style.cssText = t);
    };
    requestAnimationFrame(l);
  } else console.log("Shake effect wanted to play, but its off.");
}
function adjustScale() {
  let o = document.querySelector(".pop"),
    n = document.querySelector(".gallery-container"),
    e = document.querySelector(".sp-line");
  if (o && n && !o.classList.contains("active") && !e) {
    let n = window.innerHeight;
    o.style.transform =
      n <= 400 ? "scale(0.7)" : n <= 500 ? "scale(0.8)" : "scale(1)";
  }
}
function PlaySFX(o) {
  if (ModSoundsOn) {
    new Audio(`./${app.folder}sound/mod/${o}`).play().catch((n) => {
      boxDialog.open(
        `Oops! We can't play the sound file "${o}".<br><br>Make sure the file exists at:<br><b>${app.folder}sound/mod/${o}</b>`,
        "~(>_<。)＼"
      );
    });
  }
}
window.addEventListener("load", adjustScale),
  window.addEventListener("resize", adjustScale);
const notificationCallbacks = {
  "DEBUG: v1 Polo 0 is being used!": onV1Polo0,
  "DEBUG: v1 Polo 1 is being used!": onV1Polo1,
  "DEBUG: v1 Polo 2 is being used!": onV1Polo2,
  "DEBUG: v1 Polo 3 is being used!": onV1Polo3,
  "DEBUG: v1 Polo 4 is being used!": onV1Polo4,
  "DEBUG: v1 Polo 5 is being used!": onV1Polo5,
  "DEBUG: v1 Polo 6 is being used!": onV1Polo6,
  "DEBUG: v1 Polo 7 is being used!": onV1Polo7,
  "DEBUG: v1 Polo 8 is being used!": onV1Polo8,
  "DEBUG: v1 Polo 9 is being used!": onV1Polo9,
  "DEBUG: v1 Polo 10 is being used!": onV1Polo10,
  "DEBUG: v1 Polo 11 is being used!": onV1Polo11,
  "DEBUG: v1 Polo 12 is being used!": onV1Polo12,
  "DEBUG: v1 Polo 13 is being used!": onV1Polo13,
  "DEBUG: v1 Polo 14 is being used!": onV1Polo14,
  "DEBUG: v1 Polo 15 is being used!": onV1Polo15,
  "DEBUG: v1 Polo 16 is being used!": onV1Polo16,
  "DEBUG: v1 Polo 17 is being used!": onV1Polo17,
  "DEBUG: v1 Polo 18 is being used!": onV1Polo18,
  "DEBUG: v1 Polo 19 is being used!": onV1Polo19,
  "DEBUG: v1 Polo 20 is being used!": onV1Polo20,
  "DEBUG: v1 Polo 21 is being used!": onV1Polo21,
  "DEBUG: v1 Polo 22 is being used!": onV1Polo22,
  "DEBUG: v1 Polo 23 is being used!": onV1Polo23,
  "DEBUG: v2 Polo 0 is being used!": onV2Polo0,
  "DEBUG: v2 Polo 1 is being used!": onV2Polo1,
  "DEBUG: v2 Polo 2 is being used!": onV2Polo2,
  "DEBUG: v2 Polo 3 is being used!": onV2Polo3,
  "DEBUG: v2 Polo 4 is being used!": onV2Polo4,
  "DEBUG: v2 Polo 5 is being used!": onV2Polo5,
  "DEBUG: v2 Polo 6 is being used!": onV2Polo6,
  "DEBUG: v2 Polo 7 is being used!": onV2Polo7,
  "DEBUG: v2 Polo 8 is being used!": onV2Polo8,
  "DEBUG: v2 Polo 9 is being used!": onV2Polo9,
  "DEBUG: v2 Polo 10 is being used!": onV2Polo10,
  "DEBUG: v2 Polo 11 is being used!": onV2Polo11,
  "DEBUG: v2 Polo 12 is being used!": onV2Polo12,
  "DEBUG: v2 Polo 13 is being used!": onV2Polo13,
  "DEBUG: v2 Polo 14 is being used!": onV2Polo14,
  "DEBUG: v2 Polo 15 is being used!": onV2Polo15,
  "DEBUG: v2 Polo 16 is being used!": onV2Polo16,
  "DEBUG: v2 Polo 17 is being used!": onV2Polo17,
  "DEBUG: v2 Polo 18 is being used!": onV2Polo18,
  "DEBUG: v2 Polo 19 is being used!": onV2Polo19,
  "DEBUG: v2 Polo 20 is being used!": onV2Polo20,
  "DEBUG: v2 Polo 21 is being used!": onV2Polo21,
  "DEBUG: v2 Polo 22 is being used!": onV2Polo22,
  "DEBUG: v2 Polo 23 is being used!": onV2Polo23,
  "DEBUG: v3 Polo 0 is being used!": onV3Polo0,
  "DEBUG: v3 Polo 1 is being used!": onV3Polo1,
  "DEBUG: v3 Polo 2 is being used!": onV3Polo2,
  "DEBUG: v3 Polo 3 is being used!": onV3Polo3,
  "DEBUG: v3 Polo 4 is being used!": onV3Polo4,
  "DEBUG: v3 Polo 5 is being used!": onV3Polo5,
  "DEBUG: v3 Polo 6 is being used!": onV3Polo6,
  "DEBUG: v3 Polo 7 is being used!": onV3Polo7,
  "DEBUG: v3 Polo 8 is being used!": onV3Polo8,
  "DEBUG: v3 Polo 9 is being used!": onV3Polo9,
  "DEBUG: v3 Polo 10 is being used!": onV3Polo10,
  "DEBUG: v3 Polo 11 is being used!": onV3Polo11,
  "DEBUG: v3 Polo 12 is being used!": onV3Polo12,
  "DEBUG: v3 Polo 13 is being used!": onV3Polo13,
  "DEBUG: v3 Polo 14 is being used!": onV3Polo14,
  "DEBUG: v3 Polo 15 is being used!": onV3Polo15,
  "DEBUG: v3 Polo 16 is being used!": onV3Polo16,
  "DEBUG: v3 Polo 17 is being used!": onV3Polo17,
  "DEBUG: v3 Polo 18 is being used!": onV3Polo18,
  "DEBUG: v3 Polo 19 is being used!": onV3Polo19,
  "DEBUG: v3 Polo 20 is being used!": onV3Polo20,
  "DEBUG: v3 Polo 21 is being used!": onV3Polo21,
  "DEBUG: v3 Polo 22 is being used!": onV3Polo22,
  "DEBUG: v3 Polo 23 is being used!": onV3Polo23,
  "DEBUG: v4 Polo 0 is being used!": onV4Polo0,
  "DEBUG: v4 Polo 1 is being used!": onV4Polo1,
  "DEBUG: v4 Polo 2 is being used!": onV4Polo2,
  "DEBUG: v4 Polo 3 is being used!": onV4Polo3,
  "DEBUG: v4 Polo 4 is being used!": onV4Polo4,
  "DEBUG: v4 Polo 5 is being used!": onV4Polo5,
  "DEBUG: v4 Polo 6 is being used!": onV4Polo6,
  "DEBUG: v4 Polo 7 is being used!": onV4Polo7,
  "DEBUG: v4 Polo 8 is being used!": onV4Polo8,
  "DEBUG: v4 Polo 9 is being used!": onV4Polo9,
  "DEBUG: v4 Polo 10 is being used!": onV4Polo10,
  "DEBUG: v4 Polo 11 is being used!": onV4Polo11,
  "DEBUG: v4 Polo 12 is being used!": onV4Polo12,
  "DEBUG: v4 Polo 13 is being used!": onV4Polo13,
  "DEBUG: v4 Polo 14 is being used!": onV4Polo14,
  "DEBUG: v4 Polo 15 is being used!": onV4Polo15,
  "DEBUG: v4 Polo 16 is being used!": onV4Polo16,
  "DEBUG: v4 Polo 17 is being used!": onV4Polo17,
  "DEBUG: v4 Polo 18 is being used!": onV4Polo18,
  "DEBUG: v4 Polo 19 is being used!": onV4Polo19,
  "DEBUG: v4 Polo 20 is being used!": onV4Polo20,
  "DEBUG: v4 Polo 21 is being used!": onV4Polo21,
  "DEBUG: v4 Polo 22 is being used!": onV4Polo22,
  "DEBUG: v4 Polo 23 is being used!": onV4Polo23,
  "DEBUG: v5 Polo 0 is being used!": onV5Polo0,
  "DEBUG: v5 Polo 1 is being used!": onV5Polo1,
  "DEBUG: v5 Polo 2 is being used!": onV5Polo2,
  "DEBUG: v5 Polo 3 is being used!": onV5Polo3,
  "DEBUG: v5 Polo 4 is being used!": onV5Polo4,
  "DEBUG: v5 Polo 5 is being used!": onV5Polo5,
  "DEBUG: v5 Polo 6 is being used!": onV5Polo6,
  "DEBUG: v5 Polo 7 is being used!": onV5Polo7,
  "DEBUG: v5 Polo 8 is being used!": onV5Polo8,
  "DEBUG: v5 Polo 9 is being used!": onV5Polo9,
  "DEBUG: v5 Polo 10 is being used!": onV5Polo10,
  "DEBUG: v5 Polo 11 is being used!": onV5Polo11,
  "DEBUG: v5 Polo 12 is being used!": onV5Polo12,
  "DEBUG: v5 Polo 13 is being used!": onV5Polo13,
  "DEBUG: v5 Polo 14 is being used!": onV5Polo14,
  "DEBUG: v5 Polo 15 is being used!": onV5Polo15,
  "DEBUG: v5 Polo 16 is being used!": onV5Polo16,
  "DEBUG: v5 Polo 17 is being used!": onV5Polo17,
  "DEBUG: v5 Polo 18 is being used!": onV5Polo18,
  "DEBUG: v5 Polo 19 is being used!": onV5Polo19,
  "DEBUG: v5 Polo 20 is being used!": onV5Polo20,
  "DEBUG: v5 Polo 21 is being used!": onV5Polo21,
  "DEBUG: v5 Polo 22 is being used!": onV5Polo22,
  "DEBUG: v5 Polo 23 is being used!": onV5Polo23,
  "DEBUG: v6 Polo 0 is being used!": onV6Polo0,
  "DEBUG: v6 Polo 1 is being used!": onV6Polo1,
  "DEBUG: v6 Polo 2 is being used!": onV6Polo2,
  "DEBUG: v6 Polo 3 is being used!": onV6Polo3,
  "DEBUG: v6 Polo 4 is being used!": onV6Polo4,
  "DEBUG: v6 Polo 5 is being used!": onV6Polo5,
  "DEBUG: v6 Polo 6 is being used!": onV6Polo6,
  "DEBUG: v6 Polo 7 is being used!": onV6Polo7,
  "DEBUG: v6 Polo 8 is being used!": onV6Polo8,
  "DEBUG: v6 Polo 9 is being used!": onV6Polo9,
  "DEBUG: v6 Polo 10 is being used!": onV6Polo10,
  "DEBUG: v6 Polo 11 is being used!": onV6Polo11,
  "DEBUG: v6 Polo 12 is being used!": onV6Polo12,
  "DEBUG: v6 Polo 13 is being used!": onV6Polo13,
  "DEBUG: v6 Polo 14 is being used!": onV6Polo14,
  "DEBUG: v6 Polo 15 is being used!": onV6Polo15,
  "DEBUG: v6 Polo 16 is being used!": onV6Polo16,
  "DEBUG: v6 Polo 17 is being used!": onV6Polo17,
  "DEBUG: v6 Polo 18 is being used!": onV6Polo18,
  "DEBUG: v6 Polo 19 is being used!": onV6Polo19,
  "DEBUG: v6 Polo 20 is being used!": onV6Polo20,
  "DEBUG: v6 Polo 21 is being used!": onV6Polo21,
  "DEBUG: v6 Polo 22 is being used!": onV6Polo22,
  "DEBUG: v6 Polo 23 is being used!": onV6Polo23,
  "DEBUG: v7 Polo 0 is being used!": onV7Polo0,
  "DEBUG: v7 Polo 1 is being used!": onV7Polo1,
  "DEBUG: v7 Polo 2 is being used!": onV7Polo2,
  "DEBUG: v7 Polo 3 is being used!": onV7Polo3,
  "DEBUG: v7 Polo 4 is being used!": onV7Polo4,
  "DEBUG: v7 Polo 5 is being used!": onV7Polo5,
  "DEBUG: v7 Polo 6 is being used!": onV7Polo6,
  "DEBUG: v7 Polo 7 is being used!": onV7Polo7,
  "DEBUG: v7 Polo 8 is being used!": onV7Polo8,
  "DEBUG: v7 Polo 9 is being used!": onV7Polo9,
  "DEBUG: v7 Polo 10 is being used!": onV7Polo10,
  "DEBUG: v7 Polo 11 is being used!": onV7Polo11,
  "DEBUG: v7 Polo 12 is being used!": onV7Polo12,
  "DEBUG: v7 Polo 13 is being used!": onV7Polo13,
  "DEBUG: v7 Polo 14 is being used!": onV7Polo14,
  "DEBUG: v7 Polo 15 is being used!": onV7Polo15,
  "DEBUG: v7 Polo 16 is being used!": onV7Polo16,
  "DEBUG: v7 Polo 17 is being used!": onV7Polo17,
  "DEBUG: v7 Polo 18 is being used!": onV7Polo18,
  "DEBUG: v7 Polo 19 is being used!": onV7Polo19,
  "DEBUG: v7 Polo 20 is being used!": onV7Polo20,
  "DEBUG: v7 Polo 21 is being used!": onV7Polo21,
  "DEBUG: v7 Polo 22 is being used!": onV7Polo22,
  "DEBUG: v7 Polo 23 is being used!": onV7Polo23,
  "DEBUG: v8 Polo 0 is being used!": onV8Polo0,
  "DEBUG: v8 Polo 1 is being used!": onV8Polo1,
  "DEBUG: v8 Polo 2 is being used!": onV8Polo2,
  "DEBUG: v8 Polo 3 is being used!": onV8Polo3,
  "DEBUG: v8 Polo 4 is being used!": onV8Polo4,
  "DEBUG: v8 Polo 5 is being used!": onV8Polo5,
  "DEBUG: v8 Polo 6 is being used!": onV8Polo6,
  "DEBUG: v8 Polo 7 is being used!": onV8Polo7,
  "DEBUG: v8 Polo 8 is being used!": onV8Polo8,
  "DEBUG: v8 Polo 9 is being used!": onV8Polo9,
  "DEBUG: v8 Polo 10 is being used!": onV8Polo10,
  "DEBUG: v8 Polo 11 is being used!": onV8Polo11,
  "DEBUG: v8 Polo 12 is being used!": onV8Polo12,
  "DEBUG: v8 Polo 13 is being used!": onV8Polo13,
  "DEBUG: v8 Polo 14 is being used!": onV8Polo14,
  "DEBUG: v8 Polo 15 is being used!": onV8Polo15,
  "DEBUG: v8 Polo 16 is being used!": onV8Polo16,
  "DEBUG: v8 Polo 17 is being used!": onV8Polo17,
  "DEBUG: v8 Polo 18 is being used!": onV8Polo18,
  "DEBUG: v8 Polo 19 is being used!": onV8Polo19,
  "DEBUG: v8 Polo 20 is being used!": onV8Polo20,
  "DEBUG: v8 Polo 21 is being used!": onV8Polo21,
  "DEBUG: v8 Polo 22 is being used!": onV8Polo22,
  "DEBUG: v8 Polo 23 is being used!": onV8Polo23,
  "DEBUG: v9 Polo 0 is being used!": onV9Polo0,
  "DEBUG: v9 Polo 1 is being used!": onV9Polo1,
  "DEBUG: v9 Polo 2 is being used!": onV9Polo2,
  "DEBUG: v9 Polo 3 is being used!": onV9Polo3,
  "DEBUG: v9 Polo 4 is being used!": onV9Polo4,
  "DEBUG: v9 Polo 5 is being used!": onV9Polo5,
  "DEBUG: v9 Polo 6 is being used!": onV9Polo6,
  "DEBUG: v9 Polo 7 is being used!": onV9Polo7,
  "DEBUG: v9 Polo 8 is being used!": onV9Polo8,
  "DEBUG: v9 Polo 9 is being used!": onV9Polo9,
  "DEBUG: v9 Polo 10 is being used!": onV9Polo10,
  "DEBUG: v9 Polo 11 is being used!": onV9Polo11,
  "DEBUG: v9 Polo 12 is being used!": onV9Polo12,
  "DEBUG: v9 Polo 13 is being used!": onV9Polo13,
  "DEBUG: v9 Polo 14 is being used!": onV9Polo14,
  "DEBUG: v9 Polo 15 is being used!": onV9Polo15,
  "DEBUG: v9 Polo 16 is being used!": onV9Polo16,
  "DEBUG: v9 Polo 17 is being used!": onV9Polo17,
  "DEBUG: v9 Polo 18 is being used!": onV9Polo18,
  "DEBUG: v9 Polo 19 is being used!": onV9Polo19,
  "DEBUG: v9 Polo 20 is being used!": onV9Polo20,
  "DEBUG: v9 Polo 21 is being used!": onV9Polo21,
  "DEBUG: v9 Polo 22 is being used!": onV9Polo22,
  "DEBUG: v9 Polo 23 is being used!": onV9Polo23,
  "DEBUG: v1 Bonus 1 has finished playing!": onV1Bonus1Finished,
  "DEBUG: v1 Bonus 2 has finished playing!": onV1Bonus2Finished,
  "DEBUG: v1 Bonus 3 has finished playing!": onV1Bonus3Finished,
  "DEBUG: v2 Bonus 1 has finished playing!": onV2Bonus1Finished,
  "DEBUG: v2 Bonus 2 has finished playing!": onV2Bonus2Finished,
  "DEBUG: v2 Bonus 3 has finished playing!": onV2Bonus3Finished,
  "DEBUG: v3 Bonus 1 has finished playing!": onV3Bonus1Finished,
  "DEBUG: v3 Bonus 2 has finished playing!": onV3Bonus2Finished,
  "DEBUG: v3 Bonus 3 has finished playing!": onV3Bonus3Finished,
  "DEBUG: v4 Bonus 1 has finished playing!": onV4Bonus1Finished,
  "DEBUG: v4 Bonus 2 has finished playing!": onV4Bonus2Finished,
  "DEBUG: v4 Bonus 3 has finished playing!": onV4Bonus3Finished,
  "DEBUG: v5 Bonus 1 has finished playing!": onV5Bonus1Finished,
  "DEBUG: v5 Bonus 2 has finished playing!": onV5Bonus2Finished,
  "DEBUG: v5 Bonus 3 has finished playing!": onV5Bonus3Finished,
  "DEBUG: v6 Bonus 1 has finished playing!": onV6Bonus1Finished,
  "DEBUG: v6 Bonus 2 has finished playing!": onV6Bonus2Finished,
  "DEBUG: v6 Bonus 3 has finished playing!": onV6Bonus3Finished,
  "DEBUG: v7 Bonus 1 has finished playing!": onV7Bonus1Finished,
  "DEBUG: v7 Bonus 2 has finished playing!": onV7Bonus2Finished,
  "DEBUG: v7 Bonus 3 has finished playing!": onV7Bonus3Finished,
  "DEBUG: v8 Bonus 1 has finished playing!": onV8Bonus1Finished,
  "DEBUG: v8 Bonus 2 has finished playing!": onV8Bonus2Finished,
  "DEBUG: v8 Bonus 3 has finished playing!": onV8Bonus3Finished,
  "DEBUG: v9 Bonus 1 has finished playing!": onV9Bonus1Finished,
  "DEBUG: v9 Bonus 2 has finished playing!": onV9Bonus2Finished,
  "DEBUG: v9 Bonus 3 has finished playing!": onV9Bonus3Finished,
  "DEBUG: v1 just started!": onV1Start,
  "DEBUG: v2 just started!": onV2Start,
  "DEBUG: v3 just started!": onV3Start,
  "DEBUG: v4 just started!": onV4Start,
  "DEBUG: v5 just started!": onV5Start,
  "DEBUG: v6 just started!": onV6Start,
  "DEBUG: v7 just started!": onV7Start,
  "DEBUG: v8 just started!": onV8Start,
  "DEBUG: v9 just started!": onV9Start,
  "DEBUG: v1 Bonus 1 is playing!": onV1Bonus1Started,
  "DEBUG: v1 Bonus 2 is playing!": onV1Bonus2Started,
  "DEBUG: v1 Bonus 3 is playing!": onV1Bonus3Started,
  "DEBUG: v2 Bonus 1 is playing!": onV2Bonus1Started,
  "DEBUG: v2 Bonus 2 is playing!": onV2Bonus2Started,
  "DEBUG: v2 Bonus 3 is playing!": onV2Bonus3Started,
  "DEBUG: v3 Bonus 1 is playing!": onV3Bonus1Started,
  "DEBUG: v3 Bonus 2 is playing!": onV3Bonus2Started,
  "DEBUG: v3 Bonus 3 is playing!": onV3Bonus3Started,
  "DEBUG: v4 Bonus 1 is playing!": onV4Bonus1Started,
  "DEBUG: v4 Bonus 2 is playing!": onV4Bonus2Started,
  "DEBUG: v4 Bonus 3 is playing!": onV4Bonus3Started,
  "DEBUG: v5 Bonus 1 is playing!": onV5Bonus1Started,
  "DEBUG: v5 Bonus 2 is playing!": onV5Bonus2Started,
  "DEBUG: v5 Bonus 3 is playing!": onV5Bonus3Started,
  "DEBUG: v6 Bonus 1 is playing!": onV6Bonus1Started,
  "DEBUG: v6 Bonus 2 is playing!": onV6Bonus2Started,
  "DEBUG: v6 Bonus 3 is playing!": onV6Bonus3Started,
  "DEBUG: v7 Bonus 1 is playing!": onV7Bonus1Started,
  "DEBUG: v7 Bonus 2 is playing!": onV7Bonus2Started,
  "DEBUG: v7 Bonus 3 is playing!": onV7Bonus3Started,
  "DEBUG: v8 Bonus 1 is playing!": onV8Bonus1Started,
  "DEBUG: v8 Bonus 2 is playing!": onV8Bonus2Started,
  "DEBUG: v8 Bonus 3 is playing!": onV8Bonus3Started,
  "DEBUG: v9 Bonus 1 is playing!": onV9Bonus1Started,
  "DEBUG: v9 Bonus 2 is playing!": onV9Bonus2Started,
  "DEBUG: v9 Bonus 3 is playing!": onV9Bonus3Started,
  "Trying to open locked icon 1": onLockedIcon1,
  "Trying to open locked icon 2": onLockedIcon2,
  "Trying to open locked icon 3": onLockedIcon3,
  "Trying to open locked icon 4": onLockedIcon4,
  "Trying to open locked icon 5": onLockedIcon5,
  "Trying to open locked icon 6": onLockedIcon6,
  "Trying to open locked icon 7": onLockedIcon7,
  "Trying to open locked icon 8": onLockedIcon8,
  "Trying to open locked icon 9": onLockedIcon9,
  "Trying to open locked icon 10": onLockedIcon10,
  "Trying to open locked icon 11": onLockedIcon11,
  "Trying to open locked icon 12": onLockedIcon12,
  "Trying to open locked icon 13": onLockedIcon13,
  "Trying to open locked icon 14": onLockedIcon14,
  "Trying to open locked icon 15": onLockedIcon15,
  "Trying to open locked icon 16": onLockedIcon16,
  "Trying to open locked icon 17": onLockedIcon17,
  "Trying to open locked icon 18": onLockedIcon18,
  "Trying to open locked icon 19": onLockedIcon19,
  "Trying to open locked icon 20": onLockedIcon20,
  "Trying to open locked icon": onLockedIcon,
  "DEBUG: v1 Polo 0 is no longer used!": offV1Polo0,
  "DEBUG: v1 Polo 1 is no longer used!": offV1Polo1,
  "DEBUG: v1 Polo 2 is no longer used!": offV1Polo2,
  "DEBUG: v1 Polo 3 is no longer used!": offV1Polo3,
  "DEBUG: v1 Polo 4 is no longer used!": offV1Polo4,
  "DEBUG: v1 Polo 5 is no longer used!": offV1Polo5,
  "DEBUG: v1 Polo 6 is no longer used!": offV1Polo6,
  "DEBUG: v1 Polo 7 is no longer used!": offV1Polo7,
  "DEBUG: v1 Polo 8 is no longer used!": offV1Polo8,
  "DEBUG: v1 Polo 9 is no longer used!": offV1Polo9,
  "DEBUG: v1 Polo 10 is no longer used!": offV1Polo10,
  "DEBUG: v1 Polo 11 is no longer used!": offV1Polo11,
  "DEBUG: v1 Polo 12 is no longer used!": offV1Polo12,
  "DEBUG: v1 Polo 13 is no longer used!": offV1Polo13,
  "DEBUG: v1 Polo 14 is no longer used!": offV1Polo14,
  "DEBUG: v1 Polo 15 is no longer used!": offV1Polo15,
  "DEBUG: v1 Polo 16 is no longer used!": offV1Polo16,
  "DEBUG: v1 Polo 17 is no longer used!": offV1Polo17,
  "DEBUG: v1 Polo 18 is no longer used!": offV1Polo18,
  "DEBUG: v1 Polo 19 is no longer used!": offV1Polo19,
  "DEBUG: v1 Polo 20 is no longer used!": offV1Polo20,
  "DEBUG: v1 Polo 21 is no longer used!": offV1Polo21,
  "DEBUG: v1 Polo 22 is no longer used!": offV1Polo22,
  "DEBUG: v1 Polo 23 is no longer used!": offV1Polo23,
  "DEBUG: v2 Polo 0 is no longer used!": offV2Polo0,
  "DEBUG: v2 Polo 1 is no longer used!": offV2Polo1,
  "DEBUG: v2 Polo 2 is no longer used!": offV2Polo2,
  "DEBUG: v2 Polo 3 is no longer used!": offV2Polo3,
  "DEBUG: v2 Polo 4 is no longer used!": offV2Polo4,
  "DEBUG: v2 Polo 5 is no longer used!": offV2Polo5,
  "DEBUG: v2 Polo 6 is no longer used!": offV2Polo6,
  "DEBUG: v2 Polo 7 is no longer used!": offV2Polo7,
  "DEBUG: v2 Polo 8 is no longer used!": offV2Polo8,
  "DEBUG: v2 Polo 9 is no longer used!": offV2Polo9,
  "DEBUG: v2 Polo 10 is no longer used!": offV2Polo10,
  "DEBUG: v2 Polo 11 is no longer used!": offV2Polo11,
  "DEBUG: v2 Polo 12 is no longer used!": offV2Polo12,
  "DEBUG: v2 Polo 13 is no longer used!": offV2Polo13,
  "DEBUG: v2 Polo 14 is no longer used!": offV2Polo14,
  "DEBUG: v2 Polo 15 is no longer used!": offV2Polo15,
  "DEBUG: v2 Polo 16 is no longer used!": offV2Polo16,
  "DEBUG: v2 Polo 17 is no longer used!": offV2Polo17,
  "DEBUG: v2 Polo 18 is no longer used!": offV2Polo18,
  "DEBUG: v2 Polo 19 is no longer used!": offV2Polo19,
  "DEBUG: v2 Polo 20 is no longer used!": offV2Polo20,
  "DEBUG: v2 Polo 21 is no longer used!": offV2Polo21,
  "DEBUG: v2 Polo 22 is no longer used!": offV2Polo22,
  "DEBUG: v2 Polo 23 is no longer used!": offV2Polo23,
  "DEBUG: v3 Polo 0 is no longer used!": offV3Polo0,
  "DEBUG: v3 Polo 1 is no longer used!": offV3Polo1,
  "DEBUG: v3 Polo 2 is no longer used!": offV3Polo2,
  "DEBUG: v3 Polo 3 is no longer used!": offV3Polo3,
  "DEBUG: v3 Polo 4 is no longer used!": offV3Polo4,
  "DEBUG: v3 Polo 5 is no longer used!": offV3Polo5,
  "DEBUG: v3 Polo 6 is no longer used!": offV3Polo6,
  "DEBUG: v3 Polo 7 is no longer used!": offV3Polo7,
  "DEBUG: v3 Polo 8 is no longer used!": offV3Polo8,
  "DEBUG: v3 Polo 9 is no longer used!": offV3Polo9,
  "DEBUG: v3 Polo 10 is no longer used!": offV3Polo10,
  "DEBUG: v3 Polo 11 is no longer used!": offV3Polo11,
  "DEBUG: v3 Polo 12 is no longer used!": offV3Polo12,
  "DEBUG: v3 Polo 13 is no longer used!": offV3Polo13,
  "DEBUG: v3 Polo 14 is no longer used!": offV3Polo14,
  "DEBUG: v3 Polo 15 is no longer used!": offV3Polo15,
  "DEBUG: v3 Polo 16 is no longer used!": offV3Polo16,
  "DEBUG: v3 Polo 17 is no longer used!": offV3Polo17,
  "DEBUG: v3 Polo 18 is no longer used!": offV3Polo18,
  "DEBUG: v3 Polo 19 is no longer used!": offV3Polo19,
  "DEBUG: v3 Polo 20 is no longer used!": offV3Polo20,
  "DEBUG: v3 Polo 21 is no longer used!": offV3Polo21,
  "DEBUG: v3 Polo 22 is no longer used!": offV3Polo22,
  "DEBUG: v3 Polo 23 is no longer used!": offV3Polo23,
  "DEBUG: v4 Polo 0 is no longer used!": offV4Polo0,
  "DEBUG: v4 Polo 1 is no longer used!": offV4Polo1,
  "DEBUG: v4 Polo 2 is no longer used!": offV4Polo2,
  "DEBUG: v4 Polo 3 is no longer used!": offV4Polo3,
  "DEBUG: v4 Polo 4 is no longer used!": offV4Polo4,
  "DEBUG: v4 Polo 5 is no longer used!": offV4Polo5,
  "DEBUG: v4 Polo 6 is no longer used!": offV4Polo6,
  "DEBUG: v4 Polo 7 is no longer used!": offV4Polo7,
  "DEBUG: v4 Polo 8 is no longer used!": offV4Polo8,
  "DEBUG: v4 Polo 9 is no longer used!": offV4Polo9,
  "DEBUG: v4 Polo 10 is no longer used!": offV4Polo10,
  "DEBUG: v4 Polo 11 is no longer used!": offV4Polo11,
  "DEBUG: v4 Polo 12 is no longer used!": offV4Polo12,
  "DEBUG: v4 Polo 13 is no longer used!": offV4Polo13,
  "DEBUG: v4 Polo 14 is no longer used!": offV4Polo14,
  "DEBUG: v4 Polo 15 is no longer used!": offV4Polo15,
  "DEBUG: v4 Polo 16 is no longer used!": offV4Polo16,
  "DEBUG: v4 Polo 17 is no longer used!": offV4Polo17,
  "DEBUG: v4 Polo 18 is no longer used!": offV4Polo18,
  "DEBUG: v4 Polo 19 is no longer used!": offV4Polo19,
  "DEBUG: v4 Polo 20 is no longer used!": offV4Polo20,
  "DEBUG: v4 Polo 21 is no longer used!": offV4Polo21,
  "DEBUG: v4 Polo 22 is no longer used!": offV4Polo22,
  "DEBUG: v4 Polo 23 is no longer used!": offV4Polo23,
  "DEBUG: v5 Polo 0 is no longer used!": offV5Polo0,
  "DEBUG: v5 Polo 1 is no longer used!": offV5Polo1,
  "DEBUG: v5 Polo 2 is no longer used!": offV5Polo2,
  "DEBUG: v5 Polo 3 is no longer used!": offV5Polo3,
  "DEBUG: v5 Polo 4 is no longer used!": offV5Polo4,
  "DEBUG: v5 Polo 5 is no longer used!": offV5Polo5,
  "DEBUG: v5 Polo 6 is no longer used!": offV5Polo6,
  "DEBUG: v5 Polo 7 is no longer used!": offV5Polo7,
  "DEBUG: v5 Polo 8 is no longer used!": offV5Polo8,
  "DEBUG: v5 Polo 9 is no longer used!": offV5Polo9,
  "DEBUG: v5 Polo 10 is no longer used!": offV5Polo10,
  "DEBUG: v5 Polo 11 is no longer used!": offV5Polo11,
  "DEBUG: v5 Polo 12 is no longer used!": offV5Polo12,
  "DEBUG: v5 Polo 13 is no longer used!": offV5Polo13,
  "DEBUG: v5 Polo 14 is no longer used!": offV5Polo14,
  "DEBUG: v5 Polo 15 is no longer used!": offV5Polo15,
  "DEBUG: v5 Polo 16 is no longer used!": offV5Polo16,
  "DEBUG: v5 Polo 17 is no longer used!": offV5Polo17,
  "DEBUG: v5 Polo 18 is no longer used!": offV5Polo18,
  "DEBUG: v5 Polo 19 is no longer used!": offV5Polo19,
  "DEBUG: v5 Polo 20 is no longer used!": offV5Polo20,
  "DEBUG: v5 Polo 21 is no longer used!": offV5Polo21,
  "DEBUG: v5 Polo 22 is no longer used!": offV5Polo22,
  "DEBUG: v5 Polo 23 is no longer used!": offV5Polo23,
  "DEBUG: v6 Polo 0 is no longer used!": offV6Polo0,
  "DEBUG: v6 Polo 1 is no longer used!": offV6Polo1,
  "DEBUG: v6 Polo 2 is no longer used!": offV6Polo2,
  "DEBUG: v6 Polo 3 is no longer used!": offV6Polo3,
  "DEBUG: v6 Polo 4 is no longer used!": offV6Polo4,
  "DEBUG: v6 Polo 5 is no longer used!": offV6Polo5,
  "DEBUG: v6 Polo 6 is no longer used!": offV6Polo6,
  "DEBUG: v6 Polo 7 is no longer used!": offV6Polo7,
  "DEBUG: v6 Polo 8 is no longer used!": offV6Polo8,
  "DEBUG: v6 Polo 9 is no longer used!": offV6Polo9,
  "DEBUG: v6 Polo 10 is no longer used!": offV6Polo10,
  "DEBUG: v6 Polo 11 is no longer used!": offV6Polo11,
  "DEBUG: v6 Polo 12 is no longer used!": offV6Polo12,
  "DEBUG: v6 Polo 13 is no longer used!": offV6Polo13,
  "DEBUG: v6 Polo 14 is no longer used!": offV6Polo14,
  "DEBUG: v6 Polo 15 is no longer used!": offV6Polo15,
  "DEBUG: v6 Polo 16 is no longer used!": offV6Polo16,
  "DEBUG: v6 Polo 17 is no longer used!": offV6Polo17,
  "DEBUG: v6 Polo 18 is no longer used!": offV6Polo18,
  "DEBUG: v6 Polo 19 is no longer used!": offV6Polo19,
  "DEBUG: v6 Polo 20 is no longer used!": offV6Polo20,
  "DEBUG: v6 Polo 21 is no longer used!": offV6Polo21,
  "DEBUG: v6 Polo 22 is no longer used!": offV6Polo22,
  "DEBUG: v6 Polo 23 is no longer used!": offV6Polo23,
  "DEBUG: v7 Polo 0 is no longer used!": offV7Polo0,
  "DEBUG: v7 Polo 1 is no longer used!": offV7Polo1,
  "DEBUG: v7 Polo 2 is no longer used!": offV7Polo2,
  "DEBUG: v7 Polo 3 is no longer used!": offV7Polo3,
  "DEBUG: v7 Polo 4 is no longer used!": offV7Polo4,
  "DEBUG: v7 Polo 5 is no longer used!": offV7Polo5,
  "DEBUG: v7 Polo 6 is no longer used!": offV7Polo6,
  "DEBUG: v7 Polo 7 is no longer used!": offV7Polo7,
  "DEBUG: v7 Polo 8 is no longer used!": offV7Polo8,
  "DEBUG: v7 Polo 9 is no longer used!": offV7Polo9,
  "DEBUG: v7 Polo 10 is no longer used!": offV7Polo10,
  "DEBUG: v7 Polo 11 is no longer used!": offV7Polo11,
  "DEBUG: v7 Polo 12 is no longer used!": offV7Polo12,
  "DEBUG: v7 Polo 13 is no longer used!": offV7Polo13,
  "DEBUG: v7 Polo 14 is no longer used!": offV7Polo14,
  "DEBUG: v7 Polo 15 is no longer used!": offV7Polo15,
  "DEBUG: v7 Polo 16 is no longer used!": offV7Polo16,
  "DEBUG: v7 Polo 17 is no longer used!": offV7Polo17,
  "DEBUG: v7 Polo 18 is no longer used!": offV7Polo18,
  "DEBUG: v7 Polo 19 is no longer used!": offV7Polo19,
  "DEBUG: v7 Polo 20 is no longer used!": offV7Polo20,
  "DEBUG: v7 Polo 21 is no longer used!": offV7Polo21,
  "DEBUG: v7 Polo 22 is no longer used!": offV7Polo22,
  "DEBUG: v7 Polo 23 is no longer used!": offV7Polo23,
  "DEBUG: v8 Polo 0 is no longer used!": offV8Polo0,
  "DEBUG: v8 Polo 1 is no longer used!": offV8Polo1,
  "DEBUG: v8 Polo 2 is no longer used!": offV8Polo2,
  "DEBUG: v8 Polo 3 is no longer used!": offV8Polo3,
  "DEBUG: v8 Polo 4 is no longer used!": offV8Polo4,
  "DEBUG: v8 Polo 5 is no longer used!": offV8Polo5,
  "DEBUG: v8 Polo 6 is no longer used!": offV8Polo6,
  "DEBUG: v8 Polo 7 is no longer used!": offV8Polo7,
  "DEBUG: v8 Polo 8 is no longer used!": offV8Polo8,
  "DEBUG: v8 Polo 9 is no longer used!": offV8Polo9,
  "DEBUG: v8 Polo 10 is no longer used!": offV8Polo10,
  "DEBUG: v8 Polo 11 is no longer used!": offV8Polo11,
  "DEBUG: v8 Polo 12 is no longer used!": offV8Polo12,
  "DEBUG: v8 Polo 13 is no longer used!": offV8Polo13,
  "DEBUG: v8 Polo 14 is no longer used!": offV8Polo14,
  "DEBUG: v8 Polo 15 is no longer used!": offV8Polo15,
  "DEBUG: v8 Polo 16 is no longer used!": offV8Polo16,
  "DEBUG: v8 Polo 17 is no longer used!": offV8Polo17,
  "DEBUG: v8 Polo 18 is no longer used!": offV8Polo18,
  "DEBUG: v8 Polo 19 is no longer used!": offV8Polo19,
  "DEBUG: v8 Polo 20 is no longer used!": offV8Polo20,
  "DEBUG: v8 Polo 21 is no longer used!": offV8Polo21,
  "DEBUG: v8 Polo 22 is no longer used!": offV8Polo22,
  "DEBUG: v8 Polo 23 is no longer used!": offV8Polo23,
  "DEBUG: v9 Polo 0 is no longer used!": offV9Polo0,
  "DEBUG: v9 Polo 1 is no longer used!": offV9Polo1,
  "DEBUG: v9 Polo 2 is no longer used!": offV9Polo2,
  "DEBUG: v9 Polo 3 is no longer used!": offV9Polo3,
  "DEBUG: v9 Polo 4 is no longer used!": offV9Polo4,
  "DEBUG: v9 Polo 5 is no longer used!": offV9Polo5,
  "DEBUG: v9 Polo 6 is no longer used!": offV9Polo6,
  "DEBUG: v9 Polo 7 is no longer used!": offV9Polo7,
  "DEBUG: v9 Polo 8 is no longer used!": offV9Polo8,
  "DEBUG: v9 Polo 9 is no longer used!": offV9Polo9,
  "DEBUG: v9 Polo 10 is no longer used!": offV9Polo10,
  "DEBUG: v9 Polo 11 is no longer used!": offV9Polo11,
  "DEBUG: v9 Polo 12 is no longer used!": offV9Polo12,
  "DEBUG: v9 Polo 13 is no longer used!": offV9Polo13,
  "DEBUG: v9 Polo 14 is no longer used!": offV9Polo14,
  "DEBUG: v9 Polo 15 is no longer used!": offV9Polo15,
  "DEBUG: v9 Polo 16 is no longer used!": offV9Polo16,
  "DEBUG: v9 Polo 17 is no longer used!": offV9Polo17,
  "DEBUG: v9 Polo 18 is no longer used!": offV9Polo18,
  "DEBUG: v9 Polo 19 is no longer used!": offV9Polo19,
  "DEBUG: v9 Polo 20 is no longer used!": offV9Polo20,
  "DEBUG: v9 Polo 21 is no longer used!": offV9Polo21,
  "DEBUG: v9 Polo 22 is no longer used!": offV9Polo22,
  "DEBUG: v9 Polo 23 is no longer used!": offV9Polo23,
  "DEBUG: v1 Mix started!": onV1Mix,
  "DEBUG: v2 Mix started!": onV2Mix,
  "DEBUG: v3 Mix started!": onV3Mix,
  "DEBUG: v4 Mix started!": onV4Mix,
  "DEBUG: v5 Mix started!": onV5Mix,
  "DEBUG: v6 Mix started!": onV6Mix,
  "DEBUG: v7 Mix started!": onV7Mix,
  "DEBUG: v8 Mix started!": onV8Mix,
  "DEBUG: v9 Mix started!": onV9Mix,
  "DEBUG: v1 Mix Stopped!": offV1Mix,
  "DEBUG: v2 Mix Stopped!": offV2Mix,
  "DEBUG: v3 Mix Stopped!": offV3Mix,
  "DEBUG: v4 Mix Stopped!": offV4Mix,
  "DEBUG: v5 Mix Stopped!": offV5Mix,
  "DEBUG: v6 Mix Stopped!": offV6Mix,
  "DEBUG: v7 Mix Stopped!": offV7Mix,
  "DEBUG: v8 Mix Stopped!": offV8Mix,
  "DEBUG: v9 Mix Stopped!": offV9Mix,
};
function onV1Mix() {}
function onV2Mix() {}
function onV3Mix() {}
function onV4Mix() {}
function onV5Mix() {}
function onV6Mix() {}
function onV7Mix() {}
function onV8Mix() {}
function onV9Mix() {}
function offV1Mix() {}
function offV2Mix() {}
function offV3Mix() {}
function offV4Mix() {}
function offV5Mix() {}
function offV6Mix() {}
function offV7Mix() {}
function offV8Mix() {}
function offV9Mix() {}
function offV1Polo0() {}
function offV1Polo1() {}
function offV1Polo2() {}
function offV1Polo3() {}
function offV1Polo4() {}
function offV1Polo5() {}
function offV1Polo6() {}
function offV1Polo7() {}
function offV1Polo8() {}
function offV1Polo9() {}
function offV1Polo10() {}
function offV1Polo11() {}
function offV1Polo12() {}
function offV1Polo13() {}
function offV1Polo14() {}
function offV1Polo15() {}
function offV1Polo16() {}
function offV1Polo17() {}
function offV1Polo18() {}
function offV1Polo19() {}
function offV1Polo20() {}
function offV1Polo21() {}
function offV1Polo22() {}
function offV1Polo23() {}
function offV2Polo0() {}
function offV2Polo1() {}
function offV2Polo2() {}
function offV2Polo3() {}
function offV2Polo4() {}
function offV2Polo5() {}
function offV2Polo6() {}
function offV2Polo7() {}
function offV2Polo8() {}
function offV2Polo9() {}
function offV2Polo10() {}
function offV2Polo11() {}
function offV2Polo12() {}
function offV2Polo13() {}
function offV2Polo14() {}
function offV2Polo15() {}
function offV2Polo16() {}
function offV2Polo17() {}
function offV2Polo18() {}
function offV2Polo19() {}
function offV2Polo20() {}
function offV2Polo21() {}
function offV2Polo22() {}
function offV2Polo23() {}
function offV3Polo0() {}
function offV3Polo1() {}
function offV3Polo2() {}
function offV3Polo3() {}
function offV3Polo4() {}
function offV3Polo5() {}
function offV3Polo6() {}
function offV3Polo7() {}
function offV3Polo8() {}
function offV3Polo9() {}
function offV3Polo10() {}
function offV3Polo11() {}
function offV3Polo12() {}
function offV3Polo13() {}
function offV3Polo14() {}
function offV3Polo15() {}
function offV3Polo16() {}
function offV3Polo17() {}
function offV3Polo18() {}
function offV3Polo19() {}
function offV3Polo20() {}
function offV3Polo21() {}
function offV3Polo22() {}
function offV3Polo23() {}
function offV4Polo0() {}
function offV4Polo1() {}
function offV4Polo2() {}
function offV4Polo3() {}
function offV4Polo4() {}
function offV4Polo5() {}
function offV4Polo6() {}
function offV4Polo7() {}
function offV4Polo8() {}
function offV4Polo9() {}
function offV4Polo10() {}
function offV4Polo11() {}
function offV4Polo12() {}
function offV4Polo13() {}
function offV4Polo14() {}
function offV4Polo15() {}
function offV4Polo16() {}
function offV4Polo17() {}
function offV4Polo18() {}
function offV4Polo19() {}
function offV4Polo20() {}
function offV4Polo21() {}
function offV4Polo22() {}
function offV4Polo23() {}
function offV5Polo0() {}
function offV5Polo1() {}
function offV5Polo2() {}
function offV5Polo3() {}
function offV5Polo4() {}
function offV5Polo5() {}
function offV5Polo6() {}
function offV5Polo7() {}
function offV5Polo8() {}
function offV5Polo9() {}
function offV5Polo10() {}
function offV5Polo11() {}
function offV5Polo12() {}
function offV5Polo13() {}
function offV5Polo14() {}
function offV5Polo15() {}
function offV5Polo16() {}
function offV5Polo17() {}
function offV5Polo18() {}
function offV5Polo19() {}
function offV5Polo20() {}
function offV5Polo21() {}
function offV5Polo22() {}
function offV5Polo23() {}
function offV6Polo0() {}
function offV6Polo1() {}
function offV6Polo2() {}
function offV6Polo3() {}
function offV6Polo4() {}
function offV6Polo5() {}
function offV6Polo6() {}
function offV6Polo7() {}
function offV6Polo8() {}
function offV6Polo9() {}
function offV6Polo10() {}
function offV6Polo11() {}
function offV6Polo12() {}
function offV6Polo13() {}
function offV6Polo14() {}
function offV6Polo15() {}
function offV6Polo16() {}
function offV6Polo17() {}
function offV6Polo18() {}
function offV6Polo19() {}
function offV6Polo20() {}
function offV6Polo21() {}
function offV6Polo22() {}
function offV6Polo23() {}
function offV7Polo0() {}
function offV7Polo1() {}
function offV7Polo2() {}
function offV7Polo3() {}
function offV7Polo4() {}
function offV7Polo5() {}
function offV7Polo6() {}
function offV7Polo7() {}
function offV7Polo8() {}
function offV7Polo9() {}
function offV7Polo10() {}
function offV7Polo11() {}
function offV7Polo12() {}
function offV7Polo13() {}
function offV7Polo14() {}
function offV7Polo15() {}
function offV7Polo16() {}
function offV7Polo17() {}
function offV7Polo18() {}
function offV7Polo19() {}
function offV7Polo20() {}
function offV7Polo21() {}
function offV7Polo22() {}
function offV7Polo23() {}
function offV8Polo0() {}
function offV8Polo1() {}
function offV8Polo2() {}
function offV8Polo3() {}
function offV8Polo4() {}
function offV8Polo5() {}
function offV8Polo6() {}
function offV8Polo7() {}
function offV8Polo8() {}
function offV8Polo9() {}
function offV8Polo10() {}
function offV8Polo11() {}
function offV8Polo12() {}
function offV8Polo13() {}
function offV8Polo14() {}
function offV8Polo15() {}
function offV8Polo16() {}
function offV8Polo17() {}
function offV8Polo18() {}
function offV8Polo19() {}
function offV8Polo20() {}
function offV8Polo21() {}
function offV8Polo22() {}
function offV8Polo23() {}
function offV9Polo0() {}
function offV9Polo1() {}
function offV9Polo2() {}
function offV9Polo3() {}
function offV9Polo4() {}
function offV9Polo5() {}
function offV9Polo6() {}
function offV9Polo7() {}
function offV9Polo8() {}
function offV9Polo9() {}
function offV9Polo10() {}
function offV9Polo11() {}
function offV9Polo12() {}
function offV9Polo13() {}
function offV9Polo14() {}
function offV9Polo15() {}
function offV9Polo16() {}
function offV9Polo17() {}
function offV9Polo18() {}
function offV9Polo19() {}
function offV9Polo20() {}
function offV9Polo21() {}
function offV9Polo22() {}
function offV9Polo23() {}
function onLockedIcon1() {}
function onLockedIcon2() {}
function onLockedIcon3() {}
function onLockedIcon4() {}
function onLockedIcon5() {}
function onLockedIcon6() {}
function onLockedIcon7() {}
function onLockedIcon8() {}
function onLockedIcon9() {}
function onLockedIcon10() {}
function onLockedIcon11() {}
function onLockedIcon12() {}
function onLockedIcon13() {}
function onLockedIcon14() {}
function onLockedIcon15() {}
function onLockedIcon16() {}
function onLockedIcon17() {}
function onLockedIcon18() {}
function onLockedIcon19() {}
function onLockedIcon20() {}
function onLockedIcon() {}
function onV1Bonus1Started() {}
function onV1Bonus2Started() {}
function onV1Bonus3Started() {}
function onV2Bonus1Started() {}
function onV2Bonus2Started() {}
function onV2Bonus3Started() {}
function onV3Bonus1Started() {}
function onV3Bonus2Started() {}
function onV3Bonus3Started() {}
function onV4Bonus1Started() {}
function onV4Bonus2Started() {}
function onV4Bonus3Started() {}
function onV5Bonus1Started() {}
function onV5Bonus2Started() {}
function onV5Bonus3Started() {}
function onV6Bonus1Started() {}
function onV6Bonus2Started() {}
function onV6Bonus3Started() {}
function onV7Bonus1Started() {}
function onV7Bonus2Started() {}
function onV7Bonus3Started() {}
function onV8Bonus1Started() {}
function onV8Bonus2Started() {}
function onV8Bonus3Started() {}
function onV9Bonus1Started() {}
function onV9Bonus2Started() {}
function onV9Bonus3Started() {}
function onV1Start() {}
function onV2Start() {}
function onV3Start() {}
function onV4Start() {}
function onV5Start() {}
function onV6Start() {}
function onV7Start() {}
function onV8Start() {}
function onV9Start() {}
function onV1Bonus1Finished() {}
function onV1Bonus2Finished() {}
function onV1Bonus3Finished() {}
function onV2Bonus1Finished() {}
function onV2Bonus2Finished() {}
function onV2Bonus3Finished() {}
function onV3Bonus1Finished() {}
function onV3Bonus2Finished() {}
function onV3Bonus3Finished() {}
function onV4Bonus1Finished() {}
function onV4Bonus2Finished() {}
function onV4Bonus3Finished() {}
function onV5Bonus1Finished() {}
function onV5Bonus2Finished() {}
function onV5Bonus3Finished() {}
function onV6Bonus1Finished() {}
function onV6Bonus2Finished() {}
function onV6Bonus3Finished() {}
function onV7Bonus1Finished() {}
function onV7Bonus2Finished() {}
function onV7Bonus3Finished() {}
function onV8Bonus1Finished() {}
function onV8Bonus2Finished() {}
function onV8Bonus3Finished() {}
function onV9Bonus1Finished() {}
function onV9Bonus2Finished() {}
function onV9Bonus3Finished() {}
function onV1Polo0() {}
function onV1Polo1() {}
function onV1Polo2() {}
function onV1Polo3() {}
function onV1Polo4() {}
function onV1Polo5() {}
function onV1Polo6() {}
function onV1Polo7() {}
function onV1Polo8() {}
function onV1Polo9() {}
function onV1Polo10() {}
function onV1Polo11() {}
function onV1Polo12() {}
function onV1Polo13() {}
function onV1Polo14() {}
function onV1Polo15() {}
function onV1Polo16() {}
function onV1Polo17() {}
function onV1Polo18() {}
function onV1Polo19() {}
function onV1Polo20() {}
function onV1Polo21() {}
function onV1Polo22() {}
function onV1Polo23() {}
function onV2Polo0() {}
function onV2Polo1() {}
function onV2Polo2() {}
function onV2Polo3() {}
function onV2Polo4() {}
function onV2Polo5() {}
function onV2Polo6() {}
function onV2Polo7() {}
function onV2Polo8() {}
function onV2Polo9() {}
function onV2Polo10() {}
function onV2Polo11() {}
function onV2Polo12() {}
function onV2Polo13() {}
function onV2Polo14() {}
function onV2Polo15() {}
function onV2Polo16() {}
function onV2Polo17() {}
function onV2Polo18() {}
function onV2Polo19() {}
function onV2Polo20() {}
function onV2Polo21() {}
function onV2Polo22() {}
function onV2Polo23() {}
function onV3Polo0() {}
function onV3Polo1() {}
function onV3Polo2() {}
function onV3Polo3() {}
function onV3Polo4() {}
function onV3Polo5() {}
function onV3Polo6() {}
function onV3Polo7() {}
function onV3Polo8() {}
function onV3Polo9() {}
function onV3Polo10() {}
function onV3Polo11() {}
function onV3Polo12() {}
function onV3Polo13() {}
function onV3Polo14() {}
function onV3Polo15() {}
function onV3Polo16() {}
function onV3Polo17() {}
function onV3Polo18() {}
function onV3Polo19() {}
function onV3Polo20() {}
function onV3Polo21() {}
function onV3Polo22() {}
function onV3Polo23() {}
function onV4Polo0() {}
function onV4Polo1() {}
function onV4Polo2() {}
function onV4Polo3() {}
function onV4Polo4() {}
function onV4Polo5() {}
function onV4Polo6() {}
function onV4Polo7() {}
function onV4Polo8() {}
function onV4Polo9() {}
function onV4Polo10() {}
function onV4Polo11() {}
function onV4Polo12() {}
function onV4Polo13() {}
function onV4Polo14() {}
function onV4Polo15() {}
function onV4Polo16() {}
function onV4Polo17() {}
function onV4Polo18() {}
function onV4Polo19() {}
function onV4Polo20() {}
function onV4Polo21() {}
function onV4Polo22() {}
function onV4Polo23() {}
function onV5Polo0() {}
function onV5Polo1() {}
function onV5Polo2() {}
function onV5Polo3() {}
function onV5Polo4() {}
function onV5Polo5() {}
function onV5Polo6() {}
function onV5Polo7() {}
function onV5Polo8() {}
function onV5Polo9() {}
function onV5Polo10() {}
function onV5Polo11() {}
function onV5Polo12() {}
function onV5Polo13() {}
function onV5Polo14() {}
function onV5Polo15() {}
function onV5Polo16() {}
function onV5Polo17() {}
function onV5Polo18() {}
function onV5Polo19() {}
function onV5Polo20() {}
function onV5Polo21() {}
function onV5Polo22() {}
function onV5Polo23() {}
function onV6Polo0() {}
function onV6Polo1() {}
function onV6Polo2() {}
function onV6Polo3() {}
function onV6Polo4() {}
function onV6Polo5() {}
function onV6Polo6() {}
function onV6Polo7() {}
function onV6Polo8() {}
function onV6Polo9() {}
function onV6Polo10() {}
function onV6Polo11() {}
function onV6Polo12() {}
function onV6Polo13() {}
function onV6Polo14() {}
function onV6Polo15() {}
function onV6Polo16() {}
function onV6Polo17() {}
function onV6Polo18() {}
function onV6Polo19() {}
function onV6Polo20() {}
function onV6Polo21() {}
function onV6Polo22() {}
function onV6Polo23() {}
function onV7Polo0() {}
function onV7Polo1() {}
function onV7Polo2() {}
function onV7Polo3() {}
function onV7Polo4() {}
function onV7Polo5() {}
function onV7Polo6() {}
function onV7Polo7() {}
function onV7Polo8() {}
function onV7Polo9() {}
function onV7Polo10() {}
function onV7Polo11() {}
function onV7Polo12() {}
function onV7Polo13() {}
function onV7Polo14() {}
function onV7Polo15() {}
function onV7Polo16() {}
function onV7Polo17() {}
function onV7Polo18() {}
function onV7Polo19() {}
function onV7Polo20() {}
function onV7Polo21() {}
function onV7Polo22() {}
function onV7Polo23() {}
function onV8Polo0() {}
function onV8Polo1() {}
function onV8Polo2() {}
function onV8Polo3() {}
function onV8Polo4() {}
function onV8Polo5() {}
function onV8Polo6() {}
function onV8Polo7() {}
function onV8Polo8() {}
function onV8Polo9() {}
function onV8Polo10() {}
function onV8Polo11() {}
function onV8Polo12() {}
function onV8Polo13() {}
function onV8Polo14() {}
function onV8Polo15() {}
function onV8Polo16() {}
function onV8Polo17() {}
function onV8Polo18() {}
function onV8Polo19() {}
function onV8Polo20() {}
function onV8Polo21() {}
function onV8Polo22() {}
function onV8Polo23() {}
function onV9Polo0() {}
function onV9Polo1() {}
function onV9Polo2() {}
function onV9Polo3() {}
function onV9Polo4() {}
function onV9Polo5() {}
function onV9Polo6() {}
function onV9Polo7() {}
function onV9Polo8() {}
function onV9Polo9() {}
function onV9Polo10() {}
function onV9Polo11() {}
function onV9Polo12() {}
function onV9Polo13() {}
function onV9Polo14() {}
function onV9Polo15() {}
function onV9Polo16() {}
function onV9Polo17() {}
function onV9Polo18() {}
function onV9Polo19() {}
function onV9Polo20() {}
function onV9Polo21() {}
function onV9Polo22() {}
function onV9Polo23() {}
let btClockWasEnabled = !1;
function checkBtClockEnabled() {
  const o = document.getElementById("bt-clock");
  if (o && o.classList.contains("enable")) {
    if (!btClockWasEnabled) {
      btClockWasEnabled = !0;
      const o = `DEBUG: v${getVersionFromURL()} Mix started!`;
      showNotification(o, "clock"), console.log(o);
    }
  } else btClockWasEnabled = !1;
}
let wasBtClockEnabled = !1;
function checkBtClockDisabled() {
  const o = document.getElementById("bt-clock");
  if (o) {
    const n = o.classList.contains("enable");
    if (wasBtClockEnabled && !n) {
      const o = `DEBUG: v${getVersionFromURL()} Mix Stopped!`;
      showNotification(o, "clock"), console.log(o);
    }
    wasBtClockEnabled = n;
  }
}
setInterval(() => {
  checkBtClockEnabled(), checkBtClockDisabled();
});
let bpmInterval = null;
function onBPM(o, n) {
  bpmInterval && clearInterval(bpmInterval);
  bpmInterval = setInterval(() => {
    "function" == typeof n && n();
  }, (60 / o) * 1e3);
}
function offBPM() {
  bpmInterval && (clearInterval(bpmInterval), (bpmInterval = null));
}
function checkForGriser(o) {
  if (o && o.classList.contains("griser")) {
    const n = o.getAttribute("data-picto-num"),
      e = `DEBUG: v${getVersionFromURL()} Polo ${n} is being used!`;
    showNotification(e, "polo"),
      console.log(e),
      totalPolosUsed++,
      localStorage.setItem("totalPolosUsed", totalPolosUsed);
  }
}
function checkForFlashme(o) {
  if (o && o.classList.contains("flashme")) {
    const n = o.getAttribute("data-picto-num"),
      e = `DEBUG: v${getVersionFromURL()} Polo ${n} is no longer used!`;
    showNotification(e, "polo"), console.log(e);
  }
}
function debounce(o, n) {
  let e;
  return function (...t) {
    clearTimeout(e), (e = setTimeout(() => o.apply(this, t), n));
  };
}
const pictoObserver = new MutationObserver(
  debounce((o) => {
    o.forEach((o) => {
      if ("attributes" === o.type && "class" === o.attributeName) {
        const n = o.target;
        checkForGriser(n), checkForFlashme(n);
      }
    });
  }, 100)
);
function startObservingPicto() {
  document.querySelectorAll(".picto").forEach((o) => {
    pictoObserver.observe(o, { attributes: !0 });
  });
}
function handleBonusClassChanges(o) {
  const n = o.classList.contains("inprogress") && o.classList.contains("found"),
    e = o.classList.contains("playing");
  if (n && e) {
    const n = o.id.split("-")[2];
    showNotification(
      `DEBUG: v${getVersionFromURL()} Bonus ${n} is playing!`,
      "bonus"
    );
  }
  if (n && e) {
    const n = new MutationObserver(() => {
      if (!o.classList.contains("playing")) {
        const e = o.id.split("-")[2];
        showNotification(
          `DEBUG: v${getVersionFromURL()} Bonus ${e} has finished playing!`,
          "bonus-finished"
        ),
          n.disconnect(),
          totalBonusesWatched++,
          localStorage.setItem("totalBonusesWatched", totalBonusesWatched);
      }
    });
    n.observe(o, { attributes: !0, attributeFilter: ["class"] });
  }
}
startObservingPicto();
const bonusObserver = new MutationObserver((o) => {
    o.forEach((o) => {
      if ("attributes" === o.type && "class" === o.attributeName) {
        handleBonusClassChanges(o.target);
      }
    });
  }),
  bonusElements = document.querySelectorAll(".bt-bonus");
function startObservingPicto() {
  document.querySelectorAll(".picto").forEach((o) => {
    pictoObserver.observe(o, { attributes: !0, attributeFilter: ["class"] });
  });
}
function startObservingBonus() {
  document.querySelectorAll('[id^="bt-bonus"]').forEach((o) => {
    bonusObserver.observe(o, { attributes: !0, attributeFilter: ["class"] });
  });
}
bonusElements.forEach((o) => {
  bonusObserver.observe(o, { attributes: !0, attributeFilter: ["class"] });
}),
  startObservingPicto(),
  startObservingBonus();
const dynamicObserver = new MutationObserver(() => {
  startObservingPicto(), startObservingBonus();
});
function checkForPictoClassChange(o) {
  if (o) {
    const n = o.classList.contains("griser");
    if (o.classList.contains("picto") && !n) {
      const n = o.getAttribute("data-picto-num");
      showNotification(
        `DEBUG: v${getVersionFromURL()} Polo ${n} is not unused!`,
        "polo"
      );
    }
  }
}
dynamicObserver.observe(document.body, { childList: !0, subtree: !0 });
const pictoClassObserver = new MutationObserver((o) => {
  o.forEach((o) => {
    if ("attributes" === o.type && "class" === o.attributeName) {
      checkForPictoClassChange(o.target);
    }
  });
});
function startObservingPictoClassChanges() {
  document.querySelectorAll(".picto").forEach((o) => {
    pictoClassObserver.observe(o, {
      attributes: !0,
      attributeFilter: ["class"],
    });
  });
}
function RemoveElement(o) {
  const n = document.getElementById(o);
  n ? n.remove() : console.warn(`Element with ID '${o}' not found.`);
}
function CreateElement(o, n = "div", e = "") {
  if (document.getElementById(o))
    return void console.warn(`Element with ID '${o}' already exists.`);
  const t = document.createElement(n);
  (t.id = o), (t.innerHTML = e), document.body.appendChild(t);
}
function applyStoredColors() {
  let o = JSON.parse(localStorage.getItem("iconColors"));
  if (o)
    for (let n in o) {
      let e = o[n];
      document.documentElement.style.setProperty(`--${n}`, e);
    }
}
function ChangeColorBG(o, n, e) {
  if (BGorFadeOutsOn) {
    const t = document.createElement("div");
    t.classList.add("fade-bg"),
      (t.style.position = "fixed"),
      (t.style.top = "0"),
      (t.style.left = "0"),
      (t.style.width = "100%"),
      (t.style.height = "100%"),
      (t.style.backgroundColor = o),
      (t.style.zIndex = "-9999"),
      (t.style.transition = `opacity ${n}ms ease-out`),
      (t.style.opacity = "1"),
      document.body.appendChild(t),
      e ||
        (setTimeout(() => {
          t.style.opacity = "0";
        }, 10),
        setTimeout(() => {
          t.remove();
        }, n));
  }
}
showNotification(`DEBUG: v${getVersionFromURL()} just started!`),
  startObservingPictoClassChanges(),
  totalVersionsOppened++,
  localStorage.setItem("totalVersionsOppened", totalVersionsOppened),
  fetch("versions.xml")
    .then((o) => o.text())
    .then((o) => {
      let n = new DOMParser()
          .parseFromString(o, "text/xml")
          .getElementsByTagName("line"),
        e = document.getElementById("sp-select"),
        t = "";
      for (let s = 0; s < n.length; s++) {
        let c = document.createElement("div");
        c.classList.add("sp-line"), e.appendChild(c);
        let f = n[s].getElementsByTagName("icon");
        for (let u = 0; u < f.length; u++) {
          let a = f[u].getAttribute("ID"),
            r = f[u].getAttribute("color"),
            d = f[u].getAttribute("name"),
            P = f[u].getAttribute("customIcon"),
            g = f[u].getAttribute("locked"),
            V = "true" === f[u].getAttribute("customName"),
            v = "true" === f[u].getAttribute("hidden"),
            m = document.createElement("div");
          m.classList.add("vicon"),
            (m.id = "icon" + a),
            (m.dataset.name = d),
            (m.dataset.color = r),
            (m.dataset.locked = g);
          let B = document.createElement("div");
          P
            ? ((B = document.createElement("img")),
              (B.id = "customicon"),
              (B.src = P),
              (B.alt = d))
            : B.classList.add("img"),
            m.appendChild(B),
            (m.innerHTML += V
              ? `<div id="customIconName" style="color: ${r};">${d}</div>`
              : '<div class="txt"></div> \x3c!-- Exists but empty --\x3e'),
            "true" !== g &&
              (m.innerHTML +=
                '\n                        <div class="bul">\n                          <svg class="icn-svg"><use xlink:href="#ic-check"></use></svg>\n                        </div>\n                    '),
            v && (m.style.display = "none"),
            c.appendChild(m),
            (t += `--colV${a}: ${r};\n`);
          let p = JSON.parse(localStorage.getItem("iconColors")) || {};
          function i(o) {
            "true" === m.dataset.locked
              ? (o.preventDefault(),
                showNotification("Trying to open locked icon " + a),
                showNotification("Trying to open locked icon", "locked"),
                RemoveElement("lock-all"),
                RemoveElement("fade-all"),
                document
                  .querySelectorAll('.vicon[data-locked="true"]')
                  .forEach((o) => {
                    o.classList.remove("open", "clicked");
                  }))
              : (o.stopPropagation(),
                CreateElement("lock-all", "div"),
                CreateElement("fade-all", "div"),
                OnDelayIn(900, () => {
                  setTimeout(() => {
                    window.location.href = "app.html?v=" + a;
                  }, 10);
                }));
          }
          (p[`colV${a}`] = r),
            localStorage.setItem("iconColors", JSON.stringify(p)),
            m.addEventListener("click", i, { passive: !1 }),
            m.addEventListener("touchstart", i, { passive: !1 });
        }
      }
      let l = document.createElement("style");
      (l.innerHTML = `:root {\n${t}}`),
        document.head.appendChild(l),
        applyStoredColors();
    })
    .catch((o) => console.error("Error loading XML:", o));
const messageQueue = [];
function QuickMessage(o, n = 2e3) {
  if (LyricsOn) {
    const e = document.createElement("div");
    e.classList.add("quickmessage"),
      (e.innerHTML = o),
      (e.style.position = "fixed"),
      (e.style.left = "50%"),
      (e.style.bottom = "50px"),
      (e.style.transform = "translateX(-50%) translateY(20px)"),
      (e.style.zIndex = "9999"),
      (e.style.opacity = "0"),
      (e.style.transition =
        "opacity 0.3s ease, transform 0.3s ease, bottom 0.3s ease"),
      document.body.appendChild(e),
      messageQueue.unshift(e),
      updateMessagePositions(),
      setTimeout(() => {
        (e.style.opacity = "1"),
          (e.style.transform = "translateX(-50%) translateY(0px)");
      }, 10),
      setTimeout(() => {
        (e.style.opacity = "0"),
          (e.style.transform = "translateX(-50%) translateY(20px)"),
          setTimeout(() => {
            e.remove(), messageQueue.pop(), updateMessagePositions();
          }, 300);
      }, n);
  } else console.log(`Tried to show "${o}" but Lyrics are off!`);
}
function updateMessagePositions() {
  let o = 50;
  for (let n = messageQueue.length - 1; n >= 0; n--) {
    const e = messageQueue[n],
      t = e.offsetHeight + 10;
    (e.style.bottom = `${o}px`), (o += t);
  }
}
function onKey(o, n) {
  document.addEventListener("keydown", function (e) {
    e.key === o && n();
  });
}
function OnlyOnce(o, n) {
  let e =
    JSON.parse(localStorage.getItem(`executedItems_${RegisterMod}`)) || {};
  e[o] ||
    (n(),
    (e[o] = !0),
    localStorage.setItem(`executedItems_${RegisterMod}`, JSON.stringify(e)));
}
function ClearItemID(o) {
  let n =
      JSON.parse(localStorage.getItem(`executedItems_${RegisterMod}`)) || {},
    e = JSON.parse(localStorage.getItem("storage")) || {};
  n[o] &&
    (delete n[o],
    localStorage.setItem(`executedItems_${RegisterMod}`, JSON.stringify(n))),
    e[o] && (delete e[o], localStorage.setItem("storage", JSON.stringify(e)));
}
function CleanColorBG() {
  document.querySelectorAll(".fade-bg").forEach((o) => {
    o.remove();
  });
}
function renameFile(o) {
  return o;
}
function goto(o) {
  window.location.href = `app.html?v=${o}`;
}
function getPoloSpriteImage() {
  return "polo-sprite.png";
}
function ReplacePoloSprite(o) {
  getPoloSpriteImage = () => o;
}
function checkForVicon() {
  OnDelayIn(1e3, () => {
    0 === document.querySelectorAll(".vicon").length &&
      OnDelayIn(500, () => {
        boxDialog.open(
          'It looks like you made error in <b>versions.xml</b>. Go to XML file and check for issues. <br><br> This is how XML should look like to work correctly: <br><br> <img src="img/errors/XML-error.png" style="width:340px; border-radius: 5px;">',
          "(┬┬﹏┬┬)",
          !0
        );
      });
  });
}
function ReplacePictoID(o, n) {
  const e = document.getElementById(`picto${o}`);
  e
    ? (e.setAttribute("data-picto-num", n),
      (e.id = `picto${n}`),
      console.log(
        `Picto ID and data-picto-num replaced: picto${o} -> picto${n}`
      ))
    : console.warn(`Element with ID 'picto${o}' not found.`);
}
function RemovePicto(o) {
  const n = document.getElementById(`picto${o}`);
  n
    ? (n.remove(), console.log(`Picto element with ID 'picto${o}' removed.`))
    : console.warn(`Element with ID 'picto${o}' not found.`);
}
function AddPicto(o, n) {
  const e = document.getElementById("box-picto");
  if (e) {
    let t;
    if (
      (1 === n
        ? (t = e.querySelector(".pictoline.top"))
        : 2 === n && (t = e.querySelector(".pictoline.bot")),
      t)
    ) {
      const e = document.createElement("div");
      e.classList.add("picto"),
        (e.id = `picto${o}`),
        e.setAttribute("data-picto-num", o);
      const i = document.createElement("div");
      i.classList.add("bck"),
        (i.style.backgroundImage = `url("./${app.folder}img/game-picto@2x.png")`);
      const l = document.createElement("div");
      l.classList.add("hitzone"),
        e.appendChild(i),
        e.appendChild(l),
        t.appendChild(e),
        console.log(`Picto element with ID 'picto${o}' added to line ${n}.`);
    } else console.warn(`Line container for line ${n} not found.`);
  } else console.warn("Container element not found.");
}
function unHide(o) {
  const n = document.getElementById(`icon${o}`);
  n
    ? ((n.style.display = ""),
      (n.dataset.hidden = "false"),
      console.log(`Icon with ID 'icon${o}' is now visible.`))
    : console.warn(`Element with ID 'icon${o}' not found.`);
}
function Hide(o) {
  const n = document.getElementById(`icon${o}`);
  n
    ? ((n.style.display = "none"),
      (n.dataset.hidden = "true"),
      console.log(`Icon with ID 'icon${o}' is now hidden.`))
    : console.warn(`Element with ID 'icon${o}' not found.`);
}
function ChangeMenuTitle(o) {
  const n = document.querySelector(".container .title"),
    e = document.getElementById("sp-choose");
  n
    ? ((n.textContent = o), console.log(`Menu title changed to: ${o}`))
    : console.log(
        `Cannot find ".container .title" Element wont change to "${o}"`
      ),
    e
      ? ((e.textContent = o), console.log(`Menu title changed to: ${o}`))
      : console.log(
          `Cannot find ".container .title" Element wont change to "${o}"`
        );
}
function unLock(o) {
  const n = document.getElementById(`icon${o}`);
  if (n) {
    n.dataset.locked = "false";
    n.querySelector(".bul") ||
      (n.innerHTML +=
        '\n                <div class="bul">\n                  <svg class="icn-svg"><use xlink:href="#ic-check"></use></svg>\n                </div>\n            '),
      console.log(`Icon with ID 'icon${o}' is now unlocked.`);
  } else console.warn(`Element with ID 'icon${o}' not found.`);
}
function Call(o) {
  let n = JSON.parse(localStorage.getItem("storage")) || {};
  n[o] || (n[o] = { callbacks: [], active: !1 }),
    (n[o].active = !0),
    n[o].callbacks.forEach((o) => {
      "function" == typeof o && o();
    }),
    localStorage.setItem("storage", JSON.stringify(n));
}
function Catch(o, n) {
  let e = JSON.parse(localStorage.getItem("storage")) || {};
  e[o] || (e[o] = { callbacks: [], active: !1 }),
    "function" == typeof n && (e[o].callbacks.push(n), e[o].active && n()),
    localStorage.setItem("storage", JSON.stringify(e));
}
function OnClick(o, n) {
  const e = document.getElementById(o);
  e && "function" == typeof n
    ? e.addEventListener("click", n)
    : console.error(`Element with ID '${o}' not found.`);
}
function OpenModCredits() {
  unlockAchievement(RegisterMod, "ach_12"),
    boxPopup.open({
      name: "popup-message",
      icntype: "action",
      bodyclose: !0,
      class: "modCreditsBox",
      content:
        "\n            <button class=prev onclick=prevSlide()>❮</button> <button class=next onclick=nextSlide()>❯</button><div class=gallery-container><div class=gallery-slider></div></div>\n        ",
      onBoxOpenEnd: function () {
        boxPopup.$popup
          .find(".icon.bt.bt-round.bt-44")
          .on("click", function () {
            boxPopup.close();
          });
      },
      onBoxCloseStart: function () {
        boxPopup.$popup.find(".icon.bt.bt-round.bt-44").off();
      },
      onCloseComplete: function () {
        console.log("Popup closed");
      },
    }),
    loadCredits();
}
function loadCredits() {
  fetch("mod-credits/credits.xml")
    .then((o) => o.text())
    .then((o) => new window.DOMParser().parseFromString(o, "text/xml"))
    .then((o) => {
      const n = o.querySelectorAll("page"),
        e = document.querySelector(".gallery-container .gallery-slider");
      (e.innerHTML = ""),
        n.forEach((o) => {
          let n = o.getAttribute("text"),
            t = o.getAttribute("title");
          const i = o.getAttribute("image"),
            l = "true" === o.getAttribute("noImage");
          (n = n.replace(/\(\!line\)/g, "<br>")),
            (n = n.replace(/\(\!hr\)/g, "<hr>")),
            (n = n.replace(/\(\!bold\/(.*?)\)/g, "<b>$1</b>")),
            (n = n.replace(/\(\!underline\/(.*?)\)/g, "<u>$1</u>")),
            (n = n.replace(/\(\!italic\/(.*?)\)/g, "<i>$1</i>")),
            (n = n.replace(
              /\(\!color\/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\/(.*?)\)/g,
              '<span style="color:#$1;">$2</span>'
            )),
            (n = n.replace(
              /\(\!size\/(\d+px)\/(.*?)\)/g,
              '<span style="font-size:$1;">$2</span>'
            )),
            (n = n.replace(
              /\(\!emoji\/(.*?)\)/g,
              (o, n) =>
                `<img src="mod-credits/emoji/${n}" class="credit-emoji" />`
            )),
            (n = n.replace(
              /\(\!button\/#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\/(.*?)\/(https?:\/\/[^\s]+)\/(.*?)\)/g,
              (o, n, e, t, i) =>
                `<button class="credit-button" style="background-color:#${n};" onclick="confirmNavigation('${t}')">\n                            <div class="center">\n                                    <img src="mod-credits/icons/${e}" class="button-icon"> \n                                    <span class="button-text">${i}</span>\n                                </button>\n                            </div>`
            )),
            (n = n.replace(/\(\!youtube\/(.*?)\)/g, (o, n) => {
              let e = "";
              const t = n.match(
                /(?:youtube\.com\/(?:.*v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
              );
              return (
                t && (e = t[1]),
                e
                  ? `<iframe class="credit-video" src="https://www.youtube.com/embed/${e}" frameborder="0" allowfullscreen></iframe>`
                  : '<span style="color: red;">[Invalid YouTube Link]</span>'
              );
            }));
          const s = document.createElement("div");
          if ((s.classList.add("gallery-slide"), !l)) {
            const o = document.createElement("img");
            (o.id = "credits-images"), (o.src = i), s.appendChild(o);
          }
          const c = document.createElement("div");
          (c.className = "title"), (c.innerHTML = t), s.appendChild(c);
          const f = document.createElement("div");
          (f.id = "text-credits"),
            (f.innerHTML = n),
            s.appendChild(f),
            e.appendChild(s);
        });
    })
    .catch((o) => {
      console.error("Error loading XML:", o);
    });
}
function confirmNavigation(o) {
  boxDialog.open(
    `You are about to visit: <b>${o}</b><br>Do you want to continue?`,
    "You are leaving!",
    [STR("bt.sure"), STR("bt.cancel")],
    [
      () => {
        openURL(o);
      },
      () => {
        boxDialog.close();
      },
    ]
  );
}
function moveXof(o, n) {
  const e = document.querySelector(`.${o}`);
  if (e) {
    const o = getComputedStyle(e).transform,
      t = new WebKitCSSMatrix(o).m41 + n;
    e.style.transform = `translateX(${t}px)`;
  }
}
checkForVicon(),
  (window.onload = function () {
    loadCredits();
  });
let currentSlideMod = 0;
function showSlide(o) {
  const n = document.querySelectorAll(".gallery-slide"),
    e = document.querySelector(".gallery-slider");
  currentSlideMod = o >= n.length ? 0 : o < 0 ? n.length - 1 : o;
  const t = 100 * -currentSlideMod;
  e.style.transform = `translateX(${t}%)`;
}
function nextSlide() {
  showSlide(currentSlideMod + 1);
}
function prevSlide() {
  showSlide(currentSlideMod - 1);
}
function OnClickElement(o, n) {
  const e = document.querySelector(o);
  e && "function" == typeof n && e.addEventListener("click", n);
}
function updateShakeEffectSwitch() {
  var o = document.querySelector(
    "#pop-advsetting #param-disableshake .bt-onoff"
  );
  o && o.classList.toggle("active", ShakeEffectOn);
}
function updateLyricsSwitch() {
  var o = document.querySelector(
    "#pop-advsetting #param-disablelyrics .bt-onoff"
  );
  o && o.classList.toggle("active", LyricsOn);
}
function updateBGchangesEffectSwitch() {
  var o = document.querySelector("#pop-advsetting #param-bgchanges .bt-onoff");
  o && o.classList.toggle("active", BGorFadeOutsOn);
}
function updateModSoundsEffectSwitch() {
  const o = document.querySelector(
    "#pop-advsetting #param-displaymodsounds .bt-onoff"
  );
  o && o.classList.toggle("active", ModSoundsOn);
}
function updateParticlesSwitch() {
  const o = document.querySelector(
    "#pop-advsetting #param-particleseffect .bt-onoff"
  );
  o && o.classList.toggle("active", ConfettiEffectOn);
}
function updateCursorsEffectSwitch() {
  var o = document.querySelector("#pop-advsetting #param-Cursor .bt-onoff");
  o && o.classList.toggle("active", CustomCursorsOn);
}
function resetEverything() {
  OnDelayIn(300, () => {
    localStorage.clear(),
      boxDialog.open(
        "All data has been erased!<br>\n             The game will now reset to its first-time launch state.",
        "Info",
        !1
      ),
      OnDelayIn(5500, () => {
        location.reload();
      });
  });
}
function resetAchievements() {
  const o = `achievements_${RegisterMod}`,
    n = `executedItems_${RegisterMod}`;
  OnDelayIn(300, () => {
    localStorage.getItem(o)
      ? (localStorage.removeItem(o),
        localStorage.removeItem(n),
        boxDialog.open(
          `All achievements in <b>${RegisterMod}</b> have been reset.<br>\n                 The game will restart in 2 seconds.`,
          "Info",
          !1
        ),
        OnDelayIn(2500, () => {
          location.reload();
        }))
      : boxDialog.open("No achievements found for this mod.", "", [
          STR("bt.gotit"),
        ]);
  });
}
function getElementPosition(o) {
  const n = document.querySelector(o);
  if (!n) return { x: 0.5, y: 0.5 };
  const e = n.getBoundingClientRect();
  return {
    x: (e.left + e.width / 2) / window.innerWidth,
    y: (e.top + e.height / 2) / window.innerHeight,
  };
}
function MakeConfetti(o = 2, n = 360, e = 1, t = 200, i = 100, l, s) {
  if (ConfettiEffectOn) {
    const c = getElementPosition(`#${l}`);
    confetti({
      spread: n,
      ticks: t,
      gravity: e,
      decay: 0.94,
      startVelocity: 20,
      particleCount: i,
      origin: c,
      scalar: o,
      shapes: ["image"],
      shapeOptions: { image: [{ src: s, width: 32, height: 32 }] },
    });
  }
}
function setCustomCursor(o) {
  if (CustomCursorsOn) {
    let n = document.createElement("style");
    (n.innerHTML = "* { cursor: none !important; }"),
      document.head.appendChild(n);
    let e = document.getElementById("custom-cursor");
    e ||
      ((e = document.createElement("div")),
      (e.id = "custom-cursor"),
      (e.style.position = "fixed"),
      (e.style.width = "32px"),
      (e.style.height = "32px"),
      (e.style.pointerEvents = "none"),
      (e.style.zIndex = "9999"),
      (e.style.transform = "translate(-50%, -50%)"),
      document.body.appendChild(e)),
      (e.style.background = `url('${o}') no-repeat center`),
      (e.style.backgroundSize = "contain"),
      document.addEventListener("mousemove", (o) => {
        (e.style.left = `${o.clientX}px`), (e.style.top = `${o.clientY}px`);
      });
  }
}
function Bloom(o, n = 1e3) {
  if (BGorFadeOutsOn) {
    const e = document.createElement("div");
    (e.style.position = "fixed"),
      (e.style.top = "0"),
      (e.style.left = "0"),
      (e.style.width = "100%"),
      (e.style.height = "100%"),
      (e.style.zIndex = "99999999"),
      (e.style.transition = `opacity ${n}ms ease-out`),
      (e.style.opacity = "1"),
      (e.style.pointerEvents = "none");
    const t = 0.4 * o;
    (e.style.backdropFilter = `blur(${o}px) brightness(${t})`),
      document.body.appendChild(e),
      setTimeout(() => {
        e.style.opacity = "0";
      }, 10),
      setTimeout(() => {
        e.remove();
      }, n);
  }
}
function onLoop(o, n) {
  if ("number" != typeof app.looptime || app.looptime <= 0)
    return void console.error("app.looptime must be a positive number.");
  const e = app.looptime * o;
  o <= 0
    ? boxDialog.open("Loop multiplier must be greater than zero.")
    : setInterval(n, e);
}
function Zoom(o, n, e) {
  const t = document.body;
  t.style.transition = "";
  const i = o / 100;
  n
    ? ((t.style.transition =
        "transform 1s cubic-bezier(0.55, 0.09, 0.68, 0.53)"),
      (t.style.transform = `scale(${i})`))
    : e
    ? ((t.style.transition = "transform 1s cubic-bezier(0.22, 0.61, 0.36, 1)"),
      (t.style.transform = `scale(${i})`))
    : (t.style.transform = `scale(${i})`);
}
function onKeyHold(o, n, e) {
  let t = !1;
  document.addEventListener("keydown", function (n) {
    n.key === o && (t = !0);
  }),
    document.addEventListener("keyup", function (n) {
      n.key === o && (t = !1);
    }),
    document.addEventListener("keydown", function (o) {
      t && o.key === n && e();
    });
}
document.addEventListener("DOMContentLoaded", function () {
  const o = document.getElementById("home-bt-info"),
    n = document.getElementById("home-bt-modcredits");
  new MutationObserver((e) => {
    e.forEach((e) => {
      "attributes" === e.type &&
        "class" === e.attributeName &&
        (o.classList.contains("animate")
          ? n.classList.add("animate")
          : n.classList.remove("animate"));
    });
  }).observe(o, { attributes: !0 });
}),
  OnClickElement(".bt-modcredits", () => {
    OpenModCredits();
  }),
  OnClick("ShakeeffectsButton", () => {
    (ShakeEffectOn = !ShakeEffectOn),
      updateShakeEffectSwitch(),
      localStorage.setItem("ShakeEffectOn", ShakeEffectOn);
  }),
  updateShakeEffectSwitch(),
  OnClick("LyricsDebulgButton", () => {
    (LyricsOn = !LyricsOn),
      updateLyricsSwitch(),
      localStorage.setItem("LyricsOn", LyricsOn);
  }),
  updateLyricsSwitch(),
  OnClick("bgchangesbutton", () => {
    (BGorFadeOutsOn = !BGorFadeOutsOn),
      updateBGchangesEffectSwitch(),
      localStorage.setItem("BGorFadeOutsOn", BGorFadeOutsOn);
  }),
  updateBGchangesEffectSwitch(),
  OnClick("displaymodsoundsButton", () => {
    (ModSoundsOn = !ModSoundsOn),
      updateModSoundsEffectSwitch(),
      localStorage.setItem("ModSoundsOn", ModSoundsOn);
  }),
  updateModSoundsEffectSwitch(),
  OnClick("particleseffectbutton", () => {
    (ConfettiEffectOn = !ConfettiEffectOn),
      updateParticlesSwitch(),
      localStorage.setItem("ConfettiEffectOn", ConfettiEffectOn),
      SomeTimes(0.1, () => {
        MakeConfetti(
          2.5,
          360,
          0,
          400,
          50,
          "custom-cursor",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/718smiley.svg/1200px-718smiley.svg.png"
        ),
          OnDelayIn(1e3, () => {
            MakeConfetti(
              2.5,
              360,
              0,
              400,
              41,
              "custom-cursor",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/718smiley.svg/1200px-718smiley.svg.png"
            );
          }),
          OnDelayIn(2e3, () => {
            MakeConfetti(
              2.5,
              360,
              0,
              400,
              29,
              "custom-cursor",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/718smiley.svg/1200px-718smiley.svg.png"
            );
          }),
          OnDelayIn(3300, () => {
            MakeConfetti(
              2.5,
              360,
              0,
              400,
              11,
              "custom-cursor",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/718smiley.svg/1200px-718smiley.svg.png"
            );
          });
      });
  }),
  updateParticlesSwitch(),
  OnClick("Cursorbuttoneffect", () => {
    (CustomCursorsOn = !CustomCursorsOn),
      updateCursorsEffectSwitch(),
      localStorage.setItem("CustomCursorsOn", CustomCursorsOn);
  }),
  updateCursorsEffectSwitch(),
  OnClick("info-bgchanges", () => {
    boxDialog.open(
      "Disables all dynamic background effects.<br><b>Warning:</b> Do not enable this if you have epilepsy!",
      "",
      [STR("bt.gotit")]
    );
  }),
  OnClick("info-shakeEffects", () => {
    boxDialog.open(
      "Disables all screen-shaking effects in the mod.<br>Useful if they are overused or cause discomfort.",
      "",
      [STR("bt.gotit")]
    );
  }),
  OnClick("info-disablelyrics", () => {
    boxDialog.open(
      "Disables the lyrics text that may appear<br>at the bottom of the screen.",
      "",
      [STR("bt.gotit")]
    );
  }),
  OnClick("info-displaymodsounds", () => {
    boxDialog.open(
      "Disables custom sounds added by the mod.<br>Vanilla Incredibox sounds will not be affected.",
      "",
      [STR("bt.gotit")]
    );
  }),
  OnClick("info-particleseffect", () => {
    boxDialog.open(
      "Disables confetti and particle effects.<br>Recommended for low-performance devices.",
      "",
      [STR("bt.gotit")]
    );
  }),
  OnClick("info-Cursor", () => {
    boxDialog.open(
      "Disables the custom cursor that may appear in this mod. (PC only)",
      "",
      [STR("bt.gotit")]
    );
  }),
  OnClick("info-achi-reset", () => {
    boxDialog.open(
      "Resets all achievement progress in this mod.<br><b>This action cannot be undone.</b>",
      "",
      [STR("bt.gotit")]
    );
  }),
  OnClick("action-reset-achi", () => {
    boxDialog.open(
      "Are you sure you want to reset all achievement progress in this mod?<br><b>This action cannot be undone.</b>",
      "",
      [STR("bt.sure"), STR("bt.cancel")],
      [
        () => {
          resetAchievements();
        },
        () => {
          boxDialog.close();
        },
      ]
    );
  }),
  OnClick("info-all-reset", () => {
    boxDialog.open(
      "Resets everything: bonuses, achievements, all your mixes, and progress.<br>\n         <b>This applies to all mods and the official game.</b>",
      "",
      [STR("bt.gotit")]
    );
  }),
  OnClick("action-reset-all", () => {
    boxDialog.open(
      "Are you sure you want to reset everything?<br>\n         This will erase <b>all progress</b> across <b>every mod</b> and the <b>official game</b>, including:<br>\n         • Achievements<br>\n         • Mixes<br>\n         • Bonuses<br>\n         • Other saved data<br>\n         <b>This cannot be undone.</b>",
      "",
      [STR("bt.sure"), STR("bt.cancel")],
      [
        () => {
          OnDelayIn(300, () => {
            boxDialog.open(
              "Are you absolutely sure? <br>\n                         <b>This action is can not be undone, and you will lose everything!</b>",
              "Last Warning",
              [STR("bt.sure"), STR("bt.cancel")],
              [
                () => {
                  resetEverything();
                },
                () => {
                  boxDialog.close();
                },
              ]
            );
          });
        },
        () => {
          boxDialog.close();
        },
      ]
    );
  }),
  document.addEventListener("mousemove", (o) => {
    const n = document.getElementById("custom-cursor");
    (n.style.left = `${o.clientX}px`), (n.style.top = `${o.clientY}px`);
  }),
  onKeyHold("I", "!", function () {
    QuickMessage(
      `\n        <span style="color: ${app.col1}">Version data:</span><br><br>\n        <div class="modding-build">\n        Name: ${app.name} v${app.version}<br>\n        Date: ${app.date}<br>\n        Folder: ${app.folder}<br>\n        BPM: ${app.bpm}<br>\n        Looptime: ${app.looptime}<br>\n        Totalframe: ${app.totalframe}</div><br><hr>\n        <span style="color: ${app.col0}">■ </span><span style="color: ${app.col1}">■ </span><span style="color: ${app.col2}">■ </span>\n        <span style="color: ${app.col3}">■ </span><span style="color: ${app.col4}">■ </span>\n\n    `,
      8e3
    );
  }),
  onKeyHold("I", "@", function () {
    QuickMessage(
      `\n        <span style="color: ${app.col1}">Rem's Modding Build v0.9.4</span><br><hr><br>\n        <div class="modding-build">\n            <span style="text-align: right !important;">Mod Name: ${RegisterMod}</span><br>\n            <span style="text-align: right !important;">Mod Version: v${RegisterModVersion}</span><br>\n            <span style="text-align: right !important;">Developer: ${ModDeveloper}</span><br>\n        </div>\n    `,
      8e3
    );
  }),
  onKeyHold("I", "#", function () {
    QuickMessage(
      `\n        <span style="color: ${
        app.col1
      }">ADV. OPTIONS</span><br><hr><br>\n        <div class="modding-build">\n            Background Changes: ${
        BGorFadeOutsOn ? "ON" : "OFF"
      }<br>\n            Shake Effects: ${
        ShakeEffectOn ? "ON" : "OFF"
      }<br>\n            Lyrics: ${
        LyricsOn ? "ON" : "OFF"
      }<br>\n            Mod Sounds: ${
        ModSoundsOn ? "ON" : "OFF"
      }<br>\n            Particles Effects: ${
        ConfettiEffectOn ? "ON" : "OFF"
      }<br>\n            Custom Cursors: ${
        CustomCursorsOn ? "ON" : "OFF"
      }<br>\n        </div>\n    `,
      8e3
    );
  }),
  onKeyHold("I", "$", function () {
    let o = app.animearray
      .map(
        (o) =>
          `\n        <div>\n            <b>${
            o.name
          }</b> / \n            <span style="color: #${
            o.color
          }">■</span> /\n            2 loops: ${
            o.uniqsnd ? "No" : "Yes"
          }\n        </div>\n    `
      )
      .join("");
    QuickMessage(
      `\n        <span style="color: ${app.col1}">Character's INFO</span><br><hr><br>\n        <div class="modding-build">\n            ${o}\n        </div>\n    `,
      1e4
    );
  }),
  onKeyHold("I", "%", function () {
    let o =
        (parseInt(localStorage.getItem("totalTimeSpent")) || 0) +
        Math.floor((Date.now() - sessionStartTime) / 1e3),
      n = Math.floor(o / 3600),
      e = Math.floor((o % 3600) / 60),
      t = o % 60,
      i = `${n.toString().padStart(2, "0")}:${e.toString().padStart(2, "0")}:${t
        .toString()
        .padStart(2, "0")}`;
    QuickMessage(
      `\n        <span style="color: ${app.col1}">Your Info!</span><br><hr><br>\n        <div class="modding-build">\n            • ${i} Of playing mods <br>\n            • ${totalBonusesWatched} Bonuses watched <br>\n            • ${totalVersionsOppened} Versions oppened <br>  \n            • ${totalPolosUsed} Polos used <br>            \n        </div>\n    `,
      8e3
    );
  }),
  onKeyHold("I", "^", function () {
    window.location.href = "js/mod-libs/index.html";
  });
const DB_NAME = "ModLibraryDB",
  DB_VERSION = 3;
function openDatabase(o) {
  const n = indexedDB.open(DB_NAME, 3);
  (n.onupgradeneeded = function (o) {
    let n = o.target.result;
    n.objectStoreNames.contains("modIcons") ||
      n.createObjectStore("modIcons", { keyPath: "modName" }),
      n.objectStoreNames.contains("modAchievements") ||
        n.createObjectStore("modAchievements", { keyPath: "modName" });
  }),
    (n.onsuccess = function (n) {
      o(n.target.result);
    }),
    (n.onerror = function (o) {
      console.error("❌ Error opening database:", o.target.error);
    });
}
const RegisterModIcon = "js/mod-icon.png",
  RegisterModBackground = "js/mod-background.png",
  dbRequest = indexedDB.open("ModLibraryDB", 2);
function registerMod() {
  let o, n;
  console.log("Starting mod registration..."),
    fetch(RegisterModIcon)
      .then((o) => {
        if ((console.log("Fetched icon, status:", o.status), !o.ok))
          throw new Error("Icon file not found!");
        return o.blob();
      })
      .then((n) => {
        if (
          (console.log("Icon Blob received, size:", n.size, "type:", n.type),
          !(n.size > 1536e3))
        )
          return (o = n), fetch(RegisterModBackground);
        OnDelayIn(500, function () {
          boxDialog.open(
            "Icon is too large! Please use an image under 1.5MB.",
            "Icon Upload Failed"
          );
        });
      })
      .then((o) => {
        if ((console.log("Fetched background, status:", o.status), !o.ok))
          throw new Error("Background file not found!");
        return o.blob();
      })
      .then((e) => {
        if (
          (console.log(
            "Background Blob received, size:",
            e.size,
            "type:",
            e.type
          ),
          !(e.size > 256e4))
        )
          return (n = e), processImages(o, n);
        OnDelayIn(500, function () {
          boxDialog.open(
            "Background is too large! Please use an image under 2.5MB.",
            "Background Upload Failed"
          );
        });
      })
      .then(({ base64Icon: o, base64Background: n }) => {
        console.log("Base64 conversion complete, saving to IndexedDB...");
        const e = indexedDB.open("ModLibraryDB", 2);
        (e.onerror = function () {
          console.error("IndexedDB failed to open!");
        }),
          (e.onsuccess = function (e) {
            e.target.result
              .transaction("modIcons", "readwrite")
              .objectStore("modIcons")
              .put({
                name: RegisterMod,
                version: RegisterModVersion,
                developer: ModDeveloper,
                icon: o,
                background: n,
                lastPlayed: Date.now(),
              }),
              console.log("Mod saved successfully!");
          });
      })
      .catch((o) => {
        console.error("Fetch or processing error:", o),
          boxDialog.open("Failed to load mod assets: " + o.message, "Error");
      });
}
function processImages(o, n) {
  return new Promise((e, t) => {
    let i,
      l,
      s = new FileReader(),
      c = new FileReader();
    (s.onload = () => {
      (i = s.result), l && e({ base64Icon: i, base64Background: l });
    }),
      (c.onload = () => {
        (l = c.result), i && e({ base64Icon: i, base64Background: l });
      }),
      (s.onerror = c.onerror = () => t(new Error("Failed to process images"))),
      s.readAsDataURL(o),
      c.readAsDataURL(n);
  });
}
function updateLastPlayed(o) {
  const n = indexedDB.open("ModLibraryDB", 2);
  (n.onsuccess = function (n) {
    let e = n.target.result
        .transaction("modIcons", "readwrite")
        .objectStore("modIcons"),
      t = e.get(o);
    (t.onsuccess = function () {
      let n = t.result;
      n
        ? ((n.lastPlayed = Date.now()),
          e.put(n),
          console.log(`Updated last played time for ${o}`))
        : console.warn(`Mod "${o}" not found in IndexedDB.`);
    }),
      (t.onerror = function () {
        console.error("Error retrieving mod data from IndexedDB.");
      }),
      e.put(modData);
  }),
    (n.onerror = function () {
      console.error("Error opening IndexedDB.");
    });
}
function getLastPlayed(o, n) {
  const e = indexedDB.open("ModLibraryDB", 2);
  (e.onsuccess = function (e) {
    let t = e.target.result
      .transaction("modIcons", "readonly")
      .objectStore("modIcons")
      .get(o);
    (t.onsuccess = function () {
      let o = t.result;
      if (o && o.lastPlayed) {
        let e = timeSince(o.lastPlayed);
        n(e);
      } else n("Never played");
    }),
      (t.onerror = function () {
        console.error("Error retrieving mod data from IndexedDB."),
          n("Unknown");
      });
  }),
    (e.onerror = function () {
      console.error("Error opening IndexedDB."), n("Unknown");
    });
}
(dbRequest.onupgradeneeded = function (o) {
  let n = o.target.result;
  n.objectStoreNames.contains("modIcons") ||
    n.createObjectStore("modIcons", { keyPath: "name" });
}),
  (dbRequest.onerror = function () {
    console.error("Error opening IndexedDB.");
  }),
  registerMod(),
  getLastPlayed(RegisterMod),
  OnClick("tab-modhistory", function () {
    window.location.href = "js/mod-libs/index.html";
  }),
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("lastPage", window.location.href);
  });
let AchievementON = !1;
function showAchiNotificationDot() {
  let o = document.querySelector(".notification__achi");
  o &&
    (achiNotificationDot > 0
      ? (o.classList.add("show"),
        (o.innerText =
          achiNotificationDot >= 1e6
            ? (achiNotificationDot / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
            : achiNotificationDot >= 1e3
            ? (achiNotificationDot / 1e3).toFixed(1).replace(/\.0$/, "") + "K"
            : achiNotificationDot))
      : (o.classList.remove("show"), (o.innerText = "")));
}
function setAchievement(o, n, e, t, i, l, s) {
  let c = JSON.parse(localStorage.getItem(`achievements_${o}`)) || {};
  AchievementON || (AchievementON = !0),
    c[n] ||
      (c[n] = {
        status: "locked",
        icon: e,
        name: t,
        description: i,
        type: l,
        progress: 0,
        maxProgress: s,
      }),
    localStorage.setItem(`achievements_${o}`, JSON.stringify(c));
}
function addProgressAchievement(o, n, e) {
  let t = JSON.parse(localStorage.getItem(`achievements_${o}`)) || {};
  if (t[n]) {
    if ("unlocked" === t[n].status) return;
    let i = t[n].maxProgress;
    if (void 0 === i) return;
    (t[n].progress += e),
      t[n].progress >= i &&
        ((t[n].progress = i),
        (t[n].status = "unlocked"),
        console.log(`🎉 Achievement "${n}" unlocked!`)),
      localStorage.setItem(`achievements_${o}`, JSON.stringify(t)),
      updateProgressUI(n, t[n].progress, i);
  }
}
function updateProgressUI(o, n, e) {
  document.querySelectorAll(".achievement").forEach((t) => {
    let i = t.querySelector(".title");
    if (i && i.textContent.includes(o)) {
      let o = t.querySelector("progress");
      o && ((o.value = n), (o.max = e));
    }
  });
}
function addProgressAchievement(o, n, e) {
  let t = JSON.parse(localStorage.getItem(`achievements_${o}`)) || {};
  if (t[n]) {
    if ("unlocked" === t[n].status)
      return void console.log(`🏆 Achievement "${n}" is already unlocked!`);
    let i = t[n],
      l = i.maxProgress;
    if (void 0 === l)
      return void console.warn(
        `⚠️ Achievement "${n}" has no max progress defined!`
      );
    (i.progress += e),
      i.progress >= l &&
        ((i.progress = l),
        (i.status = "unlocked"),
        console.log(`🎉 Achievement "${n}" unlocked!`),
        showAchievementNotification(i.name, i.icon, i.description)),
      localStorage.setItem(`achievements_${o}`, JSON.stringify(t)),
      document.querySelectorAll(".achievement-info progress").forEach((o) => {
        o.closest(".achievement").querySelector(".title").innerText ===
          i.name && ((o.value = i.progress), (o.max = l));
      }),
      displayAchievements(RegisterMod);
  } else console.warn(`⚠️ Achievement "${n}" not found!`);
}
function unlockAchievement(o, n) {
  let e = JSON.parse(localStorage.getItem(`achievements_${o}`)) || {};
  if (!e[n]) return void console.warn(`⚠️ Achievement "${n}" not found.`);
  let t = e[n];
  "unlocked" !== t.status &&
    ((t.status = "unlocked"),
    localStorage.setItem(`achievements_${o}`, JSON.stringify(e)),
    console.log(`✅ Achievement "${n}" unlocked!`),
    showAchievementNotification(t.name, t.icon, t.description),
    displayAchievements(o),
    (achiNotificationDot += 1),
    localStorage.setItem("achiNotificationDot", achiNotificationDot),
    showAchiNotificationDot());
}
function showAchievementNotification(o, n, e) {
  let t = document.getElementById("achievement-container");
  t ||
    ((t = document.createElement("div")),
    (t.id = "achievement-container"),
    document.body.appendChild(t));
  let i = document.createElement("div");
  i.classList.add("achievement-notification");
  let l = `img/mod_achievements/${n}`;
  (i.innerHTML = `\n        <img src="${l}" class="achievement-icon">\n        <div class="achievement-text">\n            <div class="title">${o}</div>\n            <div class="text">${e}</div>\n        </div>\n    `),
    t.appendChild(i),
    setTimeout(() => {
      i.classList.add("visible");
    }, 10),
    setTimeout(() => {
      i.classList.remove("visible"), setTimeout(() => i.remove(), 500);
    }, 5e3);
}
function displayAchievements(o) {
  let n = JSON.parse(localStorage.getItem(`achievements_${o}`)) || {},
    e = document.getElementById("achievements-list");
  if (((e.innerHTML = ""), 0 === Object.keys(n).length))
    return (
      console.warn(`⚠️ No achievements found for mod: ${o}`),
      void (e.innerHTML = "<p>No achievements yet!</p>")
    );
  console.log("📜 Displaying achievements:", n);
  for (let o in n) {
    let t = n[o],
      i = document.createElement("div");
    i.classList.add("achievement");
    let l = `img/mod_achievements/${t.icon}`,
      s = "locked" === t.status ? "grayscale" : "",
      c = "locked" === t.status && "hidden" === t.type ? "???" : t.name,
      f = "locked" === t.status && "hidden" === t.type ? "???" : t.description;
    (i.innerHTML = `\n            <img src="${l}" class="achievement-icon ${s}">\n            <div class="achievement-info">\n                <div class="title">${c}</div>\n                <div class="text">${f}</div>\n                ${
      "progress" === t.type
        ? `<progress id="progress-${o}" value="${t.progress}" max="${t.maxProgress}"></progress>`
        : ""
    }\n            </div>\n        `),
      e.appendChild(i);
  }
}
OnDelayIn(1e3, () => {
  AchievementON || document.getElementById("tab-myachi").remove(),
    showAchiNotificationDot();
}),
  OnClick("tab-myachi", function () {
    (achiNotificationDot = 0),
      localStorage.setItem("achiNotificationDot", achiNotificationDot),
      showAchiNotificationDot();
  });
const style = document.createElement("style");
(style.innerHTML =
  "\n    .achievement-icon.grayscale {\n        filter: grayscale(100%);\n        opacity: 0.5;\n    }\n"),
  document.head.appendChild(style),
  document.getElementById("tab-myachi").addEventListener("click", function () {
    displayAchievements(RegisterMod);
  }),
  OnDelayIn(500, () => {
    document.title = `${app.name} | ${RegisterMod}` || `${app.name}`;
  }),
  onKey("n", () => {
    unlockAchievement(RegisterMod, "ach_1"),
      unlockAchievement(RegisterMod, "ach_2"),
      unlockAchievement(RegisterMod, "ach_3");
  }),
  onKey("N", () => {
    unlockAchievement(RegisterMod, "ach_4"),
      addProgressAchievement(RegisterMod, "ach_5", 1);
  }),
  onKey("g", () => {
    addProgressAchievement(RegisterMod, "ach_5", 1),
      addProgressAchievement(RegisterMod, "ach_6", 1),
      addProgressAchievement(RegisterMod, "ach_7", 1);
  });
var RegisterMod = "Evadare",
  RegisterModVersion = "0.5.0",
  ModDeveloper = "Rem";
function onLockedIcon() {
  boxDialog.open("Coming soon in new update!", "Locked!");
}
let playerName = localStorage.getItem("playername") || "",
  correctCode = localStorage.getItem("rightcode"),
  moreSoundsUnlocked = localStorage.getItem("evadare_unlock-moreSounds");
function flipAlt() {
  flipped = !flipped;
  const o = document.getElementById("sp-choose");
  if (flipped) {
    Shake(10, 1e3),
      document.getElementById("blood-effect").classList.add("show"),
      Hide(1),
      Hide(2),
      Hide(3),
      unHide(4);
    new Audio("evadare/badending_knife_open.mp3").play(),
      document.getElementById("home-bt-darkalley").classList.add("animate"),
      OnDelayIn(100, () => {
        realEnding &&
          document.getElementById("home-bt-goodbye").classList.add("animate");
      }),
      (document.title = "Evadare?"),
      glitchText(o, 100, 500);
  } else {
    document.getElementById("blood-effect").classList.remove("show"),
      unHide(1),
      unHide(2),
      unHide(3),
      Hide(4);
    new Audio("evadare/badending_knife_close.mp3").play(),
      document.getElementById("home-bt-darkalley").classList.remove("animate"),
      document.getElementById("home-bt-goodbye").classList.remove("animate"),
      (document.title = "Evadare"),
      resetText(o),
      OnDelayIn(500, () => {
        resetText(o);
      });
  }
}
function openDarkAlley() {
  flipped && (window.location.href = "dark-alley/dark-alley.html");
}
function openGoodbye() {
  realEnding &&
    flipped &&
    (window.location.href = "evadare/ending_cutscene/cutscene_script.min.html");
}
function glitchText(o, n, e) {
  if (flipped) {
    ChangeMenuTitle("w̴e̴l̸c̶o̶m̸e̶ ̷t̵o̵ ̴m̶y̴ ̸s̸p̴e̴c̸i̵a̶l̵ ̷h̴e̷l̴l̶");
    let t = o.innerText,
      i = "!@#$%^&*()_+=-{}[]:;<>?/|",
      l = Date.now(),
      s = setInterval(() => {
        let n = (Date.now() - l) / e;
        if (n >= 1) return clearInterval(s), void (o.innerText = t);
        let c = 0.8 * (1 - n),
          f = t
            .split("")
            .map((o) =>
              Math.random() < c ? i[Math.floor(Math.random() * i.length)] : o
            )
            .join("");
        o.innerText = f;
      }, n);
  }
}
function resetText(o) {
  o.innerText = "Select a Chapter";
}
function onV4Start() {
  ReplacePoloSprite("polo-sprite-scared.png"),
    OnDelayIn(700, () => {
      unlockAchievement(RegisterMod, "ach_13"),
        unHide(4),
        ChangeMenuTitle("y̸o̶u̵ ̴k̴n̶o̸w̵ ̶t̵h̷e̴ ̴d̷r̸i̶l̶l̸");
    });
}
function onV1Polo11() {
  addProgressAchievement(RegisterMod, "ach_1", 1);
}
function onV1Polo14() {
  OnlyOnce("Evadare_DouCh1", () => {
    addProgressAchievement(RegisterMod, "ach_2", 1);
  });
}
function onV2Polo8() {
  OnlyOnce("Evadare_DouCh2", () => {
    addProgressAchievement(RegisterMod, "ach_2", 1);
  });
}
function onV3Polo12() {
  OnlyOnce("Evadare_DouCh3", () => {
    addProgressAchievement(RegisterMod, "ach_2", 1);
  });
}
function onV1Polo9() {
  achievementTime = setTimeout(() => {
    unlockAchievement(RegisterMod, "ach_3");
  }, 9e4);
}
function offV1Polo9() {
  clearTimeout(achievementTime);
}
"true" === moreSoundsUnlocked &&
  (OnDelayIn(1200, () => {
    unlockAchievement(RegisterMod, "ach_17");
  }),
  OnDelayIn(1400, () => {
    unlockAchievement(RegisterMod, "ach_18");
  })),
  "true" === correctCode &&
    OnDelayIn(900, () => {
      unlockAchievement(RegisterMod, "ach_15");
    }),
  playerName &&
    "true" === correctCode &&
    OnDelayIn(1200, () => {
      unlockAchievement(RegisterMod, "ach_16");
    }),
  OnDelayIn(500, () => {
    let o = RegisterMod;
    setAchievement(
      o,
      "ach_1",
      "ach_myfav.png",
      "My Favourite!",
      "Use mummy bass 8 times in the Evadare mix",
      "progress",
      8
    ),
      setAchievement(
        o,
        "ach_2",
        "ach_wearewatching.png",
        "We Are Watching...",
        "Find the same character in every chapter",
        "progress",
        3
      ),
      setAchievement(
        o,
        "ach_3",
        "ach_tooth.png",
        "A Toothache",
        "Use Dentura for minute and 30 seconds straight",
        "normal"
      ),
      setAchievement(
        o,
        "ach_4",
        "ach_beginning.png",
        "That's just a beginning",
        "Watch Evadare Bonus 3",
        "normal"
      ),
      setAchievement(
        o,
        "ach_5",
        "ach_xrun.png",
        "Don't Go Stay With Me",
        "Mix Xrun for 2 minutes",
        "normal"
      ),
      setAchievement(
        o,
        "ach_6",
        "ach_creatures.png",
        "Sea Creatures!",
        "Find all animal-like characters in Xrun and play them together",
        "normal"
      ),
      setAchievement(
        o,
        "ach_7",
        "ach_myfavmelo.png",
        "Can We Listen To It Again?",
        "Use Eyewatch melody 25 times in the Xrun mix",
        "progress",
        25
      ),
      setAchievement(
        o,
        "ach_8",
        "ach_tragic.png",
        "That's Tragic",
        "Let Tragic play for 15 loops",
        "normal"
      ),
      setAchievement(
        o,
        "ach_9",
        "ach_static.png",
        "All I See is Static...",
        "Use Static character 12 times in Void mix",
        "progress",
        12
      ),
      setAchievement(
        o,
        "ach_10",
        "ach_boom.png",
        "Boom!",
        "Make Boomgueh explode 21 times",
        "progress",
        21
      ),
      setAchievement(
        o,
        "ach_11",
        "ach_end.png",
        "The End",
        "Watch the last bonus",
        "normal"
      ),
      setAchievement(
        o,
        "ach_12",
        "ach_thankyou.png",
        "Thank You!",
        "You read the credits, it means you actually care!",
        "normal"
      ),
      setAchievement(
        o,
        "ach_13",
        "ach_alt.png",
        "The End???",
        "Discover the alternative ending",
        "hidden"
      ),
      setAchievement(
        o,
        "ach_14",
        "ach_drill.png",
        "You Know The Drill",
        "Use Dolphin Muzzle and Sam together in your FSP mix",
        "hidden"
      ),
      setAchievement(
        o,
        "ach_15",
        "ach_code.png",
        "Now You Know...",
        "Find the code",
        "hidden"
      ),
      setAchievement(
        o,
        "ach_16",
        "ach_hello.png",
        `Hello ${playerName}`,
        "Become an experiment",
        "hidden"
      ),
      setAchievement(
        o,
        "ach_17",
        "ach_where.png",
        "Where Am I?",
        "...",
        "hidden"
      ),
      setAchievement(
        o,
        "ach_18",
        "ach_8.png",
        "The Big 8",
        "You unlocked 8 more monsters, and they are waiting for you",
        "hidden"
      ),
      setAchievement(
        o,
        "ach_19",
        "ach_finalend.png",
        "Bad Ending...",
        "Watch bonus 3 Full Stop Punctuation",
        "hidden"
      );
  });
let TragicLoops = 0,
  TragicONMix = !1;
function onV2Mix() {
  (XrunMixAchievement = setTimeout(() => {
    unlockAchievement(RegisterMod, "ach_5");
  }, 12e4)),
    onLoop(1, () => {
      TragicONMix &&
        (TragicLoops++,
        TragicLoops >= 15 && unlockAchievement(RegisterMod, "ach_8"));
    });
}
function offV2Mix() {
  clearTimeout(XrunMixAchievement), offLoop(), (TragicLoops = 0);
}
let achAnim1 = !1,
  achAnim2 = !1,
  achAnim3 = !1,
  achAnim4 = !1,
  achAnim5 = !1;
function onV2Polo2() {
  (achAnim1 = !0), checkAchievement();
}
function offV2Polo2() {
  achAnim1 = !1;
}
function onV2Polo3() {
  (achAnim2 = !0), checkAchievement();
}
function offV2Polo3() {
  achAnim2 = !1;
}
function onV2Polo6() {
  (achAnim3 = !0), checkAchievement();
}
function offV2Polo6() {
  achAnim3 = !1;
}
function onV2Polo9() {
  (achAnim4 = !0), checkAchievement();
}
function offV2Polo9() {
  achAnim4 = !1;
}
function onV2Polo13() {
  (achAnim5 = !0), checkAchievement();
}
function offV2Polo13() {
  achAnim5 = !1;
}
function checkAchievement() {
  achAnim1 &&
    achAnim2 &&
    achAnim3 &&
    achAnim4 &&
    achAnim5 &&
    unlockAchievement(RegisterMod, "ach_6");
}
function onV2Polo11() {
  addProgressAchievement(RegisterMod, "ach_7", 1);
}
function onV2Polo18() {
  TragicONMix = !0;
}
function offV2Polo18() {
  (TragicLoops = 0), (TragicONMix = !1);
}
function onV3Polo7() {
  addProgressAchievement(RegisterMod, "ach_9", 1);
}
function onV3Polo4() {
  boomguehActive = !0;
}
function offV3Polo4() {
  boomguehActive = !1;
}
function onV3Mix() {
  onBPM(15, () => {
    boomguehActive && addProgressAchievement(RegisterMod, "ach_10", 1);
  });
}
function offV3Mix() {
  offBPM();
}
function onV1Bonus3Finished() {
  unlockAchievement(RegisterMod, "ach_4");
}
function onV3Bonus3Finished() {
  unlockAchievement(RegisterMod, "ach_11");
}
boomguehActive = !1;
let dolpinMuzzleActive = !1,
  samActive = !1;
function onV4Polo13() {
  dolpinMuzzleActive = !0;
}
function offV4Polo13() {
  dolpinMuzzleActive = !1;
}
function onV4Polo18() {
  samActive = !0;
}
function offV4Polo18() {
  samActive = !1;
}
function onV4Mix() {
  onBPM(148, () => {
    dolpinMuzzleActive && samActive && unlockAchievement(RegisterMod, "ach_14");
  });
}
function offV4Mix() {
  offBPM();
}
function onV4Bonus3Finished() {
  unlockAchievement(RegisterMod, "ach_19"),
    (realEnding = !0),
    localStorage.setItem("realEnding", realEnding);
}
function onV4Bonus2Finished() {
  (bonusTwoWatched = !0),
    localStorage.setItem("bonusTwoWatched", bonusTwoWatched);
}
