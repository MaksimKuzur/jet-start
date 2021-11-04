import {JetView} from "webix-jet";

import contactsCollection from "../models/contacts";
import statusesCollection from "../models/statuses";

export default class FormAddEditContact extends JetView {
	config() {
		return {
			css: "datatable_activities_toolbar",
			rows: [
				{
					template: this.getHeader(),
					height: 40
				},
				{
					view: "form",
					localId: "formEditContact",
					elements: [
						{
							cols: [
								{
									rows: [
										{
											view: "text",
											label: "First name",
											name: "FirstName",
											placeholder: "Type here.."
										},
										{
											view: "text",
											label: "Last name",
											name: "LastName"
										},
										{
											view: "datepicker",
											label: "Joining date",
											name: "StartDateObject",
											labelWidth: 80,
											format: webix.i18n.longDateFormatStr,
											invalidMessage: "must be filled in"
										},
										{
											view: "combo",
											localId: "statusCombo",
											label: "Status",
											name: "status",
											options: statusesCollection
										},
										{
											view: "text",
											label: "Job",
											name: "Job"
										},
										{
											view: "text",
											label: "Company",
											name: "Company"
										},
										{
											view: "text",
											label: "Website",
											name: "Website"
										},
										{
											view: "text",
											label: "Address",
											name: "Address"
										}
									]
								},
								{width: 150},
								{
									rows: [
										{
											view: "text",
											label: "Email",
											name: "Email"
										},
										{
											view: "text",
											label: "Skype",
											name: "Skype"
										},
										{
											view: "text",
											label: "Phone",
											name: "Phone"
										},
										{
											view: "datepicker",
											label: "Birthday",
											name: "BirthdayObject",
											labelWidth: 80,
											format: webix.i18n.longDateFormatStr,
											invalidMessage: "must be filled in"
										},
										{
											cols: [
												{
													template: `
														<div class='photo'>
															<div class='photo_background'>
																<h1>Photo</h1>
															</div>
														</div>
													`,
													height: 200
												},
												{
													rows: [
														{},
														{
															view: "button",
															inputWidth: 120,
															width: 120,
															value: "Change photo"
														},
														{
															view: "button",
															inputWidth: 120,
															width: 120,
															value: "Delete photo"
														}
													]
												}
											]
										}
									]
								}
							]
						}
					]
				},
				{},
				{
					cols: [
						{},
						{
							view: "button",
							inputWidth: 120,
							width: 120,
							value: "Cancel",
							height: 40,
							click: () => this.cancelChanges()
						},
						{
							view: "button",
							inputWidth: 120,
							width: 120,
							value: this.getContactsAddSaveButton(),
							height: 40,
							click: () => this.saveChanges()
						}
					]
				}
			]
		};
	}

	cancelChanges() {
		const contactId = this.getParam("id");
		const firstContactId = contactsCollection.getFirstId();
		if (contactId) {
			this.app.show(`/top/start/contactsInfo?id=${contactId}`);
			this.selectContact(contactId);
		}
		else {
			this.app.show(`/top/start/contactsInfo?id=${firstContactId}`);
			this.selectContact(firstContactId);
		}
	}

	selectContact(contactId) {
		this.app.callEvent(
			"selectContact",
			[contactId]
		);
	}

	saveChanges() {
		const formContact = this.$getFormEditContact();
		const formContactValues = this.getFormEditContactValues();
		const contactsStartDate = this.formatDate(formContactValues.StartDateObject);
		const contactsBirthday = this.formatDate(formContactValues.BirthdayObject);
		formContactValues.StatusID = formContactValues.status;
		formContactValues.StartDate = contactsStartDate;
		formContactValues.Birthday = contactsBirthday;
		const contactId = contactsCollection.getFirstId();
		if (formContact.validate()) {
			if (formContactValues.id) {
				contactsCollection.updateItem(
					formContactValues.id,
					formContactValues
				);
			}
			else {
				contactsCollection.add(formContactValues);
			}
			this.app.show(`/top/start/contactsInfo?id=${contactId}`);
			this.selectContact(contactId);
		}
	}

	formatDate(contactsDate) {
		return webix.Date.dateToStr("%Y-%m-%d %H:%i")(contactsDate);
	}

	getHeader() {}

	getContactsAddSaveButton() {}

	$getFormEditContact() {
		return this.$$("formEditContact");
	}

	$getStatusCombo() {
		return this.$$("statusCombo");
	}

	getFormEditContactValues() {
		return this.$getFormEditContact().getValues();
	}

	setValuesToFormEditContact(contactId) {
		const listContactItem = contactsCollection.getItem(contactId);
		const status = statusesCollection.getItem(listContactItem.StatusID);
		listContactItem.status = status ? status.Value : "";
		this.$getFormEditContact().setValues(listContactItem);
		this.$getStatusCombo().setValue(status);
	}

	urlChange() {
		contactsCollection.waitData.then(() => {
			const contactId = this.getParam("id");
			this.setValuesToFormEditContact(contactId);
		});
	}
}
