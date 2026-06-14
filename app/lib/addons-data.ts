// Gedeelde data voor het pakket + add-ons: gebruikt op de homepage (verkorte
// weergave) en op de /pakket pagina (volledige, uitgebreide weergave).

export type Lang = "nl" | "fr" | "en";

export interface AddonDetail {
  icon: string;
  title: string;
  price: string;
  /** Korte tagline — gebruikt op de homepage */
  tagline: string;
  /** Uitgebreide uitleg — gebruikt op de /pakket pagina */
  longDesc: string;
  /** Concrete features/voordelen */
  features: string[];
  /** "Ideaal voor ..." */
  idealFor: string;
}

export interface PackageFeatureDetail {
  title: string;
  text: string;
}

/* ============================================================
   ADD-ONS — volledige set van 12, per taal
============================================================ */

export const ADDONS: Record<Lang, AddonDetail[]> = {
  nl: [
    {
      icon: "🔍",
      title: "Google Boost",
      price: "+€9,99",
      tagline: "Google Business Profile, Maps-integratie en reviews.",
      longDesc:
        "We zetten je Google Business Profile professioneel op (of optimaliseren je bestaande profiel) en koppelen het naadloos aan je website. Zo verschijn je met openingsuren, foto's, locatie en reviews bovenaan in Google Maps en de lokale zoekresultaten — precies waar klanten in jouw buurt zoeken.",
      features: [
        "Opzet & optimalisatie van je Google Business Profile",
        "Google Maps-integratie op je website",
        "Automatische weergave van openingsuren & locatie",
        "Betere vindbaarheid in 'in de buurt'-zoekopdrachten",
      ],
      idealFor: "Ideaal voor elke lokale zaak: winkels, horeca, kapsalons, dienstverleners...",
    },
    {
      icon: "🛍️",
      title: "Webshop Module",
      price: "+€19,99",
      tagline: "Volledige webshop met productbeheer en checkout.",
      longDesc:
        "Verkoop je producten online met een volwaardige webshop, volledig geïntegreerd in je website. Beheer je producten, voorraad en bestellingen via een eenvoudig dashboard, en laat klanten veilig betalen met Bancontact, kaarten en meer.",
      features: [
        "Onbeperkt aantal producten met foto's, varianten & voorraad",
        "Veilige online betaling (Bancontact, Visa, ...)",
        "Bestel- en verzendbeheer via dashboard",
        "Automatische orderbevestigingen per e-mail",
      ],
      idealFor: "Ideaal voor winkels, makers en zaken die ook online willen verkopen.",
    },
    {
      icon: "📅",
      title: "Afspraakmodule",
      price: "+€19,99",
      tagline: "Online afspraken boeken met automatische e-mailbevestigingen.",
      longDesc:
        "Klanten boeken zelf een afspraak op het moment dat hen past — 24/7, zonder telefoontjes. Jij stelt je beschikbaarheid in, en het systeem houdt automatisch rekening met je agenda, blokkeert volle tijdslots en stuurt bevestigingen en herinneringen.",
      features: [
        "Online boekingskalender op je website",
        "Automatische bevestigings- en herinneringsmails",
        "Zelf instelbare beschikbaarheid & tijdslots",
        "Overzicht van alle boekingen in één dashboard",
      ],
      idealFor: "Ideaal voor kapsalons, schoonheidsspecialisten, coaches en consultants.",
    },
    {
      icon: "🌍",
      title: "Extra taal",
      price: "+€9,99",
      tagline: "Extra taalversie met taalwisselaar en volledig eigen content.",
      longDesc:
        "Bereik meer klanten met een volledig vertaalde versie van je website. We voegen een taalwisselaar toe en vertalen of herschrijven al je content, zodat elke taalversie even professioneel aanvoelt — geen automatische vertaling, maar verzorgde teksten.",
      features: [
        "Volledige vertaling van al je pagina's",
        "Taalwisselaar in de navigatie",
        "Eigen SEO-optimalisatie per taal",
        "Mogelijkheid tot meerdere extra talen",
      ],
      idealFor: "Ideaal voor grenssteden, toeristische zaken en internationale klanten.",
    },
    {
      icon: "✍️",
      title: "Blog Module",
      price: "+€9,99",
      tagline: "Volledig blogplatform met categoriepagina's en SEO-optimalisatie.",
      longDesc:
        "Deel nieuws, tips en verhalen met een professioneel blog dat naadloos aansluit bij je website. Met categorieën, een overzichtspagina en SEO-optimalisatie per artikel bouw je autoriteit op en scoor je beter in Google op zoekwoorden waar klanten naar zoeken.",
      features: [
        "Onbeperkt aantal blogartikelen",
        "Categorieën & overzichtspagina",
        "SEO-velden per artikel (titel, beschrijving, afbeelding)",
        "Zelf artikels toevoegen via een eenvoudig dashboard",
      ],
      idealFor: "Ideaal voor zaken die willen scoren op content marketing en SEO.",
    },
    {
      icon: "💬",
      title: "Live Chat & WhatsApp",
      price: "+€7,99",
      tagline: "Directe chatknop zodat bezoekers je meteen kunnen contacteren.",
      longDesc:
        "Verlaag de drempel om contact op te nemen met een zwevende chatknop die rechtstreeks doorlinkt naar WhatsApp (of een livechat naar keuze). Bezoekers met een vraag sturen meteen een bericht — geen formulier, geen wachttijd.",
      features: [
        "Zwevende WhatsApp-knop op elke pagina",
        "Vooraf ingestelde begroetingstekst",
        "Direct contact zonder formulier",
        "Mobielvriendelijk & altijd zichtbaar",
      ],
      idealFor: "Ideaal voor zaken waar snel persoonlijk contact belangrijk is.",
    },
    {
      icon: "⭐",
      title: "Reviews Widget",
      price: "+€6,99",
      tagline: "Verzamel en toon automatisch je Google- en Facebookreviews.",
      longDesc:
        "Sociale bewijskracht verkoopt. Deze module haalt automatisch je laatste Google- en Facebookreviews op en toont ze in een mooi widget op je website — altijd up-to-date, zonder dat jij iets moet kopiëren of plakken.",
      features: [
        "Automatische weergave van Google- & Facebookreviews",
        "Steeds up-to-date zonder handmatig werk",
        "Stijlvol widget passend bij je huisstijl",
        "Verhoogt vertrouwen bij nieuwe bezoekers",
      ],
      idealFor: "Ideaal voor elke zaak met goede reviews die ze meer in de kijker wil zetten.",
    },
    {
      icon: "📸",
      title: "Social Media Feed",
      price: "+€6,99",
      tagline: "Toon je laatste Instagram- of Facebookposts live op je site.",
      longDesc:
        "Houd je website levendig zonder extra werk: je laatste Instagram- of Facebookposts verschijnen automatisch op je website. Zo blijft je site actueel en krijgen bezoekers meteen een beeld van je sfeer, werk of producten.",
      features: [
        "Automatische weergave van je laatste social posts",
        "Werkt met Instagram en/of Facebook",
        "Geeft je site een dynamisch, actueel gevoel",
        "Geen extra werk nodig na installatie",
      ],
      idealFor: "Ideaal voor zaken die actief zijn op social media en dat willen tonen.",
    },
    {
      icon: "🚀",
      title: "SEO Pro",
      price: "+€14,99",
      tagline: "Uitgebreide lokale SEO-optimalisatie voor betere vindbaarheid in Google.",
      longDesc:
        "Bovenop de basis SEO van je pakket gaan we dieper: grondig zoekwoordenonderzoek voor jouw regio en sector, optimalisatie van al je pagina's, technische SEO-verbeteringen en een maandelijkse opvolging van je posities in Google. Voor wie écht wil groeien via organisch verkeer.",
      features: [
        "Grondig zoekwoordenonderzoek voor jouw sector & regio",
        "Optimalisatie van titels, beschrijvingen & content",
        "Technische SEO-verbeteringen (snelheid, structuur)",
        "Maandelijkse rapportage van je Google-posities",
      ],
      idealFor: "Ideaal voor zaken die structureel meer klanten via Google willen.",
    },
    {
      icon: "📩",
      title: "Nieuwsbrief Module",
      price: "+€9,99",
      tagline: "Verzamel inschrijvingen en verstuur nieuwsbrieven via Mailchimp of Brevo.",
      longDesc:
        "Bouw een eigen mailinglijst op met een inschrijfformulier op je website, gekoppeld aan Mailchimp of Brevo. Zo kan je klanten op de hoogte houden van nieuws, promoties en updates — een kanaal dat helemaal van jou is.",
      features: [
        "Inschrijfformulier geïntegreerd in je website",
        "Koppeling met Mailchimp of Brevo",
        "Automatische synchronisatie van nieuwe inschrijvingen",
        "Basis setup van je eerste nieuwsbriefsjabloon",
      ],
      idealFor: "Ideaal voor zaken die klantenrelaties willen opbouwen via e-mail.",
    },
    {
      icon: "📄",
      title: "Extra pagina's",
      price: "+€4,99",
      tagline: "Bijkomende pagina's voor diensten, projecten of vestigingen.",
      longDesc:
        "Heb je meer te vertellen dan op de standaardpagina's past? Met deze module voegen we extra pagina's toe in dezelfde stijl als je website — bijvoorbeeld per dienst, per vestiging, per project of een uitgebreide 'over ons'-pagina.",
      features: [
        "Extra pagina volledig op maat ontworpen",
        "Naadloos passend in je bestaande navigatie",
        "Geschikt voor diensten, projecten, vestigingen, ...",
        "Per pagina afzonderlijk bij te bestellen",
      ],
      idealFor: "Ideaal voor zaken met meerdere diensten, locaties of cases.",
    },
    {
      icon: "📊",
      title: "Analytics & Rapportage",
      price: "+€6,99",
      tagline: "Maandelijks inzicht in bezoekers, herkomst en conversies.",
      longDesc:
        "Weten wat werkt is goud waard. We zetten professionele analytics op (zoals Google Analytics) en sturen je maandelijks een helder rapport: hoeveel bezoekers had je, waar komen ze vandaan, en welke pagina's presteren het best?",
      features: [
        "Setup van professionele website-analytics",
        "Maandelijks rapport in begrijpelijke taal",
        "Inzicht in bezoekersaantallen & herkomst",
        "Zicht op best presterende pagina's & acties",
      ],
      idealFor: "Ideaal voor wie datagedreven beslissingen wil nemen over marketing.",
    },
  ],

  fr: [
    {
      icon: "🔍",
      title: "Google Boost",
      price: "+9,99€",
      tagline: "Profil Google Business, intégration Maps et avis clients.",
      longDesc:
        "Nous configurons votre fiche Google Business de façon professionnelle (ou optimisons votre fiche existante) et l'intégrons directement à votre site. Vous apparaissez ainsi avec vos horaires, photos, localisation et avis en haut de Google Maps et des résultats locaux — exactement là où vos clients de proximité recherchent.",
      features: [
        "Configuration & optimisation de votre fiche Google Business",
        "Intégration Google Maps sur votre site",
        "Affichage automatique de vos horaires & localisation",
        "Meilleure visibilité dans les recherches « à proximité »",
      ],
      idealFor: "Idéal pour tout commerce local : magasins, horeca, salons de coiffure, prestataires de services...",
    },
    {
      icon: "🛍️",
      title: "Module Boutique",
      price: "+19,99€",
      tagline: "Boutique en ligne complète avec gestion des produits et paiement.",
      longDesc:
        "Vendez vos produits en ligne avec une véritable boutique, parfaitement intégrée à votre site. Gérez vos produits, votre stock et vos commandes via un tableau de bord simple, et laissez vos clients payer en toute sécurité via Bancontact, carte bancaire et plus.",
      features: [
        "Produits illimités avec photos, variantes & stock",
        "Paiement en ligne sécurisé (Bancontact, Visa, ...)",
        "Gestion des commandes & expéditions via tableau de bord",
        "Confirmations de commande automatiques par e-mail",
      ],
      idealFor: "Idéal pour les commerces, créateurs et activités qui souhaitent aussi vendre en ligne.",
    },
    {
      icon: "📅",
      title: "Module de réservation",
      price: "+19,99€",
      tagline: "Réservation de rendez-vous en ligne avec confirmations automatiques par e-mail.",
      longDesc:
        "Vos clients réservent eux-mêmes un rendez-vous au moment qui leur convient — 24h/24, sans coup de fil. Vous définissez vos disponibilités, et le système tient compte automatiquement de votre agenda, bloque les créneaux complets et envoie confirmations et rappels.",
      features: [
        "Calendrier de réservation en ligne sur votre site",
        "E-mails de confirmation et de rappel automatiques",
        "Disponibilités & créneaux horaires configurables",
        "Aperçu de toutes les réservations dans un tableau de bord",
      ],
      idealFor: "Idéal pour les salons de coiffure, instituts de beauté, coachs et consultants.",
    },
    {
      icon: "🌍",
      title: "Langue supplémentaire",
      price: "+9,99€",
      tagline: "Version linguistique supplémentaire avec sélecteur de langue et contenu propre.",
      longDesc:
        "Touchez davantage de clients grâce à une version entièrement traduite de votre site. Nous ajoutons un sélecteur de langue et traduisons ou réécrivons tous vos contenus, afin que chaque version soit aussi soignée que l'originale — pas de traduction automatique, mais des textes travaillés.",
      features: [
        "Traduction complète de toutes vos pages",
        "Sélecteur de langue dans la navigation",
        "Optimisation SEO propre à chaque langue",
        "Possibilité d'ajouter plusieurs langues supplémentaires",
      ],
      idealFor: "Idéal pour les villes frontalières, les activités touristiques et la clientèle internationale.",
    },
    {
      icon: "✍️",
      title: "Module Blog",
      price: "+9,99€",
      tagline: "Plateforme de blog complète avec pages de catégories et optimisation SEO.",
      longDesc:
        "Partagez actualités, conseils et histoires avec un blog professionnel parfaitement intégré à votre site. Avec catégories, page d'aperçu et optimisation SEO par article, vous construisez votre autorité et gagnez en visibilité sur les recherches de vos clients.",
      features: [
        "Nombre d'articles illimité",
        "Catégories & page d'aperçu",
        "Champs SEO par article (titre, description, image)",
        "Ajout d'articles via un tableau de bord simple",
      ],
      idealFor: "Idéal pour les activités qui veulent miser sur le content marketing et le SEO.",
    },
    {
      icon: "💬",
      title: "Chat en direct & WhatsApp",
      price: "+7,99€",
      tagline: "Bouton de chat direct pour que les visiteurs vous contactent immédiatement.",
      longDesc:
        "Réduisez la barrière du premier contact grâce à un bouton flottant qui renvoie directement vers WhatsApp (ou un chat en direct au choix). Un visiteur avec une question envoie immédiatement un message — sans formulaire, sans attente.",
      features: [
        "Bouton WhatsApp flottant sur chaque page",
        "Message d'accueil prédéfini",
        "Contact direct sans formulaire",
        "Compatible mobile & toujours visible",
      ],
      idealFor: "Idéal pour les activités où un contact personnel rapide est important.",
    },
    {
      icon: "⭐",
      title: "Widget d'avis",
      price: "+6,99€",
      tagline: "Collectez et affichez automatiquement vos avis Google et Facebook.",
      longDesc:
        "La preuve sociale, ça vend. Ce module récupère automatiquement vos derniers avis Google et Facebook et les affiche dans un joli widget sur votre site — toujours à jour, sans que vous ayez quoi que ce soit à copier-coller.",
      features: [
        "Affichage automatique des avis Google & Facebook",
        "Toujours à jour, sans travail manuel",
        "Widget élégant adapté à votre charte graphique",
        "Renforce la confiance des nouveaux visiteurs",
      ],
      idealFor: "Idéal pour toute activité avec de bons avis qu'elle souhaite mettre en avant.",
    },
    {
      icon: "📸",
      title: "Flux réseaux sociaux",
      price: "+6,99€",
      tagline: "Affichez vos derniers posts Instagram ou Facebook en direct sur votre site.",
      longDesc:
        "Gardez votre site vivant sans effort supplémentaire : vos derniers posts Instagram ou Facebook apparaissent automatiquement sur votre site. Votre site reste ainsi actuel et donne immédiatement aux visiteurs un aperçu de votre ambiance, de votre travail ou de vos produits.",
      features: [
        "Affichage automatique de vos derniers posts",
        "Compatible avec Instagram et/ou Facebook",
        "Donne à votre site un aspect dynamique et actuel",
        "Aucun travail supplémentaire après installation",
      ],
      idealFor: "Idéal pour les activités actives sur les réseaux sociaux qui veulent le montrer.",
    },
    {
      icon: "🚀",
      title: "SEO Pro",
      price: "+14,99€",
      tagline: "Optimisation SEO locale avancée pour une meilleure visibilité sur Google.",
      longDesc:
        "En plus du SEO de base de votre formule, nous allons plus loin : recherche approfondie de mots-clés pour votre région et votre secteur, optimisation de toutes vos pages, améliorations techniques du SEO et suivi mensuel de vos positions sur Google. Pour ceux qui veulent vraiment grandir grâce au trafic organique.",
      features: [
        "Recherche approfondie de mots-clés pour votre secteur & région",
        "Optimisation des titres, descriptions & contenus",
        "Améliorations SEO techniques (vitesse, structure)",
        "Rapport mensuel de vos positions Google",
      ],
      idealFor: "Idéal pour les activités qui veulent durablement plus de clients via Google.",
    },
    {
      icon: "📩",
      title: "Module Newsletter",
      price: "+9,99€",
      tagline: "Collectez des inscriptions et envoyez des newsletters via Mailchimp ou Brevo.",
      longDesc:
        "Construisez votre propre liste d'abonnés grâce à un formulaire d'inscription sur votre site, relié à Mailchimp ou Brevo. Vous pouvez ainsi tenir vos clients informés de vos actualités, promotions et nouveautés — un canal qui vous appartient entièrement.",
      features: [
        "Formulaire d'inscription intégré à votre site",
        "Connexion avec Mailchimp ou Brevo",
        "Synchronisation automatique des nouvelles inscriptions",
        "Configuration de base de votre premier modèle de newsletter",
      ],
      idealFor: "Idéal pour les activités qui veulent fidéliser leurs clients par e-mail.",
    },
    {
      icon: "📄",
      title: "Pages supplémentaires",
      price: "+4,99€",
      tagline: "Pages additionnelles pour vos services, projets ou implantations.",
      longDesc:
        "Vous avez plus à raconter que ce que prévoient les pages standards ? Ce module ajoute des pages supplémentaires dans le même style que votre site — par exemple par service, par implantation, par projet ou une page « à propos » plus détaillée.",
      features: [
        "Page supplémentaire entièrement sur mesure",
        "Intégration fluide dans votre navigation existante",
        "Adaptée aux services, projets, implantations, ...",
        "Commande possible page par page",
      ],
      idealFor: "Idéal pour les activités avec plusieurs services, sites ou réalisations.",
    },
    {
      icon: "📊",
      title: "Analyses & Rapports",
      price: "+6,99€",
      tagline: "Aperçu mensuel des visiteurs, de leur origine et des conversions.",
      longDesc:
        "Savoir ce qui fonctionne, ça vaut de l'or. Nous mettons en place des statistiques professionnelles (comme Google Analytics) et vous envoyons chaque mois un rapport clair : combien de visiteurs, d'où viennent-ils, et quelles pages performent le mieux ?",
      features: [
        "Mise en place de statistiques professionnelles",
        "Rapport mensuel en langage clair",
        "Vue sur le nombre de visiteurs & leur origine",
        "Vue sur les pages & actions les plus performantes",
      ],
      idealFor: "Idéal pour qui veut prendre des décisions marketing basées sur les données.",
    },
  ],

  en: [
    {
      icon: "🔍",
      title: "Google Boost",
      price: "+€9.99",
      tagline: "Google Business Profile, Maps integration and reviews.",
      longDesc:
        "We set up your Google Business Profile professionally (or optimise your existing one) and connect it seamlessly to your website. You'll show up with your hours, photos, location and reviews at the top of Google Maps and local search — right where nearby customers are looking.",
      features: [
        "Setup & optimisation of your Google Business Profile",
        "Google Maps integration on your website",
        "Automatic display of your hours & location",
        "Better visibility in 'near me' searches",
      ],
      idealFor: "Ideal for any local business: shops, hospitality, salons, service providers...",
    },
    {
      icon: "🛍️",
      title: "Webshop Module",
      price: "+€19.99",
      tagline: "Full webshop with product management and checkout.",
      longDesc:
        "Sell your products online with a full webshop, fully integrated into your website. Manage your products, stock and orders through a simple dashboard, and let customers pay securely with Bancontact, cards and more.",
      features: [
        "Unlimited products with photos, variants & stock",
        "Secure online payment (Bancontact, Visa, ...)",
        "Order & shipping management via dashboard",
        "Automatic order confirmation emails",
      ],
      idealFor: "Ideal for shops, makers and businesses that also want to sell online.",
    },
    {
      icon: "📅",
      title: "Booking Module",
      price: "+€19.99",
      tagline: "Online appointment booking with automatic email confirmations.",
      longDesc:
        "Customers book their own appointment whenever suits them — 24/7, no phone calls needed. You set your availability, and the system automatically checks your calendar, blocks full slots and sends confirmations and reminders.",
      features: [
        "Online booking calendar on your website",
        "Automatic confirmation & reminder emails",
        "Fully configurable availability & time slots",
        "Overview of all bookings in one dashboard",
      ],
      idealFor: "Ideal for hair salons, beauty specialists, coaches and consultants.",
    },
    {
      icon: "🌍",
      title: "Extra Language",
      price: "+€9.99",
      tagline: "Additional language version with language switcher and dedicated content.",
      longDesc:
        "Reach more customers with a fully translated version of your website. We add a language switcher and translate or rewrite all your content, so every language version feels just as professional — no machine translation, just carefully written copy.",
      features: [
        "Full translation of all your pages",
        "Language switcher in the navigation",
        "Dedicated SEO optimisation per language",
        "Option to add multiple extra languages",
      ],
      idealFor: "Ideal for border towns, tourism-focused businesses and international customers.",
    },
    {
      icon: "✍️",
      title: "Blog Module",
      price: "+€9.99",
      tagline: "Full blog platform with category pages and SEO optimisation.",
      longDesc:
        "Share news, tips and stories with a professional blog that fits seamlessly into your website. With categories, an overview page and SEO optimisation per article, you build authority and rank better for the terms your customers search for.",
      features: [
        "Unlimited number of blog articles",
        "Categories & overview page",
        "SEO fields per article (title, description, image)",
        "Add articles yourself via a simple dashboard",
      ],
      idealFor: "Ideal for businesses that want to invest in content marketing and SEO.",
    },
    {
      icon: "💬",
      title: "Live Chat & WhatsApp",
      price: "+€7.99",
      tagline: "Direct chat button so visitors can reach you instantly.",
      longDesc:
        "Lower the barrier to get in touch with a floating chat button that links straight to WhatsApp (or a live chat of your choice). Visitors with a question send a message immediately — no form, no waiting.",
      features: [
        "Floating WhatsApp button on every page",
        "Pre-set greeting message",
        "Direct contact without a form",
        "Mobile-friendly & always visible",
      ],
      idealFor: "Ideal for businesses where fast, personal contact matters.",
    },
    {
      icon: "⭐",
      title: "Reviews Widget",
      price: "+€6.99",
      tagline: "Automatically collect and display your Google and Facebook reviews.",
      longDesc:
        "Social proof sells. This module automatically pulls in your latest Google and Facebook reviews and displays them in a clean widget on your website — always up to date, with nothing to copy or paste yourself.",
      features: [
        "Automatic display of Google & Facebook reviews",
        "Always up to date, no manual work",
        "Stylish widget matching your branding",
        "Builds trust with new visitors",
      ],
      idealFor: "Ideal for any business with great reviews it wants to highlight.",
    },
    {
      icon: "📸",
      title: "Social Media Feed",
      price: "+€6.99",
      tagline: "Show your latest Instagram or Facebook posts live on your site.",
      longDesc:
        "Keep your website feeling alive without extra effort: your latest Instagram or Facebook posts appear automatically on your site. That keeps it current and gives visitors an instant feel for your vibe, work or products.",
      features: [
        "Automatic display of your latest social posts",
        "Works with Instagram and/or Facebook",
        "Gives your site a dynamic, up-to-date feel",
        "No extra work needed after setup",
      ],
      idealFor: "Ideal for businesses active on social media who want to show it.",
    },
    {
      icon: "🚀",
      title: "SEO Pro",
      price: "+€14.99",
      tagline: "Advanced local SEO optimisation for better visibility on Google.",
      longDesc:
        "On top of the basic SEO in your package, we go further: thorough keyword research for your region and sector, optimisation of all your pages, technical SEO improvements and monthly tracking of your Google rankings. For businesses that really want to grow through organic traffic.",
      features: [
        "Thorough keyword research for your sector & region",
        "Optimisation of titles, descriptions & content",
        "Technical SEO improvements (speed, structure)",
        "Monthly report on your Google rankings",
      ],
      idealFor: "Ideal for businesses that want structurally more customers via Google.",
    },
    {
      icon: "📩",
      title: "Newsletter Module",
      price: "+€9.99",
      tagline: "Collect signups and send newsletters via Mailchimp or Brevo.",
      longDesc:
        "Build your own mailing list with a signup form on your website, connected to Mailchimp or Brevo. That way you can keep customers up to date on news, promotions and updates — a channel that's entirely your own.",
      features: [
        "Signup form integrated into your website",
        "Connection with Mailchimp or Brevo",
        "Automatic sync of new signups",
        "Basic setup of your first newsletter template",
      ],
      idealFor: "Ideal for businesses that want to build customer relationships via email.",
    },
    {
      icon: "📄",
      title: "Extra Pages",
      price: "+€4.99",
      tagline: "Additional pages for services, projects or locations.",
      longDesc:
        "Have more to say than the standard pages allow? With this module we add extra pages in the same style as your website — for example per service, per location, per project, or a more detailed 'about us' page.",
      features: [
        "Extra page fully designed to match your site",
        "Seamlessly fits into your existing navigation",
        "Suitable for services, projects, locations, ...",
        "Can be ordered page by page",
      ],
      idealFor: "Ideal for businesses with multiple services, locations or case studies.",
    },
    {
      icon: "📊",
      title: "Analytics & Reporting",
      price: "+€6.99",
      tagline: "Monthly insight into visitors, sources and conversions.",
      longDesc:
        "Knowing what works is invaluable. We set up professional analytics (such as Google Analytics) and send you a clear monthly report: how many visitors did you have, where did they come from, and which pages perform best?",
      features: [
        "Setup of professional website analytics",
        "Monthly report in plain language",
        "Insight into visitor numbers & sources",
        "Insight into best-performing pages & actions",
      ],
      idealFor: "Ideal for anyone who wants to make data-driven marketing decisions.",
    },
  ],
};

