import {JetView} from "webix-jet";

// import PopupAddActivities from "./windows/popupAddActivities";

export default class FormEditContact extends JetView {
	config() {
		return {
			css: "datatable_activities_toolbar",
            rows: [
                {
                    cols: [
                        {},
                        {
                            view: "button",
                            inputWidth: 120,
                            width: 120,
                            value: "Add activity",
                            css: "webix_primary",
                        }
                    ]
                },
                {}
            ]
		};
	}

	init() {
		
	}
}
