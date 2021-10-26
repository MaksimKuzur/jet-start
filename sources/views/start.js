import {JetView} from "webix-jet";

import contactsCollection from "../models/contacts";
import statusesCollection from "../models/statuses";

export default class StartView extends JetView {
	config() {
		return {
			cols: [
				{
					view: "list",
					localId: "listContacts",
					select: true,
					width: 270,
					scroll: false,
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
					},
					on: {
						onAfterSelect: row => this.setValuesToFormContacts(row)
					}
				},
				{
					view: "form",
					localId: "formForContactInfo",
					elements: [
						{
							cols: [
								{
									css: "layout_info_contact",
									rows: [
										{
											cols: [
												{
													view: "label",
													label: "FirstName",
													name: "FirstName",
													autowidth: true
												},
												{
													view: "label",
													label: "LastName",
													name: "LastName",
													autowidth: true
												},
												{}
											]
										},
										{
											cols: [
												{
													width: 250,
													rows: [
														{
															template: `
																<div class='photo'>
																	<div class='photo_in'>
																		<h1>Photo</h1>
																	</div>
																</div>
															`,
															height: 200
														},
														{
															view: "label",
															label: "Status",
															name: "status"
														},
														{}

													]
												},
												{
													rows: [
														{
															view: "label",
															template: obj => `<span class="fa fa-briefcase">${obj.label || "not set"}</span>`,
															name: "Email"
														},
														{
															view: "label",
															template: obj => `<span class="fa fa-skype">${obj.label || "not set"}</span>`,
															name: "Skype"
														},
														{
															view: "label",
															template: obj => `<span class="fa fa-tag">${obj.label || "not set"}</span>`,
															name: "Job"
														},
														{
															view: "label",
															template: obj => `<span class="fa fa-briefcase">${obj.label || "not set"}</span>`,
															name: "Company"
														},
														{}
													]
												},
												{
													rows: [
														{
															view: "label",
															template: obj => `<span class="fa fa-calendar">${obj.label || "not set"}</span>`,
															name: "Birthday"
														},
														{
															view: "label",
															template: obj => `<span class="ico-location"></span>${obj.label || " no location"}`,
															name: "location"
														},
														{}
													]
												}
											]
										}

									]
								},
								{
									css: "toolbar_info_contact",
									rows: [
										{
											cols: [
												{
													view: "button",
													type: "icon",
													label: "Delete",
													icon: "fa fa-trash-o",
													width: 100
												},
												{
													view: "button",
													type: "icon",
													label: "Edit",
													icon: "fa fa-edit",
													width: 100
												}
											]
										},
										{}
									]
								}
							]
						}
					]
				}
			]
		};
	}

	$getFormForContactInfo() {
		return this.$$("formForContactInfo");
	}

	$getLabelFirstName() {
		return this.$$("$label1");
	}

	setValuesToFormContacts(row) {
		const listContactItem = this.$getListContacts().getItem(row);
		const status = statusesCollection.getItem(listContactItem.StatusID);
		listContactItem.status = status.Value;
		this.$getFormForContactInfo().setValues(listContactItem);
		this.$getLabelFirstName().resize();
	}

	$getListContacts() {
		return this.$$("listContacts");
	}

	init() {
		this.$getListContacts().sync(contactsCollection);
	}

	ready() {
		contactsCollection.waitData.then(() => {
			const listContacts = this.$getListContacts();
			const firstContactId = listContacts.getFirstId();
			listContacts.select(firstContactId);
		});
	}
}
