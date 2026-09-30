(function(){
  const grid = document.getElementById('movie-grid');
  const search = document.getElementById('search');
  const status = document.getElementById('status');
  if (!grid || !window.ReelIndex) return;

  function card(m){
    const href = `movies/${m.slug}/`;
    return `<a class="card" href="${href}">
      <img class="card-poster" src="${m.poster}" alt="${m.title} poster" loading="lazy" width="300" height="450"/>
      <div class="card-body">
        <h2 class="card-title">${m.title}</h2>
        <div class="card-meta">${m.year} · ${m.rating || ''} · ★ ${Number(m.voteAverage||0).toFixed(1)}</div>
      </div>
    </a>`;
  }

  function render(list){
    grid.innerHTML = list.map(card).join('') || '<p class="tagline">No movies match.</p>';
  }

  render(((ReelIndex.listMovies&&ReelIndex.listMovies())||(ReelIndex.getMovies&&ReelIndex.getMovies())||Object.values(ReelIndex.MOVIES||{})));
  if (search){
    search.addEventListener('input', ()=>{
      const q = search.value.trim().toLowerCase();
      const all = ((ReelIndex.listMovies&&ReelIndex.listMovies())||(ReelIndex.getMovies&&ReelIndex.getMovies())||Object.values(ReelIndex.MOVIES||{}));
      render(!q ? all : all.filter(m => (m.title+m.year+m.genres.join(' ')).toLowerCase().includes(q)));
    });
  }

  const keyInput = document.getElementById('apiKey');
  const loadBtn = document.getElementById('loadBtn');
  if (keyInput && loadBtn && ReelIndex.TMDB){
    const saved = localStorage.getItem('tmdb_api_key');
    if (saved) keyInput.value = saved;
    loadBtn.addEventListener('click', async ()=>{
      const key = keyInput.value.trim();
      if (!key){ status.textContent = 'Enter an API key first.'; return; }
      localStorage.setItem('tmdb_api_key', key);
      status.textContent = 'Refreshing Odyssey from TMDB…';
      try {
        await ReelIndex.TMDB.refreshSlug('the-odyssey', key);
        render(((ReelIndex.listMovies&&ReelIndex.listMovies())||(ReelIndex.getMovies&&ReelIndex.getMovies())||Object.values(ReelIndex.MOVIES||{})));
        status.textContent = 'Updated live TMDB data for Odyssey (session).';
      } catch(e){ status.textContent = 'TMDB failed: ' + (e.message||e); }
    });
  }
})();