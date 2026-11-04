/* Demo viewer (owned by Hark-Two).
   Mobile / touch: opening a gallery demo stays in the same tab, inside a full-screen
   Shorts-style viewer (slide-up entrance, swipe up/down = next/previous demo,
   swipe right or Back = return to the gallery). Desktop keeps target="_blank". */
(function () {
  "use strict";
  var mq = window.matchMedia("(max-width: 820px), (hover: none) and (pointer: coarse)");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var css = document.createElement("style");
  css.textContent = [
    ".dv{position:fixed;inset:0;z-index:2147482000;background:#050507;display:none;overflow:hidden;touch-action:none}",
    ".dv.on{display:block}",
    ".dv__stage{position:absolute;inset:0;z-index:1;will-change:transform}",
    ".dv__slide{position:absolute;inset:0;transition:transform .55s cubic-bezier(.2,.8,.2,1),opacity .55s,border-radius .55s}",
    ".dv__slide iframe{width:100%;height:100%;border:0;background:transparent;display:block}",
    ".dv__slide.enter{transform:translateY(100%) scale(.92);border-radius:28px;overflow:hidden}",
    ".dv__slide.up{transform:translateY(-100%);opacity:.4}",
    ".dv__slide.down{transform:translateY(100%);opacity:.4}",
    ".dv__bar{position:absolute;left:0;right:0;bottom:0;z-index:3;display:flex;align-items:center;gap:10px;padding:10px 12px calc(10px + env(safe-area-inset-bottom));background:linear-gradient(transparent,rgba(0,0,0,.78));color:#fff;font:600 13px/1.2 system-ui,-apple-system,Segoe UI,sans-serif;transition:opacity .3s}",
    ".dv__bar button,.dv__bar a{appearance:none;border:1px solid rgba(255,255,255,.25);background:rgba(20,20,24,.6);color:#fff;border-radius:999px;padding:9px 14px;font:inherit;text-decoration:none;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}",
    ".dv__t{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
    ".dv__t small{display:block;opacity:.65;font-weight:500;margin-top:2px}",
    ".dv__nav{position:absolute;right:10px;top:50%;transform:translateY(-50%);z-index:3;display:flex;flex-direction:column;gap:10px}",
    ".dv__nav button{width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.25);background:rgba(20,20,24,.55);color:#fff;font-size:18px;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}",
    ".dv__nav button:disabled{opacity:.3}",
    ".dv__spin{position:absolute;left:50%;top:45%;width:34px;height:34px;margin:-17px;border-radius:50%;border:3px solid rgba(255,255,255,.2);border-top-color:#ff3b4e;animation:dvs .8s linear infinite;z-index:1}",
    "@keyframes dvs{to{transform:rotate(360deg)}}",
    "html.dv-lock,html.dv-lock body{overflow:hidden!important}",
    "@media (prefers-reduced-motion:reduce){.dv__slide{transition:none}}"
  ].join("");
  document.head.appendChild(css);

  var root, stage, titleEl, openEl, prevBtn, nextBtn, list = [], idx = 0, cur = null, open = false;

  function build() {
    root = document.createElement("div");
    root.className = "dv";
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", "Demo viewer");
    root.innerHTML = '<div class="dv__spin"></div><div class="dv__stage"></div>' +
      '<div class="dv__nav"><button type="button" class="dv__prev" aria-label="Previous demo">&#8593;</button><button type="button" class="dv__next" aria-label="Next demo">&#8595;</button></div>' +
      '<div class="dv__bar"><button type="button" class="dv__back" aria-label="Back to gallery">&#8592; Gallery</button>' +
      '<div class="dv__t"><span></span><small>Swipe up for the next demo</small></div><a class="dv__open" target="_blank" rel="noopener">Open &#8599;</a></div>';
    document.body.appendChild(root);
    stage = root.querySelector(".dv__stage");
    titleEl = root.querySelector(".dv__t span");
    openEl = root.querySelector(".dv__open");
    prevBtn = root.querySelector(".dv__prev");
    nextBtn = root.querySelector(".dv__next");
    root.querySelector(".dv__back").addEventListener("click", function () { history.back(); });
    prevBtn.addEventListener("click", function () { go(-1); });
    nextBtn.addEventListener("click", function () { go(1); });
    // Swipe on the edges/bar (the iframe swallows its own touches, so we listen on the overlay chrome).
    var sx = 0, sy = 0, t0 = 0;
    root.addEventListener("touchstart", function (e) { var t = e.touches[0]; sx = t.clientX; sy = t.clientY; t0 = Date.now(); }, { passive: true });
    root.addEventListener("touchend", function (e) {
      var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
      if (Date.now() - t0 > 700) return;
      if (Math.abs(dy) > 60 && Math.abs(dy) > Math.abs(dx)) go(dy < 0 ? 1 : -1);
      else if (dx > 80 && Math.abs(dx) > Math.abs(dy)) history.back();
    }, { passive: true });
  }

  function items() {
    var out = [];
    document.querySelectorAll(".card:not(.hide):not(.card--soon)").forEach(function (c) {
      var a = c.querySelector("a.card__media[href^='http'], a.card__go[href^='http']");
      if (!a) return;
      var h = c.querySelector("h3");
      if (!out.some(function (o) { return o.url === a.href; })) out.push({ url: a.href, title: h ? h.textContent : a.href });
    });
    return out;
  }

  function slide(item, from) {
    var s = document.createElement("div");
    s.className = "dv__slide " + from;
    var f = document.createElement("iframe");
    f.src = item.url;
    f.title = item.title;
    f.loading = "eager";
    f.allow = "fullscreen; autoplay";
    f.addEventListener("load", function () { f.style.background = "#fff"; });
    s.appendChild(f);
    stage.appendChild(s);
    requestAnimationFrame(function () { requestAnimationFrame(function () { s.className = "dv__slide"; }); });
    return s;
  }

  function show(i, dir) {
    idx = i;
    var item = list[idx];
    titleEl.textContent = item.title;
    openEl.href = item.url;
    prevBtn.disabled = idx === 0;
    nextBtn.disabled = idx === list.length - 1;
    var old = cur;
    cur = slide(item, reduce ? "" : (dir === 0 ? "enter" : dir > 0 ? "down" : "up"));
    if (old) {
      old.className = "dv__slide " + (dir > 0 ? "up" : "down");
      setTimeout(function () { old.remove(); }, 600);
    }
  }

  function go(d) {
    var n = idx + d;
    if (n < 0 || n >= list.length) return;
    show(n, d);
    try { history.replaceState({ dv: list[n].url }, "", "#demo=" + encodeURIComponent(list[n].title)); } catch (e) {}
  }

  function openViewer(url) {
    if (!root) build();
    list = items();
    var i = list.findIndex(function (o) { return o.url === url; });
    if (i < 0) { list = [{ url: url, title: "" }]; i = 0; }
    stage.innerHTML = "";
    cur = null;
    root.classList.add("on");
    document.documentElement.classList.add("dv-lock");
    open = true;
    show(i, 0);
    try { history.pushState({ dv: url }, "", "#demo=" + encodeURIComponent(list[i].title)); } catch (e) {}
  }

  function closeViewer() {
    if (!open) return;
    open = false;
    if (cur && !reduce) { cur.className = "dv__slide enter"; }
    setTimeout(function () {
      root.classList.remove("on");
      stage.innerHTML = "";
      cur = null;
      document.documentElement.classList.remove("dv-lock");
    }, reduce ? 0 : 450);
  }

  window.addEventListener("popstate", function () { if (open) closeViewer(); });
  document.addEventListener("keydown", function (e) {
    if (!open) return;
    if (e.key === "Escape") history.back();
    else if (e.key === "ArrowDown") go(1);
    else if (e.key === "ArrowUp") go(-1);
  });

  document.addEventListener("click", function (e) {
    if (!mq.matches || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
    var a = e.target.closest && e.target.closest(".card a[href^='http']");
    if (!a) return;
    e.preventDefault();
    openViewer(a.href);
  }, true);
})();
