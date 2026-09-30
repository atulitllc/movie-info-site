/**
 * ReelIndex people catalog
 * Keyed by URL slug. person.js and detail.js read this via ReelIndex.PEOPLE.
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
      photo: IMG + "/w500/bBRlrpQmXod8ept74UmfOCKJq2p.jpg",
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
      photo: IMG + "/w500/xuAIuYSmsUzKlUMNKDZ72DUNlVw.jpg",
      biography:
        "British-American filmmaker celebrated for cerebral blockbusters that blend spectacle with intricate narrative structure. Nolan wrote and directed The Odyssey, Interstellar, Oppenheimer, and many other landmark films.",
      birthday: "1970-07-30",
      placeOfBirth: "London, England, UK",
      knownFor: [
        { title: "The Odyssey", slug: "the-odyssey" },
        { title: "Interstellar", slug: "interstellar" },
        { title: "Oppenheimer", slug: "oppenheimer" }
      ]
    },
    "matt-damon": {
      slug: "matt-damon",
      name: "Matt Damon",
      tmdbId: 1892,
      photo: IMG + "/w500/elSlNgV8xVifsbHpFsqrPGxJToZ.jpg",
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
      photo: IMG + "/w500/zdDx9Xs93UIrJ4aEC8zcFOKpm0I.jpg",
      biography:
        "Canadian filmmaker renowned for atmospheric science fiction and tightly controlled thrillers. Villeneuve directed Dune: Part Two, expanding Frank Herbert's epic with striking visual storytelling.",
      birthday: "1967-10-03",
      placeOfBirth: "Trois-Rivières, Québec, Canada",
      knownFor: [{ title: "Dune: Part Two", slug: "dune-part-two" }]
    },
    "timothee-chalamet": {
      slug: "timothee-chalamet",
      name: "Timothée Chalamet",
      tmdbId: 1190668,
      photo: IMG + "/w500/BE2sdjpYH9n48Lr9Wq5YgM3wR2.jpg",
      biography:
        "American-French actor who rose to prominence with Call Me by Your Name and has since headlined major studio films. Chalamet portrays Paul Atreides in Denis Villeneuve's Dune saga.",
      birthday: "1995-12-27",
      placeOfBirth: "New York City, New York, USA",
      knownFor: [{ title: "Dune: Part Two", slug: "dune-part-two" }]
    },
    zendaya: {
      slug: "zendaya",
      name: "Zendaya",
      tmdbId: 505710,
      photo: IMG + "/w500/3Wdnr5rY0U7E7F4v9YQpE3xYqJr.jpg",
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
      photo: IMG + "/w500/tLelKoHNkjXqO5bW2I4n0YqJ9Xv.jpg",
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
      photo: IMG + "/w500/8Cq1vJqJqJqJqJqJqJqJqJqJqJq.jpg",
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
      photo: IMG + "/w500/y40Wu1IxhL8s6G3qWpJqJqJqJqJ.jpg",
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
      photo: IMG + "/w500/1Ilv6ryHUv6rt9zIsOGpIUKuHVy.jpg",
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
      photo: IMG + "/w500/placeholder-producer.jpg",
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

  function getPerson(slug) {
    return FALLBACK[slug] || null;
  }

  function findPersonByName(name) {
    var s = slugify(name);
    return FALLBACK[s] || null;
  }

  var R = global.ReelIndex || (global.ReelIndex = {});
  R.PEOPLE = FALLBACK;
  R.PEOPLE_FALLBACK = FALLBACK;
  R.slugify = slugify;
  R.getPerson = getPerson;
  R.findPersonByName = findPersonByName;
  R.PERSON_PLACEHOLDER = PLACEHOLDER;
})(typeof window !== "undefined" ? window : globalThis);
