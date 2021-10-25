import {JetView, plugins} from "webix-jet";

import contactsCollection from "../models/contacts";

export default class FormAddContacts extends JetView {
	config() {
		return {
			cols: [
				{
					rows: [
						{
							view: "list",
							localId: "listContacts",
							select: true,
							width: 270,
							scroll: false,
							css: "list_contacts",
							type: {
								height: 40,
								template: `
									<div class='table_contact_info'>
										<div class='cell_contact_info div_contact_info ico-user_male_circle'></div>
										<div class='cell_contact_info'>
											<div class='div_firstLastName'>#FirstName# #LastName#</div>
											<div class='div_company'>#Company#</div>
										</div>
									</div>
								`
							},
							on: {
								onAfterSelect: (row) => { this.setValuesToFormContacts(row); }
							}
						},
						{},
						{
							view: "button",
							type: "icon",
							label: "Add contact",
							icon: "fa fa-trash-o",
							width: 200
						},
					]
				},
			]
		};
	}

	$getFormForContactInfo() {
		return this.$$("formForContactInfo");
	}

	setValuesToFormContacts(row) {
		const listContactItem = this.$getListContacts().getItem(row);
		this.$getFormForContactInfo().setValues(listContactItem);
	}

	$getListContacts() {
		return this.$$("listContacts");
	}

	init() {
		this.$getListContacts().sync(contactsCollection);
		// this.use(plugins.Menu, "contactsMenu");
	}

	ready() {
		contactsCollection.waitData.then(() => {
			const listContacts = this.$getListContacts();
			const firstContactId = listContacts.getFirstId();
			listContacts.select(firstContactId);
		});
	}
}
