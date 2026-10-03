/**
 * ReelIndex people catalog
 * Curated bios keyed by URL slug (ReelIndex.PEOPLE).
 * detail.js and person.js also resolve anyone credited in the movie catalog
 * (FALLBACK and MOVIES) or the series catalog, so bulk titles stay linked
 * without inventing TMDB person ids. Kept shells live at /people/<slug>/.
 * A slug with no shell 404s. Curated bios below still win at runtime.
 */
(function (global) {
  const IMG = "https://image.tmdb.org/t/p";
  const PLACEHOLDER =
    "data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600"><rect fill="#1a1f2b" width="100%" height="100%"/><text x="50%" y="50%" fill="#9aa3b5" text-anchor="middle" font-family="sans-serif" font-size="22">No photo</text></svg>'
    );

  const FALLBACK = {
    "tom-holland": {
      slug: "tom-holland",
      name: "Tom Holland",
      tmdbId: 1136406,
      photo: IMG + "/w500/xKBAaPIa1c7tzZD3Y0MhBLv4hPE.jpg",
      biography:
        "English actor best known for portraying Spider-Man in the Marvel Cinematic Universe. Holland brings athletic physicality and youthful energy to roles ranging from coming-of-age dramas to blockbuster action.",
      birthday: "1996-06-01",
      placeOfBirth: "Kingston upon Thames, England, UK",
      knownFor: [{ title: "The Odyssey", slug: "the-odyssey" }]
    },
    "christopher-nolan": {
      slug: "christopher-nolan",
      name: "Christopher Nolan",
      tmdbId: 525,
      photo: IMG + "/w500/xuAIuYSmsUzKlUMBFGVZaWsY3DZ.jpg",
      biography:
        "British-American filmmaker celebrated for cerebral blockbusters that blend spectacle with intricate narrative structure. Nolan wrote and directed The Odyssey, Interstellar, Oppenheimer, and many other landmark films.",
      birthday: "1970-07-30",
      placeOfBirth: "London, England, UK",
      knownFor: [
        { title: "The Odyssey", slug: "the-odyssey" },
        { title: "Interstellar", slug: "interstellar" },
        { title: "Oppenheimer", slug: "oppenheimer" },
        { title: "Inception", slug: "inception" },
        { title: "The Dark Knight", slug: "the-dark-knight" }
      ]
    },
    "matt-damon": {
      slug: "matt-damon",
      name: "Matt Damon",
      tmdbId: 1892,
      photo: IMG + "/w500/aCvBXTAR9B1qRjIRzMBYhhbm1fR.jpg",
      biography:
        "American actor and producer known for the Bourne franchise, Good Will Hunting, and collaborations with major directors. Damon stars as Odysseus in Christopher Nolan's The Odyssey and appears in Interstellar and Oppenheimer.",
      birthday: "1970-10-08",
      placeOfBirth: "Cambridge, Massachusetts, USA",
      knownFor: [
        { title: "The Odyssey", slug: "the-odyssey" },
        { title: "Interstellar", slug: "interstellar" },
        { title: "Oppenheimer", slug: "oppenheimer" }
      ]
    },
    "denis-villeneuve": {
      slug: "denis-villeneuve",
      name: "Denis Villeneuve",
      tmdbId: 137427,
      photo: IMG + "/w500/zdDx9Xs93UIrJFWYApYR28J8M6b.jpg",
      biography:
        "Canadian filmmaker renowned for atmospheric science fiction and tightly controlled thrillers. Villeneuve directed Dune: Part Two, expanding Frank Herbert's epic with striking visual storytelling.",
      birthday: "1967-10-03",
      placeOfBirth: "Trois-Rivières, Québec, Canada",
      knownFor: [{ title: "Dune: Part Two", slug: "dune-part-two" }, { title: "Dune", slug: "dune" }]
    },
    "timothee-chalamet": {
      slug: "timothee-chalamet",
      name: "Timothée Chalamet",
      tmdbId: 1190668,
      photo: IMG + "/w500/dFxpwRpmzpVfP1zjluH68DeQhyj.jpg",
      biography:
        "American-French actor who rose to prominence with Call Me by Your Name and has since headlined major studio films. Chalamet portrays Paul Atreides in Denis Villeneuve's Dune saga.",
      birthday: "1995-12-27",
      placeOfBirth: "New York City, New York, USA",
      knownFor: [{ title: "Dune: Part Two", slug: "dune-part-two" }, { title: "Dune", slug: "dune" }]
    },
    zendaya: {
      slug: "zendaya",
      name: "Zendaya",
      tmdbId: 505710,
      photo: IMG + "/w500/1qup8tSt95HLbcy2c2xrx4iJNxv.jpg",
      biography:
        "American actress and singer who transitioned from Disney Channel stardom to acclaimed dramatic and genre roles. Zendaya plays Athena in The Odyssey and Chani in Dune: Part Two.",
      birthday: "1996-09-01",
      placeOfBirth: "Oakland, California, USA",
      knownFor: [
        { title: "The Odyssey", slug: "the-odyssey" },
        { title: "Dune: Part Two", slug: "dune-part-two" }
      ]
    },
    "anne-hathaway": {
      slug: "anne-hathaway",
      name: "Anne Hathaway",
      tmdbId: 1813,
      photo: IMG + "/w500/nbccV2pMoyLTCeg5DQip24Eq0Jp.jpg",
      biography:
        "Academy Award-winning American actress known for both romantic comedies and intense dramatic turns. Hathaway plays Penelope in The Odyssey and Brand in Interstellar.",
      birthday: "1982-11-12",
      placeOfBirth: "Brooklyn, New York, USA",
      knownFor: [
        { title: "The Odyssey", slug: "the-odyssey" },
        { title: "Interstellar", slug: "interstellar" }
      ]
    },
    "robert-pattinson": {
      slug: "robert-pattinson",
      name: "Robert Pattinson",
      tmdbId: 113668,
      photo: IMG + "/w500/sRUM2u8qLcsOaTm0jGJGlOEQhlQ.jpg",
      biography:
        "English actor who reinvented his career after the Twilight series with bold choices in art-house and blockbuster cinema. Pattinson portrays Antinous in Christopher Nolan's The Odyssey.",
      birthday: "1986-05-13",
      placeOfBirth: "London, England, UK",
      knownFor: [{ title: "The Odyssey", slug: "the-odyssey" }]
    },
    "lupita-nyongo": {
      slug: "lupita-nyongo",
      name: "Lupita Nyong'o",
      tmdbId: 1267329,
      photo: IMG + "/w500/y40Wu1T742kynOqtwXASc5Qgm49.jpg",
      biography:
        "Kenyan-Mexican actress and Academy Award winner for 12 Years a Slave. Nyong'o brings gravitas to mythic roles as Helen of Troy and Clytemnestra in The Odyssey.",
      birthday: "1983-03-01",
      placeOfBirth: "Mexico City, Mexico",
      knownFor: [{ title: "The Odyssey", slug: "the-odyssey" }]
    },
    "charlize-theron": {
      slug: "charlize-theron",
      name: "Charlize Theron",
      tmdbId: 6885,
      photo: IMG + "/w500/gd7ShD0yt4bsR2STeQ19KQ6hvXL.jpg",
      biography:
        "South African-American actress and producer, Oscar-winning star of Monster and Mad Max: Fury Road. Theron plays the nymph Calypso in Christopher Nolan's The Odyssey.",
      birthday: "1975-08-07",
      placeOfBirth: "Benoni, Gauteng, South Africa",
      knownFor: [{ title: "The Odyssey", slug: "the-odyssey" }]
    },
    "emma-thomas": {
      slug: "emma-thomas",
      name: "Emma Thomas",
      tmdbId: 5911,
      photo: IMG + "/w500/2HMtZZwlw3G06XV93ZmPArzWZ7a.jpg",
      biography:
        "British film producer and longtime collaborator with Christopher Nolan. Thomas has produced The Odyssey, Interstellar, Oppenheimer, and many of Nolan's most ambitious projects.",
      birthday: "1971-12-09",
      placeOfBirth: "London, England, UK",
      knownFor: [
        { title: "The Odyssey", slug: "the-odyssey" },
        { title: "Interstellar", slug: "interstellar" },
        { title: "Oppenheimer", slug: "oppenheimer" }
      ]
    }
  };

  // Prefer real TMDB-style paths; fall back to SVG placeholder when path looks fake
  Object.keys(FALLBACK).forEach(function (key) {
    var p = FALLBACK[key];
    if (!p.photo || /placeholder|qJqJqJ/.test(p.photo)) {
      p.photo = PLACEHOLDER;
    }
  });

  function slugify(name) {
    if (!name) return "";
    return String(name)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/['\u2019]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // Numeric ids are not page slugs. Do not invent TMDB person ids for routes.
  function normalizeSlugToken(slug) {
    if (slug == null || slug === "") return "";
    var s = String(slug).trim();
    if (!s || /^\d+$/.test(s)) return "";
    var parts = s.split("/").filter(Boolean);
    s = parts.length ? parts[parts.length - 1] : "";
    if (!s || /^\d+$/.test(s)) return "";
    return s;
  }

  function portraitUrl(url) {
    if (!url || typeof url !== "string") return "";
    if (url.indexOf("image.tmdb.org") === -1) return url;
    return url.replace(/\/t\/p\/w\d+\//, "/t/p/w500/");
  }

  function nameList(value) {
    if (!value) return [];
    if (typeof value === "string") return value.trim() ? [value.trim()] : [];
    if (Array.isArray(value)) {
      var out = [];
      value.forEach(function (n) {
        if (typeof n === "string" && n.trim()) out.push(n.trim());
        else if (n && typeof n === "object") {
          var label = n.name || n.actor || n.person || "";
          if (label) out.push(String(label));
        }
      });
      return out;
    }
    if (typeof value === "object") {
      var label = value.name || value.actor || value.person || "";
      return label ? [String(label)] : [];
    }
    return [];
  }

  function castList(title) {
    var raw = title.cast || title.topCast || title.top_billed || title.actors || [];
    if (!Array.isArray(raw)) return [];
    return raw
      .map(function (c) {
        if (typeof c === "string") return { name: c, character: "", photo: "", slug: "" };
        if (!c || typeof c !== "object") return null;
        return {
          name: c.name || c.actor || c.person || "",
          character: c.character || c.role || c.characterName || "",
          photo: c.photo || c.profile || c.profileUrl || c.image || "",
          slug: c.slug || c.personSlug || ""
        };
      })
      .filter(function (c) {
        return c && (c.name || c.slug);
      });
  }

  function identityFrom(name, explicitSlug, photo) {
    if (name && typeof name === "object") {
      return identityFrom(
        name.name || name.actor || name.person || "",
        name.slug || name.personSlug || explicitSlug,
        name.photo || name.profile || name.image || photo
      );
    }
    var label = typeof name === "string" ? name.trim() : "";
    var keys = [];
    var derived = slugify(label);
    var token = normalizeSlugToken(explicitSlug);
    if (derived) keys.push(derived);
    if (token && keys.indexOf(token) === -1) keys.push(token);
    return { name: label, keys: keys, photo: photo || "" };
  }

  function movieList() {
    var bySlug = {};
    function absorb(src) {
      if (!src) return;
      Object.keys(src).forEach(function (k) {
        var item = src[k];
        if (!item || typeof item !== "object") return;
        if (!item.title && item.name) item = Object.assign({}, item, { title: item.name });
        var slug = item.slug || k;
        if (!slug) return;
        var looksLikeTitle =
          typeof item.title === "string" || item.cast || item.director || item.topCast || item.actors;
        if (!looksLikeTitle) return;
        bySlug[slug] = item;
      });
    }
    // Curated FALLBACK and bulk/live MOVIES can diverge. Union by slug; MOVIES wins.
    absorb(R.FALLBACK);
    absorb(R.MOVIES);
    if (!Object.keys(bySlug).length && R.listMovies) {
      R.listMovies().forEach(function (m) {
        if (m && m.slug) bySlug[m.slug] = m;
      });
    }
    return Object.keys(bySlug).map(function (k) {
      return bySlug[k];
    });
  }

  function seriesList() {
    var bySlug = {};
    function absorb(src) {
      if (!src) return;
      Object.keys(src).forEach(function (k) {
        var item = src[k];
        if (!item || typeof item !== "object") return;
        var slug = item.slug || k;
        if (!slug) return;
        bySlug[slug] = item;
      });
    }
    absorb(R.SERIES_FALLBACK);
    absorb(R.SERIES);
    if (!Object.keys(bySlug).length && R.listSeries) {
      R.listSeries().forEach(function (m) {
        if (m && m.slug) bySlug[m.slug] = m;
      });
    }
    return Object.keys(bySlug).map(function (k) {
      return bySlug[k];
    });
  }

  function compareCredits(a, b) {
    var ay = parseInt(a.year, 10) || 0;
    var by = parseInt(b.year, 10) || 0;
    if (ay !== by) return by - ay;
    return String(a.title || "").localeCompare(String(b.title || ""));
  }

  var indexCache = null;
  var indexSig = "";

  function catalogSignature() {
    function part(list) {
      return list
        .map(function (m) {
          if (!m) return "";
          var castN = (m.cast || m.topCast || m.actors || []).length || 0;
          return (
            (m.slug || "") +
            ":" +
            castN +
            ":" +
            (typeof m.director === "string" ? m.director : "") +
            ":" +
            ((m.creators || []).length || 0)
          );
        })
        .join(",");
    }
    return part(movieList()) + "#" + part(seriesList());
  }

  function buildIndex() {
    var index = {};
    function touch(key, name, photo) {
      if (!index[key]) {
        index[key] = { name: name || "", photo: "", titles: {} };
      }
      var entry = index[key];
      if (name && (!entry.name || name.length > entry.name.length)) entry.name = name;
      if (photo && !entry.photo) entry.photo = portraitUrl(photo);
      return entry;
    }
    function addPerson(identity, packed, role) {
      if (!identity.keys.length || !role) return;
      identity.keys.forEach(function (key) {
        var entry = touch(key, identity.name, identity.photo);
        var id = packed.kind + ":" + packed.slug;
        if (!entry.titles[id]) {
          entry.titles[id] = {
            slug: packed.slug,
            title: packed.title || packed.slug,
            year: packed.year || "",
            poster: packed.poster || "",
            kind: packed.kind,
            roles: []
          };
        }
        if (entry.titles[id].roles.indexOf(role) === -1) entry.titles[id].roles.push(role);
      });
    }
    function considerTitle(title, kind) {
      if (!title || !title.slug) return;
      var packed = {
        slug: title.slug,
        title: title.title,
        year: title.year,
        poster: title.poster,
        kind: kind
      };
      castList(title).forEach(function (c) {
        addPerson(identityFrom(c.name, c.slug, c.photo), packed, c.character || "Cast");
      });
      if (kind === "movie") {
        nameList(title.director).forEach(function (n) {
          addPerson(identityFrom(n), packed, "Director");
        });
        nameList(title.writers || title.writer).forEach(function (n) {
          addPerson(identityFrom(n), packed, "Writer");
        });
        nameList(title.producers || title.producer).forEach(function (n) {
          addPerson(identityFrom(n), packed, "Producer");
        });
        nameList(title.executiveProducer || title.executiveProducers).forEach(function (n) {
          addPerson(identityFrom(n), packed, "Executive Producer");
        });
      } else {
        nameList(title.creators || title.createdBy).forEach(function (n) {
          addPerson(identityFrom(n), packed, "Creator");
        });
      }
    }
    movieList().forEach(function (m) {
      considerTitle(m, "movie");
    });
    seriesList().forEach(function (m) {
      considerTitle(m, "series");
    });
    Object.keys(index).forEach(function (key) {
      var entry = index[key];
      entry.credits = Object.keys(entry.titles).map(function (id) {
        return entry.titles[id];
      });
      entry.credits.sort(compareCredits);
      entry.credits.forEach(function (c) {
        c.role = c.roles.join(" · ");
      });
    });
    return index;
  }

  function ensureIndex() {
    var sig = catalogSignature();
    if (indexCache && indexSig === sig) return indexCache;
    indexSig = sig;
    indexCache = buildIndex();
    return indexCache;
  }

  function mergeKnownFor(person, credits) {
    var seen = {};
    credits.forEach(function (c) {
      seen[c.slug] = true;
    });
    (person.knownFor || []).forEach(function (k) {
      if (!k) return;
      var slug = typeof k === "string" ? k : k.slug;
      if (!slug || seen[slug]) return;
      var movie = R.getMovie && R.getMovie(slug);
      var series = !movie && R.getSeries ? R.getSeries(slug) : null;
      var item = movie || series;
      if (!item && typeof k !== "object") return;
      credits.push({
        slug: slug,
        title: (item && item.title) || (typeof k === "object" && k.title) || slug,
        year: (item && item.year) || "",
        poster: (item && item.poster) || "",
        kind: series ? "series" : "movie",
        role: (typeof k === "object" && (k.role || k.character)) || ""
      });
      seen[slug] = true;
    });
    credits.sort(compareCredits);
    return credits;
  }

  function biographyFromCredits(person) {
    var credits = person.credits || [];
    var name = person.name || "This person";
    if (!credits.length) return name + " is listed in the WhereToWatchFree catalog.";
    if (credits.length === 1) {
      var only = credits[0];
      var role = only.role ? " (" + only.role + ")" : "";
      return (
        name +
        " is credited on " +
        (only.title || "a title") +
        role +
        " in the WhereToWatchFree catalog."
      );
    }
    var titles = credits
      .slice(0, 3)
      .map(function (c) {
        return c.title;
      })
      .filter(Boolean);
    return (
      name +
      " is credited on " +
      credits.length +
      " titles in the WhereToWatchFree catalog, including " +
      titles.join(", ") +
      "."
    );
  }

  function cloneCredits(entry) {
    if (!entry || !entry.credits) return [];
    return entry.credits.map(function (c) {
      return {
        slug: c.slug,
        title: c.title,
        year: c.year,
        poster: c.poster,
        kind: c.kind,
        role: c.role || ""
      };
    });
  }

  function getPerson(slug) {
    if (!slug) return null;
    var key = normalizeSlugToken(slug) || slugify(slug) || "";
    if (!key) return null;
    var index = ensureIndex();
    var entry = index[key];
    var curated = FALLBACK[key] || null;
    if (!curated && !entry) return null;
    var person = curated
      ? Object.assign({}, curated)
      : {
          slug: key,
          name: (entry && entry.name) || key,
          photo: (entry && entry.photo) || PLACEHOLDER,
          biography: "",
          birthday: "",
          placeOfBirth: "",
          knownFor: []
        };
    person.slug = person.slug || key;
    if ((!person.photo || person.photo === PLACEHOLDER) && entry && entry.photo) {
      person.photo = entry.photo;
    }
    if (!person.photo) person.photo = PLACEHOLDER;
    person.credits = mergeKnownFor(person, cloneCredits(entry));
    if (!person.biography) person.biography = biographyFromCredits(person);
    return person;
  }

  function findPersonByName(name) {
    return getPerson(slugify(name));
  }

  function listCatalogPeople() {
    var index = ensureIndex();
    var seen = {};
    var people = [];
    function push(slug) {
      if (!slug || seen[slug]) return;
      var probe = getPerson(slug);
      if (!probe) return;
      var canonical = slugify(probe.name) || probe.slug || slug;
      if (seen[canonical]) return;
      seen[canonical] = true;
      seen[slug] = true;
      var person = canonical === slug ? probe : getPerson(canonical) || probe;
      if (person.slug !== canonical) person.slug = canonical;
      people.push(person);
    }
    Object.keys(index).forEach(push);
    Object.keys(FALLBACK).forEach(push);
    people.sort(function (a, b) {
      return String(a.name || "").localeCompare(String(b.name || ""));
    });
    return people;
  }

  var R = global.ReelIndex || (global.ReelIndex = {});
  R.PEOPLE = FALLBACK;
  R.PEOPLE_FALLBACK = FALLBACK;
  R.slugify = slugify;
  R.getPerson = getPerson;
  R.findPersonByName = findPersonByName;
  R.listCatalogPeople = listCatalogPeople;
  R.creditsForPerson = function (slug) {
    var person = getPerson(slug);
    return (person && person.credits) || [];
  };
  R.PERSON_PLACEHOLDER = PLACEHOLDER;
})(typeof window !== "undefined" ? window : globalThis);
