import FormAddEditContact from "./formAddEditContact";

export default class FormAddContact extends FormAddEditContact {
	getHeader() {
		return "add new contact";
	}

	getContactsAddSaveButton() {
		return "add";
	}
}
