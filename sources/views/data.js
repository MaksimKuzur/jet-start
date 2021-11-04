import {JetView} from "webix-jet";

import ActivitiesTableView from "./activitiesTable";
import ToolbarAddActivity from "./toolbarAddActivity";

export default class DataView extends JetView {
	config() {
		return {
			rows: [
				ToolbarAddActivity,
				new ActivitiesTableView(this.app, false)
			]
		};
	}
}
