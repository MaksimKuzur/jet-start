import {JetView} from "webix-jet";

import contactsCollection from "../models/contacts";

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
					css: "list_contacts",
					type: {
						height: 40,
						template: "<div class='table_contact_info'><div class='cell_contact_info div_contact_info ico-user_male_circle'></div><div class='cell_contact_info'><div class='div_firstLastName'>#FirstName# #LastName#</div><div class='div_company'>#Company#</div></div></div>"
					},
					on: {
						onAfterSelect: (row) => {
							const listContactItem = this.$getListContacts().getItem(row);
							this.$getTemplateFirstLastName().setValues(listContactItem);
							this.$getTemplatePhoto().setValues(listContactItem);
							this.$getTemplateStatusId().setValues(listContactItem);
							this.$getTemplateEmail().setValues(listContactItem);
							this.$getTemplateSkype().setValues(listContactItem);
							this.$getTemplateJob().setValues(listContactItem);
							this.$getTemplateCompany().setValues(listContactItem);
							this.$getTemplateBirthday().setValues(listContactItem);
						}
					}
				},
				{
					cols: [
						{
							css: "layout_info_contact",
							rows: [
								{
									css: "template_firstLast_name",
									id: "templateFirstLastName",
									template: "#FirstName# #LastName#",
									height: 40
								},
								{
									cols: [
										{
											width: 250,
											rows: [
												{
													localId: "templatePhoto",
													template: "<div class='photo'><div class='photo_in'><h1>Photo</h1></div></div>",
													height: 200
												},
												{
													css: "template_statusId",
													localId: "templateStatusId",
													template: "#StatusID#",
													height: 40
												},
												{}

											]
										},
										{
											rows: [
												{
													localId: "templateEmail",
													template: "<span class='fa fa-envelope'>#Email#</span>",
													height: 40
												},
												{
													localId: "templateSkype",
													template: "<span class='fa fa-skype'>#Skype#</span>",
													height: 40
												},
												{
													localId: "templateJob",
													template: "<span class='fa fa-tag'>#Job#</span>",
													height: 40
												},
												{
													localId: "templateCompany",
													template: "<span class='fa fa-briefcase'>#Company#</span>",
													height: 40
												},
												{}
											]
										},
										{
											rows: [
												{
													localId: "templateBirthday",
													template: "<span class='fa fa-calendar'>#Birthday#</span>",
													height: 40
												},
												{
													localId: "templateLocation",
													template: "<span class='ico-location'>location</span>",
													height: 40
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
		};
	}

	init() {
		this.$getListContacts().sync(contactsCollection);
	}

	$getListContacts() {
		return this.$$("listContacts");
	}

	$getLayoutContacts() {
		return this.$$("layoutContacts");
	}

	$getTemplateFirstLastName() {
		return this.$$("templateFirstLastName");
	}

	$getTemplatePhoto() {
		return this.$$("templatePhoto");
	}

	$getTemplateStatusId() {
		return this.$$("templateStatusId");
	}

	$getTemplateEmail() {
		return this.$$("templateEmail");
	}

	$getTemplateSkype() {
		return this.$$("templateSkype");
	}

	$getTemplateJob() {
		return this.$$("templateJob");
	}

	$getTemplateCompany() {
		return this.$$("templateCompany");
	}

	$getTemplateBirthday() {
		return this.$$("templateBirthday");
	}

	ready() {
		contactsCollection.waitData.then(() => {
			const firstContactId = this.$getListContacts().getFirstId();
			this.$getListContacts().select(firstContactId);
		});
	}
}
