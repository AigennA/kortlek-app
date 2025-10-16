const färger = [
  { namn: "Hjärter", emoji: "♥️" },
  { namn: "Ruter", emoji: "♦️" },
  { namn: "Spader", emoji: "♠️" },
  { namn: "Klöver", emoji: "♣️" }
];
const värden = [1,2,3,4,5,6,7,8,9,10,11,12,13];
const namn = { 1: "Ess", 11: "Knäckt", 12: "Dam", 13: "Kung" };

let kortlek = [];
let spelare = [];

function skapaKortlek() {
  const k = [];
  for (let färg of färger) {
    for (let värde of värden) {
      k.push({
        färg: färg.namn,
        emoji: färg.emoji,
        värde: värde,
        namn: namn[värde] || värde.toString()
      });
    }
  }
  k.push({ färg: "Joker", emoji: "🃏", värde: 15, namn: "Joker" });
  k.push({ färg: "Joker", emoji: "🃏", värde: 15, namn: "Joker" });
  return k;
}

function blandaKortlek(k) {
  for (let i = k.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [k[i], k[j]] = [k[j], k[i]];
  }
}

function delaUtKort(k, antalSpelare, kortPerSpelare) {
  const s = [];
  for (let i = 0; i < antalSpelare; i++) {
    s.push({ namn: `Spelare ${i + 1}`, hand: [] });
  }
  for (let i = 0; i < kortPerSpelare; i++) {
    for (let p of s) {
      if (k.length > 0) {
        p.hand.push(k.pop());
      }
    }
  }
  return s;
}

function räknaPoäng(hand) {
  return hand.reduce((sum, kort) => sum + kort.värde, 0);
}

function visaSpelare(s) {
  const utdata = document.getElementById("utdata");
  utdata.innerHTML = "";
  for (let i = 0; i < s.length; i++) {
    const p = s[i];
    const div = document.createElement("div");
    div.className = "spelare";

    const rubrik = document.createElement("h3");
    rubrik.textContent = p.namn;
    div.appendChild(rubrik);

    const poäng = document.createElement("div");
    poäng.className = "poäng";
    poäng.textContent = `Poäng: ${räknaPoäng(p.hand)}`;
    div.appendChild(poäng);

    for (let j = 0; j < p.hand.length; j++) {
      const kort = p.hand[j];
      const kortDiv = document.createElement("div");
      kortDiv.className = "kort";
      kortDiv.textContent = `${kort.namn} ${kort.emoji}`;
      kortDiv.onclick = () => bytKort(i, j);
      div.appendChild(kortDiv);
    }

    utdata.appendChild(div);
  }
}

function bytKort(spelarIndex, kortIndex) {
  if (kortlek.length === 0) return;
  spelare[spelarIndex].hand[kortIndex] = kortlek.pop();
  visaSpelare(spelare);
}

function startaSpelet() {
  kortlek = skapaKortlek();
  blandaKortlek(kortlek);
  spelare = delaUtKort(kortlek, 2, 5);
  visaSpelare(spelare);
}

function startaOm() {
  kortlek = skapaKortlek();
  blandaKortlek(kortlek);
  for (let p of spelare) {
    p.hand = [];
  }
  spelare = delaUtKort(kortlek, 2, 5);
  visaSpelare(spelare);
}
