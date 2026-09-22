/* Realence Solution - Admin Panel (shared) */
(function () {
  const ADMIN_PASS = "realence2026";
  const STORAGE_KEY = "realence_content_v1";

  const defaults = {
    announceText: "We start by understanding your business",
    phone: "7454011982",
    email: "hello@realencesolution.com",
    address: "A2006 Kirshnalok NH 91 Vrindavan",
    heroBadge: "INDIA'S DIGITAL EXPERIENCE COMPANY",
    heroLine1: "We Don't Just",
    heroLine2: "Build Websites,",
    heroLine3: "We Build Digital",
    heroLine4: "Growth Systems.",
    heroSub: "Business research. UX strategy. Premium design.\nAI ready. SEO ready. Built to convert.",
    trustedTitle: "Trusted by Ambitious Founders",
    trustedSub: "Digital Engineering & Growth Partner",
    storyTitle1: "We didn’t start Realence Solution to sell websites. We started it to solve problems.",
    storyP1: "Every business starts with an idea. But turning that idea into something that actually works takes more than just a website, an app, or software.",
    storyP2: "That’s why at Realence Solution, we don’t begin with “What can we sell you?” We begin with “What are you trying to achieve?”",
    storyP3: "We understand your business, your customers and the problem behind your requirement. Then we recommend what actually makes sense—even if that means building less, changing the approach, or choosing a simpler solution.",
    storyHighlight: "Because your success shouldn’t depend on how much we sell you. It should depend on how well we solve your problem.",
    storyDream: "Every great business starts with a dream. We’re here to make it real.",
    diffName: "Realence Solution",
    diffSub: "We combine research, psychology and technology to deliver websites that convert.",
    stat1: "500+",
    stat2: "20+",
    stat3: "10+",
    stat4: "95%",
    stat5: "200+",
    stat6: "24/7",
    ctaTitle: "Let's build your Dream,\nnot just another website.",
    ctaSub: "Whether you have a clear plan or just an idea, we're here to listen and help you build it right.",
    ctaTrust: "Trusted by 1000+ founders across India and the world.",
    footerDesc: "Realence Solution is India's premier digital transformation agency. We engineer custom software, high-converting websites, AI automation systems, and data-driven marketing campaigns for scaling businesses.",
    mascotUrl: "https://png.pngtree.com/png-vector/20260618/ourlarge/pngtree-cute-cat-coding-on-laptop-with-coffee-cup-png-image_19592025.webp"
  };

  function getContent() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return Object.assign({}, defaults, JSON.parse(saved));
    } catch (e) {}
    return Object.assign({}, defaults);
  }

  function saveContent(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function applyContent(data) {
    document.querySelectorAll("[data-edit]").forEach(function (el) {
      var key = el.getAttribute("data-edit");
      if (data[key] !== undefined) {
        el.innerHTML = String(data[key]).replace(/\n/g, "<br>");
      }
    });
    var phoneClean = (data.phone || "7454011982").replace(/\D/g, "");
    var waUrl = "https://wa.me/91" + phoneClean;
    document.querySelectorAll('a[href*="wa.me"], .float-wa, #waLink, #waLink2').forEach(function (a) {
      if (a.classList.contains("float-wa") || a.id === "waLink" || a.id === "waLink2" || (a.href && a.href.indexOf("wa.me") > -1)) {
        a.href = waUrl;
      }
    });
    var img = document.getElementById("mascotImg");
    if (img && data.mascotUrl) img.src = data.mascotUrl;
  }

  // Apply on load
  applyContent(getContent());

  var isLoggedIn = sessionStorage.getItem("realence_admin") === "1";

  // Inject admin UI if not present
  function ensureAdminUI() {
    if (document.getElementById("adminOverlay")) return;

    var btn = document.createElement("button");
    btn.className = "admin-btn";
    btn.title = "Admin Panel";
    btn.innerHTML = "⚙️";
    btn.onclick = openAdmin;
    document.body.appendChild(btn);

    var overlay = document.createElement("div");
    overlay.className = "admin-overlay";
    overlay.id = "adminOverlay";
    overlay.innerHTML =
      '<div class="admin-panel">' +
      '<div class="admin-header"><h3>⚙️ Admin Panel — Realence Solution</h3>' +
      '<button class="admin-close" id="adminCloseBtn">×</button></div>' +
      '<div class="admin-body" id="adminBody"></div></div>';
    document.body.appendChild(overlay);

    document.getElementById("adminCloseBtn").onclick = closeAdmin;
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) closeAdmin();
    });
  }

  function openAdmin() {
    ensureAdminUI();
    document.getElementById("adminOverlay").classList.add("open");
    renderAdminBody();
  }

  function closeAdmin() {
    var o = document.getElementById("adminOverlay");
    if (o) o.classList.remove("open");
  }

  function esc(s) {
    if (!s) return "";
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function renderAdminBody() {
    var body = document.getElementById("adminBody");
    if (!body) return;

    if (!isLoggedIn) {
      body.innerHTML =
        '<div class="admin-login">' +
        "<h3 style=\"margin-bottom:8px\">Admin Login</h3>" +
        '<p style="color:#64748b;font-size:14px;margin-bottom:8px">Password se login karein</p>' +
        '<input type="password" id="adminPass" placeholder="Enter password" />' +
        "<br>" +
        '<button class="btn btn-primary" id="adminLoginBtn">Login</button>' +
        '<p class="admin-note">Default password: <strong>realence2026</strong></p></div>';
      document.getElementById("adminLoginBtn").onclick = loginAdmin;
      document.getElementById("adminPass").onkeydown = function (e) {
        if (e.key === "Enter") loginAdmin();
      };
      return;
    }

    var d = getContent();
    body.innerHTML =
      '<div class="admin-section"><h4>Announcement & Contact</h4>' +
      "<label>Announcement Text</label><input type=\"text\" id=\"ed_announceText\" value=\"" + esc(d.announceText) + "\" />" +
      "<label>Phone Number</label><input type=\"text\" id=\"ed_phone\" value=\"" + esc(d.phone) + "\" />" +
      "<label>Email</label><input type=\"text\" id=\"ed_email\" value=\"" + esc(d.email) + "\" />" +
      "<label>Address</label><input type=\"text\" id=\"ed_address\" value=\"" + esc(d.address) + "\" /></div>" +
      '<div class="admin-section"><h4>Hero Section</h4>' +
      "<label>Badge</label><input type=\"text\" id=\"ed_heroBadge\" value=\"" + esc(d.heroBadge) + "\" />" +
      "<label>Line 1</label><input type=\"text\" id=\"ed_heroLine1\" value=\"" + esc(d.heroLine1) + "\" />" +
      "<label>Line 2</label><input type=\"text\" id=\"ed_heroLine2\" value=\"" + esc(d.heroLine2) + "\" />" +
      "<label>Line 3 (blue)</label><input type=\"text\" id=\"ed_heroLine3\" value=\"" + esc(d.heroLine3) + "\" />" +
      "<label>Line 4 (blue)</label><input type=\"text\" id=\"ed_heroLine4\" value=\"" + esc(d.heroLine4) + "\" />" +
      "<label>Sub Text</label><textarea id=\"ed_heroSub\">" + esc(d.heroSub) + "</textarea>" +
      "<label>Trusted Title</label><input type=\"text\" id=\"ed_trustedTitle\" value=\"" + esc(d.trustedTitle) + "\" />" +
      "<label>Trusted Sub</label><input type=\"text\" id=\"ed_trustedSub\" value=\"" + esc(d.trustedSub) + "\" /></div>" +
      '<div class="admin-section"><h4>Our Story</h4>' +
      "<label>Story Title</label><textarea id=\"ed_storyTitle1\">" + esc(d.storyTitle1) + "</textarea>" +
      "<label>Paragraph 1</label><textarea id=\"ed_storyP1\">" + esc(d.storyP1) + "</textarea>" +
      "<label>Paragraph 2</label><textarea id=\"ed_storyP2\">" + esc(d.storyP2) + "</textarea>" +
      "<label>Paragraph 3</label><textarea id=\"ed_storyP3\">" + esc(d.storyP3) + "</textarea>" +
      "<label>Highlight</label><textarea id=\"ed_storyHighlight\">" + esc(d.storyHighlight) + "</textarea>" +
      "<label>Dream Line</label><input type=\"text\" id=\"ed_storyDream\" value=\"" + esc(d.storyDream) + "\" /></div>" +
      '<div class="admin-section"><h4>Stats</h4>' +
      "<label>Projects</label><input type=\"text\" id=\"ed_stat1\" value=\"" + esc(d.stat1) + "\" />" +
      "<label>Industries</label><input type=\"text\" id=\"ed_stat2\" value=\"" + esc(d.stat2) + "\" />" +
      "<label>Years</label><input type=\"text\" id=\"ed_stat3\" value=\"" + esc(d.stat3) + "\" />" +
      "<label>Retention</label><input type=\"text\" id=\"ed_stat4\" value=\"" + esc(d.stat4) + "\" />" +
      "<label>Clients</label><input type=\"text\" id=\"ed_stat5\" value=\"" + esc(d.stat5) + "\" />" +
      "<label>Support</label><input type=\"text\" id=\"ed_stat6\" value=\"" + esc(d.stat6) + "\" /></div>" +
      '<div class="admin-section"><h4>CTA & Footer</h4>' +
      "<label>CTA Title</label><textarea id=\"ed_ctaTitle\">" + esc(d.ctaTitle) + "</textarea>" +
      "<label>CTA Sub</label><textarea id=\"ed_ctaSub\">" + esc(d.ctaSub) + "</textarea>" +
      "<label>CTA Trust Line</label><input type=\"text\" id=\"ed_ctaTrust\" value=\"" + esc(d.ctaTrust) + "\" />" +
      "<label>Footer Description</label><textarea id=\"ed_footerDesc\">" + esc(d.footerDesc) + "</textarea>" +
      "<label>Mascot Image URL</label><input type=\"text\" id=\"ed_mascotUrl\" value=\"" + esc(d.mascotUrl) + "\" /></div>" +
      '<div class="admin-actions">' +
      '<button class="btn btn-primary" id="adminSaveBtn">💾 Save Changes</button>' +
      '<button class="btn btn-outline" id="adminResetBtn">↺ Reset to Default</button>' +
      '<button class="btn btn-outline" id="adminLogoutBtn">Logout</button></div>' +
      '<p class="admin-note">Changes browser (localStorage) mein save hote hain. Sab pages pe same content apply hoga.</p>';

    document.getElementById("adminSaveBtn").onclick = saveAdmin;
    document.getElementById("adminResetBtn").onclick = resetAdmin;
    document.getElementById("adminLogoutBtn").onclick = logoutAdmin;
  }

  function loginAdmin() {
    var pass = document.getElementById("adminPass").value;
    if (pass === ADMIN_PASS) {
      isLoggedIn = true;
      sessionStorage.setItem("realence_admin", "1");
      renderAdminBody();
    } else {
      alert("Wrong password!");
    }
  }

  function logoutAdmin() {
    isLoggedIn = false;
    sessionStorage.removeItem("realence_admin");
    renderAdminBody();
  }

  function saveAdmin() {
    var keys = [
      "announceText", "phone", "email", "address",
      "heroBadge", "heroLine1", "heroLine2", "heroLine3", "heroLine4", "heroSub",
      "trustedTitle", "trustedSub",
      "storyTitle1", "storyP1", "storyP2", "storyP3", "storyHighlight", "storyDream",
      "stat1", "stat2", "stat3", "stat4", "stat5", "stat6",
      "ctaTitle", "ctaSub", "ctaTrust", "footerDesc", "mascotUrl"
    ];
    var data = getContent();
    keys.forEach(function (k) {
      var el = document.getElementById("ed_" + k);
      if (el) data[k] = el.value;
    });
    saveContent(data);
    applyContent(data);
    alert("✅ Saved! Page updated.");
    closeAdmin();
  }

  function resetAdmin() {
    if (confirm("Reset all content to default?")) {
      localStorage.removeItem(STORAGE_KEY);
      applyContent(defaults);
      alert("Reset done.");
      closeAdmin();
    }
  }

  // Mobile menu toggle
  function initMobileMenu() {
    var nav = document.querySelector(".nav-inner");
    if (!nav || document.querySelector(".menu-toggle")) return;

    var toggle = document.createElement("button");
    toggle.className = "menu-toggle";
    toggle.setAttribute("aria-label", "Menu");
    toggle.innerHTML = "☰";
    toggle.onclick = function () {
      var links = document.querySelector(".nav-links");
      if (links) links.classList.toggle("open");
      toggle.innerHTML = links && links.classList.contains("open") ? "✕" : "☰";
    };

    var logo = nav.querySelector(".logo");
    if (logo && logo.nextSibling) {
      nav.insertBefore(toggle, logo.nextSibling);
    } else {
      nav.appendChild(toggle);
    }
  }

  // Init
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      ensureAdminUI();
      initMobileMenu();
    });
  } else {
    ensureAdminUI();
    initMobileMenu();
  }

  // Expose open for any leftover buttons
  window.openAdmin = openAdmin;
})();
