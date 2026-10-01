(function () {
  const slug = document.body.dataset.personSlug;
  if (!slug || !window.ReelIndex || !ReelIndex.getPerson) return;
  const person = ReelIndex.getPerson(slug);
  if (!person) return;

  function escapeHtml(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  const photo = document.getElementById("person-photo");
  if (photo) {
    photo.src = person.photo || ReelIndex.PERSON_PLACEHOLDER || "";
    photo.alt = (person.name || "Person") + " portrait";
  }

  const nameEl = document.getElementById("person-name");
  if (nameEl && person.name) nameEl.textContent = person.name;

  const bioEl = document.getElementById("person-bio");
  if (bioEl) bioEl.textContent = person.biography || "";

  function setFact(id, value) {
    const el = document.getElementById(id);
    if (!el) return;
    const wrap = el.parentElement;
    if (!value) {
      el.textContent = "";
      if (wrap) wrap.hidden = true;
      return;
    }
    el.textContent = value;
    if (wrap) wrap.hidden = false;
  }
  setFact("person-birthday", person.birthday);
  setFact("person-place", person.placeOfBirth);
  const facts = document.querySelector(".person-facts");
  if (facts && !person.birthday && !person.placeOfBirth) facts.hidden = true;

  const known = document.getElementById("person-known-for");
  if (!known) return;
  const heading = known.parentElement && known.parentElement.querySelector("h2");
  if (heading) heading.textContent = "Movies & series";

  const items = person.credits || [];
  if (!items.length) {
    known.innerHTML = '<p class="muted">No titles linked yet.</p>';
    return;
  }

  known.innerHTML = items
    .map(function (m) {
      const kind = m.kind === "series" ? "series" : "movie";
      const titleSlug = String(m.slug || "");
      if (!/^[a-z0-9-]+$/.test(titleSlug)) return "";
      const href = "../../" + (kind === "series" ? "series" : "movies") + "/" + titleSlug + "/";
      const title = m.title || titleSlug;
      const metaParts = [];
      if (m.year) metaParts.push(String(m.year));
      if (kind === "series") metaParts.push("Series");
      if (m.role) metaParts.push(String(m.role));
      const poster = m.poster || "";
      return (
        '<a class="card person-movie-card" href="' +
        href +
        '">' +
        (poster
          ? '<img class="card-poster" src="' +
            escapeHtml(poster) +
            '" alt="' +
            escapeHtml(title) +
            ' poster" loading="lazy" />'
          : '<div class="card-poster person-movie-placeholder"></div>') +
        '<div class="card-body"><div class="card-title">' +
        escapeHtml(title) +
        '</div><div class="card-meta">' +
        escapeHtml(metaParts.join(" · ")) +
        "</div></div></a>"
      );
    })
    .join("");
})();
