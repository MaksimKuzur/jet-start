import {JetView} from "webix-jet";

import PopupAddActivities from "./windows/popupAddActivities";

export default class ToolbarAddActivity extends JetView {
	config() {
		return {
			css: "datatable_activities_toolbar",
			cols: [
				{},
				{
					view: "button",
					inputWidth: 120,
					width: 120,
					value: "Add activity",
					css: "webix_primary",
					click: () => this.popupAddActivities.showWindow()
				}
			]
		};
	}

	init() {
		this.popupAddActivities = this.ui(PopupAddActivities);
	}
}
