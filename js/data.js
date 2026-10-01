/**
 * WhereToWatchFree movie catalog
 * Add movies here — keyed by URL slug. detail.js and home.js read this.
 */
(function (global) {
  const FALLBACK = {
  "the-odyssey": {
    "slug": "the-odyssey",
    "tmdbId": 1368337,
    "title": "The Odyssey",
    "year": "2026",
    "releaseDate": "2026-07-17",
    "runtime": 173,
    "rating": "R",
    "voteAverage": 7.8,
    "genres": [
      "Adventure",
      "Action",
      "Fantasy"
    ],
    "tagline": "Christopher Nolan · Mythic action epic",
    "overview": "Odysseus, the legendary King of Ithaca, embarks on a long and perilous journey home following the Trojan War. Throughout his voyage, he is forced to confront the whims of gods, mythological monsters, and trials that stretch both his cunning and his humanity to the breaking point.",
    "poster": "https://image.tmdb.org/t/p/w500/5rhTDKUhPYvpdQIijFIs5VoWsON.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/bulFtfy3oBQtCnAMSi7g6DSSds3.jpg",
    "trailerYouTubeId": "Mzw2ttJD2qQ",
    "director": "Christopher Nolan",
    "writers": [
      "Christopher Nolan"
    ],
    "producers": [
      "Emma Thomas",
      "Christopher Nolan"
    ],
    "executiveProducer": "Thomas Hayslip",
    "related": [
      "interstellar",
      "oppenheimer",
      "inception",
      "the-dark-knight"
    ],
    "cast": [
      {
        "name": "Matt Damon",
        "character": "Odysseus",
        "photo": "https://image.tmdb.org/t/p/w185/aCvBXTAR9B1qRjIRzMBYhhbm1fR.jpg"
      },
      {
        "name": "Tom Holland",
        "character": "Telemachus",
        "photo": "https://image.tmdb.org/t/p/w185/xKBAaPIa1c7tzZD3Y0MhBLv4hPE.jpg"
      },
      {
        "name": "Anne Hathaway",
        "character": "Penelope",
        "photo": "https://image.tmdb.org/t/p/w185/nbccV2pMoyLTCeg5DQip24Eq0Jp.jpg"
      },
      {
        "name": "Robert Pattinson",
        "character": "Antinous",
        "photo": "https://image.tmdb.org/t/p/w185/sRUM2u8qLcsOaTm0jGJGlOEQhlQ.jpg"
      },
      {
        "name": "Lupita Nyong'o",
        "character": "Helen of Troy / Clytemnestra",
        "photo": "https://image.tmdb.org/t/p/w185/y40Wu1T742kynOqtwXASc5Qgm49.jpg"
      },
      {
        "name": "Zendaya",
        "character": "Athena",
        "photo": "https://image.tmdb.org/t/p/w185/1qup8tSt95HLbcy2c2xrx4iJNxv.jpg"
      },
      {
        "name": "Charlize Theron",
        "character": "Calypso",
        "photo": "https://image.tmdb.org/t/p/w185/gd7ShD0yt4bsR2STeQ19KQ6hvXL.jpg"
      },
      {
        "name": "Himesh Patel",
        "character": "Eurylochus",
        "photo": ""
      },
      {
        "name": "Jon Bernthal",
        "character": "Menelaus",
        "photo": ""
      },
      {
        "name": "Mia Goth",
        "character": "Melantho",
        "photo": ""
      },
      {
        "name": "Benny Safdie",
        "character": "Agamemnon",
        "photo": ""
      },
      {
        "name": "Elliot Page",
        "character": "Sinon",
        "photo": "https://image.tmdb.org/t/p/w185/wSdlM4Qyoi5AGj5eIIp8Bm0Sfkz.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "theaters",
          "label": "In Theaters",
          "note": "Universal · Jul 17, 2026 (US)",
          "href": "https://www.fandango.com/"
        },
        {
          "id": "imax",
          "label": "IMAX",
          "note": "Premium large format",
          "href": "https://www.imax.com/"
        },
        {
          "id": "netflix",
          "label": "Netflix",
          "note": "Coming later · availability varies",
          "href": "https://www.netflix.com/"
        },
        {
          "id": "max",
          "label": "Max",
          "note": "Availability varies",
          "href": "https://www.max.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region · may arrive later",
          "href": "https://tubitv.com/"
        },
        {
          "id": "pluto",
          "label": "Pluto TV",
          "note": "Availability varies",
          "href": "https://pluto.tv/"
        },
        {
          "id": "plex",
          "label": "Plex",
          "note": "Availability varies",
          "href": "https://www.plex.tv/"
        }
      ],
      "other": [
        {
          "id": "tmdb",
          "label": "TMDB",
          "href": "https://www.themoviedb.org/movie/1368337-the-odyssey"
        }
      ]
    }
  },
  "interstellar": {
    "slug": "interstellar",
    "tmdbId": 157336,
    "title": "Interstellar",
    "year": "2014",
    "releaseDate": "2014-11-07",
    "runtime": 169,
    "rating": "PG-13",
    "voteAverage": 8.5,
    "genres": [
      "Adventure",
      "Drama",
      "Science Fiction"
    ],
    "tagline": "Mankind was born on Earth. It was never meant to die here.",
    "overview": "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    "poster": "https://image.tmdb.org/t/p/w500/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/8sNiAPPYU14PUepFNeSNGUTiHW.jpg",
    "trailerYouTubeId": "zSWdZVtXT7E",
    "director": "Christopher Nolan",
    "writers": [
      "Jonathan Nolan",
      "Christopher Nolan"
    ],
    "producers": [
      "Emma Thomas",
      "Christopher Nolan",
      "Lynda Obst"
    ],
    "executiveProducer": "",
    "related": [
      "the-odyssey",
      "oppenheimer",
      "inception",
      "blade-runner-2049"
    ],
    "cast": [
      {
        "name": "Matthew McConaughey",
        "character": "Cooper",
        "photo": "https://image.tmdb.org/t/p/w185/d81K0RH8UX7tZj49tZaQhZ9ewH.jpg"
      },
      {
        "name": "Anne Hathaway",
        "character": "Brand",
        "photo": "https://image.tmdb.org/t/p/w185/nbccV2pMoyLTCeg5DQip24Eq0Jp.jpg"
      },
      {
        "name": "Jessica Chastain",
        "character": "Murph",
        "photo": "https://image.tmdb.org/t/p/w185/sMBpav8cK7t7Nk0yf4tuNOqNUyW.jpg"
      },
      {
        "name": "Michael Caine",
        "character": "Professor Brand",
        "photo": "https://image.tmdb.org/t/p/w185/bVZRMlpjTAO2pJK6v90buFgVbSW.jpg"
      },
      {
        "name": "Matt Damon",
        "character": "Mann",
        "photo": "https://image.tmdb.org/t/p/w185/aCvBXTAR9B1qRjIRzMBYhhbm1fR.jpg"
      },
      {
        "name": "Mackenzie Foy",
        "character": "Young Murph",
        "photo": ""
      },
      {
        "name": "Timothée Chalamet",
        "character": "Young Tom",
        "photo": "https://image.tmdb.org/t/p/w185/dFxpwRpmzpVfP1zjluH68DeQhyj.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "paramount-plus",
          "label": "Paramount+",
          "note": "Streaming (availability varies)",
          "href": "https://www.paramountplus.com/"
        },
        {
          "id": "amazon-prime",
          "label": "Prime Video",
          "note": "Rent or buy",
          "href": "https://www.amazon.com/gp/video/storefront"
        },
        {
          "id": "apple",
          "label": "Apple TV",
          "note": "Rent or buy",
          "href": "https://tv.apple.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region",
          "href": "https://tubitv.com/"
        },
        {
          "id": "plex",
          "label": "Plex",
          "note": "Availability varies",
          "href": "https://www.plex.tv/"
        }
      ],
      "other": [
        {
          "id": "tmdb",
          "label": "TMDB",
          "href": "https://www.themoviedb.org/movie/157336-interstellar"
        }
      ]
    }
  },
  "oppenheimer": {
    "slug": "oppenheimer",
    "tmdbId": 872585,
    "title": "Oppenheimer",
    "year": "2023",
    "releaseDate": "2023-07-21",
    "runtime": 180,
    "rating": "R",
    "voteAverage": 8.1,
    "genres": [
      "Drama",
      "History"
    ],
    "tagline": "The world forever changes.",
    "overview": "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    "poster": "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/neeNHeXjMF5fXoCJRsOmkNGC7q.jpg",
    "trailerYouTubeId": "uYPbbksJxIg",
    "director": "Christopher Nolan",
    "writers": [
      "Christopher Nolan"
    ],
    "producers": [
      "Emma Thomas",
      "Charles Roven",
      "Christopher Nolan"
    ],
    "executiveProducer": "",
    "related": [
      "interstellar",
      "the-odyssey",
      "inception",
      "the-dark-knight"
    ],
    "cast": [
      {
        "name": "Cillian Murphy",
        "character": "J. Robert Oppenheimer",
        "photo": "https://image.tmdb.org/t/p/w185/b5w381C8Z33D1iF30KT4k8tJNsk.jpg"
      },
      {
        "name": "Emily Blunt",
        "character": "Kitty Oppenheimer",
        "photo": "https://image.tmdb.org/t/p/w185/uUFfo8RANo7tuckB6AZAnESne55.jpg"
      },
      {
        "name": "Matt Damon",
        "character": "Leslie Groves",
        "photo": "https://image.tmdb.org/t/p/w185/aCvBXTAR9B1qRjIRzMBYhhbm1fR.jpg"
      },
      {
        "name": "Robert Downey Jr.",
        "character": "Lewis Strauss",
        "photo": "https://image.tmdb.org/t/p/w185/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg"
      },
      {
        "name": "Florence Pugh",
        "character": "Jean Tatlock",
        "photo": "https://image.tmdb.org/t/p/w185/3troAR6QbSb6nUFMDu61YCCWLKa.jpg"
      },
      {
        "name": "Josh Hartnett",
        "character": "Ernest Lawrence",
        "photo": ""
      },
      {
        "name": "Casey Affleck",
        "character": "Boris Pash",
        "photo": ""
      },
      {
        "name": "Rami Malek",
        "character": "David Hill",
        "photo": ""
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "theaters",
          "label": "In Theaters",
          "note": "Select IMAX / event screenings · check local listings",
          "href": "https://www.fandango.com/"
        },
        {
          "id": "peacock",
          "label": "Peacock",
          "note": "Streaming (availability varies)",
          "href": "https://www.peacocktv.com/"
        },
        {
          "id": "amazon-prime",
          "label": "Prime Video",
          "note": "Rent or buy",
          "href": "https://www.amazon.com/gp/video/storefront"
        },
        {
          "id": "apple",
          "label": "Apple TV",
          "note": "Rent or buy",
          "href": "https://tv.apple.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region",
          "href": "https://tubitv.com/"
        },
        {
          "id": "pluto",
          "label": "Pluto TV",
          "note": "Availability varies",
          "href": "https://pluto.tv/"
        }
      ],
      "other": [
        {
          "id": "tmdb",
          "label": "TMDB",
          "href": "https://www.themoviedb.org/movie/872585-oppenheimer"
        }
      ]
    }
  },
  "dune-part-two": {
    "slug": "dune-part-two",
    "tmdbId": 693134,
    "title": "Dune: Part Two",
    "year": "2024",
    "releaseDate": "2024-03-01",
    "runtime": 166,
    "rating": "PG-13",
    "voteAverage": 8.1,
    "genres": [
      "Science Fiction",
      "Adventure"
    ],
    "tagline": "Long live the fighters.",
    "overview": "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    "poster": "https://image.tmdb.org/t/p/w500/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/eZ239CUp1d6OryZEBPnO2n87gMG.jpg",
    "trailerYouTubeId": "Way9Dexny3w",
    "director": "Denis Villeneuve",
    "writers": [
      "Denis Villeneuve",
      "Jon Spaihts"
    ],
    "producers": [
      "Mary Parent",
      "Cale Boyter",
      "Denis Villeneuve"
    ],
    "executiveProducer": "",
    "related": [
      "dune",
      "blade-runner-2049",
      "interstellar",
      "oppenheimer"
    ],
    "cast": [
      {
        "name": "Timothée Chalamet",
        "character": "Paul Atreides",
        "photo": "https://image.tmdb.org/t/p/w185/dFxpwRpmzpVfP1zjluH68DeQhyj.jpg"
      },
      {
        "name": "Zendaya",
        "character": "Chani",
        "photo": "https://image.tmdb.org/t/p/w185/1qup8tSt95HLbcy2c2xrx4iJNxv.jpg"
      },
      {
        "name": "Rebecca Ferguson",
        "character": "Lady Jessica",
        "photo": "https://image.tmdb.org/t/p/w185/ra53cM1aNmdH0aFhj8yBqPOj2fb.jpg"
      },
      {
        "name": "Austin Butler",
        "character": "Feyd-Rautha",
        "photo": "https://image.tmdb.org/t/p/w185/2DPh6KoNg0p57vvGc6N468zr3ct.jpg"
      },
      {
        "name": "Javier Bardem",
        "character": "Stilgar",
        "photo": "https://image.tmdb.org/t/p/w185/zfRID0jx8DKBluPGU9xtk9sZWUt.jpg"
      },
      {
        "name": "Josh Brolin",
        "character": "Gurney Halleck",
        "photo": "https://image.tmdb.org/t/p/w185/sX2etBbIkxRaCsATyw5ZpOVMPTD.jpg"
      },
      {
        "name": "Florence Pugh",
        "character": "Princess Irulan",
        "photo": "https://image.tmdb.org/t/p/w185/3troAR6QbSb6nUFMDu61YCCWLKa.jpg"
      },
      {
        "name": "Dave Bautista",
        "character": "Rabban",
        "photo": "https://image.tmdb.org/t/p/w185/gUTm0fY8d79l9N2lsxr4yRsB16S.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "theaters",
          "label": "In Theaters",
          "note": "Special / IMAX engagements · check local listings",
          "href": "https://www.fandango.com/"
        },
        {
          "id": "max",
          "label": "Max",
          "note": "Streaming (availability varies)",
          "href": "https://www.max.com/"
        },
        {
          "id": "netflix",
          "label": "Netflix",
          "note": "Availability varies",
          "href": "https://www.netflix.com/"
        },
        {
          "id": "amazon-prime",
          "label": "Prime Video",
          "note": "Rent or buy",
          "href": "https://www.amazon.com/gp/video/storefront"
        },
        {
          "id": "hulu",
          "label": "Hulu",
          "note": "Availability varies",
          "href": "https://www.hulu.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region",
          "href": "https://tubitv.com/"
        },
        {
          "id": "pluto",
          "label": "Pluto TV",
          "note": "Availability varies",
          "href": "https://pluto.tv/"
        },
        {
          "id": "plex",
          "label": "Plex",
          "note": "Availability varies",
          "href": "https://www.plex.tv/"
        }
      ],
      "other": [
        {
          "id": "tmdb",
          "label": "TMDB",
          "href": "https://www.themoviedb.org/movie/693134-dune-part-two"
        }
      ]
    }
  },
  "inception": {
    "slug": "inception",
    "tmdbId": 27205,
    "title": "Inception",
    "year": "2010",
    "releaseDate": "2010-07-16",
    "runtime": 148,
    "rating": "PG-13",
    "voteAverage": 8.4,
    "genres": [
      "Action",
      "Science Fiction",
      "Adventure"
    ],
    "tagline": "Your mind is the scene of the crime.",
    "overview": "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets, is offered a chance to regain his old life as payment for a task considered to be impossible: inception — the implantation of another person's idea into a target's subconscious.",
    "poster": "https://image.tmdb.org/t/p/w500/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    "trailerYouTubeId": "YoHD9XEInc0",
    "director": "Christopher Nolan",
    "writers": [
      "Christopher Nolan"
    ],
    "producers": [
      "Emma Thomas",
      "Christopher Nolan"
    ],
    "executiveProducer": "",
    "related": [
      "interstellar",
      "the-dark-knight",
      "oppenheimer",
      "the-matrix"
    ],
    "cast": [
      {
        "name": "Leonardo DiCaprio",
        "character": "Dom Cobb",
        "photo": "https://image.tmdb.org/t/p/w185/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg"
      },
      {
        "name": "Joseph Gordon-Levitt",
        "character": "Arthur",
        "photo": "https://image.tmdb.org/t/p/w185/z2FA8js799xqtfiFjBTicFYdfk.jpg"
      },
      {
        "name": "Elliot Page",
        "character": "Ariadne",
        "photo": "https://image.tmdb.org/t/p/w185/wSdlM4Qyoi5AGj5eIIp8Bm0Sfkz.jpg"
      },
      {
        "name": "Tom Hardy",
        "character": "Eames",
        "photo": ""
      },
      {
        "name": "Ken Watanabe",
        "character": "Saito",
        "photo": ""
      },
      {
        "name": "Cillian Murphy",
        "character": "Robert Fischer",
        "photo": "https://image.tmdb.org/t/p/w185/b5w381C8Z33D1iF30KT4k8tJNsk.jpg"
      },
      {
        "name": "Marion Cotillard",
        "character": "Mal",
        "photo": ""
      },
      {
        "name": "Michael Caine",
        "character": "Miles",
        "photo": "https://image.tmdb.org/t/p/w185/bVZRMlpjTAO2pJK6v90buFgVbSW.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "netflix",
          "label": "Netflix",
          "note": "Availability varies",
          "href": "https://www.netflix.com/"
        },
        {
          "id": "amazon-prime",
          "label": "Prime Video",
          "note": "Rent or buy",
          "href": "https://www.amazon.com/gp/video/storefront"
        },
        {
          "id": "apple",
          "label": "Apple TV",
          "note": "Rent or buy",
          "href": "https://tv.apple.com/"
        },
        {
          "id": "max",
          "label": "Max",
          "note": "Availability varies",
          "href": "https://www.max.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region",
          "href": "https://tubitv.com/"
        },
        {
          "id": "plex",
          "label": "Plex",
          "note": "Availability varies",
          "href": "https://www.plex.tv/"
        }
      ],
      "other": [
        {
          "id": "tmdb",
          "label": "TMDB",
          "href": "https://www.themoviedb.org/movie/27205-inception"
        }
      ]
    }
  },
  "the-dark-knight": {
    "slug": "the-dark-knight",
    "tmdbId": 155,
    "title": "The Dark Knight",
    "year": "2008",
    "releaseDate": "2008-07-18",
    "runtime": 152,
    "rating": "PG-13",
    "voteAverage": 8.5,
    "genres": [
      "Drama",
      "Action",
      "Crime",
      "Thriller"
    ],
    "tagline": "Why so serious?",
    "overview": "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
    "poster": "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/9FE5eD92WfVCiivM9Pq9GVSrlWk.jpg",
    "trailerYouTubeId": "EXeTwQWrcwY",
    "director": "Christopher Nolan",
    "writers": [
      "Jonathan Nolan",
      "Christopher Nolan"
    ],
    "producers": [
      "Emma Thomas",
      "Charles Roven",
      "Christopher Nolan"
    ],
    "executiveProducer": "",
    "related": [
      "inception",
      "oppenheimer",
      "interstellar",
      "the-odyssey"
    ],
    "cast": [
      {
        "name": "Christian Bale",
        "character": "Bruce Wayne / Batman",
        "photo": "https://image.tmdb.org/t/p/w185/7Pxez9J8fuPd2Mn9kex13YALrCQ.jpg"
      },
      {
        "name": "Heath Ledger",
        "character": "Joker",
        "photo": "https://image.tmdb.org/t/p/w185/AdWKVqyWpkYSfKE5Gb2qn8JzHni.jpg"
      },
      {
        "name": "Aaron Eckhart",
        "character": "Harvey Dent / Two-Face",
        "photo": ""
      },
      {
        "name": "Michael Caine",
        "character": "Alfred",
        "photo": "https://image.tmdb.org/t/p/w185/bVZRMlpjTAO2pJK6v90buFgVbSW.jpg"
      },
      {
        "name": "Maggie Gyllenhaal",
        "character": "Rachel Dawes",
        "photo": ""
      },
      {
        "name": "Gary Oldman",
        "character": "Jim Gordon",
        "photo": ""
      },
      {
        "name": "Morgan Freeman",
        "character": "Lucius Fox",
        "photo": "https://image.tmdb.org/t/p/w185/bjNSzt1d7uK3q5PbtFXUJrRt4qg.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "max",
          "label": "Max",
          "note": "Streaming (availability varies)",
          "href": "https://www.max.com/"
        },
        {
          "id": "amazon-prime",
          "label": "Prime Video",
          "note": "Rent or buy",
          "href": "https://www.amazon.com/gp/video/storefront"
        },
        {
          "id": "apple",
          "label": "Apple TV",
          "note": "Rent or buy",
          "href": "https://tv.apple.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region",
          "href": "https://tubitv.com/"
        },
        {
          "id": "pluto",
          "label": "Pluto TV",
          "note": "Availability varies",
          "href": "https://pluto.tv/"
        }
      ],
      "other": [
        {
          "id": "tmdb",
          "label": "TMDB",
          "href": "https://www.themoviedb.org/movie/155-the-dark-knight"
        }
      ]
    }
  },
  "pulp-fiction": {
    "slug": "pulp-fiction",
    "tmdbId": 680,
    "title": "Pulp Fiction",
    "year": "1994",
    "releaseDate": "1994-10-14",
    "runtime": 154,
    "rating": "R",
    "voteAverage": 8.5,
    "genres": [
      "Thriller",
      "Crime"
    ],
    "tagline": "Just because you are a character doesn't mean you have character.",
    "overview": "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
    "poster": "https://image.tmdb.org/t/p/w500/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    "trailerYouTubeId": "s7EdQ4FqbhY",
    "director": "Quentin Tarantino",
    "writers": [
      "Quentin Tarantino",
      "Roger Avary"
    ],
    "producers": [
      "Lawrence Bender"
    ],
    "executiveProducer": "",
    "related": [
      "fight-club",
      "the-matrix",
      "forrest-gump",
      "the-shawshank-redemption"
    ],
    "cast": [
      {
        "name": "John Travolta",
        "character": "Vincent Vega",
        "photo": "https://image.tmdb.org/t/p/w185/puzpe91Lh0CzdRKg9iYilQsjoYk.jpg"
      },
      {
        "name": "Samuel L. Jackson",
        "character": "Jules Winnfield",
        "photo": "https://image.tmdb.org/t/p/w185/2lKs67r7FI4bPu0AXxMUJZxmUXn.jpg"
      },
      {
        "name": "Uma Thurman",
        "character": "Mia Wallace",
        "photo": "https://image.tmdb.org/t/p/w185/sBgAZWi3o4FsnaTvnTNtK6jpQcF.jpg"
      },
      {
        "name": "Bruce Willis",
        "character": "Butch Coolidge",
        "photo": "https://image.tmdb.org/t/p/w185/w3aXr1e7gQCn8MSp1vW4sXHn99P.jpg"
      },
      {
        "name": "Ving Rhames",
        "character": "Marsellus Wallace",
        "photo": ""
      },
      {
        "name": "Harvey Keitel",
        "character": "Winston Wolf",
        "photo": ""
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "netflix",
          "label": "Netflix",
          "note": "Availability varies",
          "href": "https://www.netflix.com/"
        },
        {
          "id": "amazon-prime",
          "label": "Prime Video",
          "note": "Rent or buy",
          "href": "https://www.amazon.com/gp/video/storefront"
        },
        {
          "id": "apple",
          "label": "Apple TV",
          "note": "Rent or buy",
          "href": "https://tv.apple.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region",
          "href": "https://tubitv.com/"
        },
        {
          "id": "pluto",
          "label": "Pluto TV",
          "note": "Availability varies",
          "href": "https://pluto.tv/"
        },
        {
          "id": "plex",
          "label": "Plex",
          "note": "Availability varies",
          "href": "https://www.plex.tv/"
        }
      ],
      "other": [
        {
          "id": "tmdb",
          "label": "TMDB",
          "href": "https://www.themoviedb.org/movie/680-pulp-fiction"
        }
      ]
    }
  },
  "forrest-gump": {
    "slug": "forrest-gump",
    "tmdbId": 13,
    "title": "Forrest Gump",
    "year": "1994",
    "releaseDate": "1994-07-06",
    "runtime": 142,
    "rating": "PG-13",
    "voteAverage": 8.5,
    "genres": [
      "Comedy",
      "Drama",
      "Romance"
    ],
    "tagline": "Life is like a box of chocolates... you never know what you're gonna get.",
    "overview": "A man with a low IQ has accomplished great things in his life and been present during significant historic events—in each case, far exceeding what anyone imagined he could do. But despite all he has achieved, his one true love eludes him.",
    "poster": "https://image.tmdb.org/t/p/w500/Cw4hIUIAmSYfK9QfaUW5igp9La.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/66Kn4XWhkuPkJxOJyPEx4U2CUfN.jpg",
    "trailerYouTubeId": "bLvqoHBptjg",
    "director": "Robert Zemeckis",
    "writers": [
      "Winston Groom",
      "Eric Roth"
    ],
    "producers": [
      "Wendy Finerman",
      "Steve Tisch",
      "Steve Starkey"
    ],
    "executiveProducer": "",
    "related": [
      "the-shawshank-redemption",
      "pulp-fiction",
      "fight-club",
      "star-wars"
    ],
    "cast": [
      {
        "name": "Tom Hanks",
        "character": "Forrest Gump",
        "photo": "https://image.tmdb.org/t/p/w185/oFvZoKI6lvU03n4YoNGAll9rkas.jpg"
      },
      {
        "name": "Robin Wright",
        "character": "Jenny Curran",
        "photo": "https://image.tmdb.org/t/p/w185/d3rIv0y2p0jMsQ7ViR7O1606NZa.jpg"
      },
      {
        "name": "Gary Sinise",
        "character": "Lieutenant Dan Taylor",
        "photo": ""
      },
      {
        "name": "Sally Field",
        "character": "Mrs. Gump",
        "photo": ""
      },
      {
        "name": "Mykelti Williamson",
        "character": "Bubba Blue",
        "photo": ""
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "paramount-plus",
          "label": "Paramount+",
          "note": "Streaming (availability varies)",
          "href": "https://www.paramountplus.com/"
        },
        {
          "id": "amazon-prime",
          "label": "Prime Video",
          "note": "Rent or buy",
          "href": "https://www.amazon.com/gp/video/storefront"
        },
        {
          "id": "apple",
          "label": "Apple TV",
          "note": "Rent or buy",
          "href": "https://tv.apple.com/"
        },
        {
          "id": "netflix",
          "label": "Netflix",
          "note": "Availability varies",
          "href": "https://www.netflix.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region",
          "href": "https://tubitv.com/"
        },
        {
          "id": "plex",
          "label": "Plex",
          "note": "Availability varies",
          "href": "https://www.plex.tv/"
        }
      ],
      "other": [
        {
          "id": "tmdb",
          "label": "TMDB",
          "href": "https://www.themoviedb.org/movie/13-forrest-gump"
        }
      ]
    }
  },
  "fight-club": {
    "slug": "fight-club",
    "tmdbId": 550,
    "title": "Fight Club",
    "year": "1999",
    "releaseDate": "1999-10-15",
    "runtime": 139,
    "rating": "R",
    "voteAverage": 8.4,
    "genres": [
      "Drama"
    ],
    "tagline": "Mischief. Mayhem. Soap.",
    "overview": "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground \"fight clubs\" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
    "poster": "https://image.tmdb.org/t/p/w500/jSziioSwPVrOy9Yow3XhWIBDjq1.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/c6OLXfKAk5BKeR6broC8pYiCquX.jpg",
    "trailerYouTubeId": "qtRKdVHc-cE",
    "director": "David Fincher",
    "writers": [
      "Chuck Palahniuk",
      "Jim Uhls"
    ],
    "producers": [
      "Art Linson",
      "Ceán Chaffin",
      "Ross Grayson Bell"
    ],
    "executiveProducer": "",
    "related": [
      "pulp-fiction",
      "the-matrix",
      "blade-runner-2049",
      "inception"
    ],
    "cast": [
      {
        "name": "Brad Pitt",
        "character": "Tyler Durden",
        "photo": "https://image.tmdb.org/t/p/w185/ajNaPmXVVMJFg9GWmu6MJzTaXdV.jpg"
      },
      {
        "name": "Edward Norton",
        "character": "The Narrator",
        "photo": "https://image.tmdb.org/t/p/w185/8nytsqL59SFJTVYVrN72k6qkGgJ.jpg"
      },
      {
        "name": "Helena Bonham Carter",
        "character": "Marla Singer",
        "photo": ""
      },
      {
        "name": "Meat Loaf",
        "character": "Robert \"Bob\" Paulson",
        "photo": ""
      },
      {
        "name": "Jared Leto",
        "character": "Angel Face",
        "photo": ""
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "hulu",
          "label": "Hulu",
          "note": "Availability varies",
          "href": "https://www.hulu.com/"
        },
        {
          "id": "disney-plus",
          "label": "Disney+",
          "note": "Availability varies",
          "href": "https://www.disneyplus.com/"
        },
        {
          "id": "amazon-prime",
          "label": "Prime Video",
          "note": "Rent or buy",
          "href": "https://www.amazon.com/gp/video/storefront"
        },
        {
          "id": "apple",
          "label": "Apple TV",
          "note": "Rent or buy",
          "href": "https://tv.apple.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region",
          "href": "https://tubitv.com/"
        },
        {
          "id": "pluto",
          "label": "Pluto TV",
          "note": "Availability varies",
          "href": "https://pluto.tv/"
        }
      ],
      "other": [
        {
          "id": "tmdb",
          "label": "TMDB",
          "href": "https://www.themoviedb.org/movie/550-fight-club"
        }
      ]
    }
  },
  "return-of-the-king": {
    "slug": "return-of-the-king",
    "tmdbId": 122,
    "title": "The Lord of the Rings: The Return of the King",
    "year": "2003",
    "releaseDate": "2003-12-17",
    "runtime": 201,
    "rating": "PG-13",
    "voteAverage": 8.5,
    "genres": [
      "Adventure",
      "Fantasy",
      "Action"
    ],
    "tagline": "The eye of the enemy is moving.",
    "overview": "Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken fellowship struggle to save Gondor from Sauron's forces. Meanwhile, Frodo and Sam take the ring closer to the heart of Mordor, the dark lord's realm.",
    "poster": "https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/ctiw6FZK4N36LmkjSklWEbuvlq9.jpg",
    "trailerYouTubeId": "r5X-hFf6Heg",
    "director": "Peter Jackson",
    "writers": [
      "Fran Walsh",
      "Philippa Boyens",
      "Peter Jackson"
    ],
    "producers": [
      "Peter Jackson",
      "Barrie M. Osborne",
      "Fran Walsh"
    ],
    "executiveProducer": "",
    "related": [
      "star-wars",
      "dune",
      "dune-part-two",
      "avatar-the-way-of-water"
    ],
    "cast": [
      {
        "name": "Elijah Wood",
        "character": "Frodo Baggins",
        "photo": "https://image.tmdb.org/t/p/w185/7UKRbJBNG7mxBl2QQc5XsAh6F8B.jpg"
      },
      {
        "name": "Viggo Mortensen",
        "character": "Aragorn",
        "photo": "https://image.tmdb.org/t/p/w185/vH5gVSpHAMhDaFWfh0Q7BG61O1y.jpg"
      },
      {
        "name": "Ian McKellen",
        "character": "Gandalf",
        "photo": "https://image.tmdb.org/t/p/w185/5cnnnpnJG6TiYUSS7qgJheUZgnv.jpg"
      },
      {
        "name": "Orlando Bloom",
        "character": "Legolas",
        "photo": "https://image.tmdb.org/t/p/w185/3FfJMIVwXgsIXbAT8ECBSZJAncR.jpg"
      },
      {
        "name": "Sean Astin",
        "character": "Samwise Gamgee",
        "photo": ""
      },
      {
        "name": "Andy Serkis",
        "character": "Gollum / Sméagol",
        "photo": ""
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "max",
          "label": "Max",
          "note": "Streaming (availability varies)",
          "href": "https://www.max.com/"
        },
        {
          "id": "amazon-prime",
          "label": "Prime Video",
          "note": "Rent or buy",
          "href": "https://www.amazon.com/gp/video/storefront"
        },
        {
          "id": "apple",
          "label": "Apple TV",
          "note": "Rent or buy",
          "href": "https://tv.apple.com/"
        },
        {
          "id": "netflix",
          "label": "Netflix",
          "note": "Availability varies",
          "href": "https://www.netflix.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region",
          "href": "https://tubitv.com/"
        },
        {
          "id": "plex",
          "label": "Plex",
          "note": "Availability varies",
          "href": "https://www.plex.tv/"
        }
      ],
      "other": [
        {
          "id": "tmdb",
          "label": "TMDB",
          "href": "https://www.themoviedb.org/movie/122-the-lord-of-the-rings-the-return-of-the-king"
        }
      ]
    }
  },
  "the-matrix": {
    "slug": "the-matrix",
    "tmdbId": 603,
    "title": "The Matrix",
    "year": "1999",
    "releaseDate": "1999-03-31",
    "runtime": 136,
    "rating": "R",
    "voteAverage": 8.2,
    "genres": [
      "Action",
      "Science Fiction"
    ],
    "tagline": "Welcome to the Real World.",
    "overview": "Set in the 22nd century, The Matrix tells the story of a computer hacker who joins a group of underground insurgents fighting the vast and powerful computers who now rule the earth.",
    "poster": "https://image.tmdb.org/t/p/w500/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/tlm8UkiQsitc8rSuIAscQDCnP8d.jpg",
    "trailerYouTubeId": "vKQi3bBA1y8",
    "director": "Lana Wachowski",
    "writers": [
      "Lilly Wachowski",
      "Lana Wachowski"
    ],
    "producers": [
      "Joel Silver"
    ],
    "executiveProducer": "",
    "related": [
      "inception",
      "blade-runner-2049",
      "fight-club",
      "the-dark-knight"
    ],
    "cast": [
      {
        "name": "Keanu Reeves",
        "character": "Neo",
        "photo": "https://image.tmdb.org/t/p/w185/8RZLOyYGsoRe9p44q3xin9QkMHv.jpg"
      },
      {
        "name": "Laurence Fishburne",
        "character": "Morpheus",
        "photo": "https://image.tmdb.org/t/p/w185/2GbXERENPpl5MmlqOLlPVaVtifD.jpg"
      },
      {
        "name": "Carrie-Anne Moss",
        "character": "Trinity",
        "photo": "https://image.tmdb.org/t/p/w185/9zya72vRZYBQILfetACsnmCBgdj.jpg"
      },
      {
        "name": "Hugo Weaving",
        "character": "Agent Smith",
        "photo": ""
      },
      {
        "name": "Joe Pantoliano",
        "character": "Cypher",
        "photo": ""
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "max",
          "label": "Max",
          "note": "Streaming (availability varies)",
          "href": "https://www.max.com/"
        },
        {
          "id": "amazon-prime",
          "label": "Prime Video",
          "note": "Rent or buy",
          "href": "https://www.amazon.com/gp/video/storefront"
        },
        {
          "id": "apple",
          "label": "Apple TV",
          "note": "Rent or buy",
          "href": "https://tv.apple.com/"
        },
        {
          "id": "netflix",
          "label": "Netflix",
          "note": "Availability varies",
          "href": "https://www.netflix.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region",
          "href": "https://tubitv.com/"
        },
        {
          "id": "pluto",
          "label": "Pluto TV",
          "note": "Availability varies",
          "href": "https://pluto.tv/"
        }
      ],
      "other": [
        {
          "id": "tmdb",
          "label": "TMDB",
          "href": "https://www.themoviedb.org/movie/603-the-matrix"
        }
      ]
    }
  },
  "star-wars": {
    "slug": "star-wars",
    "tmdbId": 11,
    "title": "Star Wars",
    "year": "1977",
    "releaseDate": "1977-05-25",
    "runtime": 121,
    "rating": "PG",
    "voteAverage": 8.2,
    "genres": [
      "Adventure",
      "Action",
      "Science Fiction"
    ],
    "tagline": "A long time ago in a galaxy far, far away...",
    "overview": "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
    "poster": "https://image.tmdb.org/t/p/w500/fai0rspsNeJCS69wHNjOdWxcI7P.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/zqkmTXzjkAgXmEWLRsY4UpTWCeo.jpg",
    "trailerYouTubeId": "vZ734NWnAHA",
    "director": "George Lucas",
    "writers": [
      "George Lucas"
    ],
    "producers": [
      "Gary Kurtz",
      "George Lucas",
      "Rick McCallum"
    ],
    "executiveProducer": "",
    "related": [
      "return-of-the-king",
      "avatar-the-way-of-water",
      "dune",
      "avengers-infinity-war"
    ],
    "cast": [
      {
        "name": "Mark Hamill",
        "character": "Luke Skywalker",
        "photo": "https://image.tmdb.org/t/p/w185/zMQ93JTLW8KxusKhOlHFZhih3YQ.jpg"
      },
      {
        "name": "Harrison Ford",
        "character": "Han Solo",
        "photo": "https://image.tmdb.org/t/p/w185/pjBMJVPpcZK23Vt1nzr1zEBTWrP.jpg"
      },
      {
        "name": "Carrie Fisher",
        "character": "Princess Leia Organa",
        "photo": "https://image.tmdb.org/t/p/w185/of4yHmryKPy92eeskUQ7MRmjC3l.jpg"
      },
      {
        "name": "Alec Guinness",
        "character": "Obi-Wan Kenobi",
        "photo": ""
      },
      {
        "name": "Peter Cushing",
        "character": "Grand Moff Tarkin",
        "photo": ""
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "disney-plus",
          "label": "Disney+",
          "note": "Streaming (availability varies)",
          "href": "https://www.disneyplus.com/"
        },
        {
          "id": "amazon-prime",
          "label": "Prime Video",
          "note": "Rent or buy",
          "href": "https://www.amazon.com/gp/video/storefront"
        },
        {
          "id": "apple",
          "label": "Apple TV",
          "note": "Rent or buy",
          "href": "https://tv.apple.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region",
          "href": "https://tubitv.com/"
        },
        {
          "id": "plex",
          "label": "Plex",
          "note": "Availability varies",
          "href": "https://www.plex.tv/"
        }
      ],
      "other": [
        {
          "id": "tmdb",
          "label": "TMDB",
          "href": "https://www.themoviedb.org/movie/11-star-wars"
        }
      ]
    }
  },
  "avengers-infinity-war": {
    "slug": "avengers-infinity-war",
    "tmdbId": 299536,
    "title": "Avengers: Infinity War",
    "year": "2018",
    "releaseDate": "2018-04-27",
    "runtime": 149,
    "rating": "PG-13",
    "voteAverage": 8.2,
    "genres": [
      "Adventure",
      "Action",
      "Science Fiction"
    ],
    "tagline": "An entire universe. Once and for all.",
    "overview": "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality.",
    "poster": "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
    "trailerYouTubeId": "6ZfuNTqbHE8",
    "director": "Anthony Russo",
    "writers": [
      "Christopher Markus",
      "Stephen McFeely"
    ],
    "producers": [
      "Kevin Feige"
    ],
    "executiveProducer": "",
    "related": [
      "spider-man-across-the-spider-verse",
      "star-wars",
      "the-dark-knight",
      "dune-part-two"
    ],
    "cast": [
      {
        "name": "Robert Downey Jr.",
        "character": "Tony Stark / Iron Man",
        "photo": "https://image.tmdb.org/t/p/w185/5qHNjhtjMD4YWH3UP0rm4tKwxCL.jpg"
      },
      {
        "name": "Chris Hemsworth",
        "character": "Thor",
        "photo": "https://image.tmdb.org/t/p/w185/piQGdoIQOF3C1EI5cbYZLAW1gfj.jpg"
      },
      {
        "name": "Chris Evans",
        "character": "Steve Rogers / Captain America",
        "photo": "https://image.tmdb.org/t/p/w185/3bOGNsHlrswhyW79uvIHH1V43JI.jpg"
      },
      {
        "name": "Scarlett Johansson",
        "character": "Natasha Romanoff / Black Widow",
        "photo": "https://image.tmdb.org/t/p/w185/tgxYh3jMs5bY2Ub4d2dcp9iaz1R.jpg"
      },
      {
        "name": "Mark Ruffalo",
        "character": "Bruce Banner / Hulk",
        "photo": "https://image.tmdb.org/t/p/w185/5GilHMOt5PAQh6rlUKZzGmaKEI7.jpg"
      },
      {
        "name": "Chris Pratt",
        "character": "Peter Quill / Star-Lord",
        "photo": "https://image.tmdb.org/t/p/w185/cRH6HPAQ98PlOwwEvhYO4CM9lwu.jpg"
      },
      {
        "name": "Chadwick Boseman",
        "character": "T'Challa / Black Panther",
        "photo": "https://image.tmdb.org/t/p/w185/nL16SKfyP1b7Hk6LsuWiqMfbdb8.jpg"
      },
      {
        "name": "Tom Holland",
        "character": "Peter Parker / Spider-Man",
        "photo": "https://image.tmdb.org/t/p/w185/xKBAaPIa1c7tzZD3Y0MhBLv4hPE.jpg"
      },
      {
        "name": "Benedict Cumberbatch",
        "character": "Dr. Stephen Strange",
        "photo": "https://image.tmdb.org/t/p/w185/wz3MRiMmoz6b5X3oSzMRC9nLxY1.jpg"
      },
      {
        "name": "Josh Brolin",
        "character": "Thanos",
        "photo": "https://image.tmdb.org/t/p/w185/sX2etBbIkxRaCsATyw5ZpOVMPTD.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "disney-plus",
          "label": "Disney+",
          "note": "Streaming (availability varies)",
          "href": "https://www.disneyplus.com/"
        },
        {
          "id": "amazon-prime",
          "label": "Prime Video",
          "note": "Rent or buy",
          "href": "https://www.amazon.com/gp/video/storefront"
        },
        {
          "id": "apple",
          "label": "Apple TV",
          "note": "Rent or buy",
          "href": "https://tv.apple.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region",
          "href": "https://tubitv.com/"
        },
        {
          "id": "plex",
          "label": "Plex",
          "note": "Availability varies",
          "href": "https://www.plex.tv/"
        }
      ],
      "other": [
        {
          "id": "tmdb",
          "label": "TMDB",
          "href": "https://www.themoviedb.org/movie/299536-avengers-infinity-war"
        }
      ]
    }
  },
  "dune": {
    "slug": "dune",
    "tmdbId": 438631,
    "title": "Dune",
    "year": "2021",
    "releaseDate": "2021-10-22",
    "runtime": 155,
    "rating": "PG-13",
    "voteAverage": 7.8,
    "genres": [
      "Science Fiction",
      "Adventure"
    ],
    "tagline": "It begins.",
    "overview": "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet's exclusive supply of the most precious resource in existence—a commodity capable of unlocking humanity's greatest potential—only those who can conquer their fear will survive.",
    "poster": "https://image.tmdb.org/t/p/w500/v1tRXZ4JtD2Iv6fjkPvT4GiwslV.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/zRKQW58MBEY078AxkHxEJzUskCl.jpg",
    "trailerYouTubeId": "n9xhJrPXop4",
    "director": "Denis Villeneuve",
    "writers": [
      "Jon Spaihts",
      "Denis Villeneuve",
      "Eric Roth"
    ],
    "producers": [
      "Mary Parent",
      "Denis Villeneuve",
      "Cale Boyter"
    ],
    "executiveProducer": "",
    "related": [
      "dune-part-two",
      "blade-runner-2049",
      "interstellar",
      "avatar-the-way-of-water"
    ],
    "cast": [
      {
        "name": "Timothée Chalamet",
        "character": "Paul Atreides",
        "photo": "https://image.tmdb.org/t/p/w185/dFxpwRpmzpVfP1zjluH68DeQhyj.jpg"
      },
      {
        "name": "Rebecca Ferguson",
        "character": "Lady Jessica",
        "photo": "https://image.tmdb.org/t/p/w185/ra53cM1aNmdH0aFhj8yBqPOj2fb.jpg"
      },
      {
        "name": "Oscar Isaac",
        "character": "Duke Leto Atreides",
        "photo": "https://image.tmdb.org/t/p/w185/dW5U5yrIIPmMjRThR9KT2xH6nTz.jpg"
      },
      {
        "name": "Josh Brolin",
        "character": "Gurney Halleck",
        "photo": "https://image.tmdb.org/t/p/w185/sX2etBbIkxRaCsATyw5ZpOVMPTD.jpg"
      },
      {
        "name": "Zendaya",
        "character": "Chani",
        "photo": "https://image.tmdb.org/t/p/w185/1qup8tSt95HLbcy2c2xrx4iJNxv.jpg"
      },
      {
        "name": "Jason Momoa",
        "character": "Duncan Idaho",
        "photo": "https://image.tmdb.org/t/p/w185/ykiJeJUhtcGqfkhJazP1O6qDxiR.jpg"
      },
      {
        "name": "Stellan Skarsgård",
        "character": "Baron Vladimir Harkonnen",
        "photo": ""
      },
      {
        "name": "Dave Bautista",
        "character": "Rabban",
        "photo": "https://image.tmdb.org/t/p/w185/gUTm0fY8d79l9N2lsxr4yRsB16S.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "max",
          "label": "Max",
          "note": "Streaming (availability varies)",
          "href": "https://www.max.com/"
        },
        {
          "id": "netflix",
          "label": "Netflix",
          "note": "Availability varies",
          "href": "https://www.netflix.com/"
        },
        {
          "id": "amazon-prime",
          "label": "Prime Video",
          "note": "Rent or buy",
          "href": "https://www.amazon.com/gp/video/storefront"
        },
        {
          "id": "hulu",
          "label": "Hulu",
          "note": "Availability varies",
          "href": "https://www.hulu.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region",
          "href": "https://tubitv.com/"
        },
        {
          "id": "pluto",
          "label": "Pluto TV",
          "note": "Availability varies",
          "href": "https://pluto.tv/"
        }
      ],
      "other": [
        {
          "id": "tmdb",
          "label": "TMDB",
          "href": "https://www.themoviedb.org/movie/438631-dune"
        }
      ]
    }
  },
  "avatar-the-way-of-water": {
    "slug": "avatar-the-way-of-water",
    "tmdbId": 76600,
    "title": "Avatar: The Way of Water",
    "year": "2022",
    "releaseDate": "2022-12-16",
    "runtime": 192,
    "rating": "PG-13",
    "voteAverage": 7.6,
    "genres": [
      "Science Fiction",
      "Adventure",
      "Action"
    ],
    "tagline": "Return to Pandora.",
    "overview": "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
    "poster": "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/kJsPVzdyBrYHLomuNv5SJDXUQ2f.jpg",
    "trailerYouTubeId": "d9MyW72ELq0",
    "director": "James Cameron",
    "writers": [
      "James Cameron",
      "Rick Jaffa",
      "Amanda Silver"
    ],
    "producers": [
      "James Cameron",
      "Jon Landau"
    ],
    "executiveProducer": "",
    "related": [
      "dune",
      "star-wars",
      "return-of-the-king",
      "avengers-infinity-war"
    ],
    "cast": [
      {
        "name": "Sam Worthington",
        "character": "Jake Sully",
        "photo": "https://image.tmdb.org/t/p/w185/mflBcox36s9ZPbsZPVOuhf6axaJ.jpg"
      },
      {
        "name": "Zoe Saldaña",
        "character": "Neytiri",
        "photo": "https://image.tmdb.org/t/p/w185/xvbnUiB2ZBR3QIt595OzNy657Vw.jpg"
      },
      {
        "name": "Sigourney Weaver",
        "character": "Kiri / Dr. Grace Augustine",
        "photo": ""
      },
      {
        "name": "Stephen Lang",
        "character": "Colonel Miles Quaritch",
        "photo": ""
      },
      {
        "name": "Kate Winslet",
        "character": "Ronal",
        "photo": ""
      },
      {
        "name": "Cliff Curtis",
        "character": "Tonowari",
        "photo": ""
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "theaters",
          "label": "In Theaters",
          "note": "Special / large-format engagements · check local listings",
          "href": "https://www.fandango.com/"
        },
        {
          "id": "disney-plus",
          "label": "Disney+",
          "note": "Streaming (availability varies)",
          "href": "https://www.disneyplus.com/"
        },
        {
          "id": "amazon-prime",
          "label": "Prime Video",
          "note": "Rent or buy",
          "href": "https://www.amazon.com/gp/video/storefront"
        },
        {
          "id": "apple",
          "label": "Apple TV",
          "note": "Rent or buy",
          "href": "https://tv.apple.com/"
        },
        {
          "id": "hulu",
          "label": "Hulu",
          "note": "Availability varies",
          "href": "https://www.hulu.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region",
          "href": "https://tubitv.com/"
        },
        {
          "id": "plex",
          "label": "Plex",
          "note": "Availability varies",
          "href": "https://www.plex.tv/"
        }
      ],
      "other": [
        {
          "id": "tmdb",
          "label": "TMDB",
          "href": "https://www.themoviedb.org/movie/76600-avatar-the-way-of-water"
        }
      ]
    }
  },
  "parasite": {
    "slug": "parasite",
    "tmdbId": 496243,
    "title": "Parasite",
    "year": "2019",
    "releaseDate": "2019-05-30",
    "runtime": 133,
    "rating": "R",
    "voteAverage": 8.5,
    "genres": [
      "Comedy",
      "Thriller",
      "Drama"
    ],
    "tagline": "Act like you own the place.",
    "overview": "All unemployed, Ki-taek's family takes peculiar interest in the wealthy and glamorous Parks for their livelihood until they get entangled in an unexpected incident.",
    "poster": "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    "trailerYouTubeId": "5xH0HfJHsaY",
    "director": "Bong Joon-ho",
    "writers": [
      "Bong Joon-ho",
      "Han Jin-won"
    ],
    "producers": [
      "Kwak Sin-ae",
      "Moon Yang-kwon",
      "Bong Joon-ho"
    ],
    "executiveProducer": "",
    "related": [
      "fight-club",
      "pulp-fiction",
      "the-shawshank-redemption",
      "oppenheimer"
    ],
    "cast": [
      {
        "name": "Song Kang-ho",
        "character": "Kim Ki-taek",
        "photo": "https://image.tmdb.org/t/p/w185/kBM9UTPYXUA2RNk210DXhztLFns.jpg"
      },
      {
        "name": "Choi Woo-shik",
        "character": "Kim Ki-woo",
        "photo": "https://image.tmdb.org/t/p/w185/6Eu0BNd8rMuXaIXkF7nPD7qYYW2.jpg"
      },
      {
        "name": "Park So-dam",
        "character": "Kim Ki-jung",
        "photo": ""
      },
      {
        "name": "Lee Sun-kyun",
        "character": "Park Dong-ik",
        "photo": ""
      },
      {
        "name": "Cho Yeo-jeong",
        "character": "Park Yeon-kyo",
        "photo": ""
      },
      {
        "name": "Jang Hye-jin",
        "character": "Kim Chung-sook",
        "photo": ""
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "hulu",
          "label": "Hulu",
          "note": "Availability varies",
          "href": "https://www.hulu.com/"
        },
        {
          "id": "amazon-prime",
          "label": "Prime Video",
          "note": "Rent or buy",
          "href": "https://www.amazon.com/gp/video/storefront"
        },
        {
          "id": "apple",
          "label": "Apple TV",
          "note": "Rent or buy",
          "href": "https://tv.apple.com/"
        },
        {
          "id": "netflix",
          "label": "Netflix",
          "note": "Availability varies",
          "href": "https://www.netflix.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region",
          "href": "https://tubitv.com/"
        },
        {
          "id": "pluto",
          "label": "Pluto TV",
          "note": "Availability varies",
          "href": "https://pluto.tv/"
        }
      ],
      "other": [
        {
          "id": "tmdb",
          "label": "TMDB",
          "href": "https://www.themoviedb.org/movie/496243-parasite"
        }
      ]
    }
  },
  "the-shawshank-redemption": {
    "slug": "the-shawshank-redemption",
    "tmdbId": 278,
    "title": "The Shawshank Redemption",
    "year": "1994",
    "releaseDate": "1994-09-23",
    "runtime": 142,
    "rating": "R",
    "voteAverage": 8.7,
    "genres": [
      "Drama",
      "Crime"
    ],
    "tagline": "Fear can hold you prisoner. Hope can set you free.",
    "overview": "Imprisoned in the mid-1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden. During his long stretch in prison, Dufresne comes to be admired by the other inmates—including an older prisoner named Red—for his integrity and unquenchable sense of hope.",
    "poster": "https://image.tmdb.org/t/p/w500/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/pNjh59JSxChQktamG3LMp9ZoQzp.jpg",
    "trailerYouTubeId": "6hB3S9bIaco",
    "director": "Frank Darabont",
    "writers": [
      "Stephen King",
      "Frank Darabont"
    ],
    "producers": [
      "Niki Marvin"
    ],
    "executiveProducer": "",
    "related": [
      "forrest-gump",
      "pulp-fiction",
      "fight-club",
      "parasite"
    ],
    "cast": [
      {
        "name": "Tim Robbins",
        "character": "Andy Dufresne",
        "photo": "https://image.tmdb.org/t/p/w185/9zOTpVMwMHNjPFBNoPy9vOBT1NC.jpg"
      },
      {
        "name": "Morgan Freeman",
        "character": "Ellis Boyd \"Red\" Redding",
        "photo": "https://image.tmdb.org/t/p/w185/bjNSzt1d7uK3q5PbtFXUJrRt4qg.jpg"
      },
      {
        "name": "Bob Gunton",
        "character": "Warden Norton",
        "photo": ""
      },
      {
        "name": "William Sadler",
        "character": "Heywood",
        "photo": ""
      },
      {
        "name": "Clancy Brown",
        "character": "Captain Hadley",
        "photo": ""
      },
      {
        "name": "Gil Bellows",
        "character": "Tommy",
        "photo": ""
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "max",
          "label": "Max",
          "note": "Streaming (availability varies)",
          "href": "https://www.max.com/"
        },
        {
          "id": "amazon-prime",
          "label": "Prime Video",
          "note": "Rent or buy",
          "href": "https://www.amazon.com/gp/video/storefront"
        },
        {
          "id": "apple",
          "label": "Apple TV",
          "note": "Rent or buy",
          "href": "https://tv.apple.com/"
        },
        {
          "id": "netflix",
          "label": "Netflix",
          "note": "Availability varies",
          "href": "https://www.netflix.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region",
          "href": "https://tubitv.com/"
        },
        {
          "id": "pluto",
          "label": "Pluto TV",
          "note": "Availability varies",
          "href": "https://pluto.tv/"
        },
        {
          "id": "plex",
          "label": "Plex",
          "note": "Availability varies",
          "href": "https://www.plex.tv/"
        }
      ],
      "other": [
        {
          "id": "tmdb",
          "label": "TMDB",
          "href": "https://www.themoviedb.org/movie/278-the-shawshank-redemption"
        }
      ]
    }
  },
  "spider-man-across-the-spider-verse": {
    "slug": "spider-man-across-the-spider-verse",
    "tmdbId": 569094,
    "title": "Spider-Man: Across the Spider-Verse",
    "year": "2023",
    "releaseDate": "2023-06-02",
    "runtime": 140,
    "rating": "PG",
    "voteAverage": 8.4,
    "genres": [
      "Animation",
      "Action",
      "Adventure",
      "Science Fiction"
    ],
    "tagline": "It's how you wear the mask that matters.",
    "overview": "After reuniting with Gwen Stacy, Brooklyn's full-time, friendly neighborhood Spider-Man Miles Morales is catapulted across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders, and must redefine what it means to be a hero so he can save the people he loves most.",
    "poster": "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/kVd3a9YeLGkoeR50jGEXM6EqseS.jpg",
    "trailerYouTubeId": "cqGjhVJWtEg",
    "director": "Joaquim Dos Santos",
    "writers": [
      "Phil Lord",
      "Christopher Miller",
      "Dave Callaham"
    ],
    "producers": [
      "Avi Arad",
      "Amy Pascal",
      "Phil Lord",
      "Christopher Miller",
      "Christina Steinberg"
    ],
    "executiveProducer": "",
    "related": [
      "avengers-infinity-war",
      "the-matrix",
      "inception",
      "barbie"
    ],
    "cast": [
      {
        "name": "Shameik Moore",
        "character": "Miles Morales / Spider-Man (voice)",
        "photo": "https://image.tmdb.org/t/p/w185/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg"
      },
      {
        "name": "Hailee Steinfeld",
        "character": "Gwen Stacy / Spider-Gwen (voice)",
        "photo": "https://image.tmdb.org/t/p/w185/84wbc0e2iQ8x0eTHcFVKNl31BLu.jpg"
      },
      {
        "name": "Brian Tyree Henry",
        "character": "Jefferson Morales (voice)",
        "photo": ""
      },
      {
        "name": "Luna Lauren Vélez",
        "character": "Rio Morales (voice)",
        "photo": ""
      },
      {
        "name": "Jake Johnson",
        "character": "Peter B. Parker / Spider-Man (voice)",
        "photo": ""
      },
      {
        "name": "Oscar Isaac",
        "character": "Miguel O'Hara / Spider-Man 2099 (voice)",
        "photo": "https://image.tmdb.org/t/p/w185/dW5U5yrIIPmMjRThR9KT2xH6nTz.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "netflix",
          "label": "Netflix",
          "note": "Availability varies",
          "href": "https://www.netflix.com/"
        },
        {
          "id": "amazon-prime",
          "label": "Prime Video",
          "note": "Rent or buy",
          "href": "https://www.amazon.com/gp/video/storefront"
        },
        {
          "id": "apple",
          "label": "Apple TV",
          "note": "Rent or buy",
          "href": "https://tv.apple.com/"
        },
        {
          "id": "disney-plus",
          "label": "Disney+",
          "note": "Availability varies",
          "href": "https://www.disneyplus.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region",
          "href": "https://tubitv.com/"
        },
        {
          "id": "plex",
          "label": "Plex",
          "note": "Availability varies",
          "href": "https://www.plex.tv/"
        }
      ],
      "other": [
        {
          "id": "tmdb",
          "label": "TMDB",
          "href": "https://www.themoviedb.org/movie/569094-spider-man-across-the-spider-verse"
        }
      ]
    }
  },
  "barbie": {
    "slug": "barbie",
    "tmdbId": 346698,
    "title": "Barbie",
    "year": "2023",
    "releaseDate": "2023-07-21",
    "runtime": 114,
    "rating": "PG-13",
    "voteAverage": 7.0,
    "genres": [
      "Comedy",
      "Adventure"
    ],
    "tagline": "She's everything. He's just Ken.",
    "overview": "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
    "poster": "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/1esAE8sLJRWWFsLLeh5r3g2WanI.jpg",
    "trailerYouTubeId": "pBk4NYhWNMM",
    "director": "Greta Gerwig",
    "writers": [
      "Greta Gerwig",
      "Noah Baumbach"
    ],
    "producers": [
      "David Heyman",
      "Margot Robbie",
      "Tom Ackerley",
      "Robbie Brenner"
    ],
    "executiveProducer": "",
    "related": [
      "spider-man-across-the-spider-verse",
      "oppenheimer",
      "forrest-gump",
      "parasite"
    ],
    "cast": [
      {
        "name": "Margot Robbie",
        "character": "Barbie",
        "photo": "https://image.tmdb.org/t/p/w185/dnRtM8YBxidAshD76XIMN495Yqc.jpg"
      },
      {
        "name": "Ryan Gosling",
        "character": "Ken",
        "photo": "https://image.tmdb.org/t/p/w185/dzjT4LKgs7eOma84GsPy78DsGNH.jpg"
      },
      {
        "name": "America Ferrera",
        "character": "Gloria",
        "photo": ""
      },
      {
        "name": "Kate McKinnon",
        "character": "Weird Barbie",
        "photo": ""
      },
      {
        "name": "Will Ferrell",
        "character": "CEO of Mattel",
        "photo": ""
      },
      {
        "name": "Issa Rae",
        "character": "President Barbie",
        "photo": ""
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "max",
          "label": "Max",
          "note": "Streaming (availability varies)",
          "href": "https://www.max.com/"
        },
        {
          "id": "amazon-prime",
          "label": "Prime Video",
          "note": "Rent or buy",
          "href": "https://www.amazon.com/gp/video/storefront"
        },
        {
          "id": "apple",
          "label": "Apple TV",
          "note": "Rent or buy",
          "href": "https://tv.apple.com/"
        },
        {
          "id": "netflix",
          "label": "Netflix",
          "note": "Availability varies",
          "href": "https://www.netflix.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region",
          "href": "https://tubitv.com/"
        },
        {
          "id": "pluto",
          "label": "Pluto TV",
          "note": "Availability varies",
          "href": "https://pluto.tv/"
        }
      ],
      "other": [
        {
          "id": "tmdb",
          "label": "TMDB",
          "href": "https://www.themoviedb.org/movie/346698-barbie"
        }
      ]
    }
  },
  "blade-runner-2049": {
    "slug": "blade-runner-2049",
    "tmdbId": 335984,
    "title": "Blade Runner 2049",
    "year": "2017",
    "releaseDate": "2017-10-06",
    "runtime": 164,
    "rating": "R",
    "voteAverage": 7.5,
    "genres": [
      "Science Fiction",
      "Drama"
    ],
    "tagline": "The key to the future is finally unearthed.",
    "overview": "Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what's left of society into chaos. K's discovery leads him on a quest to find Rick Deckard, a former LAPD blade runner who has been missing for 30 years.",
    "poster": "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/gNdLJU9TxrpGx4dkZidjys3fyy0.jpg",
    "trailerYouTubeId": "gCcx85zbxz4",
    "director": "Denis Villeneuve",
    "writers": [
      "Hampton Fancher",
      "Michael Green"
    ],
    "producers": [
      "Andrew A. Kosove",
      "Broderick Johnson",
      "Bud Yorkin",
      "Cynthia Sikes Yorkin"
    ],
    "executiveProducer": "",
    "related": [
      "dune",
      "dune-part-two",
      "the-matrix",
      "interstellar"
    ],
    "cast": [
      {
        "name": "Ryan Gosling",
        "character": "K",
        "photo": "https://image.tmdb.org/t/p/w185/dzjT4LKgs7eOma84GsPy78DsGNH.jpg"
      },
      {
        "name": "Harrison Ford",
        "character": "Rick Deckard",
        "photo": "https://image.tmdb.org/t/p/w185/pjBMJVPpcZK23Vt1nzr1zEBTWrP.jpg"
      },
      {
        "name": "Ana de Armas",
        "character": "Joi",
        "photo": "https://image.tmdb.org/t/p/w185/u38k3hQBDwNX0VA22aQceDp9Iyv.jpg"
      },
      {
        "name": "Sylvia Hoeks",
        "character": "Luv",
        "photo": ""
      },
      {
        "name": "Robin Wright",
        "character": "Lieutenant Joshi",
        "photo": "https://image.tmdb.org/t/p/w185/d3rIv0y2p0jMsQ7ViR7O1606NZa.jpg"
      },
      {
        "name": "Jared Leto",
        "character": "Niander Wallace",
        "photo": ""
      },
      {
        "name": "Dave Bautista",
        "character": "Sapper Morton",
        "photo": "https://image.tmdb.org/t/p/w185/gUTm0fY8d79l9N2lsxr4yRsB16S.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "netflix",
          "label": "Netflix",
          "note": "Availability varies",
          "href": "https://www.netflix.com/"
        },
        {
          "id": "amazon-prime",
          "label": "Prime Video",
          "note": "Rent or buy",
          "href": "https://www.amazon.com/gp/video/storefront"
        },
        {
          "id": "apple",
          "label": "Apple TV",
          "note": "Rent or buy",
          "href": "https://tv.apple.com/"
        },
        {
          "id": "max",
          "label": "Max",
          "note": "Availability varies",
          "href": "https://www.max.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region",
          "href": "https://tubitv.com/"
        },
        {
          "id": "plex",
          "label": "Plex",
          "note": "Availability varies",
          "href": "https://www.plex.tv/"
        }
      ],
      "other": [
        {
          "id": "tmdb",
          "label": "TMDB",
          "href": "https://www.themoviedb.org/movie/335984-blade-runner-2049"
        }
      ]
    }
  }
};

  function getMovies() {
    return FALLBACK;
  }

  function getMovie(slug) {
    return FALLBACK[slug] || null;
  }

  global.ReelIndex = {
    SITE_NAME: "WhereToWatchFree",
    SITE_BASE: "https://atulitllc.github.io/movie-info-site",
    FALLBACK: FALLBACK,
    MOVIES: FALLBACK,
    getMovies: getMovies,
    getMovie: getMovie
  };
})(typeof window !== "undefined" ? window : globalThis);

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
