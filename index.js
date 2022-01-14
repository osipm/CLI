const argv = require("yargs").argv;

const contactsOperations = require("./contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;

    case "get":
      const contact = await contactsOperations.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const addContacts = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.log(addContacts);
      break;

    case "remove":
      const removeContacts = await contactsOperations.removeContact(id);
      console.log(removeContacts);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
