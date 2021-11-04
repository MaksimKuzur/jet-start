import FormAddEditContact from "./formAddEditContact";

export default class FormEditContact extends FormAddEditContact {
	getHeader() {
		return "Edit contact";
	}

	getContactsAddSaveButton() {
		return "Save";
	}
}
