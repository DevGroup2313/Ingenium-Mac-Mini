<script id="cd-audhd-tour">
/* PASS 1047 · the tour meets the supports. PASS 1052, at the owner's word: the supports have a page of their own,
   Focus, on the bar beside Home, laid out as Ingenium's Focus page is. The tour now walks that page, card by card,
   after "Your next step", and keeps its card in Display for the switches. Queued here, added by the tour's own pass,
   before the Author Studio takes its copy. A card whose support is switched off is skipped. */
(function () {
  'use strict';
  var Q = window.__cdTourQueue = window.__cdTourQueue || [];
  function supOn(k) { return function () { try { return !(window.cdSupport && window.cdSupport.on(k)); } catch (e) { return true; } }; }
  function focus(sel) {
    return function () {
      try { if (typeof cdCloseDoor === 'function') cdCloseDoor(); } catch (e) {}
      try { showSection('focus'); } catch (e) {}
      try { if (window.cdFocus) window.cdFocus.mount(); } catch (e) {}
      demoTourSpot(sel);
    };
  }
  function card(sub, subFr, go, skip, en, fr) {
    return { chap: 'Focus', chapFr: 'Concentration', sub: sub || '', subFr: subFr || '', go: go, skip: skip, en: en, fr: fr };
  }
  var FOCUS = [
    card('The Focus page', 'La page Concentration', focus('.nav-bar .nav-btn[data-section="focus"]'), null, {
      t: '🧭 The Focus page',
      b: 'Focus, beside Home on the bar, is where every support lives: your next step, time you can see, the Inbox, calm, routines, and what today asks of you. It has a page of its own so it is never folded away and forgotten. Each card on it can be switched off.',
      tip: 'When the day feels scattered, open Focus first. It shows one next thing, not everything.'
    }, {
      t: '🧭 La page Concentration',
      b: 'Concentration, à côté de l’Accueil sur la barre, réunit toutes les aides : votre prochaine étape, le temps visible, la Boîte, le calme, les routines, et ce que la journée vous demande. Elle a sa propre page pour ne jamais être repliée et oubliée. Chaque carte peut être désactivée.',
      tip: 'Quand la journée semble éparpillée, ouvrez d’abord Concentration. Elle montre une seule chose à faire, pas tout.'
    }),
    card('Smaller steps', 'Petites étapes', focus('[data-sc-card="steps"]'), supOn('tiny'), {
      t: '🪜 Smaller steps',
      b: 'Steps turns a task into a few small steps, from the task’s own words, and shows them one at a time. Each is yours to rewrite. Your next Agenda item can become a task in one press. When a step still feels too big, Too big? breaks it again.',
      tip: 'A step is small enough when you know exactly how to start it.'
    }, {
      t: '🪜 Petites étapes',
      b: 'Étapes découpe une tâche en quelques petites étapes, à partir de ses propres mots, et les montre une à une. Chacune est à réécrire. Votre prochain moment de l’Agenda devient une tâche d’une seule pression. Quand une étape semble encore trop grande, Trop grand ? la découpe à nouveau.',
      tip: 'Une étape est assez petite quand vous savez exactement comment la commencer.'
    }),
    card('', '', focus('[data-sc-key="just"]'), supOn('tiny'), {
      t: '⏱ Just start, two minutes',
      b: 'Just start runs a two-minute clock at the foot of the page. Two minutes is all it asks. When it ends you may carry on or stop, and either one counts as a start. Starting is often the hardest part, so this makes it as small as it can be.',
      tip: 'Press it before you feel ready. Readiness often arrives a minute after the start, not before it.'
    }, {
      t: '⏱ Juste commencer, deux minutes',
      b: 'Juste commencer lance une horloge de deux minutes au pied de la page. Deux minutes, c’est tout ce qu’elle demande. À la fin, vous pouvez continuer ou vous arrêter, et les deux comptent comme un commencement. Commencer est souvent le plus difficile ; ceci le rend aussi petit que possible.',
      tip: 'Pressez-le avant de vous sentir prêt. L’envie arrive souvent une minute après le début, pas avant.'
    }),
    card('', '', focus('[data-sc-card="time"]'), supOn('time'), {
      t: '⏳ Time you can see',
      b: 'The Time card shows the hour large, a bar of what is left of the block you are in and what comes next, and the Clepsydra in one press. Five minutes before each item in the Agenda, a quiet word appears at the foot of the page, so a change never arrives as a surprise. The same bar sits at the top of the Agenda.',
      tip: 'Let the bar do the clock-watching for you. A glance is enough.'
    }, {
      t: '⏳ Le temps visible',
      b: 'La carte Le temps montre l’heure en grand, une barre de ce qui reste du bloc en cours et de ce qui vient ensuite, et la Clepsydra d’une pression. Cinq minutes avant chaque moment de l’Agenda, un mot discret paraît au pied de la page, pour qu’un changement n’arrive jamais par surprise. La même barre se tient en haut de l’Agenda.',
      tip: 'Laissez la barre surveiller l’horloge pour vous. Un coup d’œil suffit.'
    }),
    card('', '', focus('#cd-thought-fab'), supOn('inbox'), {
      t: '💭 The Inbox',
      b: 'When a thought arrives in the middle of work, catch it and let it go. Press Ctrl and the full stop anywhere, or the 💭 beside the bell, ringed here. A small raised panel opens; Keep sends the words to the Inbox. The − puts them away for now, and the 💭 keeps them, shows a number, and reminds you later. The ✕ asks before it lets anything go. Each thought finds its part of your life, academic, professional, creative or personal, and can become a note, go to Tabula, become a task, or go to the bell.',
      tip: 'Catching a thought is not the same as acting on it. Write it down, and the mind lets go of holding it.'
    }, {
      t: '💭 La Boîte',
      b: 'Quand une pensée arrive au milieu du travail, saisissez-la et laissez-la partir. Pressez Ctrl et le point n’importe où, ou le 💭 près de la cloche, entouré ici. Un petit panneau en relief s’ouvre ; Garder envoie les mots dans la Boîte. Le − les met de côté, et le 💭 les garde, affiche un nombre et vous les rappelle plus tard. Le ✕ demande avant de laisser partir quoi que ce soit. Chaque pensée trouve sa part de votre vie, académique, professionnelle, créative ou personnelle, et peut devenir une note, partir vers Tabula, devenir une tâche ou aller à la cloche.',
      tip: 'Saisir une pensée n’oblige pas à agir. Écrivez-la, et l’esprit cesse de la porter.'
    }),
    card('', '', focus('[data-sc-key="low"]'), supOn('energy'), {
      t: '🔋 Low-energy days',
      b: 'On a low day, switch this on. Home and the Focus page keep only what is essential, and Carpe Diem offers to make the day a Gentle Day. It lasts for today only; tomorrow starts afresh.',
      tip: 'A low day is still a day of study. One small thing, or rest, is enough.'
    }, {
      t: '🔋 Jours de faible énergie',
      b: 'Un jour de faible énergie, activez ceci. L’Accueil et la page Concentration ne gardent que l’essentiel, et Carpe Diem propose de faire de la journée une Journée douce. Cela ne vaut que pour aujourd’hui ; demain repart à neuf.',
      tip: 'Un jour sans énergie reste un jour d’étude. Une petite chose, ou le repos, suffit.'
    }),
    card('', '', focus('[data-sc-key="calm"]'), null, {
      t: '🌿 Calm mode',
      b: 'Calm turns the room down in one press: nothing moves, nothing sounds, the colours soften, and fewer things show at once. Switch it off and everything comes back. Above it, I need quiet clears the screen to a still, dim page until you are ready.',
      tip: 'Reach for Calm the moment the screen feels loud, not after it has worn you out.'
    }, {
      t: '🌿 Mode calme',
      b: 'Calme baisse la pièce d’une seule pression : rien ne bouge, rien ne sonne, les couleurs s’adoucissent, et moins de choses paraissent à la fois. Désactivez-le et tout revient. Au-dessus, J’ai besoin de calme remplace l’écran par une page immobile et douce, jusqu’à ce que vous soyez prêt.',
      tip: 'Prenez Calme dès que l’écran semble bruyant, pas après qu’il vous a épuisé.'
    }),
    card('', '', focus('[data-sc-card="routines"]'), supOn('routines'), {
      t: '🌅 Routines',
      b: 'Routines walk you into the study day and out of it, one step at a time, with a large tick for each step. Before noon the start routine is offered, and after five the end routine. Every step is yours to rewrite.',
      tip: 'A routine is a ramp, not a rule. Skip a step without a second thought.'
    }, {
      t: '🌅 Routines',
      b: 'Les routines vous font entrer dans la journée d’étude et en sortir, une étape à la fois, avec une grande coche pour chacune. Avant midi, la routine du début est proposée, et après dix-sept heures celle de la fin. Chaque étape est à réécrire à votre façon.',
      tip: 'Une routine est une rampe, pas une règle. Passez une étape sans y penser deux fois.'
    }),
    card('', '', focus('[data-sc-key="focusroom"]'), supOn('focus'), {
      t: '🎧 The Focus room',
      b: 'The Focus room is a quiet full-screen space with one task, the Clepsydra timer drawn large, and a soft sound made on this device, a low hum or soft rain, so it works offline. If a thought interrupts, send it to the Inbox and carry on. Esc leaves the room.',
      tip: 'Use the room for the one task that keeps slipping away. Everything else can wait outside the door.'
    }, {
      t: '🎧 La salle de concentration',
      b: 'La salle de concentration est un espace plein écran et calme, avec une seule tâche, le minuteur Clepsydra en grand, et un son doux fait sur cet appareil, un souffle grave ou une pluie douce, il fonctionne donc hors ligne. Si une pensée interrompt, envoyez-la dans la Boîte et continuez. Échap quitte la salle.',
      tip: 'Réservez la salle à la tâche qui ne cesse de vous échapper. Tout le reste peut attendre derrière la porte.'
    }),
    card('', '', focus('[data-sc-card="today"]'), null, {
      t: '📋 Today asks of you',
      b: 'The last card gathers what the day asks of you across Carpe Diem: the Agenda, your readings, Ascensus, the next milestone, reminders that are due, and thoughts still to sort. Each line has one key that takes you there.',
      tip: 'Read it once in the morning and once after lunch. That is often enough to keep every part of your life in view.'
    }, {
      t: '📋 Ce que la journée vous demande',
      b: 'La dernière carte réunit ce que la journée vous demande dans tout Carpe Diem : l’Agenda, vos lectures, Ascensus, la prochaine étape d’un projet, les rappels échus et les pensées encore à trier. Chaque ligne a une touche qui vous y mène.',
      tip: 'Lisez-la une fois le matin et une fois après le déjeuner. C’est souvent assez pour garder chaque part de votre vie en vue.'
    })
  ];
  var DISPLAY = {
    chap: 'The top bar', chapFr: 'Le bandeau supérieur', sub: 'Support', subFr: 'Soutien',
    go: function () { demoTourSpotDisplay('cd-dmg-support'); },
    en: {
      t: '🧭 Support',
      b: 'At the foot of Display is Support, ringed here. Each help you met on the Focus page has its own switch: Calm mode, Smaller steps, Time you can see, Low-energy days, the Inbox, Routines and the Focus room. All but Calm are on from the start; turn off any you do not need, and it leaves the page.',
      tip: 'Keep what helps and switch off the rest. A support you do not need is just one more thing on the screen.'
    },
    fr: {
      t: '🧭 Soutien',
      b: 'Au pied d’Affichage se trouve Soutien, entouré ici. Chaque aide rencontrée sur la page Concentration y a son réglage : Mode calme, Petites étapes, Le temps visible, Jours de faible énergie, la Boîte, Routines et la Salle de concentration. Toutes sauf Calme sont activées dès le départ ; désactivez celles qui ne vous servent pas, et elles quittent la page.',
      tip: 'Gardez ce qui aide et désactivez le reste. Une aide inutile n’est qu’une chose de plus à l’écran.'
    }
  };
  Q.push(function (api) {
    if (api.find(/^🧭 The Focus page/)) return;
    var anchor = api.find(/Your next step/);
    if (anchor) api.after(anchor, FOCUS);
    var sky = api.find(/The Sky, opened/);
    if (sky) api.after(sky, [DISPLAY]);
  });
})();