/* ============================================================
   PAKKET — uitgebreide uitleg per feature, per taal
============================================================ */

export const PACKAGE_FEATURES_DETAILED: Record<Lang, PackageFeatureDetail[]> = {
  nl: [
    {
      title: "Volledig op maat ontwerp",
      text: "Geen kant-en-klare sjabloon. We ontwerpen een website die past bij jouw zaak, huisstijl en doelgroep — van kleurenpalet tot lay-out en tone-of-voice. Het resultaat is een site die uniek is voor jou, geen kopie van wat al bestaat.",
    },
    {
      title: "Mobielvriendelijk & snel geladen",
      text: "Meer dan 70% van je bezoekers surft via hun smartphone. Daarom bouwen we elke website mobile-first: vlot leesbaar, makkelijk te bedienen en razendsnel geladen op elk scherm — wat ook goed is voor je positie in Google.",
    },
    {
      title: "Hosting, SSL & domein inbegrepen",
      text: "Geen losse facturen van hostingproviders of domeinregistrars. Wij regelen snelle, veilige hosting, een SSL-certificaat (het slotje voor een beveiligde verbinding) en je domeinnaam — alles inbegrepen in je vaste maandprijs.",
    },
    {
      title: "30 min/maand aanpassingen",
      text: "Tekst aanpassen, een nieuwe foto toevoegen, openingsuren wijzigen? Stuur het ons en wij passen het aan — tot 30 minuten per maand zit standaard in je pakket, zonder extra factuur.",
    },
    {
      title: "Basis SEO-optimalisatie",
      text: "Elke website wordt opgeleverd met de SEO-basis op orde: correcte titels en beschrijvingen, een nette structuur, snelle laadtijden en aanmelding bij Google. Zo sta je vanaf dag één goed opgesteld om gevonden te worden.",
    },
    {
      title: "Online binnen 2 werkdagen",
      text: "Geen weken wachten op een eerste versie. Binnen 2 werkdagen na de kick-off ontvang je al een eerste ontwerp om op te reageren — zo gaat het proces snel en blijf je betrokken.",
    },
    {
      title: "Premium onderhoud & voorrang bij support",
      text: "Je website blijft up-to-date: updates, beveiligingscontroles en technisch onderhoud gebeuren automatisch op de achtergrond. Heb je toch een vraag of probleem? Dan krijg je voorrang bij onze support — snel geholpen, zonder wachttijd.",
    },
  ],

  fr: [
    {
      title: "Design entièrement sur mesure",
      text: "Pas de modèle préconçu. Nous créons un site qui correspond à votre activité, votre identité visuelle et votre public — des couleurs à la mise en page jusqu'au ton des textes. Le résultat est unique, pas une copie de ce qui existe déjà.",
    },
    {
      title: "Compatible mobile & chargement rapide",
      text: "Plus de 70% de vos visiteurs naviguent depuis leur smartphone. C'est pourquoi nous concevons chaque site mobile-first : facile à lire, simple à utiliser et ultra-rapide sur tous les écrans — un atout aussi pour votre référencement Google.",
    },
    {
      title: "Hébergement, SSL & domaine inclus",
      text: "Plus de factures séparées pour l'hébergement ou le nom de domaine. Nous gérons un hébergement rapide et sécurisé, un certificat SSL (le cadenas qui sécurise la connexion) et votre nom de domaine — tout est inclus dans votre prix mensuel fixe.",
    },
    {
      title: "30 min/mois de modifications",
      text: "Besoin de changer un texte, ajouter une photo ou mettre à jour vos horaires ? Envoyez-nous votre demande, nous nous en occupons — jusqu'à 30 minutes par mois sont incluses dans votre formule, sans facture supplémentaire.",
    },
    {
      title: "Optimisation SEO de base",
      text: "Chaque site est livré avec les bases du référencement en ordre : titres et descriptions corrects, structure soignée, temps de chargement rapides et inscription auprès de Google. Vous démarrez donc avec une base solide pour être trouvé.",
    },
    {
      title: "En ligne en 2 jours ouvrables",
      text: "Pas besoin d'attendre des semaines pour une première version. Dans les 2 jours ouvrables après le lancement du projet, vous recevez déjà une première maquette sur laquelle réagir — un processus rapide qui vous tient impliqué.",
    },
    {
      title: "Maintenance premium & support prioritaire",
      text: "Votre site reste à jour : mises à jour, contrôles de sécurité et maintenance technique se font automatiquement en arrière-plan. Une question ou un souci ? Vous bénéficiez d'un support prioritaire — une aide rapide, sans attente.",
    },
  ],

  en: [
    {
      title: "Fully custom design",
      text: "No off-the-shelf template. We design a website that fits your business, brand and audience — from colour palette to layout and tone of voice. The result is unique to you, not a copy of something that already exists.",
    },
    {
      title: "Mobile-friendly & fast loading",
      text: "Over 70% of your visitors browse from their smartphone. That's why we build every website mobile-first: easy to read, simple to use and lightning-fast on any screen — which also helps your Google ranking.",
    },
    {
      title: "Hosting, SSL & domain included",
      text: "No separate invoices from hosting providers or domain registrars. We take care of fast, secure hosting, an SSL certificate (the padlock for a secure connection) and your domain name — all included in your fixed monthly price.",
    },
    {
      title: "30 min/month of edits",
      text: "Need to update some text, add a new photo or change your opening hours? Just send it over and we'll handle it — up to 30 minutes per month are included in your package, with no extra invoice.",
    },
    {
      title: "Basic SEO optimisation",
      text: "Every website is delivered with the SEO basics in place: correct titles and descriptions, a clean structure, fast loading times and submission to Google. So you start off on the right foot to be found.",
    },
    {
      title: "Live within 2 business days",
      text: "No need to wait weeks for a first version. Within 2 business days after kick-off, you'll already receive a first draft to react to — keeping the process fast and keeping you involved.",
    },
    {
      title: "Premium maintenance & priority support",
      text: "Your website stays up to date: updates, security checks and technical maintenance happen automatically in the background. Got a question or an issue? You get priority support — quick help, no waiting.",
    },
  ],
};
