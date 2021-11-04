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
						localId: "comboContact",
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
								value: this.getActivitiesAddSaveButton(),
								width: 100,
								align: "right",
								click: () => this.saveChanges()
							},
							{
								view: "button",
								type: "form",
								value: "Cancel",
								width: 100,
								align: "right",
								click: () => this.hideFormAddEditActivities()
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

	$getComboContact() {
		return this.$$("comboContact");
	}

	getHeader() {}

	getActivitiesAddSaveButton() {}

	getFormActivitiesValues() {
		return this.$getFormActivities().getValues();
	}

	$getPopupFormActivities() {
		return this.$$("popupFormActivities");
	}

	saveChanges() {
		const formActivities = this.$getFormActivities();
		if (formActivities.validate()) {
			const formActivitiesValues = this.getFormActivitiesValues();
			this.hideFormAddEditActivities();
			this.app.callEvent(
				"activitiesItemAddEdit",
				[formActivitiesValues]
			);
		}
	}

	hideFormAddEditActivities() {
		const formActivities = this.$getFormActivities();
		formActivities.clearValidation();
		formActivities.clear();
		this.$getPopupFormActivities().hide();
	}

	showWindow(activitiesSelectedItem) {
		const selectedContactId = this.getParam("id");
		if ((selectedContactId && activitiesSelectedItem) || activitiesSelectedItem) {
			const activitieDueDate = activitiesSelectedItem.DueDateObject;
			activitiesSelectedItem.date = activitieDueDate;
			activitiesSelectedItem.time = activitieDueDate;
			this.$getFormActivities().setValues(activitiesSelectedItem);
		}
		else if (selectedContactId) {
			this.$getFormActivities().setValues({
				ContactID: selectedContactId
			});
			this.$getComboContact().disable();
		}
		this.$getPopupFormActivities().show();
	}
}
