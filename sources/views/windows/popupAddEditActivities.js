import {JetView} from "webix-jet";

import activitytypesCollection from "../../models/activitytypes";
import contactsCollection from "../../models/contacts";

export default class PopupAddEditActivities extends JetView {
	config() {
		return {
			view: "window",
			modal: true,
			localId: "popupFormActivities",
			width: 600,
			position: "center",
			head: this.getHeader(),
			body: {
				view: "form",
				localId: "formActivities",
				elements: [
					{
						view: "textarea",
						label: "Details",
						name: "Details"
					},
					{
						view: "combo",
						label: "Type",
						name: "TypeID",
						options: {
							body: {
								template: "#Value#",
								data: activitytypesCollection
							}
						},
						invalidMessage: "must be filled in"
					},
					{
						view: "combo",
						label: "Contact",
						name: "ContactID",
						options: {
							body: {
								template: "#FirstName# #LastName#",
								data: contactsCollection
							}
						},
						invalidMessage: "must be filled in"
					},
					{
						cols: [
							{
								view: "datepicker",
								label: "Date",
								name: "date",
								labelWidth: 80,
								timepicker: true,
								format: webix.i18n.longDateFormatStr,
								invalidMessage: "must be filled in"
							},
							{
								view: "datepicker",
								type: "time",
								label: "Time",
								labelWidth: 80,
								timepicker: true,
								name: "time",
								format: "%H:%i",
								invalidMessage: "must be filled in"
							}
						]
					},
					{
						view: "checkbox",
						label: "Completed",
						name: "State",
						checkValue: "Close",
						uncheckValue: "Open"
					},
					{
						margin: 20,
						cols: [
							{},
							{
								view: "button",
								type: "form",
								value: this.getActivitiesAddSaveButton().value,
								width: 100,
								align: "right",
								click: () => {this.showFormAddEditActivities()}
							},
							{
								view: "button",
								type: "form",
								value: "Cancel",
								width: 100,
								align: "right",
								click: () => {this.hideFormAddEditActivities()}
							}
						]
					}
				],
				rules: {
					TypeID: webix.rules.isNotEmpty,
					ContactID: webix.rules.isNotEmpty,
					date: webix.rules.isNotEmpty,
					time: webix.rules.isNotEmpty
				}
			}
		};
	}

	$getFormActivities() {
		return this.$$("formActivities");
	}

	getHeader() {}

	getActivitiesAddSaveButton() {}
	
	getFormActivitiesValues() {
		return this.$getFormActivities().getValues();
	}

	$getPopupFormActivities() {
		return this.$$("popupFormActivities");
	}

	showFormAddEditActivities() {
		const formActivities = this.$getFormActivities();
		if (formActivities.validate()) {
			const formActivitiesValues = this.getFormActivitiesValues();
			formActivities.clearValidation();
			formActivities.clear();
			this.$getPopupFormActivities().hide();
			this.app.callEvent("activitiesItemAddEdit", [formActivitiesValues]);
		}
	}

	hideFormAddEditActivities() {
		const formActivities = this.$getFormActivities();
		formActivities.clearValidation();
		formActivities.clear();
		this.$getPopupFormActivities().hide();
	}

	showWindow(activitiesSelectedItem) {
		const formActivities = this.getRoot();
		if(activitiesSelectedItem) {
			const activitiesSelectedItemId = activitiesSelectedItem.id;
			const activitiesSelectedItemDetails = activitiesSelectedItem.Details;
			const activitiesSelectedItemTypeID = activitiesSelectedItem.TypeID;
			const activitiesSelectedItemState = activitiesSelectedItem.State;
			const activitiesSelectedItemContactID = activitiesSelectedItem.ContactID;
			const activitiesSelectedItemDueDateObject = activitiesSelectedItem.DueDateObject;
			const activitiesSelectedItemDate = new Date(activitiesSelectedItemDueDateObject);
			const activitiesSelectedItemTime = new Date(activitiesSelectedItemDueDateObject);
			const activitiesSelectedItemValues = {
				id: activitiesSelectedItemId,
				Details: activitiesSelectedItemDetails,
				TypeID: activitiesSelectedItemTypeID,
				State: activitiesSelectedItemState,
				ContactID: activitiesSelectedItemContactID,
				date: activitiesSelectedItemDate,
				time: activitiesSelectedItemTime
			};
			this.$getFormActivities().setValues(activitiesSelectedItemValues);
			formActivities.show();
		}
		formActivities.show();
	}
}
