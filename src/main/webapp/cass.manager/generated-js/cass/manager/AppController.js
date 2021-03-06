/**
 *  Main entry point of the application. Figures out the settings and
 *  starts the EC UI Framework at the appropriate screen.
 *  
 *  @module cass.manager
 *  @class AppController
 *  @static
 *  
 *  @author devlin.junker@eduworks.com
 */
var AppController = function() {};
AppController = stjs.extend(AppController, null, [], function(constructor, prototype) {
    constructor.topBarContainerId = "#menuContainer";
    /**
     *  Manages the server connection by storing and configuring 
     *  the CASS instance endpoint for the rest of the application.  
     *  
     *  @property serverController
     *  @static
     *  @type ServerController
     */
    constructor.serverController = null;
    /**
     *  Manages the current user's identities and contacts through the
     *  KBAC libraries. 
     *  
     *  @property identityController
     *  @static
     *  @type IdentityController
     */
    constructor.identityController = new IdentityController();
    /**
     *  Handles the login/logout and admin communications with the server.
     *  
     *  @property loginController
     *  @static
     *  @type LoginController
     */
    constructor.loginController = new LoginController();
    constructor.repoInterface = new EcRepository();
    constructor.loginServer = new EcRemoteIdentityManager();
    /**
     *  Entry point of the application
     *  
     *  @param {String[]} args
     *  			Not used at all...
     */
    constructor.main = function(args) {
        AppSettings.loadSettings();
        AppController.repoInterface.autoDetectRepository();
        EcRepository.caching = true;
        if (AppController.repoInterface.selectedServer == null) {
            AppController.serverController = new ServerController(AppSettings.defaultServerUrl, AppSettings.defaultServerName);
        } else {
            AppController.serverController = new ServerController(AppController.repoInterface.selectedServer, "This Server (" + window.location.host + ")");
            AppController.serverController.addServer(AppSettings.defaultServerName, AppSettings.defaultServerUrl, null, null);
        }
        AppController.serverController.setRepoInterface(AppController.repoInterface);
        AppController.serverController.setRemoteIdentityManager(AppController.loginServer);
        AppController.loginServer.configureFromServer(null, function(p1) {
            alert(p1);
        });
        AppController.loginController.loginServer = AppController.loginServer;
        AppController.loginController.identity = AppController.identityController;
        ScreenManager.setDefaultScreen(new WelcomeScreen());
        EcIdentityManager.clearContacts();
        $(window.document).ready(function(arg0, arg1) {
            ViewManager.showView(new AppMenu(), AppController.topBarContainerId, function() {
                ($(window.document)).foundation();
            });
            return true;
        });
    };
}, {serverController: "ServerController", identityController: "IdentityController", loginController: "LoginController", repoInterface: "EcRepository", loginServer: "EcRemoteIdentityManager"}, {});
if (!stjs.mainCallDisabled) 
    AppController.main();
