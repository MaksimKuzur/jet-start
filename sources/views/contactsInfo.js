import {JetView} from "webix-jet";

import contactsCollection from "../models/contacts";
import statusesCollection from "../models/statuses";
import ActivitiesTableView from "./activitiesTable";
import ToolbarAddActivity from "./toolbarAddActivity";
import UserFilesTableView from "./userFiles";

export default class ContactsInfoView extends JetView {
	config() {
		return {
			rows: [
				{
					cols: [
						{
							css: "user-contacts-info__fullname",
							localId: "fullnameHeader",
							template: "#FirstName# #LastName#"
						},
						{},
						{
							view: "button",
							type: "icon",
							label: "Delete",
							icon: "fa fa-trash-o",
							width: 100,
							click: () => this.deleteItemActivities()
						},
						{
							view: "button",
							type: "icon",
							label: "Edit",
							icon: "fa fa-edit",
							width: 100,
							click: () => this.editItemActivities()
						}
					]
				},
				{
					rows: [
						{
							localId: "contactsInfoTemplate",
							template: obj => `
								<div class='user-contacts-info__item'>
									<div class='user-contacts-info__photo'>
										<div class='photo'>
											<div class='photo_background'>
												<h1>Photo</h1>
											</div>
										</div>
										<div class='user-contacts-info__detail_status'> ${obj.status || " not set"}</div>
									</div>
									<div class='user-contacts-info__details_colum1'>
										<div class='user-contacts-info__detail'>
											<span class="fa fa-envelope"> ${obj.Email || " not set"}</span>
										</div>
										<div class='user-contacts-info__detail'>
											<span class="fa fa-skype"> ${obj.Skype || " not set"}</span>
										</div>
										<div class='user-contacts-info__detail'>
											<span class="fa fa-tag"> ${obj.Job || " not set"}</span>
										</div>
										<div class='user-contacts-info__detail'>
											<span class="fa fa-briefcase"> ${obj.Company || " not set"}</span>
										</div>
									</div>
									<div class='user-contacts-info__details_colum2'>
									<div class='user-contacts-info__detail'>
											<span class="fa fa-calendar"> ${obj.Birthday || " not set"}</span>
										</div>
										<div class='user-contacts-info__detail'>
											<span class="ico-location"> ${obj.location || " not set"}</span>
										</div>
									</div>
								</div>
							`,
							height: 200
						}
					]
				},
				{},
				{
					height: 400,
					view: "tabview",
					cells: [
						{
							header: "datatable",
							body: {
								rows: [
									ToolbarAddActivity,
									new ActivitiesTableView(this.app, true)
								]
							}
						},
						{
							header: "Files",
							body: {
								rows: [
									UserFilesTableView
								]
							}
						}
					]
				}
			]
		};
	}

	deleteItemActivities() {
		webix.confirm({
			ok: "Yes",
			cancel: "No",
			text: "Deleting cannot be undone, are you sure?"
		}).then(() => {
			const contactId = this.getParam("id");
			contactsCollection.remove(contactId);
			const firstContactId = contactsCollection.getFirstId();
			this.app.show(`/top/start/contactsInfo?id=${firstContactId}`);
		});
		return false;
	}

	editItemActivities() {
		const contactId = this.getParam("id");
		this.app.show(`/top/start/formEditContact?id=${contactId}`);
	}

	$getContactInfoTemplate() {
		return this.$$("contactsInfoTemplate");
	}

	$getFullnameHeader() {
		return this.$$("fullnameHeader");
	}

	setValuesToContactInfo(contactId) {
		const listContactItem = contactsCollection.getItem(contactId);
		const status = statusesCollection.getItem(listContactItem.StatusID);
		listContactItem.status = status ? status.Value : "";
		this.$getContactInfoTemplate().setValues(listContactItem);
		this.$getFullnameHeader().setValues(listContactItem);
	}

	urlChange() {
		contactsCollection.waitData.then(() => {
			const contactId = this.getParam("id");
			this.setValuesToContactInfo(contactId);
		});
	}

	init() {
		contactsCollection.waitData.then(() => {
			const contactId = contactsCollection.getFirstId();
			this.setValuesToContactInfo(contactId);
		});
	}
}
