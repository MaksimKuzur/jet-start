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
					localId: "dataActivities",
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
						on_click_edit: (e, row) => this.showFormEditActivities(row),
						on_click_delete: (e, id) => this.deleteItemActivities(id)
					}
				}
			]
		};
	}

	$getDataActivities() {
		return this.$$("dataActivities");
	}

	formatDate(activitiesDate) {
		return webix.Date.dateToStr("%Y-%m-%d")(activitiesDate);
	}

	formatTime(activitiesTime) {
		return webix.Date.dateToStr("%H:%i")(activitiesTime);
	}

	showFormEditActivities(row) {
		const activitiesSelectedItem = this.$getDataActivities().getItem(row);
		this.popupEditActivities.showWindow(activitiesSelectedItem);
	}

	deleteItemActivities(id) {
		webix.confirm({
			ok: "Yes",
			cancel: "No",
			text: "Deleting cannot be undone, are you sure?"
		}).then(() => activitiesCollection.remove(id));
		return false;
	}

	addUpdateItemActivities(formActivitiesValues) {
		const activitiesDate = this.formatDate(formActivitiesValues.date);
		const activitiesTime = this.formatTime(formActivitiesValues.time);
		formActivitiesValues.DueDate = `${activitiesDate} ${activitiesTime}`;
		if (formActivitiesValues.id) {
			activitiesCollection.updateItem(
				formActivitiesValues.id,
				formActivitiesValues
			);
		}
		else {
			activitiesCollection.add(formActivitiesValues);
		}
	}

	init() {
		this.$getDataActivities().parse(activitiesCollection);
		this.popupEditActivities = this.ui(PopupEditActivities);
	}

	ready() {
		this.on(
			this.app,
			"activitiesItemAddEdit",
			formActivitiesValues => this.addUpdateItemActivities(formActivitiesValues)
		);
	}
}
