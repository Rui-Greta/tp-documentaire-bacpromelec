/* TP documentaire T12 – Bac Pro MELEC (Terminale, technologie) – Domotique résidentielle
   Source : cours « T12 — Domotique résidentielle » (version présentiel) ; renvois aux parties 1 à 5 du cours.
   Types : qcm, tf, match, order, num, pick, open, task. */
var KNX = "melec_t12_knx.png", KNX_ALT = "Schéma n°1 : alimentation KNX sur Q2, BP KNX, détecteur KNX et actionneur 2 sorties qui commute E1 et E2 depuis Q1";
var RADIO = "melec_t12_radio.png", RADIO_ALT = "Schéma n°2 : box Internet, box domotique et objets radio (prise, thermostat, détecteur, module volet, interrupteur sans fil)";
window.TPDOC = {
  id: "melec-tpdoc-t12-v1",
  num: 12, code: "T12", groupe: "MELEC",
  formation: "Bac Pro MELEC",
  logo: "logo_greta.png",
  titre: "Domotique résidentielle",
  sousTitre: "TP documentaire T12 · Bac Pro MELEC · Terminale · Technologie",
  duree: "3 h",
  lead: "Tu utilises le cours « T12 — Domotique résidentielle » (papier ou PC), une calculatrice et ton téléphone.",
  missions: [
    {
      id: "m1", num: 1, titre: "Fonctions, architectures et technologies", duree: "25 min", competences: "C3 Définir une installation",
      intro: "À quoi sert la domotique, la différence entre architecture centralisée et décentralisée, les supports de transmission et la réglementation à connaître.",
      source: "Cours T12, partie 1",
      ex: [
        { type: "match", q: "Associe chaque exemple à la fonction domotique qu'il remplit.", pairs: [
          ["Scénario « soirée », volets selon le soleil", "Confort"],
          ["Chauffage par pièce, détection d'ouverture de fenêtre", "Énergie"],
          ["Simulation de présence, alerte fuite d'eau", "Sécurité"],
          ["Commande vocale pour une personne à mobilité réduite", "Autonomie"]] },
        { type: "match", q: "Centralisée ou décentralisée ?", pairs: [
          ["Un contrôleur (box, automate) reçoit tout et décide", "Architecture centralisée"],
          ["Chaque appareil dialogue directement avec les autres (KNX)", "Architecture décentralisée"]] },
        { type: "qcm", q: "La box radio d'une installation centralisée tombe en panne. Que se passe-t-il ?", options: ["Rien, chaque appareil continue seul", "Les automatismes s'arrêtent ; les commandes locales restent souvent possibles", "Toute l'installation électrique est coupée", "Le disjoncteur déclenche"], answer: 1 },
        { type: "match", q: "Associe chaque support de transmission à sa limite principale.", pairs: [
          ["Bus filaire (KNX TP)", "Câble supplémentaire à poser"],
          ["Courant porteur (CPL)", "Sensible aux perturbations du réseau 230 V"],
          ["Radio (Zigbee, Z-Wave, EnOcean…)", "Portée, piles, interopérabilité"]] },
        { type: "match", q: "Exercice 1 du cours : quelle technologie proposer ?", pairs: [
          ["Maison neuve en construction", "Bus filaire KNX TP"],
          ["Appartement rénové, client opposé aux saignées", "Radio"],
          ["Ajout d'un volet dans une maison déjà en KNX", "KNX, en filaire ou en KNX RF"]] },
        { type: "qcm", q: "Matter, c'est…", options: ["Un câble de bus", "Un langage commun aux marques, qui circule sur Wi-Fi, Thread ou Ethernet", "Une fréquence radio", "Une marque de box"], answer: 1 },
        { type: "match", q: "Quel texte pour quelle règle ?", pairs: [
          ["NF C 15-100", "Règles de toute installation BT, séparation TBTS / 230 V"],
          ["EN 50090 · ISO/IEC 14543-3", "Standard KNX : matériel de marques différentes compatible"],
          ["Décret n° 2023-444 modifié", "Régulation du chauffage par pièce ou par zone"],
          ["RGPD", "Données personnelles : informer le client, compte à son nom"]] }
      ]
    },
    {
      id: "m2", num: 2, titre: "Le bus KNX : principe et règles de câblage", duree: "35 min", competences: "C3 Définir une installation",
      intro: "Les capteurs envoient des ordres, les actionneurs commutent la puissance. Tu lis le schéma n°1 et tu appliques les règles d'installation du bus.",
      source: "Cours T12, partie 2 (schéma n°1 et règles d'installation)",
      ex: [
        { type: "qcm", img: KNX, alt: KNX_ALT, q: "Exercice 2 du cours. Sur le schéma n°1, quel appareil commute la lampe E1 ?", options: ["Le BP KNX", "La sortie C1 de l'actionneur", "L'alimentation de bus", "Le détecteur de présence"], answer: 1 },
        { type: "qcm", img: KNX, alt: KNX_ALT, q: "Quelle protection pour le circuit de E1 et E2 ?", options: ["Q2, 1P+N 2 A", "Q1, 1P+N 10 A (éclairage)", "Aucune", "Le fusible de l'actionneur"], answer: 1 },
        { type: "qcm", img: KNX, alt: KNX_ALT, q: "Pourquoi l'alimentation de bus a-t-elle sa propre protection Q2 ?", options: ["Pour faire joli", "Pour qu'un défaut sur l'éclairage ne coupe pas le bus (et inversement) : c'est un circuit à part", "Parce qu'elle consomme 10 A", "Parce que le bus est en 230 V"], answer: 1 },
        { type: "tf", img: KNX, alt: KNX_ALT, q: "Vrai ou faux ?", items: [
          ["Le BP KNX est raccordé au 230 V.", false],
          ["Le BP et le détecteur envoient des télégrammes sur le bus.", true],
          ["Le contact de l'actionneur commute le 230 V, protégé par son disjoncteur.", true],
          ["Le bus est un circuit TBTS : il doit être séparé du 230 V.", true]] },
        { type: "match", q: "Règles d'installation du bus KNX TP :", pairs: [
          ["Tension du bus", "29 V continu"],
          ["Câble", "Paire torsadée 2 × 0,8 mm"],
          ["Participants par ligne", "64 maximum"],
          ["Longueur totale de ligne", "1 000 m maximum"],
          ["Alimentation → participant", "350 m maximum"],
          ["Entre deux participants", "700 m maximum"]] },
        { type: "qcm", q: "Câble de bus : quelle couleur pour le + ?", options: ["Noir", "Rouge", "Bleu", "Vert / jaune"], answer: 1 },
        { type: "qcm", q: "Quelle topologie est interdite sur un bus KNX ?", options: ["Ligne", "Étoile", "Arbre", "Boucle fermée"], answer: 3 },
        { type: "pick", q: "Exercice 3 du cours : une ligne compte 58 participants ; le plus éloigné est à 380 m de câble de l'alimentation. Le client veut ajouter 10 participants. Coche les constats justes.", items: [
          ["La distance alimentation → participant (380 m > 350 m) n'est pas respectée", true],
          ["Solution : rapprocher l'alimentation ou découper la ligne", true],
          ["58 + 10 = 68 participants : plus de 64, l'ajout est impossible sur la même ligne", true],
          ["Il suffit d'une alimentation plus puissante pour passer à 68 participants", false],
          ["On peut refermer la ligne en boucle pour gagner de la longueur", false]] },
        { type: "num", q: "Tension minimale garantie au participant le plus éloigné ?", answer: 21, tol: 0, unit: "V" }
      ]
    },
    {
      id: "m3", num: 3, titre: "Alimentation, adresses et paramétrage", duree: "35 min", competences: "C6 Régler, paramétrer",
      intro: "Dimensionner l'alimentation de bus, lire une adresse physique et une adresse de groupe, lier des objets du même type, et connaître la démarche ETS.",
      source: "Cours T12, partie 2 (approfondissements)",
      ex: [
        { type: "num", q: "Exercice 6 du cours : 42 participants à 10 mA et un écran tactile à 40 mA. Courant total absorbé ?", answer: 460, tol: 0, unit: "mA",
          explain: "42 × 10 + 40 = 460 mA." },
        { type: "num", q: "Ajoute une réserve de 20 %.", answer: 552, tol: 1, unit: "mA",
          explain: "460 × 1,2 = 552 mA." },
        { type: "qcm", q: "Quelle alimentation choisis-tu dans la gamme 160 / 320 / 640 mA ?", options: ["160 mA", "320 mA", "640 mA", "Deux de 320 mA en parallèle"], answer: 2 },
        { type: "qcm", q: "Pourquoi une alimentation 30 V ordinaire ne convient-elle pas au bus KNX ?", options: ["Sa tension est trop forte", "L'alimentation KNX intègre une self qui permet aux télégrammes de se superposer à la tension continue", "Elle est trop chère", "Elle n'a pas de bornes à vis"], answer: 1 },
        { type: "match", q: "Adresse physique ou adresse de groupe ?", pairs: [
          ["1.1.12", "Adresse physique : zone.ligne.participant"],
          ["1/0/1", "Adresse de groupe : principal/intermédiaire/sous-groupe"]] },
        { type: "match", q: "Exercice 7 du cours :", pairs: [
          ["Que désigne 2.3.15 ?", "Le participant 15 de la ligne 3 de la zone 2"],
          ["Adresse du coupleur de la ligne 2.3", "2.3.0"],
          ["Adresse d'un coupleur de zone", "x.0.0"]] },
        { type: "match", q: "Quel type de données (DPT) pour quelle fonction ?", pairs: [
          ["Commutation marche / arrêt", "1.001 (1 bit)"],
          ["Volet : montée / descente", "1.008 (1 bit)"],
          ["Valeur de variation, position", "5.001 (1 octet, 0 à 100 %)"],
          ["Température", "9.001 (2 octets)"]] },
        { type: "qcm", q: "On lie sur 1/1/4 un objet « 1 bit » et un objet « valeur % ». Est-ce possible ?", options: ["Oui, ETS convertit tout seul", "Non : deux objets ne se lient que s'ils ont le même type de données", "Oui, si l'adresse finit par 4", "Seulement en KNX IP"], answer: 1 },
        { type: "order", q: "Mise en service avec ETS : remets la démarche dans l'ordre.", items: ["Projet : bâtiment et topologie", "Produits : catalogue, paramètres", "Adresses de groupe : liaison des objets", "Adresse physique : bouton de programmation", "Application : téléchargement", "Essais : moniteur, sauvegarde"] },
        { type: "tf", q: "Au niveau Bac Pro : vrai ou faux ?", items: [
          ["Tu peux charger un projet, adresser un appareil avec le bouton de programmation et modifier un paramètre.", true],
          ["Tu conçois seul le projet ETS complet d'un immeuble.", false],
          ["Le moniteur de groupe d'ETS montre qui a émis, vers quelle adresse, quelle valeur.", true]] }
      ]
    },
    {
      id: "m4", num: 4, titre: "Les solutions radio", duree: "30 min", competences: "C3 Définir une installation",
      intro: "L'installation radio centralisée autour d'une box, l'appairage, le maillage, les protocoles, la portée et la sécurité numérique.",
      source: "Cours T12, partie 3 (schéma n°2)",
      ex: [
        { type: "tf", img: RADIO, alt: RADIO_ALT, q: "Schéma n°2 : vrai ou faux ?", items: [
          ["La box domotique est reliée à la box Internet par un câble Ethernet.", true],
          ["Les objets (prise, thermostat, détecteur…) communiquent avec la box domotique par radio.", true],
          ["Une prise connectée alimentée en 230 V n'est plus soumise à la NF C 15-100.", false],
          ["Le smartphone pilote l'installation par Wi-Fi ou par Internet.", true]] },
        { type: "match", q: "Associe chaque protocole à ce qu'il faut en retenir.", pairs: [
          ["Zigbee (2,4 GHz, maillé)", "Très répandu, passerelle nécessaire"],
          ["Z-Wave (868 MHz, maillé)", "Bonne traversée des murs"],
          ["EnOcean (868 MHz)", "Sans pile : l'appui sur la touche fournit l'énergie"],
          ["KNX RF (868 MHz)", "Extension radio d'une installation KNX"],
          ["Thread (2,4 GHz, maillé)", "Réseau IP basse consommation, support de Matter"]] },
        { type: "qcm", q: "Dans un réseau maillé, quels appareils relaient les messages ?", options: ["Les appareils sur pile", "Les appareils alimentés en permanence (230 V)", "Seulement la box", "Aucun"], answer: 1,
          explain: "Leur position influence donc la portée." },
        { type: "pick", q: "Coche ce qui affaiblit le signal radio.", items: [
          ["Béton armé, dalles, murs porteurs", true],
          ["Coffret métallique, isolant à film aluminium", true],
          ["Cloison en plaque de plâtre simple", false],
          ["Plancher chauffant, vitrage traité", true],
          ["Box internet ou four à micro-ondes à proximité", true]] },
        { type: "order", q: "Réussir l'implantation radio : remets dans l'ordre.", items: ["Placer la box au centre du logement, en hauteur", "Faire un essai de portée avant de fixer chaque appareil", "Fixer l'appareil quand la liaison est bonne", "Zone mal couverte : ajouter un module 230 V ou un répéteur"] },
        { type: "tf", q: "Sécurité numérique : vrai ou faux ?", items: [
          ["On change les mots de passe par défaut.", true],
          ["Pour l'accès à distance, on ouvre un port sur la box internet.", false],
          ["On met à jour les micrologiciels.", true],
          ["On colle les identifiants sur le tableau électrique.", false]],
          explain: "Accès à distance uniquement par une solution sécurisée (VPN ou service du fabricant). Identifiants remis au client de façon sécurisée." },
        { type: "qcm", q: "Un module radio encastré derrière un interrupteur :", options: ["N'est plus un appareil électrique", "Reste un appareil 230 V : protection, section et encastrement selon la notice", "Peut être posé sans protection", "Doit être sur pile"], answer: 1 }
      ]
    },
    {
      id: "m5", num: 5, titre: "Mettre en service et diagnostiquer", duree: "30 min", competences: "C6 Régler, paramétrer",
      intro: "Vérifier, paramétrer, documenter, puis localiser une panne en séparant toujours la puissance de la commande.",
      source: "Cours T12, partie 4",
      ex: [
        { type: "match", q: "Mettre en service et livrer : associe chaque étape à son contenu.", pairs: [
          ["Vérifications", "Bus : polarité, pas de court-circuit, 29 V à chaque participant"],
          ["Paramétrage", "Chargement du projet ou appairage, essai de chaque commande"],
          ["Dossier", "Appareils, adresses, plan, sauvegarde, identifiants sécurisés"],
          ["Explications", "Commandes, application, horaire, coupure secteur, contact maintenance"]] },
        { type: "num", q: "Liste de matériel du T4 : 13 participants à 10 mA. Courant de bus ?", answer: 130, tol: 0, unit: "mA" },
        { type: "match", q: "Diagnostic : associe le symptôme au contrôle à faire.", pairs: [
          ["Plus aucune commande", "Voyants de l'alimentation, tension du bus"],
          ["Un seul participant muet", "Tension à la borne (≥ 21 V), bouton de programmation"],
          ["Le BP émet, rien ne se passe", "Moniteur de groupe ETS"],
          ["Le relais colle, lampe éteinte", "VAT et contrôles du circuit 230 V"],
          ["Défauts aléatoires", "Relevé des longueurs, comptage des participants"]] },
        { type: "qcm", q: "Avec la commande manuelle en façade de l'actionneur, la lampe s'allume. Que conclus-tu ?", options: ["La lampe est défectueuse", "Le circuit de puissance est bon : le défaut est côté bus ou paramétrage", "Le disjoncteur est ouvert", "L'actionneur est hors service"], answer: 1 },
        { type: "order", q: "Exercice 8 du cours : un an après la livraison, le BP du séjour ne commande plus le plafonnier ; tout le reste fonctionne. Remets les vérifications dans l'ordre.", items: [
          "Commande manuelle de l'actionneur : la lampe s'allume-t-elle ? (puissance)",
          "Tension du bus à la borne du BP au multimètre (≥ 21 V, polarité)",
          "Moniteur de groupe ETS : le BP émet-il, et sur quelle adresse ?",
          "Liaison des objets dans ETS : adresse de groupe et type de données"] },
        { type: "tf", q: "Vrai ou faux ?", items: [
          ["Toute mesure côté 230 V se fait avec habilitation, VAT et EPI.", true],
          ["Un bon diagnostic commence par le plus complexe.", false],
          ["Sans KNX Secure, une personne branchée sur le bus peut lire et émettre des télégrammes.", true]] }
      ]
    },
    {
      id: "m6", num: 6, titre: "Livrer au client", duree: "35 min", competences: "C13 Communiquer avec le client",
      intro: "Livraison d'une installation radio avec box domotique à un couple de retraités. Une installation mal expliquée est une installation mal utilisée : la livraison fait partie du travail.",
      source: "Cours T12, parties 4 et 5 (exercices 4 et 5)",
      ex: [
        { type: "pick", q: "Le dossier remis au client contient :", items: [
          ["La liste des appareils et des adresses", true],
          ["Le plan de l'installation", true],
          ["La sauvegarde du projet", true],
          ["Le type et la durée de vie des piles", true],
          ["Les identifiants écrits sur le tableau électrique", false]] },
        { type: "match", q: "Exercice 4 du cours : le BP (touche gauche) et le détecteur du séjour allument le plafonnier (sortie C1). Quelle adresse de groupe pour chaque objet « commutation » ?", pairs: [
          ["BP séjour — touche gauche", "1/0/1 (envoie)"],
          ["Détecteur séjour", "1/0/1 (envoie aussi)"],
          ["Actionneur — sortie C1", "1/0/1 (écoute)"]],
          explain: "Les trois objets « commutation » sont liés à la même adresse 1/0/1 « séjour plafonnier marche / arrêt »." },
        { type: "qcm", q: "Le client te demande de lui donner les mots de passe. Comment fais-tu ?", options: ["Tu les écris sur la porte du tableau", "Tu les remets de façon sécurisée, après avoir changé ceux d'usine, sur un compte créé à son nom", "Tu les gardes pour le SAV", "Tu les envoies par SMS à son voisin"], answer: 1 },
        { type: "qcm", q: "Pour expliquer à des clients âgés, la meilleure méthode :", options: ["Un exposé technique sur Zigbee", "Des phrases courtes, sans jargon : montrer, puis leur faire faire", "Leur laisser la notice du fabricant", "Leur dire d'appeler en cas de souci"], answer: 1 },
        { type: "open", q: "Exercice 5 du cours : rédige trois consignes que tu donneras oralement au client. Utilise des phrases courtes, sans jargon technique.", hint: "Par exemple : comment allumer ou éteindre depuis l'application ; que faire en cas de coupure de courant ; qui appeler en cas de problème (et changer une pile)." },
        { type: "task", phone: true, q: "Ta livraison au client en vidéo ou en audio", steps: [
          "Avec un camarade qui joue le client, enregistre au téléphone ta présentation de l'installation (2 minutes maximum).",
          "Montre au moins une commande, un scénario ou un horaire, puis fais-le refaire par ton « client ».",
          "Termine par la conduite à tenir en cas de coupure secteur et le contact maintenance.",
          "Envoie l'enregistrement à ton professeur (ou fais-le écouter en fin de séance)."], note: "Durée de l'enregistrement et ce que ton « client » a réussi à refaire seul" }
      ]
    }
  ]
};
