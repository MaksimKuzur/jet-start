import {JetView} from "webix-jet";

export default class SettingsView extends JetView {
	config() {
		return {
			padding: 20,
			rows: [
				{
					type: "section",
					template: "Language"
				},
				{
					view: "segmented",
					localId: "segmentedLocale",
					inputWidth: 200,
					options: [
						{
							id: "en",
							value: "English"
						},
						{
							id: "ru",
							value: "Russian"
						}
					]
				},
				{}
			]
		};
	}

	$getSegmentedView() {
		return this.$$("segmentedLocale");
	}

	getSegmentedViewValue() {
		return this.$getSegmentedView().getValue();
	}
}
