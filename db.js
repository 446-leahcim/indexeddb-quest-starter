// db.js: everything that talks to IndexedDB lives in this file.
// game.js calls these functions. YOU write them.
// Each one throws "not built yet" until you replace that line with your code.
// Your packet's DATA SPEC says WHAT every record holds. Spell every name EXACTLY
// like the spec, so your teacher can open DevTools and find everything.

const DB_NAME = "questDB";
const DB_VERSION = 1;

// ALREADY DONE: wraps an IndexedDB request in a promise so you can use await.
function promisify(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// ---------- Level 1: Open the database ----------
// Opens questDB. Version 1 has three stores: "heroes", "inventory", and "powers".
// Gives back (a promise for) the open database.
function openDB() {
  const request = indexedDB.open(DB_NAME, DB_VERSION);
  request.onupgradeneeded = () => {
    const db = request.result;
    db.createObjectStore("heroes", { keyPath: "name" });
    db.createObjectStore("inventory", { keyPath: "id" });
    db.createObjectStore("powers", { keyPath: "id" });
  };
  return promisify(request);
}

// ---------- Level 1: Heroes ----------
// name: like "Ana". heroClass: "fighter", "rogue", "wizard", or "cleric".
// attributes: { strength: 15, dexterity: 12, constitution: 14, intelligence: 8, wisdom: 10, charisma: 13 }
// Build a NEW hero record (see the DATA SPEC) and save it. Give back the record.
// A name that is already taken should fail, not replace the old hero.
async function createHero(name, heroClass, attributes) {
  const hp = 10 + modifier(attributes.constitution);
  const hero = {
    name: name,
    heroClass: heroClass,
    level: 1,
    xp: 0,
    hp: hp,
    maxHp: hp,
    gold: 10,
    attributes: attributes,
    createdAt: new Date().toISOString(),
  };
  const db = await openDB();
  const store = db.transaction("heroes", "readwrite").objectStore("heroes");
  await promisify(store.add(hero));
  return hero;
}

// name: a hero's name. Gives back that hero's record (or undefined).
async function getHero(name) {
  const db = await openDB();
  const store = db.transaction("heroes").objectStore("heroes");
  return promisify(store.get(name));
}

// Gives back an array of every hero record.
async function getAllHeroes() {
  const db = await openDB();
  const store = db.transaction("heroes").objectStore("heroes");
  return promisify(store.getAll());
}

// hero: a hero record that game.js changed (new hp, xp, level, or gold).
// Save it over the old one.
async function updateHero(hero) {
  const db = await openDB();
  const store = db.transaction("heroes", "readwrite").objectStore("heroes");
  await promisify(store.put(hero));
}

// ---------- Level 2: Inventory ----------
// heroName: whose bag. item: one object from ITEMS in data.js, like
//   { itemId: "healing-potion", name: "Healing Potion", type: "potion", icon: "🧪" }
// Not in that hero's bag yet? Save it with qty 1. Already there? Add 1 to qty.
async function addItem(heroName, item) {
  const db = await openDB();
  const store = db.transaction("inventory", "readwrite").objectStore("inventory");

  // console.log(item);
  const items = {
    name: item.name,
    hero: heroName,
    itemId: item.itemId,
    id: heroName + "-" + item.itemId,
    type: item.type,
    icon: item.icon,
    qty: 1,
  }
  await promisify(store.add(items));
  console.log(items);
}

// heroName: whose bag. Gives back ONLY that hero's items.
async function getInventory(heroName) {
  const db = await openDB();
  const store = db.transaction("items").objectStore("items");
  await promisify(store.getAll());
}

// heroName: whose bag. itemId: which item, like "healing-potion".
// Takes 1 away from qty. At 0, the item leaves the bag.
async function removeItem(heroName, itemId) {
  const db = await openDB();
  const store = db.transaction("items", "readwrite").objectStore("items");
  // if() {

  //   await promisify(store.put(item));
  // }
}

// ---------- Level 2: Powers ----------
// heroName: who learns it. power: one object from a class's powers in data.js, like
//   { powerId: "magic-missile", name: "Magic Missile", description: "...", learnAt: 1 }
// Saves that the hero knows this power.
async function learnPower(heroName, power) {
// const powers = {
//     id: id,
//     hero: heroName,
//     powerID: powerID,
//     name: name,
//     description: description,
//     learnAt: 1,
//   }
  throw new Error("learnPower() is not built yet (Level 2)");
}

// heroName: whose powers. Gives back ONLY that hero's powers.
async function getPowers(heroName) {
  // const db = await openDB();
  // const store = db.transaction("powers").objectStore("powers");
  // await promisify(store.getAll());
  throw new Error("getPowers() is not built yet (Level 2)");
}

// ---------- Level 2: Delete ----------
// name: a hero's name. Removes the hero AND everything that belongs to them
// (their items and powers, and at Level 3, their journal too).
async function deleteHero(name) {
  // const db = await openDB();
  // const store = db.transaction("powers", "readwrite").objectStore("powers");
  // await promisify(store.put(powers));
  throw new Error("deleteHero() is not built yet (Level 2)");
}

// ---------- Level 3: Adventure journal (version 2) ----------
// heroName: whose journal. text: what happened, like "Beat a Goblin. +30 XP".
// Saves a new journal entry.
async function addJournal(heroName, text) {
  // const journal = {
  //   hero: hero,
  //   text: text,
  //   createdAt: "2026-10-10T17:05:40.00Z",
  // }
  throw new Error("addJournal() is not built yet (Level 2");
}

// heroName: whose journal. Gives back ONLY that hero's entries, newest first.
async function getJournal(heroName) {
  throw new Error("getJournal() is not built yet (Level 3)");
}
