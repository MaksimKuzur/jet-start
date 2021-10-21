const activitiesCollection = new webix.DataCollection({
	url: "/server/api/v1/activities/",
	save: "rest->/server/api/v1/activities/"
});

export default activitiesCollection;
