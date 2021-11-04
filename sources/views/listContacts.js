import {JetView} from "webix-jet";

import contactsCollection from "../models/contacts";
import PopupAddActivities from "./windows/popupAddActivities";

export default class ListContacts extends JetView {
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
							scroll: true,
							css: "user-contacts",
							type: {
								height: 40,
								template: `
									<div class='user-contacts__item'>
										<div class='user-contacts__photo ico-user_male_circle'></div>
										<div class='user-contacts__details'>
											<div class='user-contacts__fullname'>#FirstName# #LastName#</div>
											<div class='user-contacts__company'>#Company#</div>
										</div>
									</div>
								`
							}
						},
						{},
						{
							view: "button",
							type: "icon",
							label: "Add contact",
							icon: "fa fa-trash-o",
							width: 200,
							click: () => this.app.show("/top/start/formAddContact")
						}
					]
				}
			]
		};
	}

	$getListContacts() {
		return this.$$("listContacts");
	}

	init() {
		contactsCollection.waitData.then(() => {
			const getListContacts = this.$getListContacts();
			getListContacts.sync(contactsCollection);
			getListContacts.select(contactsCollection.getFirstId());
		});
		this.popupAddActivities = this.ui(PopupAddActivities);
	}

	ready() {
		const getListContacts = this.$getListContacts();
		contactsCollection.waitData.then(() => {
			this.show(`contactsInfo?id=${contactsCollection.getFirstId()}`);
			this.on(
				this.$getListContacts(),
				"onAfterSelect",
				(id) => {
					this.show(`contactsInfo?id=${id}`);
				}
			);
			this.on(
				this.app,
				"selectContact",
				(contactId) => {
					getListContacts.select(contactId);
				}
			);
		});
	}
}
