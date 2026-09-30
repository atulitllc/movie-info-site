(function(){
  const slug = document.body.dataset.slug;
  if (!slug || !window.ReelIndex) return;
  const movie = ReelIndex.getMovie(slug);
  if (!movie) return;

  function hoursMinutes(mins){
    if (!mins) return '—';
    return `${Math.floor(mins/60)}h ${mins%60}m`;
  }

  const hero = document.getElementById('detail-hero');
  if (hero) hero.style.setProperty('--backdrop', `url('${movie.backdrop}')`);
  const poster = document.getElementById('poster');
  if (poster){ poster.src = movie.poster; poster.alt = movie.title + ' poster'; }
  const set = (id, v)=>{ const el=document.getElementById(id); if(el) el.textContent=v; };
  set('title', movie.title);
  set('tagline', movie.tagline || `${movie.director} · ${movie.year}`);
  set('overview', movie.overview);
  set('overviewShort', movie.overview);

  const chips = document.getElementById('chips');
  if (chips){
    const items = [movie.year, movie.rating, hoursMinutes(movie.runtime), movie.voteAverage?`★ ${Number(movie.voteAverage).toFixed(1)}`:null, ...(movie.genres||[])].filter(Boolean);
    chips.innerHTML = items.map((c,i)=>`<span class="chip${i<4?' accent':''}">${c}</span>`).join('');
  }

  const cast = document.getElementById('cast');
  if (cast){
    cast.innerHTML = (movie.cast||[]).map(p=>`<div class="cast-card"><div class="name">${p.name}</div><div class="role">${p.character||'—'}</div></div>`).join('');
  }

  const crew = document.getElementById('crew');
  if (crew){
    crew.innerHTML = `<p><strong>Director:</strong> ${movie.director||'—'}</p>
      <p><strong>Writers:</strong> ${(movie.writers||[]).join(', ')||'—'}</p>
      <p><strong>Producers:</strong> ${(movie.producers||[]).join(', ')||'—'}</p>
      <p><strong>Executive Producer:</strong> ${movie.executiveProducer||'—'}</p>`;
  }

  const watch = document.getElementById('watch');
  if (watch){
    watch.innerHTML = (movie.watch||[]).map(w=> w.href
      ? `<a href="${w.href}" target="_blank" rel="noopener">${w.label}</a>`
      : `<span><strong>${w.label}</strong> · ${w.note||''}</span>`).join('');
  }
})();