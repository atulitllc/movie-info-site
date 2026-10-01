/**
 * WhereToWatchFree editorial sample reviews — keyed by movie slug.
 * Labeled as WhereToWatchFree Editorial / Staff; not attributed to outside critics.
 * Merges into ReelIndex.FALLBACK / MOVIES at load time.
 */
(function (global) {
  const REVIEWS = {
    "the-odyssey": [
      {
        author: "Maya Chen",
        role: "Staff Critic",
        rating: 8.2,
        source: "WhereToWatchFree Editorial",
        quote:
          "Nolan's mythic canvas feels both intimate and colossal — a homeward voyage staged like a heist against the gods. The set pieces thunder, but the film's best moments are quieter reckonings with loyalty and time."
      },
      {
        author: "Jordan Ellis",
        role: "Staff Writer",
        rating: 7.8,
        source: "WhereToWatchFree Editorial",
        quote:
          "A star-stacked Odyssey that favors spectacle without entirely losing Odysseus's cunning. Not every subplot lands with equal force, yet the craft and ambition make it essential big-screen mythology."
      },
      {
        author: "Sam Okonkwo",
        role: "Contributor",
        rating: 8.0,
        source: "WhereToWatchFree Editorial",
        quote:
          "When the camera locks onto Damon's weathered king, the epic stops being a checklist of monsters and becomes a study of endurance. Expect IMAX-scale awe and a score that refuses to leave your head."
      }
    ],
    interstellar: [
      {
        author: "Maya Chen",
        role: "Staff Critic",
        rating: 9.2,
        source: "WhereToWatchFree Editorial",
        quote:
          "A rare space epic that treats physics and parental love as the same equation. Zimmer's organ, the dust-bowl Earth, and that docking sequence still hit like a gravitational wave."
      },
      {
        author: "Alex Rivera",
        role: "Staff Writer",
        rating: 8.8,
        source: "WhereToWatchFree Editorial",
        quote:
          "Nolan aims for cosmic wonder and mostly sticks the landing. The emotional core between Cooper and Murph keeps the wormholes from feeling like empty spectacle."
      },
      {
        author: "Priya Nair",
        role: "Contributor",
        rating: 9.0,
        source: "WhereToWatchFree Editorial",
        quote:
          "Ambitious, earnest, and visually unforgettable. Even when the third act stretches into metaphysics, the film's hunger for meaning is infectious."
      }
    ],
    oppenheimer: [
      {
        author: "Jordan Ellis",
        role: "Staff Critic",
        rating: 9.1,
        source: "WhereToWatchFree Editorial",
        quote:
          "A biography that detonates like a thriller. Murphy's haunted intensity and the Trinity sequence turn theoretical physics into moral vertigo."
      },
      {
        author: "Sam Okonkwo",
        role: "Staff Writer",
        rating: 8.7,
        source: "WhereToWatchFree Editorial",
        quote:
          "Nolan compresses history into sharp crosscuts and close-ups. The political aftermath cuts as deep as the blast — a portrait of genius surrounded by power plays."
      },
      {
        author: "Casey Brooks",
        role: "Contributor",
        rating: 8.9,
        source: "WhereToWatchFree Editorial",
        quote:
          "Dense, propulsive, and built for the big screen. You leave arguing about complicity, not just impressed by craft."
      }
    ],
    "dune-part-two": [
      {
        author: "Priya Nair",
        role: "Staff Critic",
        rating: 9.0,
        source: "WhereToWatchFree Editorial",
        quote:
          "Villeneuve delivers the messianic war the first film promised — sandworm cavalry, political knives, and a desert that feels alive. Chalamet and Zendaya carry the myth without losing the human cost."
      },
      {
        author: "Alex Rivera",
        role: "Staff Writer",
        rating: 8.6,
        source: "WhereToWatchFree Editorial",
        quote:
          "Wider, darker, and more operatic than Part One. The action is monumental, but the film's unease about prophecy is what lingers."
      },
      {
        author: "Maya Chen",
        role: "Contributor",
        rating: 8.8,
        source: "WhereToWatchFree Editorial",
        quote:
          "Blockbuster world-building at its most disciplined. Every culture on Arrakis feels tactile, and the final ascent into holy war is chilling."
      }
    ],
    inception: [
      {
        author: "Casey Brooks",
        role: "Staff Critic",
        rating: 9.0,
        source: "WhereToWatchFree Editorial",
        quote:
          "A heist movie folded through dreams until the rules become the thrill. The hallway fight and the snow fortress still redefine what a summer film can attempt."
      },
      {
        author: "Jordan Ellis",
        role: "Staff Writer",
        rating: 8.7,
        source: "WhereToWatchFree Editorial",
        quote:
          "Puzzle-box storytelling with real emotional stakes. DiCaprio sells the grief that makes the spinning top matter."
      },
      {
        author: "Sam Okonkwo",
        role: "Contributor",
        rating: 8.5,
        source: "WhereToWatchFree Editorial",
        quote:
          "Ideas stacked like nesting dolls, scored to perfection. Rewatches reward patience more than they punish confusion."
      }
    ],
    "the-dark-knight": [
      {
        author: "Alex Rivera",
        role: "Staff Critic",
        rating: 9.4,
        source: "WhereToWatchFree Editorial",
        quote:
          "The gold standard of modern crime epics in a cape. Ledger's Joker is chaos with a plan, and the ferry sequence still tests what heroes owe a city."
      },
      {
        author: "Maya Chen",
        role: "Staff Writer",
        rating: 9.1,
        source: "WhereToWatchFree Editorial",
        quote:
          "Nolan grounds the comic book in procedural grit without draining its myth. Gotham feels like a real metropolis under siege."
      },
      {
        author: "Priya Nair",
        role: "Contributor",
        rating: 9.2,
        source: "WhereToWatchFree Editorial",
        quote:
          "Moral dilemmas wrapped in IMAX set pieces. Fifteen-plus years later, its tension and tragedy have not aged a day."
      }
    ],
    "pulp-fiction": [
      {
        author: "Casey Brooks",
        role: "Staff Critic",
        rating: 9.3,
        source: "WhereToWatchFree Editorial",
        quote:
          "Dialogue as jazz, timeline as shuffle — Tarantino's breakthrough still crackles. Every chapter feels like its own pulp paperback classic."
      },
      {
        author: "Jordan Ellis",
        role: "Staff Writer",
        rating: 9.0,
        source: "WhereToWatchFree Editorial",
        quote:
          "Violent, funny, and oddly tender. The diner finale and the watch monologue prove style can serve character, not just swagger."
      },
      {
        author: "Sam Okonkwo",
        role: "Contributor",
        rating: 8.8,
        source: "WhereToWatchFree Editorial",
        quote:
          "A mosaic of crooks and chance encounters that rewired indie cool. Quotable forever, but the structure is the real magic trick."
      }
    ],
    "forrest-gump": [
      {
        author: "Priya Nair",
        role: "Staff Critic",
        rating: 8.6,
        source: "WhereToWatchFree Editorial",
        quote:
          "A feather-light American fable carried by Hanks's open-hearted performance. History whizzes by; the ache of Jenny and Forrest stays."
      },
      {
        author: "Maya Chen",
        role: "Staff Writer",
        rating: 8.3,
        source: "WhereToWatchFree Editorial",
        quote:
          "Sentiment done with craft — effects, soundtrack, and a running gag that somehow becomes profound. Soft-edged, yes; disposable, no."
      },
      {
        author: "Alex Rivera",
        role: "Contributor",
        rating: 8.4,
        source: "WhereToWatchFree Editorial",
        quote:
          "An odyssey through decades that never loses its box-of-chocolates charm. The bench stories still sneak up on you."
      }
    ],
    "fight-club": [
      {
        author: "Jordan Ellis",
        role: "Staff Critic",
        rating: 8.9,
        source: "WhereToWatchFree Editorial",
        quote:
          "Fincher's caustic satire of consumer manhood still bruises. Norton and Pitt duel as id and ego while the twist rewires the whole reel."
      },
      {
        author: "Casey Brooks",
        role: "Staff Writer",
        rating: 8.5,
        source: "WhereToWatchFree Editorial",
        quote:
          "Stylish, angry, and deliberately unsafe. The soap, the basements, the skyscraper finale — punk energy with surgical framing."
      },
      {
        author: "Sam Okonkwo",
        role: "Contributor",
        rating: 8.6,
        source: "WhereToWatchFree Editorial",
        quote:
          "A late-'90s lightning rod that remains uncomfortably relevant. Watch it as critique, not instruction manual."
      }
    ],
    "return-of-the-king": [
      {
        author: "Maya Chen",
        role: "Staff Critic",
        rating: 9.5,
        source: "WhereToWatchFree Editorial",
        quote:
          "The trilogy's cathartic summit — Pelennor Fields, Mount Doom, and farewells that earn every tear. Jackson sticks the landing of a once-in-a-generation epic."
      },
      {
        author: "Alex Rivera",
        role: "Staff Writer",
        rating: 9.2,
        source: "WhereToWatchFree Editorial",
        quote:
          "Spectacle with a soul. The fellowship's bonds, not just the armies, make the multiple endings feel necessary rather than indulgent."
      },
      {
        author: "Priya Nair",
        role: "Contributor",
        rating: 9.3,
        source: "WhereToWatchFree Editorial",
        quote:
          "Fantasy cinema's high-water mark for emotional scale. You feel the weight of the ring — and the relief when it is gone."
      }
    ],
    "the-matrix": [
      {
        author: "Casey Brooks",
        role: "Staff Critic",
        rating: 9.1,
        source: "WhereToWatchFree Editorial",
        quote:
          "Bullet time, leather cool, and a premise that still sparks philosophy nights. The Wachowskis made cyberpunk feel like destiny."
      },
      {
        author: "Jordan Ellis",
        role: "Staff Writer",
        rating: 8.8,
        source: "WhereToWatchFree Editorial",
        quote:
          "Action and ideas in lockstep. Keanu's awakening remains iconic because the world-building sells every red pill."
      },
      {
        author: "Sam Okonkwo",
        role: "Contributor",
        rating: 8.9,
        source: "WhereToWatchFree Editorial",
        quote:
          "A late-century reset for sci-fi filmmaking. Style-forward without emptying the story of stakes."
      }
    ],
    "star-wars": [
      {
        author: "Alex Rivera",
        role: "Staff Critic",
        rating: 9.0,
        source: "WhereToWatchFree Editorial",
        quote:
          "The original spark — farm boy, desert, Death Star — still radiates adventure. Lucas blended myth and serials into a new popular religion."
      },
      {
        author: "Maya Chen",
        role: "Staff Writer",
        rating: 8.7,
        source: "WhereToWatchFree Editorial",
        quote:
          "Practical effects, John Williams, and a cantina full of weirdos: pure cinematic joy. Its innocence is part of the power."
      },
      {
        author: "Priya Nair",
        role: "Contributor",
        rating: 8.8,
        source: "WhereToWatchFree Editorial",
        quote:
          "A space fantasy that taught generations how to dream in widescreen. Simple story, immortal world."
      }
    ],
    "avengers-infinity-war": [
      {
        author: "Jordan Ellis",
        role: "Staff Critic",
        rating: 8.7,
        source: "WhereToWatchFree Editorial",
        quote:
          "A crossover that somehow feels like a war movie. Thanos gets a point of view, and the snap still lands like a gut punch."
      },
      {
        author: "Casey Brooks",
        role: "Staff Writer",
        rating: 8.4,
        source: "WhereToWatchFree Editorial",
        quote:
          "Crowd management as craft. Quips, sacrifices, and planet-hopping set pieces stay coherent when they have no right to."
      },
      {
        author: "Sam Okonkwo",
        role: "Contributor",
        rating: 8.5,
        source: "WhereToWatchFree Editorial",
        quote:
          "MCU peak tension before the victory lap. Bold enough to end mid-catastrophe and trust the audience."
      }
    ],
    dune: [
      {
        author: "Priya Nair",
        role: "Staff Critic",
        rating: 8.4,
        source: "WhereToWatchFree Editorial",
        quote:
          "Patient, sand-blasted world-building that trusts silence. Villeneuve proves Arrakis can feel sacred and terrifying on screen."
      },
      {
        author: "Maya Chen",
        role: "Staff Writer",
        rating: 8.1,
        source: "WhereToWatchFree Editorial",
        quote:
          "Half an epic by design — and a stunning one. The politics simmer while the imagery burns into memory."
      },
      {
        author: "Alex Rivera",
        role: "Contributor",
        rating: 8.2,
        source: "WhereToWatchFree Editorial",
        quote:
          "A prestige blockbuster that refuses to rush. Sound design and scale do as much storytelling as the dialogue."
      }
    ],
    "avatar-the-way-of-water": [
      {
        author: "Casey Brooks",
        role: "Staff Critic",
        rating: 8.0,
        source: "WhereToWatchFree Editorial",
        quote:
          "Cameron's underwater playground is the real star. Family peril and reef warfare look like nothing else in theaters."
      },
      {
        author: "Jordan Ellis",
        role: "Staff Writer",
        rating: 7.6,
        source: "WhereToWatchFree Editorial",
        quote:
          "Story beats echo the first film, but the craft leaps forward. When the tulkun ride, resistance melts."
      },
      {
        author: "Sam Okonkwo",
        role: "Contributor",
        rating: 7.8,
        source: "WhereToWatchFree Editorial",
        quote:
          "A 3D immersion machine with a soft heart. Familiar themes, unmatched visual poetry."
      }
    ],
    parasite: [
      {
        author: "Maya Chen",
        role: "Staff Critic",
        rating: 9.6,
        source: "WhereToWatchFree Editorial",
        quote:
          "Class warfare as black comedy then nightmare. Bong's staircases and peach fuzz details make every turn feel inevitable."
      },
      {
        author: "Alex Rivera",
        role: "Staff Writer",
        rating: 9.4,
        source: "WhereToWatchFree Editorial",
        quote:
          "A thriller that keeps mutating until the flood hits. Universal in its rage, specific in its Korean setting."
      },
      {
        author: "Priya Nair",
        role: "Contributor",
        rating: 9.5,
        source: "WhereToWatchFree Editorial",
        quote:
          "Pitch-perfect ensemble, razor cutting. One of the century's essential films — funny until it isn't."
      }
    ],
    "the-shawshank-redemption": [
      {
        author: "Jordan Ellis",
        role: "Staff Critic",
        rating: 9.4,
        source: "WhereToWatchFree Editorial",
        quote:
          "Patience as narrative virtue. Freeman's voice and Robbins's quiet hope turn prison walls into a cathedral of friendship."
      },
      {
        author: "Casey Brooks",
        role: "Staff Writer",
        rating: 9.2,
        source: "WhereToWatchFree Editorial",
        quote:
          "A slow-burn classic that earns its rain-soaked catharsis. Kindness and cunning share the same cellblock."
      },
      {
        author: "Sam Okonkwo",
        role: "Contributor",
        rating: 9.3,
        source: "WhereToWatchFree Editorial",
        quote:
          "Why audiences adopted it for decades: decency told without cynicism, framed with care."
      }
    ],
    "spider-man-across-the-spider-verse": [
      {
        author: "Priya Nair",
        role: "Staff Critic",
        rating: 9.2,
        source: "WhereToWatchFree Editorial",
        quote:
          "Animation as jazz improvisation — styles collide and somehow cohere. Miles's coming-of-age hits harder amid the multiverse noise."
      },
      {
        author: "Maya Chen",
        role: "Staff Writer",
        rating: 9.0,
        source: "WhereToWatchFree Editorial",
        quote:
          "Bolder and denser than Into the Spider-Verse. Every frame feels hand-crafted for the big screen."
      },
      {
        author: "Alex Rivera",
        role: "Contributor",
        rating: 8.8,
        source: "WhereToWatchFree Editorial",
        quote:
          "A cliffhanger that still satisfies as a standalone visual feast. Gwen's arc is the emotional secret weapon."
      }
    ],
    barbie: [
      {
        author: "Casey Brooks",
        role: "Staff Critic",
        rating: 8.1,
        source: "WhereToWatchFree Editorial",
        quote:
          "Gerwig smuggles a sharp identity comedy into a hot-pink blockbuster. Gosling's Ken is chaotic gold; the ending dares to feel human."
      },
      {
        author: "Jordan Ellis",
        role: "Staff Writer",
        rating: 7.7,
        source: "WhereToWatchFree Editorial",
        quote:
          "Satire with heart and dance numbers. Not every joke lands equally, but the culture-clash energy is irresistible."
      },
      {
        author: "Sam Okonkwo",
        role: "Contributor",
        rating: 7.9,
        source: "WhereToWatchFree Editorial",
        quote:
          "A toy movie that argues about being real. Bright, self-aware, and sneakily moving."
      }
    ],
    "blade-runner-2049": [
      {
        author: "Alex Rivera",
        role: "Staff Critic",
        rating: 9.0,
        source: "WhereToWatchFree Editorial",
        quote:
          "A sequel that deepens the original's ache. Deakins paints neon ruins while Gosling's K searches for a soul-shaped answer."
      },
      {
        author: "Maya Chen",
        role: "Staff Writer",
        rating: 8.7,
        source: "WhereToWatchFree Editorial",
        quote:
          "Slow, monumental, and emotionally precise. Villeneuve trusts atmosphere to do the detective work."
      },
      {
        author: "Priya Nair",
        role: "Contributor",
        rating: 8.8,
        source: "WhereToWatchFree Editorial",
        quote:
          "Sci-fi melancholy at feature length. The hologram intimacy and desert showdowns both feel mythic."
      }
    ]
  };

  const R = global.ReelIndex || (global.ReelIndex = {});
  R.REVIEWS = REVIEWS;

  function mergeReviews() {
    const src = R.MOVIES || R.FALLBACK || {};
    Object.keys(REVIEWS).forEach(function (slug) {
      if (src[slug]) src[slug].reviews = REVIEWS[slug];
    });
    if (R.FALLBACK && R.FALLBACK !== src) {
      Object.keys(REVIEWS).forEach(function (slug) {
        if (R.FALLBACK[slug]) R.FALLBACK[slug].reviews = REVIEWS[slug];
      });
    }
  }

  mergeReviews();
  R.mergeReviews = mergeReviews;
})(typeof window !== "undefined" ? window : globalThis);
