/* atelier alt.formula — Vanilla JavaScript */
(function () {
  const D = window.SiteData;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  document.body.classList.add('is-loaded');

  function html(strings, ...values) {
    return strings.reduce((out, str, i) => out + str + (values[i] ?? ''), '');
  }

  function escapeHTML(value = '') {
    return String(value).replace(/[&<>"]/g, (s) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[s]));
  }

  function list(items = []) {
    return items.filter(Boolean).map(item => `<li>${escapeHTML(item)}</li>`).join('');
  }

  function dataList(obj = {}) {
    return `<dl class="data-list">${Object.entries(obj).map(([k, v]) => `<div class="data-row"><dt>${escapeHTML(k)}</dt><dd>${escapeHTML(Array.isArray(v) ? v.join(' / ') : v)}</dd></div>`).join('')}</dl>`;
  }

  function figure(src, title, i = 0) {
    return html`<figure class="stagger-item" style="transition-delay:${Math.min(i * .08, .72)}s">
      <button class="image-mask lightbox-trigger" type="button" data-src="${escapeHTML(src)}" data-caption="${escapeHTML(title)}">
        <img src="${escapeHTML(src)}" alt="${escapeHTML(title)} image ${i + 1}" loading="lazy">
      </button>
      <figcaption class="caption reveal-caption">${escapeHTML(title)} / ${String(i + 1).padStart(2, '0')}</figcaption>
    </figure>`;
  }

  function gallery(images = [], title = 'Archive Image') {
    return `<div class="motion-gallery">${images.map((src, i) => figure(src, title, i)).join('')}</div>`;
  }

  function horizontalGallery(images = [], title = 'Archive Image') {
    return `<div class="horizontal-gallery">${images.map((src, i) => figure(src, title, i)).join('')}</div>`;
  }

  function renderCard(item, href = '#') {
    const img = item.hero || item.images?.[0] || item.image || 'assets/images/top-01.jpg';
    return html`<article class="card stagger-item">
      <a href="${href}" class="card-media image-mask"><img src="${escapeHTML(img)}" alt="${escapeHTML(item.title)}" loading="lazy"></a>
      <div class="card-title-row"><h3>${escapeHTML(item.title)}</h3><span class="year">${escapeHTML(item.year || '')}</span></div>
      <p class="small">${escapeHTML(item.category || item.subtitle || '')}</p>
      <p>${escapeHTML(item.descriptionEN || item.bodyEN || '')}</p>
      <a class="link-line" href="${href}">Read Archive</a>
    </article>`;
  }

  function renderHome() {
    const featured = D.projects.filter(p => p.featured).map(p => renderCard(p, `projects.html#${p.id}`)).join('');
    const news = D.news.slice(0, 3).map(n => `<article class="news-item stagger-item"><div class="media">${escapeHTML(n.media)}</div><div><h3>${escapeHTML(n.titleEN)}</h3><p>${escapeHTML(n.bodyEN)}</p></div><div class="meta">${escapeHTML(n.year)}</div></article>`).join('');
    $('#featured-projects').innerHTML = featured;
    $('#recent-news').innerHTML = news;
  }

  function renderAbout() {
    const p = D.profile;
    $('#about-profile').innerHTML = html`<div class="two-col">
      <figure class="image-mask image-tall"><img src="${p.image}" alt="${p.name}" loading="lazy"></figure>
      <div class="stack">
        <p class="eyebrow">Profile</p>
        <h2 class="reveal-title">${escapeHTML(p.name)}</h2>
        <p class="lead">${escapeHTML(p.title)}</p>
        <p>${escapeHTML(p.bodyEN)}</p>
        <p class="jp muted">${escapeHTML(p.bodyJP)}</p>
      </div>
    </div>`;
    $('#services').innerHTML = p.services.map((s, i) => `<div class="process-step stagger-item"><span class="num">${String(i + 1).padStart(2, '0')}</span><strong>${escapeHTML(s)}</strong></div>`).join('');
    $('#careers').innerHTML = list(p.careers);
    $('#awards').innerHTML = list(p.awards);
    $('#exhibitions').innerHTML = list(p.exhibitions);
  }

  function renderProjects() {
    $('#project-list').innerHTML = D.projects.map(project => html`<section class="section compact rule" id="${project.id}">
      <div class="two-col">
        <div class="stack">
          <p class="eyebrow">${escapeHTML(project.category)}</p>
          <h2 class="reveal-title">${escapeHTML(project.title)}</h2>
          <p class="meta">${escapeHTML(project.year)} / ${escapeHTML(project.subtitle)}</p>
          <p>${escapeHTML(project.descriptionEN)}</p>
          <p class="jp muted">${escapeHTML(project.descriptionJP)}</p>
          ${dataList({ Materials: project.materials, Techniques: project.techniques, Collaborators: project.collaborators, ...project.metadata })}
        </div>
        <figure class="image-mask image-tall"><img src="${project.hero}" alt="${escapeHTML(project.title)}" loading="lazy"></figure>
      </div>
      <div class="section compact">${gallery(project.images, project.title)}</div>
    </section>`).join('');

    const tech = D.projects.find(p => p.id === 'technofossil-archive');
    $('#technofossil-process').innerHTML = [
      ['01', 'Collection / 採集'], ['02', 'Cleaning / 洗浄'], ['03', 'Wrapping / 包む'], ['04', 'Heat Shrink Encapsulation / 熱収縮による被覆'], ['05', 'Protection / 保護'], ['06', 'Flocking / 植毛加工'], ['07', 'Photography / 写真記録'], ['08', 'Classification / 分類'], ['09', 'Metadata Design / メタデータ設計'], ['10', 'Exhibition / 展示']
    ].map(([num, text]) => `<div class="process-step stagger-item"><span class="num">${num}</span><strong>${escapeHTML(text)}</strong></div>`).join('');
    $('#technofossil-team').innerHTML = D.members.map(m => html`<article class="card stagger-item"><div class="card-media image-mask"><img src="${m.image}" alt="${m.name}" loading="lazy"></div><h3>${m.name}</h3><p class="small">${m.title}</p><p><strong>${m.role}</strong></p><p>${m.details}</p></article>`).join('');
    $('#technofossil-schedule').innerHTML = D.schedule.map(s => `<div class="timeline-item stagger-item"><div class="date">${escapeHTML(s.date)}</div><div><h3>${escapeHTML(s.titleEN)}</h3><p class="jp muted">${escapeHTML(s.titleJP)}</p></div></div>`).join('');
    $('#technofossil-specimens').innerHTML = D.specimens.map(sp => html`<article class="specimen-card stagger-item">
      <img src="${sp.image}" alt="${sp.archiveCode}" loading="lazy">
      <div class="stack"><span class="specimen-code">${sp.archiveCode}</span><h3>${sp.objectName}</h3>${dataList({ Material: sp.material, Size: sp.size, Weight: sp.weight, Site: sp.collectionSite, Method: sp.processingMethod, Decomposition: sp.estimatedDecomposition, Carbon: sp.carbonFootprint })}</div>
    </article>`).join('');
  }

  function renderArchives() {
    $('#archive-list').innerHTML = D.archives.map(item => html`<article class="section compact rule" id="${item.id}">
      <div class="two-col">
        <div class="stack">
          <p class="eyebrow">${escapeHTML(item.category)}</p>
          <h2 class="reveal-title">${escapeHTML(item.title)}</h2>
          <p class="meta">${escapeHTML(item.year)}</p>
          <p>${escapeHTML(item.descriptionEN)}</p>
          <p class="jp muted">${escapeHTML(item.descriptionJP)}</p>
          ${dataList({ Materials: item.materials, Techniques: item.techniques, Collaborators: item.collaborators, ...item.metadata })}
        </div>
        <div>${horizontalGallery(item.images.slice(0, 10), item.title)}</div>
      </div>
    </article>`).join('');
  }

  function renderResearch() {
    $('#research-list').innerHTML = D.research.map((item, i) => html`<article class="card stagger-item" id="research-${i + 1}">
      <div class="card-media image-mask"><img src="${item.image}" alt="${escapeHTML(item.title)}" loading="lazy"></div>
      <p class="eyebrow">${escapeHTML(item.category)}</p>
      <h3>${escapeHTML(item.title)}</h3>
      <p>${escapeHTML(item.descriptionEN)}</p>
      <p class="jp muted">${escapeHTML(item.descriptionJP)}</p>
      ${dataList({ References: item.references, Related: item.related })}
    </article>`).join('');
    const keywords = ['Material Archaeology','Anthropocene','Technofossil','Future Fossil','Future Archaeology','Archive','Preservation','Ossuary','Wrapping','Encapsulation','Heat Shrink','Flocking','Second Skin','Specimen','Metadata','Carbon Footprint','Estimated Decomposition Period','Material Composition'];
    $('#research-keywords').innerHTML = keywords.map(k => `<span>${escapeHTML(k)}</span>`).join('');
  }

  function renderNews() {
    const listEl = $('#news-list');
    let lang = 'EN';
    const draw = () => {
      listEl.innerHTML = D.news.map(n => html`<article class="news-item stagger-item">
        <div class="media">${escapeHTML(n.media)}<br>${escapeHTML(n.year)}</div>
        <div><h3>${escapeHTML(lang === 'EN' ? n.titleEN : n.titleJP)}</h3><p>${escapeHTML(lang === 'EN' ? n.bodyEN : n.bodyJP)}</p><p class="small">${escapeHTML(n.project)} / ${escapeHTML(n.related.join(', '))}</p></div>
        <div>${n.link ? `<a class="link-line" href="${n.link}" target="_blank" rel="noopener">Link</a>` : '<span class="small">Link TBD</span>'}</div>
      </article>`).join('');
      setupReveal();
    };
    $$('.toggle-btn').forEach(btn => btn.addEventListener('click', () => {
      lang = btn.dataset.lang;
      $$('.toggle-btn').forEach(b => b.classList.toggle('is-active', b === btn));
      draw();
    }));
    draw();
    $('#publications-list').innerHTML = D.publications.map(n => html`<article class="card stagger-item"><p class="eyebrow">${escapeHTML(n.media)} / ${escapeHTML(n.year)}</p><h3>${escapeHTML(n.titleEN)}</h3><p>${escapeHTML(n.bodyEN)}</p><p class="jp muted">${escapeHTML(n.bodyJP)}</p></article>`).join('');
  }

  function renderContact() {
    $('#contact-links').innerHTML = html`${dataList({ Email: D.studio.email, Instagram: D.studio.instagram })}
      <p><a class="link-line" href="mailto:${D.studio.email}">Send Email</a></p>
      <p><a class="link-line" href="${D.studio.instagramUrl}" target="_blank" rel="noopener">Instagram</a></p>`;
  }

  function setupNav() {
    const page = document.body.dataset.page;
    $$('.site-nav a').forEach(a => {
      const href = a.getAttribute('href');
      const active = (page === 'home' && href === 'index.html') || href.includes(page);
      a.classList.toggle('is-active', active);
    });
    const toggle = $('.menu-toggle');
    const nav = $('.site-nav');
    if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('is-open'));
    $$('a[href$=".html"], a[href^="index.html"]').forEach(a => {
      a.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
        document.body.classList.add('is-leaving');
      });
    });
  }

  function setupReveal() {
    $$('.reveal-title').forEach(title => {
      if (title.dataset.split) return;
      const words = title.textContent.trim().split(/\s+/);
      title.innerHTML = words.map((w, i) => `<span class="motion-word" style="transition-delay:${i * 0.08}s">${escapeHTML(w)}&nbsp;</span>`).join('');
      title.dataset.split = 'true';
    });
    const targets = $$('.reveal, .reveal-text, .reveal-title, .reveal-image, .reveal-caption, .stagger-item, .image-mask, .slow-fade, .motion-line');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    targets.forEach(el => io.observe(el));
  }

  function setupLightbox() {
    const box = $('#lightbox');
    if (!box) return;
    const img = $('img', box);
    const caption = $('.lightbox-caption', box);
    document.addEventListener('click', e => {
      const btn = e.target.closest('.lightbox-trigger');
      if (!btn) return;
      img.src = btn.dataset.src;
      caption.textContent = btn.dataset.caption || '';
      box.classList.add('is-open');
      box.setAttribute('aria-hidden', 'false');
    });
    const close = () => { box.classList.remove('is-open'); box.setAttribute('aria-hidden', 'true'); img.src = ''; };
    $('.lightbox-close', box).addEventListener('click', close);
    box.addEventListener('click', e => { if (e.target === box) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && box.classList.contains('is-open')) close(); });
  }

  function setupScroll() {
    const topBtn = $('#back-to-top');
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY || document.documentElement.scrollTop;
          if (topBtn) topBtn.classList.toggle('is-visible', y > 700);
          $$('.parallax').forEach(el => { el.style.transform = `translate3d(0, ${Math.min(y * .035, 36)}px, 0)`; });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    if (topBtn) topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  function init() {
    setupNav();
    const page = document.body.dataset.page;
    if (page === 'home') renderHome();
    if (page === 'about') renderAbout();
    if (page === 'projects') renderProjects();
    if (page === 'archives') renderArchives();
    if (page === 'research') renderResearch();
    if (page === 'news') renderNews();
    if (page === 'contact') renderContact();
    setupReveal();
    setupLightbox();
    setupScroll();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
