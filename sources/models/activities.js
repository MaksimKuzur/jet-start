const activitiesCollection = new webix.DataCollection({
	url: "/server/api/v1/activities/",
	save: "rest->/server/api/v1/activities/",
	scheme: {
		$init: (obj) => {
			if (obj.DueDate) obj.DueDateObject = webix.i18n.parseFormatDate(obj.DueDate);
		},
		$update: (obj) => {
			if (obj.DueDate) obj.DueDateObject = webix.i18n.parseFormatDate(obj.DueDate);
		}
	}
});

export default activitiesCollection;
