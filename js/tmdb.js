(function(global){
  const IMG = 'https://image.tmdb.org/t/p';
  async function refreshSlug(slug, apiKey){
    const base = global.ReelIndex && global.ReelIndex.FALLBACK && global.ReelIndex.FALLBACK[slug];
    if (!base || !base.tmdbId) throw new Error('Unknown slug');
    const id = base.tmdbId;
    const [details, credits] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${encodeURIComponent(apiKey)}`).then(r=>r.json()),
      fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${encodeURIComponent(apiKey)}`).then(r=>r.json())
    ]);
    if (details.status_code) throw new Error(details.status_message||'TMDB error');
    const director = (credits.crew||[]).find(c=>c.job==='Director')?.name || base.director;
    const producers = (credits.crew||[]).filter(c=>c.job==='Producer').map(c=>c.name);
    const writers = (credits.crew||[]).filter(c=>c.job==='Screenplay'||c.job==='Writer').map(c=>c.name);
    const exec = (credits.crew||[]).find(c=>c.job==='Executive Producer')?.name;
    const live = {
      ...base,
      title: details.title || base.title,
      year: (details.release_date||base.releaseDate||'').slice(0,4) || base.year,
      releaseDate: details.release_date || base.releaseDate,
      runtime: details.runtime || base.runtime,
      voteAverage: details.vote_average || base.voteAverage,
      genres: (details.genres||[]).map(g=>g.name),
      overview: details.overview || base.overview,
      poster: details.poster_path ? IMG+'/w500'+details.poster_path : base.poster,
      backdrop: details.backdrop_path ? IMG+'/original'+details.backdrop_path : base.backdrop,
      director,
      producers: producers.length?producers:base.producers,
      writers: writers.length?writers:base.writers,
      executiveProducer: exec || base.executiveProducer,
      cast: (credits.cast||[]).slice(0,16).map(c=>({name:c.name, character:c.character}))
    };
    global.ReelIndex.MOVIES[slug] = live;
    return live;
  }
  global.ReelIndex = global.ReelIndex || {};
  global.ReelIndex.TMDB = { refreshSlug };
})(window);