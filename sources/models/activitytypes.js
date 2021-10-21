const activitytypesCollection = new webix.DataCollection({
	url: "/server/api/v1/activitytypes/",
	save: "rest->/server/api/v1/activitytypes/",
	scheme: {
		$init: (obj) => {
			obj.value = obj.Value;
		}
	}
});

export default activitytypesCollection;
