import {JetView} from "webix-jet";

import activitytypesCollection from "../../models/activitytypes";
import contactsCollection from "../../models/contacts";

export default class PopupAddEdit extends JetView {
	config() {
		return {
			view: "popup",
			localId: "popupFormActivities",
			width: 600,
			position: "center",
			body: {
				view: "form",
				localId: "formActivities",
				elements: [
					{
						css: "add_activity",
						template: "Add activity",
						height: 50
					},
					{
						css: "edit_activity",
						template: "Edit activity",
						height: 60
					},
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
								value: "Add",
								width: 100,
								align: "right",
								click: () => {
									if (this.$getFormActivities().validate()) {
										this.$getPopupFormActivities().hide();
										const newActivitiesDetails = this.getFormActivitiesValues().Details;
										const newActivitiesTypeID = this.getFormActivitiesValues().TypeID;
										const newActivitiesState = this.getFormActivitiesValues().State;
										const newActivitiesContactID = this.getFormActivitiesValues().ContactID;
										const formatDate = webix.Date.dateToStr("%Y-%m-%d");
										const formatTime = webix.Date.dateToStr("%H:%i");
										const newActivitiesDate = formatDate(this.getFormActivitiesValues().date);
										const newActivitiesTime = formatTime(this.getFormActivitiesValues().time);
										const newActivitiesDueDate = `${newActivitiesDate} ${newActivitiesTime}`;
										this.app.callEvent("activitiesItemAdd", [
											newActivitiesDetails,
											newActivitiesTypeID,
											newActivitiesState,
											newActivitiesContactID,
											newActivitiesDueDate
										]);
									}
								}
							},
							{
								view: "button",
								type: "form",
								value: "Save",
								width: 100,
								align: "right",
								click: () => {
									this.$getPopupFormActivities().hide();
									const newActivitiesDetails = this.getFormActivitiesValues().Details;
									const newActivitiesTypeID = this.getFormActivitiesValues().TypeID;
									const newActivitiesState = this.getFormActivitiesValues().State;
									const newActivitiesContactID = this.getFormActivitiesValues().ContactID;
									const formatDate = webix.Date.dateToStr("%Y-%m-%d");
									const formatTime = webix.Date.dateToStr("%H:%i");
									const newActivitiesDate = formatDate(this.getFormActivitiesValues().date);
									const newActivitiesTime = formatTime(this.getFormActivitiesValues().time);
									const newActivitiesDueDate = `${newActivitiesDate} ${newActivitiesTime}`;
									this.app.callEvent("activitiesItemUpdate", [
										newActivitiesDetails,
										newActivitiesTypeID,
										newActivitiesState,
										newActivitiesContactID,
										newActivitiesDueDate
									]);
								}
							},
							{
								view: "button",
								type: "form",
								value: "Cancel",
								width: 100,
								align: "right",
								click: () => {
									this.$getPopupFormActivities().hide();
								}
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

	getFormActivitiesValues() {
		return this.$getFormActivities().getValues();
	}

	$getPopupFormActivities() {
		return this.$$("popupFormActivities");
	}

	showWindow() {
		this.getRoot().show();
	}

	ready() {
		this.on(this.app, "activitiesItemEdit", (
			activitiesSelectedDetails,
			activitiesSelectedTypeID,
			activitiesSelectedState,
			activitiesSelectedContactID,
			activitiesSelectedDate,
			activitiesSelectedTime
			) => {
			this.$getFormActivities().setValues({
				Details: activitiesSelectedDetails,
				TypeID: activitiesSelectedTypeID,
				State: activitiesSelectedState,
				ContactID: activitiesSelectedContactID,
				date: activitiesSelectedDate,
				time: activitiesSelectedTime
			});
		});
	}
}
