(function () {
  const slug = document.body.dataset.personSlug;
  if (!slug || !window.ReelIndex || !ReelIndex.PEOPLE) return;
  const person = ReelIndex.getPerson
    ? ReelIndex.getPerson(slug)
    : ReelIndex.PEOPLE[slug];
  if (!person) return;

  const photo = document.getElementById("person-photo");
  if (photo) {
    photo.src = person.photo || ReelIndex.PERSON_PLACEHOLDER || "";
    photo.alt = person.name + " portrait";
  }

  const set = function (id, v) {
    const el = document.getElementById(id);
    if (el) el.textContent = v || "—";
  };
  set("person-name", person.name);
  set("person-bio", person.biography);
  set("person-birthday", person.birthday);
  set("person-place", person.placeOfBirth);

  const known = document.getElementById("person-known-for");
  if (known) {
    const items = person.knownFor || [];
    if (!items.length) {
      known.innerHTML = '<p class="muted">No titles linked yet.</p>';
    } else {
      known.innerHTML = items
        .map(function (m) {
          const movie = ReelIndex.getMovie ? ReelIndex.getMovie(m.slug) : null;
          const poster = movie && movie.poster ? movie.poster : "";
          const title = m.title || (movie && movie.title) || m.slug;
          const year = movie && movie.year ? movie.year : "";
          return (
            '<a class="card person-movie-card" href="../../movies/' +
            m.slug +
            '/">' +
            (poster
              ? '<img class="card-poster" src="' +
                poster +
                '" alt="' +
                title +
                ' poster" loading="lazy" />'
              : '<div class="card-poster person-movie-placeholder"></div>') +
            '<div class="card-body"><div class="card-title">' +
            title +
            '</div><div class="card-meta">' +
            year +
            "</div></div></a>"
          );
        })
        .join("");
    }
  }
})();
