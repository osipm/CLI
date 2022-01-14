const fs = require("fs").promises;
const path = require("path");
const { id, v4 } = require("uuid");
const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => Number(item.id) === contactId);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => Number(item.id) === contactId);
  if (idx === -1) {
    return null;
  }
  const removeContacts = contacts[idx];
  contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removeContacts;
}

async function addContact(name, email, phone) {
  const data = { id: v4(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(data);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return data;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
