import {JetView} from "webix-jet";

import activitiesCollection from "../models/activities";
import activitytypesCollection from "../models/activitytypes";
import contactsCollection from "../models/contacts";
import ToolbarAddActivity from "./toolbarAddActivity";
import PopupAdd from "./windows/popupAdd";
import PopupEdit from "./windows/popupEdit";

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
							sort: "string"
						},
						{
							id: "DueDate",
							format: webix.i18n.longDateFormatStr,
							header: [
								"Due date",
								{content: "dateRangeFilter"}
							],
							width: 200,
							sort: "string"
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
							sort: "string"
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
						on_click_edit: (e, row) => {
							const activitiesSelectedDetails = this.$getDataActivities().getItem(row).Details;
							const activitiesSelectedTypeID = this.$getDataActivities().getItem(row).TypeID;
							const activitiesSelectedState = this.$getDataActivities().getItem(row).State;
							const activitiesSelectedContactID = this.$getDataActivities().getItem(row).ContactID;
							const activitiesSelectedDueDate = this.$getDataActivities().getItem(row).DueDate;
							const parseSelectedDueDate = webix.i18n.parseFormatDate(activitiesSelectedDueDate);
							const activitiesSelectedDate = webix.Date.datePart(parseSelectedDueDate);
							const activitiesSelectedTime = new Date(activitiesSelectedDueDate);
							this.app.callEvent("activitiesItemEdit", [
								activitiesSelectedDetails,
								activitiesSelectedTypeID,
								activitiesSelectedState,
								activitiesSelectedContactID,
								activitiesSelectedDate,
								activitiesSelectedTime
							]);
							this._jetPopupEdit.showWindow();
						},
						on_click_delete: (e, id) => {
							webix.confirm({
								ok: "Yes",
								cancel: "No",
								text: "Deleting cannot be undone, are you sure?"
							}).then(() => activitiesCollection.remove(id));
							return false;
						}
					}
				}
			]
		};
	}

	$getDataActivities() {
		return this.$$("dataActivities");
	}

	init() {
		this.$getDataActivities().parse(activitiesCollection);
		this._jetPopup = this.ui(PopupAdd);
		this._jetPopupEdit = this.ui(PopupEdit);
	}

	ready() {
		this.on(this.app, "activitiesItemAdd", (
			newActivitiesDetails,
			newActivitiesTypeID,
			newActivitiesState,
			newActivitiesContactID,
			newActivitiesDueDate
			) => {
			activitiesCollection.add({
				Details: newActivitiesDetails,
				TypeID: newActivitiesTypeID,
				State: newActivitiesState,
				ContactID: newActivitiesContactID,
				DueDate: newActivitiesDueDate
			});
		});
		this.on(this.app, "activitiesItemUpdate", (
			newActivitiesDetails,
			newActivitiesTypeID,
			newActivitiesState,
			newActivitiesContactID,
			newActivitiesDueDate
			) => {
			const selectedActivitiesItem = this.$getDataActivities().getSelectedId();
			activitiesCollection.updateItem(selectedActivitiesItem, {
				Details: newActivitiesDetails,
				TypeID: newActivitiesTypeID,
				State: newActivitiesState,
				ContactID: newActivitiesContactID,
				DueDate: newActivitiesDueDate
			});
		});
	}
}
