/**
 * ReelIndex TV / web series catalog
 * Keyed by URL slug. detail.js (series mode), home, and whats-on read this.
 */
(function (global) {
  const SERIES = {
  "breaking-bad": {
    "slug": "breaking-bad",
    "type": "tv",
    "kind": "tv",
    "tmdbId": 1396,
    "title": "Breaking Bad",
    "year": "2008",
    "firstAirDate": "2008-01-20",
    "seasons": 5,
    "episodes": 62,
    "rating": "TV-MA",
    "voteAverage": 8.9,
    "genres": [
      "Drama",
      "Crime"
    ],
    "tagline": "Vince Gilligan \u00b7 Crime drama classic",
    "overview": "Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
    "poster": "https://image.tmdb.org/t/p/w500/anFx9aTOOYqgS3v7x3R84Kz67ly.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    "trailerYouTubeId": "HhesaQXLuRY",
    "creators": [
      "Vince Gilligan"
    ],
    "network": "AMC",
    "related": [
      "the-boys",
      "severance",
      "the-bear"
    ],
    "cast": [
      {
        "name": "Bryan Cranston",
        "character": "Walter White",
        "photo": "https://image.tmdb.org/t/p/w185/7Jahy5LZX2Fo8fGJltMreAI49hC.jpg"
      },
      {
        "name": "Aaron Paul",
        "character": "Jesse Pinkman",
        "photo": "https://image.tmdb.org/t/p/w185/8Ac9uuoYwZoYVAIJfRLzzLsGGJn.jpg"
      },
      {
        "name": "Anna Gunn",
        "character": "Skyler White",
        "photo": "https://image.tmdb.org/t/p/w185/adppyeu1a4REN3khtgmXusrapFi.jpg"
      },
      {
        "name": "RJ Mitte",
        "character": "Walter White Jr.",
        "photo": "https://image.tmdb.org/t/p/w185/sNPA92ZrssYhlaB1UA2pWcLD9db.jpg"
      },
      {
        "name": "Dean Norris",
        "character": "Hank Schrader",
        "photo": "https://image.tmdb.org/t/p/w185/mKRrEbsxAX3ro700HsViFArRM7l.jpg"
      },
      {
        "name": "Betsy Brandt",
        "character": "Marie Schrader",
        "photo": "https://image.tmdb.org/t/p/w185/xAnuzyjdMbQq9L1c4JNwXL52Wm4.jpg"
      },
      {
        "name": "Bob Odenkirk",
        "character": "Saul Goodman",
        "photo": "https://image.tmdb.org/t/p/w185/rF0Lb6SBhGSTvjRffmlKRSeI3jE.jpg"
      },
      {
        "name": "Jonathan Banks",
        "character": "Mike Ehrmantraut",
        "photo": "https://image.tmdb.org/t/p/w185/bswk26L13PvY4iMTwUTAsepXCLv.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "netflix",
          "label": "Netflix",
          "note": "All seasons \u00b7 US",
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
      ]
    },
    "lastAirDate": "2013-09-29",
    "reviews": [
      {
        "author": "Maya Chen",
        "role": "Staff Critic",
        "rating": 9.5,
        "source": "ReelIndex Editorial",
        "quote": "Still the gold standard for serialized crime drama \u2014 meticulous, devastating, and oddly magnetic as Walter's choices tighten like a vise."
      },
      {
        "author": "Jordan Ellis",
        "role": "Staff Writer",
        "rating": 9.2,
        "source": "ReelIndex Editorial",
        "quote": "Gilligan's alchemy of chemistry, capitalism, and family loyalty remains unmatched. Rewatches reward every quiet glance."
      }
    ]
  },
  "stranger-things": {
    "slug": "stranger-things",
    "type": "tv",
    "kind": "tv",
    "tmdbId": 66732,
    "title": "Stranger Things",
    "year": "2016",
    "firstAirDate": "2016-07-15",
    "seasons": 5,
    "episodes": 42,
    "rating": "TV-14",
    "voteAverage": 8.6,
    "genres": [
      "Sci-Fi & Fantasy",
      "Mystery",
      "Drama"
    ],
    "tagline": "The Duffer Brothers \u00b7 Netflix original",
    "overview": "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
    "poster": "https://image.tmdb.org/t/p/w500/uOOtwVbSr4QDjAGIifLDwpb2Pdl.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/9P4IIMYY3HifqeruZq0ZZ9g7YUi.jpg",
    "trailerYouTubeId": "b9EkMc79ZSU",
    "creators": [
      "Matt Duffer",
      "Ross Duffer"
    ],
    "network": "Netflix",
    "related": [
      "wednesday",
      "the-last-of-us",
      "arcane"
    ],
    "cast": [
      {
        "name": "Winona Ryder",
        "character": "Joyce Byers",
        "photo": "https://image.tmdb.org/t/p/w185/8RVrlgtua8b53wmK7oZAAkm0N5O.jpg"
      },
      {
        "name": "David Harbour",
        "character": "Jim Hopper",
        "photo": "https://image.tmdb.org/t/p/w185/qMFtMWlYVtFVyBoBhX5IoA5sN5a.jpg"
      },
      {
        "name": "Millie Bobby Brown",
        "character": "Eleven, Eleven / Jane Hopper",
        "photo": "https://image.tmdb.org/t/p/w185/kHO7hdNEVuTnQ0OjjrxP1RcAa0e.jpg"
      },
      {
        "name": "Finn Wolfhard",
        "character": "Mike Wheeler",
        "photo": "https://image.tmdb.org/t/p/w185/vgjd34eWfVL6GsLHwiwcAsjWLmo.jpg"
      },
      {
        "name": "Gaten Matarazzo",
        "character": "Dustin Henderson",
        "photo": "https://image.tmdb.org/t/p/w185/alVT7oDp8N5G9WLIApI9jqeuqHq.jpg"
      },
      {
        "name": "Caleb McLaughlin",
        "character": "Lucas Sinclair",
        "photo": "https://image.tmdb.org/t/p/w185/wWy6kWlTiHc5HfOWsoKtwNFEsIR.jpg"
      },
      {
        "name": "Natalia Dyer",
        "character": "Nancy Wheeler",
        "photo": "https://image.tmdb.org/t/p/w185/cQaa3XEiUTgJxp85VeFYFyblJIH.jpg"
      },
      {
        "name": "Charlie Heaton",
        "character": "Jonathan Byers",
        "photo": "https://image.tmdb.org/t/p/w185/8Se6WZuvRmoB990bT29OPgVAyBo.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "netflix",
          "label": "Netflix",
          "note": "Streaming original",
          "href": "https://www.netflix.com/"
        }
      ],
      "free": []
    },
    "reviews": [
      {
        "author": "Sam Okonkwo",
        "role": "Contributor",
        "rating": 8.4,
        "source": "ReelIndex Editorial",
        "quote": "Amblin nostalgia with teeth \u2014 the kids' chemistry and Hawkins' creeping dread still make binge nights feel communal."
      }
    ]
  },
  "the-last-of-us": {
    "slug": "the-last-of-us",
    "type": "tv",
    "kind": "tv",
    "tmdbId": 100088,
    "title": "The Last of Us",
    "year": "2023",
    "firstAirDate": "2023-01-15",
    "seasons": 2,
    "episodes": 16,
    "rating": "TV-MA",
    "voteAverage": 8.4,
    "genres": [
      "Drama",
      "Action & Adventure",
      "Sci-Fi & Fantasy"
    ],
    "tagline": "Craig Mazin & Neil Druckmann \u00b7 HBO",
    "overview": "Twenty years after modern civilization has been destroyed, Joel, a hardened survivor, is hired to smuggle Ellie, a 14-year-old girl, out of an oppressive quarantine zone. What starts as a small job soon becomes a brutal, heartbreaking journey, as they both must traverse the United States and depend on each other for survival.",
    "poster": "https://image.tmdb.org/t/p/w500/dmo6TYuuJgaYinXBPjrgG9mB5od.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/lY2DhbA7Hy44fAKddr06UrXWWaQ.jpg",
    "trailerYouTubeId": "uLtkt8BonwM",
    "creators": [
      "Craig Mazin",
      "Neil Druckmann"
    ],
    "network": "Max",
    "related": [
      "game-of-thrones",
      "house-of-the-dragon",
      "the-boys"
    ],
    "cast": [
      {
        "name": "Bella Ramsey",
        "character": "Ellie Williams",
        "photo": "https://image.tmdb.org/t/p/w185/vDbgxc7RYawpB1wK7JDEj62j06H.jpg"
      },
      {
        "name": "Pedro Pascal",
        "character": "Joel Miller (uncredited), Joel Miller",
        "photo": "https://image.tmdb.org/t/p/w185/oKcMbVn0NJTNzQt0ClKKvVXkm60.jpg"
      },
      {
        "name": "Gabriel Luna",
        "character": "Tommy Miller",
        "photo": "https://image.tmdb.org/t/p/w185/bIPORtYxTJPEUJIThbZrpqf4A11.jpg"
      },
      {
        "name": "Isabela Merced",
        "character": "Dina",
        "photo": "https://image.tmdb.org/t/p/w185/7O5GWIH8IHwU4kGZIhC3JkGDiZr.jpg"
      },
      {
        "name": "Young Mazino",
        "character": "Jesse",
        "photo": "https://image.tmdb.org/t/p/w185/cRuVRx1DMe2hBkz5pssVqdpCtaQ.jpg"
      },
      {
        "name": "Rutina Wesley",
        "character": "Maria",
        "photo": "https://image.tmdb.org/t/p/w185/ujpdNAKxlv6TRI2mm0k3eSSZJkB.jpg"
      },
      {
        "name": "Samuel Hoeksema",
        "character": "Clicker, Museum Clicker",
        "photo": "https://image.tmdb.org/t/p/w185/6TEscmA3aFBkdWX2DuozcUhHkBK.jpg"
      },
      {
        "name": "Danny Ramirez",
        "character": "Manny Alvarez",
        "photo": "https://image.tmdb.org/t/p/w185/7ZvcfWA5O5ULiupbHZtGGEPwnpI.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "max",
          "label": "Max",
          "note": "HBO original",
          "href": "https://www.max.com/"
        }
      ],
      "free": []
    },
    "reviews": [
      {
        "author": "Maya Chen",
        "role": "Staff Critic",
        "rating": 8.8,
        "source": "ReelIndex Editorial",
        "quote": "Game adaptation done right: brutal, tender, and anchored by Pascal and Ramsey's uneasy trust."
      }
    ]
  },
  "game-of-thrones": {
    "slug": "game-of-thrones",
    "type": "tv",
    "kind": "tv",
    "tmdbId": 1399,
    "title": "Game of Thrones",
    "year": "2011",
    "firstAirDate": "2011-04-17",
    "seasons": 8,
    "episodes": 73,
    "rating": "TV-MA",
    "voteAverage": 8.5,
    "genres": [
      "Sci-Fi & Fantasy",
      "Drama",
      "Action & Adventure"
    ],
    "tagline": "David Benioff & D.B. Weiss \u00b7 Epic fantasy",
    "overview": "Seven noble families fight for control of the mythical land of Westeros. Friction between the houses leads to full-scale war. All while a very ancient evil awakens in the farthest north. Amidst the war, a neglected military order of misfits, the Night's Watch, is all that stands between the realms of men and icy horrors beyond.",
    "poster": "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/zZqpAXxVSBtxV9qPBcscfXBcL2w.jpg",
    "trailerYouTubeId": "KPLWWIOCOOQ",
    "creators": [
      "David Benioff",
      "D.B. Weiss"
    ],
    "network": "Max",
    "related": [
      "house-of-the-dragon",
      "the-last-of-us",
      "the-mandalorian"
    ],
    "cast": [
      {
        "name": "Peter Dinklage",
        "character": "Tyrion 'The Halfman' Lannister",
        "photo": "https://image.tmdb.org/t/p/w185/9CAd7wr8QZyIN0E7nm8v1B6WkGn.jpg"
      },
      {
        "name": "Kit Harington",
        "character": "Jon Snow",
        "photo": "https://image.tmdb.org/t/p/w185/iGXlJbExWwZmo9sUDsYuzf4Sv4y.jpg"
      },
      {
        "name": "Nikolaj Coster-Waldau",
        "character": "Sir Jaime 'Kingslayer' Lannister",
        "photo": "https://image.tmdb.org/t/p/w185/rpFOERbHkj7GWxkinUNiQ76sSGk.jpg"
      },
      {
        "name": "Lena Headey",
        "character": "Cersei Lannister",
        "photo": "https://image.tmdb.org/t/p/w185/cDyZLf8ddz0EgoUjpv4jjzy7qxA.jpg"
      },
      {
        "name": "Emilia Clarke",
        "character": "Daenerys Targaryen",
        "photo": "https://image.tmdb.org/t/p/w185/iFY6t7Ux9r70WB7Sp0TTVz6eGtm.jpg"
      },
      {
        "name": "Maisie Williams",
        "character": "Arya Stark",
        "photo": "https://image.tmdb.org/t/p/w185/zk1rlBVci2fmnFhMezaPpa4kwZF.jpg"
      },
      {
        "name": "Isaac Hempstead Wright",
        "character": "Brandon 'Bran' Stark",
        "photo": "https://image.tmdb.org/t/p/w185/g6ZreLmGrrOzaUCGVFRNPAWfcso.jpg"
      },
      {
        "name": "Sophie Turner",
        "character": "Sansa Stark",
        "photo": "https://image.tmdb.org/t/p/w185/8ur4aHFakVCinWk0cvrGO8qAUhv.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "max",
          "label": "Max",
          "note": "All seasons",
          "href": "https://www.max.com/"
        }
      ],
      "free": [
        {
          "id": "tubi",
          "label": "Tubi",
          "note": "Check region \u00b7 may vary",
          "href": "https://tubitv.com/"
        }
      ]
    },
    "lastAirDate": "2019-05-19"
  },
  "the-mandalorian": {
    "slug": "the-mandalorian",
    "type": "tv",
    "kind": "tv",
    "tmdbId": 82856,
    "title": "The Mandalorian",
    "year": "2019",
    "firstAirDate": "2019-11-12",
    "seasons": 3,
    "episodes": 24,
    "rating": "TV-14",
    "voteAverage": 8.4,
    "genres": [
      "Sci-Fi & Fantasy",
      "Action & Adventure",
      "Drama"
    ],
    "tagline": "Jon Favreau \u00b7 Star Wars streaming original",
    "overview": "After the fall of the Galactic Empire, lawlessness has spread throughout the galaxy. A lone gunfighter makes his way through the outer reaches, earning his keep as a bounty hunter.",
    "poster": "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/9zcbqSxdsRMZWHYtyCd1nXPr2xq.jpg",
    "trailerYouTubeId": "aOC8E8zRmmw",
    "creators": [
      "Jon Favreau"
    ],
    "network": "Disney+",
    "related": [
      "arcane",
      "stranger-things",
      "game-of-thrones"
    ],
    "cast": [
      {
        "name": "Pedro Pascal",
        "character": "Din Djarin / The Mandalorian",
        "photo": "https://image.tmdb.org/t/p/w185/oKcMbVn0NJTNzQt0ClKKvVXkm60.jpg"
      },
      {
        "name": "Katee Sackhoff",
        "character": "Bo-Katan Kryze",
        "photo": "https://image.tmdb.org/t/p/w185/kzcwfDDrgXnVgyTfcpG0obOn7Qk.jpg"
      },
      {
        "name": "Misty Rosas",
        "character": "Pirate Coxswain (Performance Artist), Saifir (Performance Artist), Snivvian Bartender, Kuiil (Performance Artist) and 1 more...",
        "photo": "https://image.tmdb.org/t/p/w185/aCa0ukemG7x3wAxtR1BM5v0BvrL.jpg"
      },
      {
        "name": "Chris Bartlett",
        "character": "RA-7 Droid (Performance Artist), Teacher Droid Performer, Zero (Q9-0) (Performance Artist), Nevarro Copper Droid (Performance Artist) and 2 more...",
        "photo": "https://image.tmdb.org/t/p/w185/63o4rr3zUlfkKAxru94RSfosMo0.jpg"
      },
      {
        "name": "Carl Weathers",
        "character": "Greef Karga",
        "photo": "https://image.tmdb.org/t/p/w185/oUwtC5hEbcIZv53WPerZ9HhlSJR.jpg"
      },
      {
        "name": "Emily Swallow",
        "character": "Armorer",
        "photo": "https://image.tmdb.org/t/p/w185/8wS86vFMoDnfAJzOL9yNqvXcCpA.jpg"
      },
      {
        "name": "Brendan Wayne",
        "character": "The Mandalorian Body Actor, Mandalorian Warrior",
        "photo": "https://image.tmdb.org/t/p/w185/klsNR0ld4NjURhhn3PYZetFkaCK.jpg"
      },
      {
        "name": "Giancarlo Esposito",
        "character": "Moff Gideon",
        "photo": "https://image.tmdb.org/t/p/w185/MJOo4QZgMAb3y8QzOUDVFQusQZ.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "disney-plus",
          "label": "Disney+",
          "note": "Streaming original",
          "href": "https://www.disneyplus.com/"
        }
      ],
      "free": []
    }
  },
  "wednesday": {
    "slug": "wednesday",
    "type": "tv",
    "kind": "tv",
    "tmdbId": 119051,
    "title": "Wednesday",
    "year": "2022",
    "firstAirDate": "2022-11-23",
    "seasons": 2,
    "episodes": 16,
    "rating": "TV-14",
    "voteAverage": 8.3,
    "genres": [
      "Mystery",
      "Sci-Fi & Fantasy",
      "Comedy"
    ],
    "tagline": "Alfred Gough & Miles Millar \u00b7 Netflix original",
    "overview": "Smart, sarcastic and a little dead inside, Wednesday Addams investigates twisted mysteries while making new friends \u2014 and foes \u2014 at Nevermore Academy.",
    "poster": "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/iHSwvRVsRyxpX7FE7GbviaDvgGZ.jpg",
    "trailerYouTubeId": "DiNE7kpPG4M",
    "creators": [
      "Alfred Gough",
      "Miles Millar"
    ],
    "network": "Netflix",
    "related": [
      "stranger-things",
      "arcane",
      "severance"
    ],
    "cast": [
      {
        "name": "Jenna Ortega",
        "character": "Wednesday Addams / Goody Addams, Wednesday Addams",
        "photo": "https://image.tmdb.org/t/p/w185/cV4x7jNmsGLdKZn5I6xVF3Ltnmg.jpg"
      },
      {
        "name": "Emma Myers",
        "character": "Enid Sinclair",
        "photo": "https://image.tmdb.org/t/p/w185/v1Y8RP39135ZOary9M4MbkrCAdn.jpg"
      },
      {
        "name": "Hunter Doohan",
        "character": "Tyler Galpin",
        "photo": "https://image.tmdb.org/t/p/w185/ihno5ut6ha8TaubQFgl5Ozco2K1.jpg"
      },
      {
        "name": "Joy Sunday",
        "character": "Bianca Barclay",
        "photo": "https://image.tmdb.org/t/p/w185/phPn3BRW1vZzxkl3hgEy8umzXn.jpg"
      },
      {
        "name": "Moosa Mostafa",
        "character": "Eugene Ottinger",
        "photo": "https://image.tmdb.org/t/p/w185/k9406KAf3HxF81dres7ZeV3tDZc.jpg"
      },
      {
        "name": "Georgie Farmer",
        "character": "Ajax Petropolus",
        "photo": "https://image.tmdb.org/t/p/w185/lWhHmiwqvtUIln5OPPVbXqtUofI.jpg"
      },
      {
        "name": "Victor Dorobantu",
        "character": "Thing",
        "photo": "https://image.tmdb.org/t/p/w185/jjvwYQsqCuG9XhZyZsmw3p8VEKo.jpg"
      },
      {
        "name": "Luyanda Unati Lewis-Nyawo",
        "character": "Sheriff Ritchie Santiago",
        "photo": "https://image.tmdb.org/t/p/w185/pF82yYPbzJLLVHVar4UKBUPrxBw.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "netflix",
          "label": "Netflix",
          "note": "Streaming original",
          "href": "https://www.netflix.com/"
        }
      ],
      "free": []
    }
  },
  "the-bear": {
    "slug": "the-bear",
    "type": "tv",
    "kind": "tv",
    "tmdbId": 136315,
    "title": "The Bear",
    "year": "2022",
    "firstAirDate": "2022-06-23",
    "seasons": 3,
    "episodes": 28,
    "rating": "TV-MA",
    "voteAverage": 8.2,
    "genres": [
      "Drama",
      "Comedy"
    ],
    "tagline": "Christopher Storer \u00b7 FX / Hulu original",
    "overview": "Carmy, a young fine-dining chef, comes home to Chicago to run his family sandwich shop. As he fights to transform the shop and himself, he works alongside a rough-around-the-edges crew that ultimately reveal themselves as his chosen family.",
    "poster": "https://image.tmdb.org/t/p/w500/eKfVzzEazSIjJMrw9ADa2x8ksLz.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/aJtG4txtmiRHwAAqENQHZvBs6kY.jpg",
    "trailerYouTubeId": "y-ZKDRsb8YY",
    "creators": [
      "Christopher Storer"
    ],
    "network": "Hulu",
    "related": [
      "severance",
      "the-boys",
      "breaking-bad"
    ],
    "cast": [
      {
        "name": "Jeremy Allen White",
        "character": "Carmen 'Carmy' Berzatto",
        "photo": "https://image.tmdb.org/t/p/w185/pXRADDRhprgaQ4Bri44NH3bYeu6.jpg"
      },
      {
        "name": "Ebon Moss-Bachrach",
        "character": "Richard 'Richie' Jerimovich",
        "photo": "https://image.tmdb.org/t/p/w185/xD8GVNayMpiTZxLfahy2DseYcQq.jpg"
      },
      {
        "name": "Ayo Edebiri",
        "character": "Sydney Adamu",
        "photo": "https://image.tmdb.org/t/p/w185/wrqYWaAmVPM2yueEEQUtMo6kCp2.jpg"
      },
      {
        "name": "Lionel Boyce",
        "character": "Marcus Brooks",
        "photo": "https://image.tmdb.org/t/p/w185/hpIxX5nkfA3pWCW8rYkEUCSBVyS.jpg"
      },
      {
        "name": "Abby Elliott",
        "character": "Natalie 'Sugar' Berzatto",
        "photo": "https://image.tmdb.org/t/p/w185/v7h08EsTce2pLHkZiaFe1QRuYbU.jpg"
      },
      {
        "name": "Liza Col\u00f3n-Zayas",
        "character": "Bettina 'Tina' Marrero",
        "photo": "https://image.tmdb.org/t/p/w185/q2gHcef0wckji0AS8ZEO6cYx065.jpg"
      },
      {
        "name": "Matty Matheson",
        "character": "Neil Fak",
        "photo": "https://image.tmdb.org/t/p/w185/p1H19bBP5ePOxNpfOXIYpMgRfS7.jpg"
      },
      {
        "name": "Edwin Lee Gibson",
        "character": "Ebraheim",
        "photo": "https://image.tmdb.org/t/p/w185/wyDPu35soTnBi4VClpS8fv2atkE.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "hulu",
          "label": "Hulu",
          "note": "FX original",
          "href": "https://www.hulu.com/"
        },
        {
          "id": "disney-plus",
          "label": "Disney+",
          "note": "Bundle / availability varies",
          "href": "https://www.disneyplus.com/"
        }
      ],
      "free": []
    }
  },
  "squid-game": {
    "slug": "squid-game",
    "type": "tv",
    "kind": "web-series",
    "tmdbId": 93405,
    "title": "Squid Game",
    "year": "2021",
    "firstAirDate": "2021-09-17",
    "seasons": 2,
    "episodes": 16,
    "rating": "TV-MA",
    "voteAverage": 7.9,
    "genres": [
      "Action & Adventure",
      "Mystery",
      "Drama"
    ],
    "tagline": "Hwang Dong-hyuk \u00b7 Netflix web series phenomenon",
    "overview": "Hundreds of cash-strapped players accept a strange invitation to compete in children's games. Inside, a tempting prize awaits \u2014 with deadly high stakes.",
    "poster": "https://image.tmdb.org/t/p/w500/1QdXdRYfktUSONkl1oD5gc6Be0s.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/2meX1nMdScFOoV4370rqHWKmXhY.jpg",
    "trailerYouTubeId": "oqxAJKy0ii4",
    "creators": [
      "Hwang Dong-hyuk"
    ],
    "network": "Netflix",
    "related": [
      "arcane",
      "wednesday",
      "the-boys"
    ],
    "cast": [
      {
        "name": "Lee Jung-jae",
        "character": "Seong Gi-hun / Player 456",
        "photo": "https://image.tmdb.org/t/p/w185/lx8oiTXL9lIx78KOXlrlvNfoz43.jpg"
      },
      {
        "name": "Wi Ha-jun",
        "character": "Detective Hwang Jun-ho",
        "photo": "https://image.tmdb.org/t/p/w185/tEZuIaMESdBw4LfNq3vshGR4VlP.jpg"
      },
      {
        "name": "Lee Byung-hun",
        "character": "Front Man / Hwang In-ho",
        "photo": "https://image.tmdb.org/t/p/w185/j7SUd9Qi8iOxgrQGb3nQyEYcXur.jpg"
      },
      {
        "name": "Yim Si-wan",
        "character": "Lee Myung-gi / Player 333",
        "photo": "https://image.tmdb.org/t/p/w185/ciyodKYtcSDdK8XYCxHrt4CLgbL.jpg"
      },
      {
        "name": "Jo Yuri",
        "character": "Kim Jun-hee / Player 222",
        "photo": "https://image.tmdb.org/t/p/w185/4GwoDQFPwpaKldOTpGrIJUzBa9h.jpg"
      },
      {
        "name": "Park Gyu-young",
        "character": "Kang No-eul / Guard 011",
        "photo": "https://image.tmdb.org/t/p/w185/8VWU3V1omprZmqk3Jk8EhDvwF6D.jpg"
      },
      {
        "name": "Kang Ae-sim",
        "character": "Jang Geum-ja / Player 149",
        "photo": "https://image.tmdb.org/t/p/w185/mnUozozJf3VUpgi91ysfyxlRqs1.jpg"
      },
      {
        "name": "Lee Jin-uk",
        "character": "Park Gyeong-seok / Player 246",
        "photo": "https://image.tmdb.org/t/p/w185/uqzreNzDqiiSFCMv8bhzfSttHyk.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "netflix",
          "label": "Netflix",
          "note": "Streaming original",
          "href": "https://www.netflix.com/"
        }
      ],
      "free": []
    },
    "reviews": [
      {
        "author": "Maya Chen",
        "role": "Staff Critic",
        "rating": 8.0,
        "source": "ReelIndex Editorial",
        "quote": "A web-series phenomenon with satirical bite \u2014 children's games turned into a mirror of inequality and desperation."
      }
    ]
  },
  "severance": {
    "slug": "severance",
    "type": "tv",
    "kind": "tv",
    "tmdbId": 95396,
    "title": "Severance",
    "year": "2022",
    "firstAirDate": "2022-02-18",
    "seasons": 2,
    "episodes": 19,
    "rating": "TV-MA",
    "voteAverage": 8.4,
    "genres": [
      "Drama",
      "Mystery",
      "Sci-Fi & Fantasy"
    ],
    "tagline": "Dan Erickson \u00b7 Apple TV+ original",
    "overview": "Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives. When a mysterious colleague appears outside of work, it begins a journey to discover the truth about their jobs.",
    "poster": "https://image.tmdb.org/t/p/w500/pPHpeI2X1qEd1CS1SeyrdhZ4qnT.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/ixgFmf1X59PUZam2qbAfskx2gQr.jpg",
    "trailerYouTubeId": "xEQPKhbLQ9U",
    "creators": [
      "Dan Erickson"
    ],
    "network": "Apple TV+",
    "related": [
      "the-bear",
      "breaking-bad",
      "the-last-of-us"
    ],
    "cast": [
      {
        "name": "Adam Scott",
        "character": "Mark Scout",
        "photo": "https://image.tmdb.org/t/p/w185/b82C29R6fGiPoqIglQ4lzS6q2YX.jpg"
      },
      {
        "name": "Britt Lower",
        "character": "Helly Riggs",
        "photo": "https://image.tmdb.org/t/p/w185/5XIcTMDSyj7hRICQAcnY9U83ujF.jpg"
      },
      {
        "name": "Tramell Tillman",
        "character": "Seth Milchick",
        "photo": "https://image.tmdb.org/t/p/w185/bEA15zMnkcXlRroYjKrFUWiiK7y.jpg"
      },
      {
        "name": "Zach Cherry",
        "character": "Dylan George",
        "photo": "https://image.tmdb.org/t/p/w185/fT3Wv8ef0Vn0daHWAObCp2Bd4Y.jpg"
      },
      {
        "name": "Jen Tullock",
        "character": "Devon Scout-Hale",
        "photo": "https://image.tmdb.org/t/p/w185/91vck8hZ1VZGV6PTcwFWEEdzGE0.jpg"
      },
      {
        "name": "Dichen Lachman",
        "character": "Ms. Casey",
        "photo": "https://image.tmdb.org/t/p/w185/yLrpMHBNtuUAu3M9EjaYHnn5EEY.jpg"
      },
      {
        "name": "John Turturro",
        "character": "Irving Bailiff",
        "photo": "https://image.tmdb.org/t/p/w185/6O9W9cJW0kCqMzYeLupV9oH0ftn.jpg"
      },
      {
        "name": "Christopher Walken",
        "character": "Burt Goodman",
        "photo": "https://image.tmdb.org/t/p/w185/ApgDL7nudR9T2GpjCG4vESgymO2.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "apple",
          "label": "Apple TV+",
          "note": "Streaming original",
          "href": "https://tv.apple.com/"
        }
      ],
      "free": []
    },
    "reviews": [
      {
        "author": "Jordan Ellis",
        "role": "Staff Writer",
        "rating": 9.0,
        "source": "ReelIndex Editorial",
        "quote": "Workplace dread as high art \u2014 chilly design, sly humor, and a mystery that respects your intelligence."
      }
    ]
  },
  "house-of-the-dragon": {
    "slug": "house-of-the-dragon",
    "type": "tv",
    "kind": "tv",
    "tmdbId": 94997,
    "title": "House of the Dragon",
    "year": "2022",
    "firstAirDate": "2022-08-21",
    "seasons": 2,
    "episodes": 18,
    "rating": "TV-MA",
    "voteAverage": 8.4,
    "genres": [
      "Sci-Fi & Fantasy",
      "Drama",
      "Action & Adventure"
    ],
    "tagline": "Ryan Condal \u00b7 Game of Thrones prequel",
    "overview": "The Targaryen dynasty is at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires crumble from such heights. In the case of the Targaryens, their slow fall begins when King Viserys breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.",
    "poster": "https://image.tmdb.org/t/p/w500/7V0Ebks0GgpKvQ7QbLAIdX5dos4.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/577eXC8wFQT0eUrJcgznSiFPRmk.jpg",
    "trailerYouTubeId": "DotnJ7tTA34",
    "creators": [
      "Ryan Condal",
      "George R.R. Martin"
    ],
    "network": "Max",
    "related": [
      "game-of-thrones",
      "the-last-of-us",
      "the-mandalorian"
    ],
    "cast": [
      {
        "name": "Matt Smith",
        "character": "Prince Daemon Targaryen",
        "photo": "https://image.tmdb.org/t/p/w185/wxMdHj4UA6LgIU5MiA7CKySZeVU.jpg"
      },
      {
        "name": "Steve Toussaint",
        "character": "Lord Corlys 'The Sea Snake' Velaryon",
        "photo": "https://image.tmdb.org/t/p/w185/9rJafPDkQP8YuLy9iY5v19ZfMIW.jpg"
      },
      {
        "name": "Sonoya Mizuno",
        "character": "Mysaria 'The White Worm'",
        "photo": "https://image.tmdb.org/t/p/w185/WVROOHuk6G6QgVe0pU8R2i1fsE.jpg"
      },
      {
        "name": "Fabien Frankel",
        "character": "Ser Criston Cole",
        "photo": "https://image.tmdb.org/t/p/w185/nXh1h7KbdeZc41ucwGhzp1cOMnd.jpg"
      },
      {
        "name": "Matthew Needham",
        "character": "Lord Larys 'Clubfoot' Strong",
        "photo": "https://image.tmdb.org/t/p/w185/sZHT2xFtnBawU3DoaWZACSv15gX.jpg"
      },
      {
        "name": "Kurt Egyiawan",
        "character": "Grand Maester Orwyle, Maester Orwyle",
        "photo": "https://image.tmdb.org/t/p/w185/bLzmxAmUxRj8wwxzlpaKKdg2Ccf.jpg"
      },
      {
        "name": "Olivia Cooke",
        "character": "Queen Alicent Hightower",
        "photo": "https://image.tmdb.org/t/p/w185/wf71ctooNlVmiT8dxx0QmRAzyiX.jpg"
      },
      {
        "name": "Emma D'Arcy",
        "character": "Princess Rhaenyra Targaryen (voice), Queen Rhaenyra Targaryen",
        "photo": "https://image.tmdb.org/t/p/w185/9Zlmb7VmtVCxkLq5yqFFRRxCaED.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "max",
          "label": "Max",
          "note": "HBO original",
          "href": "https://www.max.com/"
        }
      ],
      "free": []
    }
  },
  "arcane": {
    "slug": "arcane",
    "type": "tv",
    "kind": "web-series",
    "tmdbId": 94605,
    "title": "Arcane",
    "year": "2021",
    "firstAirDate": "2021-11-06",
    "seasons": 2,
    "episodes": 18,
    "rating": "TV-14",
    "voteAverage": 8.7,
    "genres": [
      "Animation",
      "Sci-Fi & Fantasy",
      "Action & Adventure"
    ],
    "tagline": "Christian Linke & Alex Yee \u00b7 League of Legends web series",
    "overview": "Amid the stark discord of twin cities Piltover and Zaun, two sisters fight on rival sides of a war between magic technologies and clashing convictions.",
    "poster": "https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/5cvnxEHT3e39DvT6ARw4GNCFrB0.jpg",
    "trailerYouTubeId": "fXmAurh65Ro",
    "creators": [
      "Christian Linke",
      "Alex Yee"
    ],
    "network": "Netflix",
    "related": [
      "squid-game",
      "stranger-things",
      "wednesday"
    ],
    "cast": [
      {
        "name": "Hailee Steinfeld",
        "character": "Vi (voice)",
        "photo": "https://image.tmdb.org/t/p/w185/qDInsG0cxWNxS1X4t59TBZ5S6x5.jpg"
      },
      {
        "name": "Ella Purnell",
        "character": "Jinx (voice)",
        "photo": "https://image.tmdb.org/t/p/w185/jqrYg35GHuMGwGqEVUthqTLQnay.jpg"
      },
      {
        "name": "Kevin Alejandro",
        "character": "Jayce (voice)",
        "photo": "https://image.tmdb.org/t/p/w185/bh4aQqP7kJzL2Ls9tj5OmhsBlqi.jpg"
      },
      {
        "name": "Toks Olagundoye",
        "character": "Mel Medarda (voice)",
        "photo": "https://image.tmdb.org/t/p/w185/2tKnfTA0gh6QnTcHb18hj8o70uG.jpg"
      },
      {
        "name": "Harry Lloyd",
        "character": "Viktor (voice)",
        "photo": "https://image.tmdb.org/t/p/w185/qZSf6OzRpDaZdOCX6pynSRp6jVV.jpg"
      },
      {
        "name": "Katie Leung",
        "character": "Caitlyn (voice)",
        "photo": "https://image.tmdb.org/t/p/w185/9gztOAk27dpZVspSJpb27ek7LlT.jpg"
      },
      {
        "name": "Jason Spisak",
        "character": "Pim (voice), Silco (voice)",
        "photo": "https://image.tmdb.org/t/p/w185/yWxJDXNcocccr1LkEuVXapVdcXS.jpg"
      },
      {
        "name": "JB Blanc",
        "character": "Vander (voice), Bolbok (voice), Bolbok / Vander (voice), Warwick (voice) and 1 more...",
        "photo": "https://image.tmdb.org/t/p/w185/fHLyXboPlBDo1aoAl085YqaPjO8.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "netflix",
          "label": "Netflix",
          "note": "Streaming original",
          "href": "https://www.netflix.com/"
        }
      ],
      "free": []
    },
    "lastAirDate": "2024-11-23",
    "reviews": [
      {
        "author": "Sam Okonkwo",
        "role": "Contributor",
        "rating": 9.1,
        "source": "ReelIndex Editorial",
        "quote": "A streaming original that raises the bar for animation: lyrical fights, tragic sisters, and a city that feels alive."
      }
    ]
  },
  "the-boys": {
    "slug": "the-boys",
    "type": "tv",
    "kind": "tv",
    "tmdbId": 76479,
    "title": "The Boys",
    "year": "2019",
    "firstAirDate": "2019-07-26",
    "seasons": 4,
    "episodes": 32,
    "rating": "TV-MA",
    "voteAverage": 8.4,
    "genres": [
      "Sci-Fi & Fantasy",
      "Action & Adventure",
      "Comedy"
    ],
    "tagline": "Eric Kripke \u00b7 Prime Video original",
    "overview": "A group of vigilantes known informally as \u201cThe Boys\u201d set out to take down corrupt superheroes with no more than blue-collar grit and a willingness to fight dirty.",
    "poster": "https://image.tmdb.org/t/p/w500/in1R2dDc421JxsoRWaIIAqVI2KE.jpg",
    "backdrop": "https://image.tmdb.org/t/p/w780/bq28ajZaoMyzEIm6REelqyqtEDZ.jpg",
    "trailerYouTubeId": "5SKP1RfuBM4",
    "creators": [
      "Eric Kripke"
    ],
    "network": "Prime Video",
    "related": [
      "breaking-bad",
      "the-last-of-us",
      "severance"
    ],
    "cast": [
      {
        "name": "Karl Urban",
        "character": "Billy Butcher",
        "photo": "https://image.tmdb.org/t/p/w185/7Y96dAfg0HcFrcLjlD5eD9N0uj4.jpg"
      },
      {
        "name": "Jack Quaid",
        "character": "Hugh 'Hughie' Campbell",
        "photo": "https://image.tmdb.org/t/p/w185/320qW5yEbxpmyxQ3evmClJbtKag.jpg"
      },
      {
        "name": "Antony Starr",
        "character": "Homelander",
        "photo": "https://image.tmdb.org/t/p/w185/xx3As5SWcE8vYOKZgtjDjqmT3jc.jpg"
      },
      {
        "name": "Erin Moriarty",
        "character": "Annie January / Starlight",
        "photo": "https://image.tmdb.org/t/p/w185/2tFblvjBRUYwcVT1V1i79Ppd6wG.jpg"
      },
      {
        "name": "Laz Alonso",
        "character": "Marvin T. 'Mother's Milk' Milk / M.M.",
        "photo": "https://image.tmdb.org/t/p/w185/nmgOd3X2Xn3jIp9OLCRJzLExRWN.jpg"
      },
      {
        "name": "Chace Crawford",
        "character": "Kevin Moskowitz / The Deep",
        "photo": "https://image.tmdb.org/t/p/w185/wz7s1JT3bYi2vd4fWwmLT809cnT.jpg"
      },
      {
        "name": "Tomer Capone",
        "character": "Serge / Frenchie",
        "photo": "https://image.tmdb.org/t/p/w185/3IhYEhV3Tmx2CawG5DvcWQyephv.jpg"
      },
      {
        "name": "Karen Fukuhara",
        "character": "Kimiko Miyashiro",
        "photo": "https://image.tmdb.org/t/p/w185/sG6CWLdENCtzukNFkFYyPxqyRmS.jpg"
      }
    ],
    "watch": {
      "paid": [
        {
          "id": "amazon",
          "label": "Prime Video",
          "note": "Streaming original",
          "href": "https://www.amazon.com/gp/video/storefront"
        }
      ],
      "free": []
    }
  }
};

  const R = global.ReelIndex || (global.ReelIndex = {});
  R.SERIES = SERIES;
  R.getSeries = function (slug) {
    return (R.SERIES || {})[slug] || null;
  };
  R.listSeries = function () {
    const src = R.SERIES || {};
    return Object.keys(src).map(function (k) { return src[k]; });
  };
  R.getTitle = function (slug) {
    return (R.getMovie && R.getMovie(slug)) || R.getSeries(slug) || null;
  };
  R.listAllTitles = function () {
    const movies = R.listMovies ? R.listMovies() : [];
    return movies.concat(R.listSeries());
  };
})(typeof window !== "undefined" ? window : globalThis);
