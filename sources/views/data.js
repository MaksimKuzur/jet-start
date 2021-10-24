import {JetView} from "webix-jet";

import activitiesCollection from "../models/activities";
import activitytypesCollection from "../models/activitytypes";
import contactsCollection from "../models/contacts";
import ToolbarAddActivity from "./toolbarAddActivity";
import PopupEditActivities from "./windows/popupEditActivities";

export default class DataView extends JetView {
	config() {
		return {
			rows: [
				ToolbarAddActivity,
				{
					view: "datatable",
					id: "dataActivities",
					css: "datatable_activities",
					editable: true,
					scrollX: false,
					data: activitiesCollection,
					select: true,
					columns: [
						{
							id: "State",
							checkValue: "Close",
							uncheckValue: "Open",
							value: "Close",
							header: "",
							template: "{common.checkbox()}",
							width: 50,
							sort: "string"
						},
						{
							id: "TypeID",
							header: [
								"Activity type",
								{content: "selectFilter"}
							],
							collection: activitytypesCollection,
							width: 200,
							sort: "text"
						},
						{
							id: "DueDateObject",
							format: webix.i18n.longDateFormatStr,
							header: [
								"Due date",
								{content: "dateRangeFilter"}
							],
							width: 200,
							sort: "date"
						},
						{
							id: "Details",
							fillspace: true,
							header: [
								"Details",
								{content: "textFilter"}
							],
							sort: "string"
						},
						{
							id: "ContactID",
							header: [
								"Contact",
								{content: "selectFilter"}
							],
							collection: contactsCollection,
							width: 200,
							sort: "text"
						},
						{
							id: "edit",
							header: "",
							template: "<span class='on_click_edit webix_icon wxi-pencil'></span>",
							width: 50
						},
						{
							id: "del",
							header: "",
							template: "<span class='on_click_delete webix_icon wxi-trash'></span>",
							width: 50
						}
					],
					onClick: {
						on_click_edit: (e, row) => {this.showFormEditActivities(e, row)},
						on_click_delete: (e, id) => {this.deleteItemActivities(e, id)}
					}
				}
			]
		};
	}

	$getDataActivities() {
		return this.$$("dataActivities");
	}

	showFormEditActivities(e, row) {
		const activitiesSelectedItem = this.$getDataActivities().getItem(row);
		this.popupEditActivities.showWindow(activitiesSelectedItem);
	}

	deleteItemActivities(e, id) {
		webix.confirm({
			ok: "Yes",
			cancel: "No",
			text: "Deleting cannot be undone, are you sure?"
		}).then(() => activitiesCollection.remove(id));
		return false;
	}

	init() {
		this.$getDataActivities().parse(activitiesCollection);
		this.popupEditActivities = this.ui(PopupEditActivities);
	}

	ready() {
		this.on(this.app, "activitiesItemAddEdit", (formActivitiesValues) => {
			if(formActivitiesValues.id) {
				const activitiesDetails = formActivitiesValues.Details;
				const activitiesTypeID = formActivitiesValues.TypeID;
				const activitiesState = formActivitiesValues.State;
				const activitiesContactID = formActivitiesValues.ContactID;
				const formatDate = webix.Date.dateToStr("%Y-%m-%d");
				const formatTime = webix.Date.dateToStr("%H:%i");
				const activitiesDate = formatDate(formActivitiesValues.date);
				const activitiesTime = formatTime(formActivitiesValues.time);
				const activitiesDueDate = `${activitiesDate} ${activitiesTime}`;
				const updatedActivitiesItemValues = {
					Details: activitiesDetails,
					TypeID: activitiesTypeID,
					State: activitiesState,
					ContactID: activitiesContactID,
					DueDate: activitiesDueDate
				};
				const activitiesSelectedItemId = this.$getDataActivities().getSelectedId();
				activitiesCollection.updateItem(activitiesSelectedItemId, (updatedActivitiesItemValues));
			} else {
				const activitiesDetails = formActivitiesValues.Details;
				const activitiesTypeID = formActivitiesValues.TypeID;
				const activitiesState = formActivitiesValues.State;
				const activitiesContactID = formActivitiesValues.ContactID;
				const formatDate = webix.Date.dateToStr("%Y-%m-%d");
				const formatTime = webix.Date.dateToStr("%H:%i");
				const activitiesDate = formatDate(formActivitiesValues.date);
				const activitiesTime = formatTime(formActivitiesValues.time);
				const activitiesDueDate = `${activitiesDate} ${activitiesTime}`;
				const newActivitiesItemValues = {
					Details: activitiesDetails,
					TypeID: activitiesTypeID,
					State: activitiesState,
					ContactID: activitiesContactID,
					DueDate: activitiesDueDate
				};
				activitiesCollection.add(newActivitiesItemValues);
			}
		});
	}
}
