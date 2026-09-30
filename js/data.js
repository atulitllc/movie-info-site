/**
 * ReelIndex movie catalog
 * Add movies here — keyed by URL slug. detail.js and home.js read this.
 */
(function (global) {
  const IMG = "https://image.tmdb.org/t/p";

  const FALLBACK = {
    "the-odyssey": {
      slug: "the-odyssey",
      tmdbId: 1368337,
      title: "The Odyssey",
      year: "2026",
      releaseDate: "2026-07-17",
      runtime: 173,
      rating: "R",
      voteAverage: 7.8,
      genres: ["Adventure", "Action", "Fantasy"],
      tagline: "Christopher Nolan · Mythic action epic",
      overview:
        "Odysseus, the legendary King of Ithaca, embarks on a long and perilous journey home following the Trojan War. Throughout his voyage, he is forced to confront the whims of gods, mythological monsters, and trials that stretch both his cunning and his humanity to the breaking point.",
      poster:
        "https://dx35vtwkllhj9.cloudfront.net/universalstudios/the-odyssey/images/regions/us/updates3/onesheet.jpg",
      backdrop:
        "https://dx35vtwkllhj9.cloudfront.net/universalstudios/the-odyssey/images/portrait_bg.jpg",
      director: "Christopher Nolan",
      writers: ["Christopher Nolan"],
      producers: ["Emma Thomas", "Christopher Nolan"],
      executiveProducer: "Thomas Hayslip",
      cast: [
        { name: "Matt Damon", character: "Odysseus" },
        { name: "Tom Holland", character: "Telemachus" },
        { name: "Anne Hathaway", character: "Penelope" },
        { name: "Robert Pattinson", character: "Antinous" },
        { name: "Lupita Nyong'o", character: "Helen of Troy / Clytemnestra" },
        { name: "Zendaya", character: "Athena" },
        { name: "Charlize Theron", character: "Calypso" },
        { name: "Himesh Patel", character: "Eurylochus" },
        { name: "Samantha Morton", character: "Circe" },
        { name: "John Leguizamo", character: "Eumaeus" },
        { name: "Jon Bernthal", character: "Menelaus" },
        { name: "Travis Scott", character: "Bard" },
        { name: "Corey Hawkins", character: "Polybus" },
        { name: "Elliot Page", character: "Sinon" },
        { name: "Mia Goth", character: "Melantho" },
        { name: "Benny Safdie", character: "Agamemnon" }
      ],
      watch: [
        { label: "In Theaters", note: "Universal · Jul 17, 2026 (US)" },
        { label: "IMAX", note: "Premium large format" },
        {
          label: "TMDB",
          href: "https://www.themoviedb.org/movie/1368337-the-odyssey"
        }
      ]
    },

    interstellar: {
      slug: "interstellar",
      tmdbId: 157336,
      title: "Interstellar",
      year: "2014",
      releaseDate: "2014-11-07",
      runtime: 169,
      rating: "PG-13",
      voteAverage: 8.5,
      genres: ["Adventure", "Drama", "Sci-Fi"],
      tagline: "Mankind was born on Earth. It was never meant to die here.",
      overview:
        "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
      poster: IMG + "/w500/gEU2QniE6E77NI6lCU6M61Gee0E.jpg",
      backdrop: IMG + "/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
      director: "Christopher Nolan",
      writers: ["Jonathan Nolan", "Christopher Nolan"],
      producers: ["Emma Thomas", "Christopher Nolan", "Lynda Obst"],
      executiveProducer: "",
      cast: [
        { name: "Matthew McConaughey", character: "Cooper" },
        { name: "Anne Hathaway", character: "Brand" },
        { name: "Jessica Chastain", character: "Murph" },
        { name: "Michael Caine", character: "Professor Brand" },
        { name: "Matt Damon", character: "Mann" }
      ],
      watch: [
        { label: "Paramount+", note: "Streaming (availability varies)" },
        {
          label: "TMDB",
          href: "https://www.themoviedb.org/movie/157336-interstellar"
        }
      ]
    },

    oppenheimer: {
      slug: "oppenheimer",
      tmdbId: 872585,
      title: "Oppenheimer",
      year: "2023",
      releaseDate: "2023-07-21",
      runtime: 180,
      rating: "R",
      voteAverage: 8.1,
      genres: ["Drama", "History"],
      tagline: "The world forever changes.",
      overview:
        "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
      poster: IMG + "/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
      backdrop: IMG + "/original/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
      director: "Christopher Nolan",
      writers: ["Christopher Nolan"],
      producers: ["Emma Thomas", "Charles Roven", "Christopher Nolan"],
      executiveProducer: "",
      cast: [
        { name: "Cillian Murphy", character: "J. Robert Oppenheimer" },
        { name: "Emily Blunt", character: "Kitty Oppenheimer" },
        { name: "Matt Damon", character: "Leslie Groves" },
        { name: "Robert Downey Jr.", character: "Lewis Strauss" },
        { name: "Florence Pugh", character: "Jean Tatlock" }
      ],
      watch: [
        { label: "Peacock", note: "Streaming (availability varies)" },
        {
          label: "TMDB",
          href: "https://www.themoviedb.org/movie/872585-oppenheimer"
        }
      ]
    },

    "dune-part-two": {
      slug: "dune-part-two",
      tmdbId: 693134,
      title: "Dune: Part Two",
      year: "2024",
      releaseDate: "2024-03-01",
      runtime: 166,
      rating: "PG-13",
      voteAverage: 8.1,
      genres: ["Science Fiction", "Adventure"],
      tagline: "Long live the fighters.",
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      poster: IMG + "/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
      backdrop: IMG + "/original/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
      director: "Denis Villeneuve",
      writers: ["Denis Villeneuve", "Jon Spaihts"],
      producers: ["Mary Parent", "Cale Boyter", "Denis Villeneuve"],
      executiveProducer: "",
      cast: [
        { name: "Timothée Chalamet", character: "Paul Atreides" },
        { name: "Zendaya", character: "Chani" },
        { name: "Rebecca Ferguson", character: "Lady Jessica" },
        { name: "Austin Butler", character: "Feyd-Rautha" },
        { name: "Javier Bardem", character: "Stilgar" }
      ],
      watch: [
        { label: "Max", note: "Streaming (availability varies)" },
        {
          label: "TMDB",
          href: "https://www.themoviedb.org/movie/693134-dune-part-two"
        }
      ]
    }
  };

  const TMDB_IMG_BASE = IMG;
  const STORAGE_KEY = "tmdb_api_key";

  function hoursMinutes(mins) {
    if (!mins && mins !== 0) return "";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h + "h " + m + "m";
  }

  function getMovies() {
    return FALLBACK;
  }

  function getMovie(slug) {
    return FALLBACK[slug] || null;
  }

  function getApiKey() {
    try {
      return localStorage.getItem(STORAGE_KEY) || "";
    } catch (e) {
      return "";
    }
  }

  function setApiKey(key) {
    try {
      if (key) localStorage.setItem(STORAGE_KEY, key);
      else localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      /* ignore */
    }
  }

  /**
   * Fetch live TMDB details + credits and map into our movie shape.
   * Falls back to catalog entry on error.
   */
  async function fetchFromTmdb(slug, apiKey) {
    const base = FALLBACK[slug];
    if (!base || !base.tmdbId) throw new Error("Unknown movie slug");
    const id = base.tmdbId;
    const [details, credits] = await Promise.all([
      fetch(
        "https://api.themoviedb.org/3/movie/" +
          id +
          "?api_key=" +
          encodeURIComponent(apiKey)
      ).then(function (r) {
        return r.json();
      }),
      fetch(
        "https://api.themoviedb.org/3/movie/" +
          id +
          "/credits?api_key=" +
          encodeURIComponent(apiKey)
      ).then(function (r) {
        return r.json();
      })
    ]);
    if (details.status_code) {
      throw new Error(details.status_message || "TMDB error");
    }
    const crew = credits.crew || [];
    const director =
      (crew.find(function (c) {
        return c.job === "Director";
      }) || {}).name || base.director;
    const producers = crew
      .filter(function (c) {
        return c.job === "Producer";
      })
      .map(function (c) {
        return c.name;
      });
    const writers = crew
      .filter(function (c) {
        return c.job === "Screenplay" || c.job === "Writer";
      })
      .map(function (c) {
        return c.name;
      });
    const exec = (
      crew.find(function (c) {
        return c.job === "Executive Producer";
      }) || {}
    ).name;

    return {
      slug: slug,
      tmdbId: id,
      title: details.title || base.title,
      year: (details.release_date || base.releaseDate || "").slice(0, 4) || base.year,
      releaseDate: details.release_date || base.releaseDate,
      runtime: details.runtime || base.runtime,
      rating: base.rating,
      voteAverage: details.vote_average != null ? details.vote_average : base.voteAverage,
      genres: (details.genres || []).map(function (g) {
        return g.name;
      }).length
        ? (details.genres || []).map(function (g) {
            return g.name;
          })
        : base.genres,
      tagline: details.tagline || base.tagline,
      overview: details.overview || base.overview,
      poster: details.poster_path
        ? TMDB_IMG_BASE + "/w500" + details.poster_path
        : base.poster,
      backdrop: details.backdrop_path
        ? TMDB_IMG_BASE + "/original" + details.backdrop_path
        : base.backdrop,
      director: director,
      writers: writers.length ? writers : base.writers,
      producers: producers.length ? producers : base.producers,
      executiveProducer: exec || base.executiveProducer,
      cast: (credits.cast || []).slice(0, 16).map(function (c) {
        return { name: c.name, character: c.character };
      }),
      watch: base.watch
    };
  }

  global.ReelIndex = {
    SITE_NAME: "ReelIndex",
    SITE_BASE: "https://example.com",
    FALLBACK: FALLBACK,
    MOVIES: FALLBACK,
    TMDB_IMG_BASE: TMDB_IMG_BASE,
    STORAGE_KEY: STORAGE_KEY,
    hoursMinutes: hoursMinutes,
    getMovies: getMovies,
    getMovie: getMovie,
    getApiKey: getApiKey,
    setApiKey: setApiKey,
    fetchFromTmdb: fetchFromTmdb
  };
})(typeof window !== "undefined" ? window : globalThis);

/* helpers appended */
(function(global){
  const R = global.ReelIndex || (global.ReelIndex = {});
  if (!R.FALLBACK && R.MOVIES) R.FALLBACK = R.MOVIES;
  if (!R.MOVIES && R.FALLBACK) R.MOVIES = Object.assign({}, R.FALLBACK);
  R.getMovie = function(slug){ return (R.MOVIES||R.FALLBACK||{})[slug] || null; };
  R.listMovies = function(){
    const src = R.MOVIES || R.FALLBACK || {};
    return Object.keys(src).map(k=>src[k]);
  };
})(window);
