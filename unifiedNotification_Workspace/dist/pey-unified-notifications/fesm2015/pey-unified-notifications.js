import { Firebase as Firebase$1 } from '@ionic-native/firebase/ngx/index';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { takeWhile } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Dialogs as Dialogs$1 } from '@ionic-native/dialogs/ngx/index';
import { Injectable, Component, NgModule, defineInjectable, inject } from '@angular/core';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Firebase } from '@ionic-native/firebase/ngx';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MobileFirebaseMessagingService {
    /**
     * @param {?} firebase
     */
    constructor(firebase) {
        this.firebase = firebase;
        this.permission = new BehaviorSubject(null);
        this.token = new BehaviorSubject(null);
        this.currentMessage = new BehaviorSubject(null);
        this.isAlive = true;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.isAlive = false;
    }
    /**
     * @return {?}
     */
    init() {
        this.getToken();
        this.initNotifications();
    }
    /**
     * @return {?}
     */
    getToken() {
        this.firebase.getToken()
            .then((/**
         * @param {?} token
         * @return {?}
         */
        token => {
            this.token.next(token);
        }))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        err => console.log(err)));
        this.firebase.onTokenRefresh()
            .pipe(takeWhile((/**
         * @return {?}
         */
        () => this.isAlive)))
            .subscribe((/**
         * @param {?} x
         * @return {?}
         */
        x => {
            //posts on update
            if (x) {
                if (x !== this.token) {
                    this.token.next(x);
                }
            }
        }));
    }
    /**
     * @return {?}
     */
    initNotifications() {
        this.firebase.onNotificationOpen()
            .pipe(takeWhile((/**
         * @return {?}
         */
        () => this.isAlive)))
            .subscribe((/**
         * @param {?} notification
         * @return {?}
         */
        notification => {
            this.currentMessage.next(notification);
        }));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    joinGroup(id) {
        console.log('subscribe to group' + id);
        this.firebase.subscribe(id);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    leaveGroup(id) {
        console.log('unsubscribe to group' + id);
        this.firebase.unsubscribe(id);
    }
    /**
     * @return {?}
     */
    updatePermission() {
        this.firebase.grantPermission()
            .then((/**
         * @param {?} permission
         * @return {?}
         */
        permission => {
            this.permission.next(permission);
        }))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        err => console.log(err)));
        this.firebase.hasPermission()
            .then((/**
         * @param {?} perm
         * @return {?}
         */
        perm => {
        }))
            .catch((/**
         * @param {?} err
         * @return {?}
         */
        err => console.log(err)));
    }
    /**
     * @return {?}
     */
    hasPermission() {
        return this.firebase.hasPermission()
            .then((/**
         * @param {?} perm
         * @return {?}
         */
        perm => {
            return perm.isEnabled;
        }));
    }
}
MobileFirebaseMessagingService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
MobileFirebaseMessagingService.ctorParameters = () => [
    { type: Firebase }
];
/** @nocollapse */ MobileFirebaseMessagingService.ngInjectableDef = defineInjectable({ factory: function MobileFirebaseMessagingService_Factory() { return new MobileFirebaseMessagingService(inject(Firebase$1)); }, token: MobileFirebaseMessagingService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class WebFirebaseMessagingService {
    /**
     * @param {?} angularFireMessaging
     */
    constructor(angularFireMessaging) {
        this.angularFireMessaging = angularFireMessaging;
        this.permission = new BehaviorSubject(null);
        this.token = new BehaviorSubject(null);
        this.currentMessage = new BehaviorSubject(null);
        this.isAlive = true;
        this.isActive = false;
        console.log('web');
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        console.log('webdead');
        this.isAlive = false;
        this.isActive = false;
    }
    /**
     * @return {?}
     */
    init() {
        this.angularFireMessaging.messaging.pipe(takeWhile((/**
         * @return {?}
         */
        () => this.isAlive))).subscribe((/**
         * @param {?} _messaging
         * @return {?}
         */
        (_messaging) => {
            _messaging.onMessage = _messaging.onMessage.bind(_messaging);
            _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        }));
        // this.getToken();
        this.receiveMessage();
    }
    //on web getting the token means asking for permission
    /**
     * @return {?}
     */
    updatePermission() {
        this.getToken();
    }
    /**
     * @return {?}
     */
    getToken() {
        this.angularFireMessaging.requestToken
            .pipe(takeWhile((/**
         * @return {?}
         */
        () => this.isAlive)))
            .subscribe((/**
         * @param {?} token
         * @return {?}
         */
        (token) => {
            this.token.next(token);
            this.permission.next(true);
        }), (/**
         * @param {?} err
         * @return {?}
         */
        (err) => {
            console.error('Unable to get permission to notify.', err);
        }));
        return true;
    }
    /**
     * @return {?}
     */
    receiveMessage() {
        this.angularFireMessaging.messages
            .pipe(takeWhile((/**
         * @return {?}
         */
        () => this.isAlive)))
            .subscribe((/**
         * @param {?} payload
         * @return {?}
         */
        (payload) => {
            this.currentMessage.next(payload);
        }));
    }
    /**
     * @return {?}
     */
    onTokenRefresh() {
        this.angularFireMessaging.tokenChanges
            .pipe(takeWhile((/**
         * @return {?}
         */
        () => this.isAlive)))
            .subscribe((/**
         * @param {?} token
         * @return {?}
         */
        token => {
            this.token.next(token);
        }));
    }
}
WebFirebaseMessagingService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
WebFirebaseMessagingService.ctorParameters = () => [
    { type: AngularFireMessaging }
];
/** @nocollapse */ WebFirebaseMessagingService.ngInjectableDef = defineInjectable({ factory: function WebFirebaseMessagingService_Factory() { return new WebFirebaseMessagingService(inject(AngularFireMessaging)); }, token: WebFirebaseMessagingService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UnifiedFirebaseMessagingService {
    /**
     * @param {?} mobileNotifications
     * @param {?} webNotifications
     * @param {?} platformService
     */
    constructor(mobileNotifications, webNotifications, platformService) {
        this.mobileNotifications = mobileNotifications;
        this.webNotifications = webNotifications;
        this.platformService = platformService;
        this.currentMessage = new BehaviorSubject(null);
        this.token = new BehaviorSubject(null);
        this.IsActive = false;
        this.isAlive = true;
        //  only relevant on ios
        this.permission = new BehaviorSubject(null);
    }
    /**
     * @param {?} isNative
     * @return {?}
     */
    init(isNative) {
        this.isNative = isNative;
        if (isNative) {
            this.mobileNotifications.init();
            this.currentMessage = this.mobileNotifications.currentMessage;
            this.permission = this.mobileNotifications.permission;
            this.token = this.mobileNotifications.token;
        }
        else {
            this.webNotifications.init();
            this.currentMessage = this.webNotifications.currentMessage;
            this.token = this.webNotifications.token;
            this.permission = this.webNotifications.permission;
        }
        this.IsActive = true;
    }
    /**
     * @param {?} id
     * @return {?}
     */
    joinGroup(id) {
        if (this.isNative) {
            this.mobileNotifications.joinGroup(id);
        }
        else {
            console.log('web topic/group subscriptions have to be resolved serverside');
        }
    }
    /**
     * @param {?} id
     * @return {?}
     */
    leaveGroup(id) {
        if (this.isNative) {
            this.mobileNotifications.leaveGroup(id);
        }
        else {
            console.log('web topic/group subscriptions have to be resolved serverside');
        }
    }
    /**
     * @return {?}
     */
    updatePermission() {
        if (this.isNative) {
            this.mobileNotifications.updatePermission();
        }
        else {
            this.webNotifications.getToken();
        }
    }
    // only works on iOS other platforms dont need permissions
    /**
     * @return {?}
     */
    hasPermission() {
        if (this.platformService.is('ios') && this.isNative) {
            return this.mobileNotifications.hasPermission()
                .then((/**
             * @param {?} res
             * @return {?}
             */
            res => {
                console.log(res);
                return res;
            }));
        }
        {
            return new Promise((/**
             * @return {?}
             */
            () => {
                return true;
            }));
        }
    }
}
UnifiedFirebaseMessagingService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
UnifiedFirebaseMessagingService.ctorParameters = () => [
    { type: MobileFirebaseMessagingService },
    { type: WebFirebaseMessagingService },
    { type: Platform }
];
/** @nocollapse */ UnifiedFirebaseMessagingService.ngInjectableDef = defineInjectable({ factory: function UnifiedFirebaseMessagingService_Factory() { return new UnifiedFirebaseMessagingService(inject(MobileFirebaseMessagingService), inject(WebFirebaseMessagingService), inject(Platform)); }, token: UnifiedFirebaseMessagingService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IosPushNotificationPermissiongGuard {
    /**
     * @param {?} platformService
     * @param {?} dialogs
     * @param {?} unifiedNotificationService
     */
    constructor(platformService, dialogs, unifiedNotificationService) {
        this.platformService = platformService;
        this.dialogs = dialogs;
        this.unifiedNotificationService = unifiedNotificationService;
    }
    /**
     * @param {?} next
     * @param {?} state
     * @return {?}
     */
    canActivate(next, state) {
        if (!this.platformService.is('ios')) {
            return true;
        }
        return this.unifiedNotificationService.hasPermission().then((/**
         * @param {?} res
         * @return {?}
         */
        res => {
            if (res) {
                return true;
            }
            else {
                return this.dialogs.alert('This app requires push notifications to work as intended.\nYou can turn them silent any time you want.', 'Important')
                    .then((/**
                 * @return {?}
                 */
                () => {
                    this.unifiedNotificationService.updatePermission();
                    return true;
                }))
                    .catch((/**
                 * @param {?} e
                 * @return {?}
                 */
                e => {
                    console.log(e);
                    return true;
                }));
            }
        }));
        return false;
    }
}
IosPushNotificationPermissiongGuard.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
IosPushNotificationPermissiongGuard.ctorParameters = () => [
    { type: Platform },
    { type: Dialogs },
    { type: UnifiedFirebaseMessagingService }
];
/** @nocollapse */ IosPushNotificationPermissiongGuard.ngInjectableDef = defineInjectable({ factory: function IosPushNotificationPermissiongGuard_Factory() { return new IosPushNotificationPermissiongGuard(inject(Platform), inject(Dialogs$1), inject(UnifiedFirebaseMessagingService)); }, token: IosPushNotificationPermissiongGuard, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// import { Dialogs } from '@ionic-native/dialogs/ngx';
class PeyUnifiedNotificationsComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
PeyUnifiedNotificationsComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-pey-unified-notifications',
                template: `
    <p>
      pey-unified-notifications works!
    </p>
  `
            }] }
];
/** @nocollapse */
PeyUnifiedNotificationsComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PeyUnifiedNotificationsModule {
}
PeyUnifiedNotificationsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [PeyUnifiedNotificationsComponent],
                imports: [],
                exports: [PeyUnifiedNotificationsComponent],
                providers: [
                    Dialogs,
                    Firebase
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { UnifiedFirebaseMessagingService, IosPushNotificationPermissiongGuard, PeyUnifiedNotificationsModule, PeyUnifiedNotificationsComponent as ɵc, MobileFirebaseMessagingService as ɵa, WebFirebaseMessagingService as ɵb };

//# sourceMappingURL=pey-unified-notifications.js.map