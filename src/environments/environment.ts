// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // baseUrl : "http://localhost:8090/api/",
  baseUrl : "https://demo0427.herokuapp.com/api/",
  lineTokenUrl : "https://api.line.me/oauth2/v2.1/token",
  line_oauth_base_url: "https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1657065757&redirect_uri=",
  line_oauth_param: "&state=State&scope=profile%20openid"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
