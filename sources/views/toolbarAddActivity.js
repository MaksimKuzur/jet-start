import {JetView} from "webix-jet";

import PopupAdd from "./windows/popupAdd";

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
					click: () => this._jetPopupAdd.showWindow()
				}
			]
		};
	}

	init() {
		this._jetPopupAdd = this.ui(PopupAdd);
	}
}
