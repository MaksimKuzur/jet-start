import {JetView} from "webix-jet";

export default class FormContactsInfo extends JetView {
	config() {
		return {
			cols: [
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
															localId: "templatePhoto",
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
															label: "StatusID",
															name: "StatusID"
														},
														{}
	
													]
												},
												{
													rows: [
														{
															view: "label",
															template: "<span class='fa fa-envelope'>#Email#</span>",
															name: "Email"
														},
														{
															view: "label",
															template: "<span class='fa fa-skype'>#Skype#</span>",
															name: "Skype"
														},
														{
															view: "label",
															template: "<span class='fa fa-tag'>#Job#</span>",
															name: "Job"
														},
														{
															view: "label",
															template: "<span class='fa fa-briefcase'>#Company#</span>",
															name: "Company"
														},
														{}
													]
												},
												{
													rows: [
														{
															view: "label",
															template: "<span class='fa fa-calendar'>#Birthday#</span>",
															name: "Birthday"
														},
														{
															view: "label",
															template: "<span class='ico-location'>location</span>",
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

	$getListContacts() {
		return this.$$("listContacts");
	}

	// init() {
	// 	this.$getListContacts().sync(contactsCollection);
	// 	this.use(plugins.Menu, "contactsMenu");
	// }

	// ready() {
	// 	contactsCollection.waitData.then(() => {
	// 		const listContacts = this.$getListContacts();
	// 		const firstContactId = listContacts.getFirstId();
	// 		listContacts.select(firstContactId);
	// 	});
	// }
	
}
