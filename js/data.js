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
      trailerYouTubeId: "Mzw2ttJD2qQ",
      director: "Christopher Nolan",
      writers: ["Christopher Nolan"],
      producers: ["Emma Thomas", "Christopher Nolan"],
      executiveProducer: "Thomas Hayslip",
      related: ["interstellar", "oppenheimer", "dune-part-two"],
      cast: [
        { name: "Matt Damon", character: "Odysseus", photo: "https://image.tmdb.org/t/p/w185/elSlNgV8xVifsbHpFsqrPGxJToZ.jpg" },
        { name: "Tom Holland", character: "Telemachus", photo: "https://image.tmdb.org/t/p/w185/bBRlrpQmXod8ept74UmfOCKJq2p.jpg" },
        { name: "Anne Hathaway", character: "Penelope", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3EA%3C/text%3E%3C/svg%3E" },
        { name: "Robert Pattinson", character: "Antinous", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3ER%3C/text%3E%3C/svg%3E" },
        { name: "Lupita Nyong'o", character: "Helen of Troy / Clytemnestra", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3EL%3C/text%3E%3C/svg%3E" },
        { name: "Zendaya", character: "Athena", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3EZ%3C/text%3E%3C/svg%3E" },
        { name: "Charlize Theron", character: "Calypso", photo: "https://image.tmdb.org/t/p/w185/1Ilv6ryHUv6rt9zIsOGpIUKuHVy.jpg" },
        { name: "Himesh Patel", character: "Eurylochus", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3EH%3C/text%3E%3C/svg%3E" },
        { name: "Samantha Morton", character: "Circe", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3ES%3C/text%3E%3C/svg%3E" },
        { name: "John Leguizamo", character: "Eumaeus", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3EJ%3C/text%3E%3C/svg%3E" },
        { name: "Jon Bernthal", character: "Menelaus", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3EJ%3C/text%3E%3C/svg%3E" },
        { name: "Travis Scott", character: "Bard", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3ET%3C/text%3E%3C/svg%3E" },
        { name: "Corey Hawkins", character: "Polybus", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3EC%3C/text%3E%3C/svg%3E" },
        { name: "Elliot Page", character: "Sinon", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3EE%3C/text%3E%3C/svg%3E" },
        { name: "Mia Goth", character: "Melantho", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3EM%3C/text%3E%3C/svg%3E" },
        { name: "Benny Safdie", character: "Agamemnon", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3EB%3C/text%3E%3C/svg%3E" }
      ],
      watch: {
        paid: [
          { id: "theaters", label: "In Theaters", note: "Universal · Jul 17, 2026 (US)", href: "https://www.fandango.com/" },
          { id: "imax", label: "IMAX", note: "Premium large format", href: "https://www.imax.com/" },
          { id: "netflix", label: "Netflix", note: "Coming later · availability varies", href: "https://www.netflix.com/" },
          { id: "max", label: "Max", note: "Availability varies", href: "https://www.max.com/" }
        ],
        free: [
          { id: "tubi", label: "Tubi", note: "Check region · may arrive later", href: "https://tubitv.com/" },
          { id: "pluto", label: "Pluto TV", note: "Availability varies", href: "https://pluto.tv/" },
          { id: "plex", label: "Plex", note: "Availability varies", href: "https://www.plex.tv/" }
        ],
        other: [
          { id: "tmdb", label: "TMDB", href: "https://www.themoviedb.org/movie/1368337-the-odyssey" }
        ]
      }
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
      trailerYouTubeId: "zSWdZVtXT7E",
      director: "Christopher Nolan",
      writers: ["Jonathan Nolan", "Christopher Nolan"],
      producers: ["Emma Thomas", "Christopher Nolan", "Lynda Obst"],
      executiveProducer: "",
      related: ["the-odyssey", "oppenheimer", "dune-part-two"],
      cast: [
        { name: "Matthew McConaughey", character: "Cooper", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3EM%3C/text%3E%3C/svg%3E" },
        { name: "Anne Hathaway", character: "Brand", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3EA%3C/text%3E%3C/svg%3E" },
        { name: "Jessica Chastain", character: "Murph", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3EJ%3C/text%3E%3C/svg%3E" },
        { name: "Michael Caine", character: "Professor Brand", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3EM%3C/text%3E%3C/svg%3E" },
        { name: "Matt Damon", character: "Mann", photo: "https://image.tmdb.org/t/p/w185/elSlNgV8xVifsbHpFsqrPGxJToZ.jpg" }
      ],
      watch: {
        paid: [
          { id: "paramount-plus", label: "Paramount+", note: "Streaming (availability varies)", href: "https://www.paramountplus.com/" },
          { id: "amazon-prime", label: "Prime Video", note: "Rent or buy", href: "https://www.amazon.com/gp/video/storefront" },
          { id: "apple", label: "Apple TV", note: "Rent or buy", href: "https://tv.apple.com/" }
        ],
        free: [
          { id: "tubi", label: "Tubi", note: "Check region", href: "https://tubitv.com/" },
          { id: "plex", label: "Plex", note: "Availability varies", href: "https://www.plex.tv/" }
        ],
        other: [
          { id: "tmdb", label: "TMDB", href: "https://www.themoviedb.org/movie/157336-interstellar" }
        ]
      }
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
      trailerYouTubeId: "uYPbbksJxIg",
      director: "Christopher Nolan",
      writers: ["Christopher Nolan"],
      producers: ["Emma Thomas", "Charles Roven", "Christopher Nolan"],
      executiveProducer: "",
      related: ["the-odyssey", "interstellar"],
      cast: [
        { name: "Cillian Murphy", character: "J. Robert Oppenheimer", photo: "https://image.tmdb.org/t/p/w185/dm06L9pxDOL9jNSK4Cb6y139rmm.jpg" },
        { name: "Emily Blunt", character: "Kitty Oppenheimer", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3EE%3C/text%3E%3C/svg%3E" },
        { name: "Matt Damon", character: "Leslie Groves", photo: "https://image.tmdb.org/t/p/w185/elSlNgV8xVifsbHpFsqrPGxJToZ.jpg" },
        { name: "Robert Downey Jr.", character: "Lewis Strauss", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3ER%3C/text%3E%3C/svg%3E" },
        { name: "Florence Pugh", character: "Jean Tatlock", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3EF%3C/text%3E%3C/svg%3E" }
      ],
      watch: {
        paid: [
          { id: "peacock", label: "Peacock", note: "Streaming (availability varies)", href: "https://www.peacocktv.com/" },
          { id: "amazon-prime", label: "Prime Video", note: "Rent or buy", href: "https://www.amazon.com/gp/video/storefront" },
          { id: "apple", label: "Apple TV", note: "Rent or buy", href: "https://tv.apple.com/" }
        ],
        free: [
          { id: "tubi", label: "Tubi", note: "Check region", href: "https://tubitv.com/" },
          { id: "pluto", label: "Pluto TV", note: "Availability varies", href: "https://pluto.tv/" }
        ],
        other: [
          { id: "tmdb", label: "TMDB", href: "https://www.themoviedb.org/movie/872585-oppenheimer" }
        ]
      }
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
      trailerYouTubeId: "Way9Dexny3w",
      director: "Denis Villeneuve",
      writers: ["Denis Villeneuve", "Jon Spaihts"],
      producers: ["Mary Parent", "Cale Boyter", "Denis Villeneuve"],
      executiveProducer: "",
      related: ["interstellar", "oppenheimer", "the-odyssey"],
      cast: [
        { name: "Timoth\u00e9e Chalamet", character: "Paul Atreides", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3ET%3C/text%3E%3C/svg%3E" },
        { name: "Zendaya", character: "Chani", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3EZ%3C/text%3E%3C/svg%3E" },
        { name: "Rebecca Ferguson", character: "Lady Jessica", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3ER%3C/text%3E%3C/svg%3E" },
        { name: "Austin Butler", character: "Feyd-Rautha", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3EA%3C/text%3E%3C/svg%3E" },
        { name: "Javier Bardem", character: "Stilgar", photo: "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22185%22%20height%3D%22185%22%3E%3Crect%20fill%3D%22%232a3344%22%20width%3D%22100%25%22%20height%3D%22100%25%22/%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2254%25%22%20fill%3D%22%23e8b86d%22%20text-anchor%3D%22middle%22%20dominant-baseline%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2272%22%20font-weight%3D%22700%22%3EJ%3C/text%3E%3C/svg%3E" }
      ],
      watch: {
        paid: [
          { id: "max", label: "Max", note: "Streaming (availability varies)", href: "https://www.max.com/" },
          { id: "netflix", label: "Netflix", note: "Availability varies", href: "https://www.netflix.com/" },
          { id: "amazon-prime", label: "Prime Video", note: "Rent or buy", href: "https://www.amazon.com/gp/video/storefront" },
          { id: "hulu", label: "Hulu", note: "Availability varies", href: "https://www.hulu.com/" }
        ],
        free: [
          { id: "tubi", label: "Tubi", note: "Check region", href: "https://tubitv.com/" },
          { id: "pluto", label: "Pluto TV", note: "Availability varies", href: "https://pluto.tv/" },
          { id: "plex", label: "Plex", note: "Availability varies", href: "https://www.plex.tv/" }
        ],
        other: [
          { id: "tmdb", label: "TMDB", href: "https://www.themoviedb.org/movie/693134-dune-part-two" }
        ]
      }
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
      trailerYouTubeId: base.trailerYouTubeId,
      director: director,
      writers: writers.length ? writers : base.writers,
      producers: producers.length ? producers : base.producers,
      executiveProducer: exec || base.executiveProducer,
      related: base.related,
      cast: (credits.cast || []).slice(0, 16).map(function (c) {
        return {
          name: c.name,
          character: c.character,
          photo: c.profile_path
            ? TMDB_IMG_BASE + "/w185" + c.profile_path
            : (base.cast.find(function (b) { return b.name === c.name; }) || {}).photo
        };
      }),
      watch: base.watch
    };
  }

  global.ReelIndex = {
    SITE_NAME: "ReelIndex",
    SITE_BASE: "https://atulitllc.github.io/movie-info-site",
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
